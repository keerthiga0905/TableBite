import React, { useState } from 'react';
import { useTableBiteStore, tableBiteStore } from '../../store/tableBiteStore';
import type { MenuItem, StaffRequestType } from '../../types';
import { MenuCard } from './MenuCard';
import { FoodDetailModal } from './FoodDetailModal';
import { CartDrawer } from './CartDrawer';
import { OrderConfirmationModal } from './OrderConfirmationModal';
import { OrderTrackingModal } from './OrderTrackingModal';
import { StaffRequestModal } from './StaffRequestModal';
import { BillViewModal } from './BillViewModal';
import {
  Search,
  ShoppingBag,
  HelpCircle,
  Receipt,
  Utensils,
  Sparkles,
  Flame,
  Coffee,
  Pizza,
  Beef,
  Cake,
  GlassWater,
  Milk,
  Egg,
  Sandwich,
  Soup,
  Clock
} from 'lucide-react';

export const CustomerApp: React.FC = () => {
  const store = useTableBiteStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('cat-all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFoodItem, setSelectedFoodItem] = useState<MenuItem | null>(null);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [latestPlacedOrder, setLatestPlacedOrder] = useState<any | null>(null);

  // Filtered menu items
  const filteredItems = store.menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'cat-all' || item.categoryId === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotalItems = store.cart.reduce((sum, c) => sum + c.quantity, 0);

  const activeOrdersForTable = store.orders.filter(
    (o) => o.tableNumber === store.currentTableNumber && o.status !== 'cancelled'
  );

  const handleAddToCart = (item: MenuItem, qty: number, options: any[], instructions: string) => {
    tableBiteStore.addToCart(item, qty, options, instructions);
  };

  const handlePlaceOrder = (paymentMethod: any, note?: string) => {
    const order = tableBiteStore.placeOrder(paymentMethod, note);
    setIsCartOpen(false);
    setLatestPlacedOrder(order);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Egg': return Egg;
      case 'Flame': return Flame;
      case 'Beef': return Beef;
      case 'Pizza': return Pizza;
      case 'Sandwich': return Sandwich;
      case 'Soup': return Soup;
      case 'Cake': return Cake;
      case 'Coffee': return Coffee;
      case 'GlassWater': return GlassWater;
      case 'Milk': return Milk;
      default: return Utensils;
    }
  };

  return (
    <div className="min-h-screen text-slate-900 pb-28 relative bg-slate-950">
      {/* Background Picture with Ambient Gradient Backdrop */}
      <div
        className="fixed inset-0 bg-cover bg-fixed bg-center bg-no-repeat pointer-events-none z-0 opacity-20 scale-105 transform animate-fade-in"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2000&q=80')` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/90 to-[#FAF7F2] pointer-events-none z-0" />

      <div className="relative z-10">
        {/* Top Table Context Header */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-xs animate-fade-in">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-orange-500/20 animate-pulse-glow">
                  {store.currentTableNumber}
                </div>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-ping"></span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">TABLE {store.currentTableNumber}</span>
                  <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.2 rounded-full font-bold">Session Active</span>
                </div>
                <h1 className="font-black text-base text-slate-900 leading-none mt-0.5">{store.cafe.name}</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* View Bill Trigger */}
              <button
                onClick={() => setIsBillModalOpen(true)}
                className="p-2.5 rounded-2xl bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/60 font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
              >
                <Receipt className="w-4 h-4 text-amber-600" />
                <span className="hidden sm:inline">Bill</span>
              </button>

              {/* Live Track Trigger */}
              {activeOrdersForTable.length > 0 && (
                <button
                  onClick={() => setIsTrackingOpen(true)}
                  className="relative p-2.5 rounded-2xl bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200/60 font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 shadow-sm"
                >
                  <Clock className="w-4 h-4 text-emerald-600 animate-spin-slow" />
                  <span className="hidden sm:inline">Track</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-3xl mx-auto px-4 pt-4 space-y-5">
          {/* Welcome Greeting Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-charcoal to-slate-800 p-5 text-white shadow-xl animate-slide-up border border-slate-700/80">
            <div className="relative z-10 space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Sit. Order. Enjoy.
              </span>
              <h2 className="text-xl sm:text-2xl font-black">What are you craving today?</h2>
              <p className="text-slate-300 text-xs max-w-md font-medium">
                Order directly from Table {store.currentTableNumber}. Kitchen receives your order instantly!
              </p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-15 transform translate-x-4 translate-y-4 animate-float">
              <Utensils className="w-44 h-44 text-white" />
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative animate-fade-in">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search burgers, pizzas, coffee, desserts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-xs sm:text-sm font-medium shadow-sm text-slate-900 placeholder:text-slate-400 transition-all"
            />
          </div>

          {/* Categories Bar */}
          <div className="space-y-2 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-white uppercase tracking-wider drop-shadow-xs">Categories</h3>
              <span className="text-xs text-amber-300 font-bold">{filteredItems.length} items available</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {store.categories.map((cat) => {
                const Icon = getCategoryIcon(cat.icon);
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shrink-0 border ${
                      isSelected
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-md shadow-orange-600/30 scale-105'
                        : 'bg-white/90 backdrop-blur-md text-slate-800 border-white/60 hover:border-slate-300 hover:bg-white hover:scale-105'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-orange-500'}`} />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="space-y-3 animate-slide-up">
            {filteredItems.length === 0 ? (
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 text-center space-y-2 border border-slate-100 shadow-sm">
                <Utensils className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-700 text-base">No food items found</h4>
                <p className="text-slate-400 text-xs">Try searching for something else or change category filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredItems.map((item) => {
                  const itemInCart = store.cart.find((c) => c.menuItem.id === item.id);
                  return (
                    <MenuCard
                      key={item.id}
                      item={item}
                      onSelect={(selected) => setSelectedFoodItem(selected)}
                      cartQuantity={itemInCart ? itemInCart.quantity : 0}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </main>

        {/* Floating Bottom Bar */}
        <div className="fixed bottom-4 left-0 right-0 z-40 px-4 animate-slide-up">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <button
              onClick={() => setIsStaffModalOpen(true)}
              className="bg-slate-900/95 hover:bg-slate-800 backdrop-blur-md text-white px-4 py-3.5 rounded-2xl font-bold text-xs shadow-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 border border-slate-700"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Need Help?</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className={`flex-1 py-3.5 px-5 rounded-2xl font-extrabold text-xs sm:text-sm shadow-xl flex items-center justify-between transition-all ${
                cartTotalItems > 0
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-orange-600/40 hover:opacity-95 hover:scale-[1.02] active:scale-[0.99] animate-pulse-glow'
                  : 'bg-slate-200/90 backdrop-blur-md text-slate-500 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <span>{cartTotalItems > 0 ? `View Order Cart (${cartTotalItems} items)` : 'Cart is Empty'}</span>
              </div>

              {cartTotalItems > 0 && (
                <span className="bg-white/20 px-2.5 py-1 rounded-xl text-xs font-black">
                  ₹{store.cart.reduce((s, i) => s + i.itemTotalPrice, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <FoodDetailModal
        item={selectedFoodItem}
        onClose={() => setSelectedFoodItem(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={store.cart}
        tableNumber={store.currentTableNumber}
        onUpdateQuantity={(id, delta) => tableBiteStore.updateCartItemQuantity(id, delta)}
        onPlaceOrder={handlePlaceOrder}
      />

      <OrderConfirmationModal
        order={latestPlacedOrder}
        onClose={() => setLatestPlacedOrder(null)}
        onTrackOrder={() => setIsTrackingOpen(true)}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        orders={store.orders}
        tableNumber={store.currentTableNumber}
        onViewBill={() => setIsBillModalOpen(true)}
      />

      <StaffRequestModal
        isOpen={isStaffModalOpen}
        onClose={() => setIsStaffModalOpen(false)}
        tableNumber={store.currentTableNumber}
        onRequestStaff={(type: StaffRequestType) => tableBiteStore.requestStaff(type)}
      />

      <BillViewModal
        isOpen={isBillModalOpen}
        onClose={() => setIsBillModalOpen(false)}
        orders={store.orders}
        tableNumber={store.currentTableNumber}
      />
    </div>
  );
};

