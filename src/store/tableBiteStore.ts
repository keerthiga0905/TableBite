import { useState, useEffect } from 'react';
import type {
  Cafe,
  Table,
  MenuItem,
  Category,
  Order,
  StaffRequest,
  CartItem,
  OrderStatus,
  StaffRequestType,
  SelectedOption
} from '../types';
import { DEMO_CAFE, DEMO_TABLES, DEMO_MENU_ITEMS, DEMO_CATEGORIES } from '../data/demoData';

const STORE_KEY = 'tablebite_app_state_v1';
const BROADCAST_CHANNEL_NAME = 'tablebite_realtime_sync';

export interface AppState {
  cafe: Cafe;
  tables: Table[];
  categories: Category[];
  menuItems: MenuItem[];
  orders: Order[];
  staffRequests: StaffRequest[];
  currentTableNumber: string;
  activeSessionId: string;
  cart: CartItem[];
}

const getInitialState = (): AppState => {
  const stored = localStorage.getItem(STORE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return {
        cafe: parsed.cafe || DEMO_CAFE,
        tables: parsed.tables && parsed.tables.length > 0 ? parsed.tables : DEMO_TABLES,
        categories: parsed.categories && parsed.categories.length > 0 ? parsed.categories : DEMO_CATEGORIES,
        menuItems: parsed.menuItems && parsed.menuItems.length > 0 ? parsed.menuItems : DEMO_MENU_ITEMS,
        orders: parsed.orders || [
          {
            id: 'TB1038',
            cafeId: 'cafe-01',
            tableId: 'tbl-02',
            tableNumber: '02',
            sessionId: 'SES-8812',
            items: [
              {
                cartItemId: 'sample-1',
                menuItem: DEMO_MENU_ITEMS[2],
                quantity: 1,
                selectedOptions: [{ groupName: 'Crust Type', optionName: 'Classic Thin Crust', price: 0 }],
                itemTotalPrice: 299,
              },
              {
                cartItemId: 'sample-2',
                menuItem: DEMO_MENU_ITEMS[16],
                quantity: 2,
                selectedOptions: [{ groupName: 'Milk Choice', optionName: 'Whole Milk', price: 0 }],
                itemTotalPrice: 298,
              }
            ],
            subtotal: 597,
            tax: 30,
            total: 627,
            status: 'preparing',
            priority: 'normal',
            createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
            estimatedPrepTimeMinutes: 18,
            paymentStatus: 'pending'
          }
        ],
        staffRequests: parsed.staffRequests || [],
        currentTableNumber: parsed.currentTableNumber || '04',
        activeSessionId: parsed.activeSessionId || 'SES-9821',
        cart: parsed.cart || [],
      };
    } catch (e) {
      console.error('Failed to parse stored state', e);
    }
  }

  return {
    cafe: DEMO_CAFE,
    tables: DEMO_TABLES,
    categories: DEMO_CATEGORIES,
    menuItems: DEMO_MENU_ITEMS,
    orders: [
      {
        id: 'TB1038',
        cafeId: 'cafe-01',
        tableId: 'tbl-02',
        tableNumber: '02',
        sessionId: 'SES-8812',
        items: [
          {
            cartItemId: 'sample-1',
            menuItem: DEMO_MENU_ITEMS[2],
            quantity: 1,
            selectedOptions: [{ groupName: 'Crust Type', optionName: 'Classic Thin Crust', price: 0 }],
            itemTotalPrice: 299,
          },
          {
            cartItemId: 'sample-2',
            menuItem: DEMO_MENU_ITEMS[16],
            quantity: 2,
            selectedOptions: [{ groupName: 'Milk Choice', optionName: 'Whole Milk', price: 0 }],
            itemTotalPrice: 298,
          }
        ],
        subtotal: 597,
        tax: 30,
        total: 627,
        status: 'preparing',
        priority: 'normal',
        createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
        estimatedPrepTimeMinutes: 18,
        paymentStatus: 'pending'
      }
    ],
    staffRequests: [],
    currentTableNumber: '04',
    activeSessionId: 'SES-9821',
    cart: [],
  };
};

type Listener = () => void;
const listeners: Set<Listener> = new Set();
let broadcastChannel: BroadcastChannel | null = null;

if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
  broadcastChannel.onmessage = () => {
    state = getInitialState();
    listeners.forEach((listener) => listener());
  };
}

let state: AppState = getInitialState();

const notify = () => {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
  listeners.forEach((listener) => listener());
  if (broadcastChannel) {
    broadcastChannel.postMessage({ type: 'STATE_CHANGED', timestamp: Date.now() });
  }
};

export const tableBiteStore = {
  getState: () => state,
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  setCurrentTable: (tableNumber: string) => {
    const formatted = tableNumber.padStart(2, '0');
    state = {
      ...state,
      currentTableNumber: formatted,
      activeSessionId: `SES-${Math.floor(1000 + Math.random() * 9000)}`
    };
    notify();
  },

  addToCart: (menuItem: MenuItem, quantity: number, selectedOptions: SelectedOption[], specialInstructions?: string) => {
    const optionsCost = selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
    const itemTotalPrice = (menuItem.price + optionsCost) * quantity;
    const cartItemId = `${menuItem.id}-${JSON.stringify(selectedOptions)}-${specialInstructions || ''}`;

    const existingIndex = state.cart.findIndex((c) => c.cartItemId === cartItemId);
    let newCart = [...state.cart];

    if (existingIndex > -1) {
      const existing = newCart[existingIndex];
      const newQty = existing.quantity + quantity;
      newCart[existingIndex] = {
        ...existing,
        quantity: newQty,
        itemTotalPrice: (menuItem.price + optionsCost) * newQty
      };
    } else {
      newCart.push({
        cartItemId,
        menuItem,
        quantity,
        selectedOptions,
        specialInstructions,
        itemTotalPrice
      });
    }

    state = { ...state, cart: newCart };
    notify();
  },

  updateCartItemQuantity: (cartItemId: string, delta: number) => {
    const newCart = state.cart
      .map((item) => {
        if (item.cartItemId === cartItemId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          const optionsCost = item.selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
          return {
            ...item,
            quantity: newQty,
            itemTotalPrice: (item.menuItem.price + optionsCost) * newQty
          };
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    state = { ...state, cart: newCart };
    notify();
  },

  clearCart: () => {
    state = { ...state, cart: [] };
    notify();
  },

  placeOrder: (paymentMethod: 'upi' | 'card' | 'cash' | 'pay_later' = 'pay_later', generalNotes?: string): Order => {
    const subtotal = state.cart.reduce((sum, item) => sum + item.itemTotalPrice, 0);
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;

    const maxPrepTime = Math.max(...state.cart.map((item) => item.menuItem.prepTimeMinutes), 10);
    const orderId = `TB${Math.floor(1000 + Math.random() * 9000)}`;

    const currentTableObj = state.tables.find((t) => t.tableNumber === state.currentTableNumber);

    const newOrder: Order = {
      id: orderId,
      cafeId: state.cafe.id,
      tableId: currentTableObj?.id || `tbl-${state.currentTableNumber}`,
      tableNumber: state.currentTableNumber,
      sessionId: state.activeSessionId,
      items: [...state.cart],
      subtotal,
      tax,
      total,
      status: 'received',
      priority: 'normal',
      createdAt: new Date().toISOString(),
      estimatedPrepTimeMinutes: maxPrepTime,
      paymentStatus: paymentMethod === 'pay_later' ? 'pending' : 'paid',
      paymentMethod,
      generalNotes,
    };

    const updatedTables = state.tables.map((t) =>
      t.tableNumber === state.currentTableNumber ? { ...t, status: 'Ordering' as const } : t
    );

    state = {
      ...state,
      orders: [newOrder, ...state.orders],
      tables: updatedTables,
      cart: []
    };
    notify();

    return newOrder;
  },

  updateOrderStatus: (orderId: string, status: OrderStatus) => {
    const updatedOrders = state.orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    state = { ...state, orders: updatedOrders };
    notify();
  },

  requestStaff: (type: StaffRequestType): StaffRequest => {
    const newReq: StaffRequest = {
      id: `req-${Date.now()}`,
      cafeId: state.cafe.id,
      tableId: `tbl-${state.currentTableNumber}`,
      tableNumber: state.currentTableNumber,
      type,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    state = { ...state, staffRequests: [newReq, ...state.staffRequests] };
    notify();
    return newReq;
  },

  resolveStaffRequest: (requestId: string) => {
    const updated = state.staffRequests.map((r) => (r.id === requestId ? { ...r, status: 'resolved' as const } : r));
    state = { ...state, staffRequests: updated };
    notify();
  },

  toggleItemAvailability: (itemId: string) => {
    const updatedMenu = state.menuItems.map((m) => (m.id === itemId ? { ...m, isAvailable: !m.isAvailable } : m));
    state = { ...state, menuItems: updatedMenu };
    notify();
  },

  addMenuItem: (item: Omit<MenuItem, 'id' | 'cafeId'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `item-${Date.now()}`,
      cafeId: state.cafe.id
    };
    state = { ...state, menuItems: [newItem, ...state.menuItems] };
    notify();
  },

  updateMenuItem: (item: MenuItem) => {
    const updated = state.menuItems.map((m) => (m.id === item.id ? item : m));
    state = { ...state, menuItems: updated };
    notify();
  },

  deleteMenuItem: (itemId: string) => {
    const updated = state.menuItems.filter((m) => m.id !== itemId);
    state = { ...state, menuItems: updated };
    notify();
  },

  createTable: (tableNumber: string) => {
    const formatted = tableNumber.padStart(2, '0');
    if (state.tables.some((t) => t.tableNumber === formatted)) return;
    const newTable: Table = {
      id: `tbl-${formatted}`,
      cafeId: state.cafe.id,
      tableNumber: formatted,
      qrCodeUrl: '',
      status: 'Available'
    };
    state = { ...state, tables: [...state.tables, newTable].sort((a, b) => a.tableNumber.localeCompare(b.tableNumber)) };
    notify();
  },

  deleteTable: (tableId: string) => {
    state = { ...state, tables: state.tables.filter((t) => t.id !== tableId) };
    notify();
  },

  resetDemoData: () => {
    localStorage.removeItem(STORE_KEY);
    state = getInitialState();
    notify();
  }
};

export function useTableBiteStore() {
  const [data, setData] = useState<AppState>(tableBiteStore.getState());

  useEffect(() => {
    const unsubscribe = tableBiteStore.subscribe(() => {
      setData(tableBiteStore.getState());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return data;
}
