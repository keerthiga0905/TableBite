import React from 'react';
import type { Order, OrderStatus } from '../../types';
import { X, Check, Clock, ChefHat, Bell, Utensils, Receipt, Sparkles } from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  tableNumber: string;
  onViewBill: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders,
  tableNumber,
  onViewBill,
}) => {
  if (!isOpen) return null;

  const activeOrders = orders.filter(
    (o) => o.tableNumber === tableNumber && o.status !== 'cancelled'
  );

  const latestOrder = activeOrders[0];

  const steps: { status: OrderStatus; label: string; desc: string; icon: any }[] = [
    { status: 'received', label: 'Order Received', desc: 'Sent directly to kitchen screen', icon: Bell },
    { status: 'confirmed', label: 'Order Confirmed', desc: 'Chef acknowledged order', icon: Check },
    { status: 'preparing', label: 'Preparing Food', desc: 'Chef is cooking your meal', icon: ChefHat },
    { status: 'ready', label: 'Food Ready', desc: 'Plated & ready for serving', icon: Sparkles },
    { status: 'served', label: 'Served to Table', desc: 'Enjoy your delicious meal!', icon: Utensils },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'received': return 0;
      case 'confirmed': return 1;
      case 'preparing': return 2;
      case 'ready': return 3;
      case 'served': return 4;
      default: return 0;
    }
  };

  const currentStepIdx = latestOrder ? getStepIndex(latestOrder.status) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 bg-gradient-to-r from-slate-900 via-charcoal to-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-black text-base shadow-md">
              {tableNumber}
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">Live Order Tracking</h3>
              <p className="text-slate-400 text-xs font-medium">Table {tableNumber} Session</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {activeOrders.length === 0 ? (
            <div className="text-center py-10">
              <Utensils className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium text-sm">No active orders found for Table {tableNumber}</p>
            </div>
          ) : (
            <>
              {latestOrder && (
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 text-center space-y-1">
                  <span className="text-[11px] font-black text-amber-800 uppercase tracking-wider">
                    Current Order #{latestOrder.id}
                  </span>
                  <h4 className="text-lg font-black text-slate-900">
                    {latestOrder.status === 'preparing' && 'Your food is being prepared 🍔'}
                    {latestOrder.status === 'received' && 'Kitchen received your order 🛎️'}
                    {latestOrder.status === 'confirmed' && 'Order confirmed by chef 👨‍🍳'}
                    {latestOrder.status === 'ready' && 'Your food is ready to serve! 🚀'}
                    {latestOrder.status === 'served' && 'Served! Enjoy your food 😋'}
                  </h4>
                  <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    Est. completion: {latestOrder.estimatedPrepTimeMinutes} mins
                  </p>
                </div>
              )}

              {latestOrder && (
                <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                  {steps.map((step, idx) => {
                    const isPassed = idx < currentStepIdx;
                    const isCurrent = idx === currentStepIdx;
                    const Icon = step.icon;

                    return (
                      <div key={step.status} className="relative flex items-start gap-4">
                        <div
                          className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${
                            isPassed
                              ? 'bg-emerald-600 text-white shadow-sm ring-4 ring-emerald-100'
                              : isCurrent
                              ? 'bg-orange-600 text-white shadow-md ring-4 ring-orange-100 animate-pulse'
                              : 'bg-slate-100 text-slate-400 border border-slate-300'
                          }`}
                        >
                          {isPassed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Icon className="w-3 h-3" />}
                        </div>

                        <div className="flex-1 pt-0.5">
                          <h5
                            className={`font-bold text-sm ${
                              isCurrent
                                ? 'text-orange-600 font-extrabold'
                                : isPassed
                                ? 'text-slate-800 font-semibold'
                                : 'text-slate-400'
                            }`}
                          >
                            {step.label}
                          </h5>
                          <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="border-t border-slate-100 pt-4 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Session Orders ({activeOrders.length})
                </span>
                {activeOrders.map((ord) => (
                  <div key={ord.id} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-extrabold text-slate-800">Order #{ord.id}</span>
                      <span className="capitalize font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full text-[11px]">
                        {ord.status}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {ord.items.map((it, i) => (
                        <div key={i} className="flex justify-between text-xs text-slate-600">
                          <span>
                            {it.quantity}× {it.menuItem.name}
                          </span>
                          <span className="font-medium text-slate-900">₹{it.itemTotalPrice}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onViewBill();
            }}
            className="flex-1 bg-slate-900 text-white py-3 rounded-2xl font-bold text-xs shadow-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            <Receipt className="w-4 h-4 text-amber-400" />
            <span>View Total Table Bill</span>
          </button>
        </div>
      </div>
    </div>
  );
};
