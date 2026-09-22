import React, { useEffect } from 'react';
import type { Order } from '../../types';
import confetti from 'canvas-confetti';
import { CheckCircle2, Clock, ChefHat, ArrowRight } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
  onTrackOrder: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onTrackOrder,
}) => {
  if (!order) return null;

  useEffect(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#E05A47', '#F27A35', '#F7B049', '#10B981']
      });
    } catch (e) {
      console.log('Confetti failed to run', e);
    }
  }, [order]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl text-center space-y-5 animate-scaleUp">
        <div className="mx-auto w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-500 shadow-lg shadow-emerald-500/20 animate-bounce">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>

        <div>
          <span className="bg-amber-100 text-amber-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            Order Sent to Kitchen
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-2">Order #{order.id}</h2>
          <p className="text-slate-500 text-xs mt-1">Table {order.tableNumber} • TableBite Direct</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium pb-2 border-b border-slate-200/60">
            <span className="flex items-center gap-1.5 text-slate-700 font-bold">
              <ChefHat className="w-4 h-4 text-orange-500" />
              Kitchen Status
            </span>
            <span className="text-orange-600 font-bold animate-pulse">Order Received</span>
          </div>

          <div className="space-y-1.5 max-h-32 overflow-y-auto pt-1">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="text-slate-800 font-semibold truncate">
                  {item.quantity}× {item.menuItem.name}
                </span>
                <span className="text-slate-500">₹{item.itemTotalPrice}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200/60 flex justify-between items-center text-xs">
            <span className="text-slate-500">Est. Prep Time</span>
            <span className="font-extrabold text-slate-900 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              {order.estimatedPrepTimeMinutes} minutes
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={() => {
              onClose();
              onTrackOrder();
            }}
            className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white py-3.5 rounded-2xl font-extrabold text-sm shadow-lg shadow-orange-600/30 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Track Order Status</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="w-full text-slate-500 hover:text-slate-800 py-2 rounded-xl font-bold text-xs transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};
