import React, { useState } from 'react';
import type { Order } from '../../types';
import { Receipt, X, QrCode, CreditCard, Banknote, Sparkles, CheckCircle2 } from 'lucide-react';

interface BillViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  tableNumber: string;
}

export const BillViewModal: React.FC<BillViewModalProps> = ({
  isOpen,
  onClose,
  orders,
  tableNumber,
}) => {
  if (!isOpen) return null;

  const [paymentDone, setPaymentDone] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'cash'>('upi');

  const activeOrders = orders.filter((o) => o.tableNumber === tableNumber && o.status !== 'cancelled');

  const subtotal = activeOrders.reduce((sum, ord) => sum + ord.subtotal, 0);
  const tax = activeOrders.reduce((sum, ord) => sum + ord.tax, 0);
  const grandTotal = subtotal + tax;

  const handleSimulatePayment = () => {
    setPaymentDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-amber-200" />
            <div>
              <h3 className="font-extrabold text-base leading-tight">Session Itemized Bill</h3>
              <p className="text-white/80 text-xs font-medium">Table {tableNumber} • Combined Session</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {paymentDone ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-black text-slate-900 text-xl">Payment Successful!</h3>
            <p className="text-slate-500 text-xs max-w-xs mx-auto">
              Thank you for dining with us at TableBite. We hope to serve you again soon!
            </p>

            <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 text-xs text-emerald-900 font-bold">
              Total Paid: ₹{grandTotal}
            </div>

            <button
              onClick={() => {
                setPaymentDone(false);
                onClose();
              }}
              className="w-full bg-slate-900 text-white py-3 rounded-2xl font-bold text-xs shadow-md"
            >
              Close & Finish
            </button>
          </div>
        ) : (
          <div className="p-5 overflow-y-auto space-y-5 flex-1">
            {activeOrders.length === 0 ? (
              <p className="text-slate-500 text-xs text-center py-8">No orders placed yet for Table {tableNumber}</p>
            ) : (
              <>
                <div className="space-y-4">
                  {activeOrders.map((ord) => (
                    <div key={ord.id} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2">
                      <div className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-200/60">
                        <span className="font-extrabold text-slate-900">Order #{ord.id}</span>
                        <span className="text-[11px] text-slate-400">
                          {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {ord.items.map((it, i) => (
                          <div key={i} className="flex justify-between text-xs">
                            <span className="text-slate-700">
                              {it.quantity}× {it.menuItem.name}
                            </span>
                            <span className="font-semibold text-slate-900">₹{it.itemTotalPrice}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50/60 p-4 rounded-2xl space-y-2 text-xs border border-amber-200/60">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-800">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GST (5%)</span>
                    <span className="font-semibold text-slate-800">₹{tax}</span>
                  </div>
                  <div className="flex justify-between text-slate-900 text-base font-extrabold pt-2 border-t border-amber-200">
                    <span>Grand Total</span>
                    <span className="text-orange-600">₹{grandTotal}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pay Now</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'upi', label: 'UPI QR', icon: QrCode },
                      { id: 'card', label: 'Card', icon: CreditCard },
                      { id: 'cash', label: 'Cash', icon: Banknote },
                    ].map((m) => {
                      const Icon = m.icon;
                      const isSel = selectedMethod === m.id;
                      return (
                        <button
                          key={m.id}
                          onClick={() => setSelectedMethod(m.id as any)}
                          className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-bold transition-all ${
                            isSel
                              ? 'border-orange-500 bg-orange-50 text-orange-950'
                              : 'border-slate-200 text-slate-600'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isSel ? 'text-orange-600' : 'text-slate-400'}`} />
                          <span>{m.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedMethod === 'upi' && (
                    <div className="bg-slate-900 text-white p-4 rounded-2xl text-center space-y-2 my-2">
                      <p className="text-[11px] text-slate-300">Scan UPI QR code to pay instantly</p>
                      <div className="w-28 h-28 bg-white p-2 mx-auto rounded-xl shadow-md flex items-center justify-center">
                        <QrCode className="w-24 h-24 text-slate-900" />
                      </div>
                      <span className="text-[10px] text-amber-400 font-mono block">tablebite@upi</span>
                    </div>
                  )}

                  <button
                    onClick={handleSimulatePayment}
                    className="w-full mt-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-emerald-600/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>Simulate Payment Completion (₹{grandTotal})</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
