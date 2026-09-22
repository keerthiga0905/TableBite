import React, { useState } from 'react';
import type { CartItem } from '../../types';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CreditCard, QrCode, Banknote, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  tableNumber: string;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onPlaceOrder: (paymentMethod: 'upi' | 'card' | 'cash' | 'pay_later', note?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  tableNumber,
  onUpdateQuantity,
  onPlaceOrder,
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cash' | 'pay_later'>('pay_later');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.itemTotalPrice, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  const handleConfirmOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onPlaceOrder(paymentMethod);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-slideLeft">
        <div className="p-4 bg-gradient-to-r from-orange-600 via-amber-600 to-terracotta text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-lg border border-white/30">
              {tableNumber}
            </div>
            <div>
              <h2 className="font-extrabold text-base leading-tight">Your Cart</h2>
              <p className="text-white/80 text-xs font-medium">Table {tableNumber} • TableBite Direct Kitchen</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-4 animate-bounce">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Your cart is empty</h3>
            <p className="text-slate-500 text-xs mt-1 max-w-xs">
              Explore our fresh delicious menu items and add your favorite dishes!
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 bg-orange-600 text-white rounded-xl font-bold text-xs shadow-md hover:bg-orange-700 transition-colors"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order Items</span>
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-amber-50/40 rounded-2xl p-3 border border-amber-100 flex gap-3 items-start"
                >
                  <img
                    src={item.menuItem.imageUrl}
                    alt={item.menuItem.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{item.menuItem.name}</h4>
                      <span className="font-extrabold text-slate-900 text-sm">₹{item.itemTotalPrice}</span>
                    </div>

                    {item.selectedOptions.length > 0 && (
                      <div className="text-[11px] text-slate-500 mt-0.5 space-x-1">
                        {item.selectedOptions.map((opt, idx) => (
                          <span key={idx} className="inline-block bg-white px-1.5 py-0.5 rounded border border-slate-200">
                            {opt.optionName} {opt.price > 0 && `(+₹${opt.price})`}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.specialInstructions && (
                      <p className="text-[11px] text-amber-700 italic mt-1 bg-amber-100/50 px-2 py-0.5 rounded">
                        Note: "{item.specialInstructions}"
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-amber-100/60">
                      <span className="text-xs text-slate-400 font-medium">₹{item.menuItem.price} each</span>
                      <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-slate-200 shadow-2xs">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100"
                        >
                          {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-rose-500" /> : <Minus className="w-3.5 h-3.5" />}
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2.5 border-t border-slate-100 pt-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payment Option</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'pay_later', label: 'Pay at End', icon: Sparkles, desc: 'Add to Table Bill' },
                  { id: 'upi', label: 'Instant UPI', icon: QrCode, desc: 'Google Pay / PhonePe' },
                  { id: 'card', label: 'Card Payment', icon: CreditCard, desc: 'Credit / Debit Card' },
                  { id: 'cash', label: 'Cash at Counter', icon: Banknote, desc: 'Pay Cash When Serving' },
                ].map((pm) => {
                  const Icon = pm.icon;
                  const isSel = paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                        isSel
                          ? 'border-orange-500 bg-orange-50/70 text-orange-950 font-medium ring-1 ring-orange-500'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <Icon className={`w-4 h-4 ${isSel ? 'text-orange-600' : 'text-slate-400'}`} />
                        <span>{pm.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{pm.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs border border-slate-100">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST / Taxes (5%)</span>
                <span className="font-semibold text-slate-800">₹{tax}</span>
              </div>
              <div className="flex justify-between text-slate-900 text-base font-extrabold pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-orange-600">₹{total}</span>
              </div>
            </div>

            <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200/60 flex items-center gap-3 text-xs text-amber-900">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
              <p>Your order goes directly to the kitchen display for Table {tableNumber}.</p>
            </div>
          </div>
        )}

        {cart.length > 0 && (
          <div className="p-4 bg-white border-t border-slate-100">
            <button
              disabled={isSubmitting}
              onClick={handleConfirmOrder}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white py-4 px-6 rounded-2xl font-extrabold text-sm shadow-xl shadow-orange-600/30 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span>{isSubmitting ? 'Sending to Kitchen...' : 'Confirm & Place Order'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white/20 px-2.5 py-1 rounded-xl text-xs font-black">₹{total}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
