export type UserRole = 'customer' | 'staff' | 'admin';

export interface Cafe {
  id: string;
  name: string;
  tagline: string;
  address: string;
  phone: string;
  logo: string;
}

export type TableStatus = 'Available' | 'Occupied' | 'Ordering' | 'Waiting' | 'Cleaning';

export interface Table {
  id: string;
  cafeId: string;
  tableNumber: string;
  qrCodeUrl: string;
  status: TableStatus;
  activeSessionId?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface CustomizationGroup {
  id: string;
  name: string;
  type: 'single' | 'multiple';
  required: boolean;
  options: CustomizationOption[];
}

export interface MenuItem {
  id: string;
  cafeId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  prepTimeMinutes: number;
  isAvailable: boolean;
  isVeg: boolean;
  isPopular?: boolean;
  customizationGroups?: CustomizationGroup[];
}

export interface SelectedOption {
  groupName: string;
  optionName: string;
  price: number;
}

export interface CartItem {
  cartItemId: string; // unique ID for item + options combination
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: SelectedOption[];
  specialInstructions?: string;
  itemTotalPrice: number;
}

export type OrderStatus = 'received' | 'confirmed' | 'preparing' | 'ready' | 'served' | 'cancelled';
export type OrderPriority = 'normal' | 'high';

export interface Order {
  id: string;
  cafeId: string;
  tableId: string;
  tableNumber: string;
  sessionId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  priority: OrderPriority;
  createdAt: string;
  estimatedPrepTimeMinutes: number;
  paymentStatus: 'pending' | 'paid';
  paymentMethod?: 'upi' | 'card' | 'cash' | 'pay_later';
  generalNotes?: string;
}

export interface TableSession {
  id: string;
  tableId: string;
  tableNumber: string;
  cafeId: string;
  orderIds: string[];
  status: 'active' | 'closed';
  startTime: string;
  totalAmount: number;
}

export type StaffRequestType = 'water' | 'spoon' | 'napkins' | 'staff' | 'bill';

export interface StaffRequest {
  id: string;
  cafeId: string;
  tableId: string;
  tableNumber: string;
  type: StaffRequestType;
  status: 'pending' | 'resolved';
  createdAt: string;
}
