import React, { useState } from 'react';
import { useTableBiteStore, tableBiteStore } from '../../store/tableBiteStore';
import type { OrderStatus } from '../../types';
import {
  ChefHat,
  Bell,
  Clock,
  AlertCircle,
  Volume2,
  VolumeX,
  ArrowRight,
  Flame,
  GlassWater,
  UserCheck,
  Receipt,
  Utensils,
  Newspaper
} from 'lucide-react';

export const KitchenDashboard: React.FC = () => {
  const store = useTableBiteStore();
  const [soundEnabled, setSoundEnabled] = useState(true);

  const columns: { id: OrderStatus; title: string; color: string; badge: string }[] = [
    { id: 'received', title: 'New Orders', color: 'bg-rose-50 border-rose-200 text-rose-900', badge: 'bg-rose-600 text-white' },
    { id: 'preparing', title: 'In Preparation', color: 'bg-amber-50 border-amber-200 text-amber-900', badge: 'bg-amber-600 text-white' },
    { id: 'ready', title: 'Ready to Serve', color: 'bg-emerald-50 border-emerald-200 text-emerald-900', badge: 'bg-emerald-600 text-white' },
    { id: 'served', title: 'Completed / Served', color: 'bg-slate-50 border-slate-200 text-slate-700', badge: 'bg-slate-700 text-white' },
  ];

  const getOrdersByStatus = (status: OrderStatus) => {
    return store.orders.filter((o) => {
      if (status === 'received') return o.status === 'received' || o.status === 'confirmed';
      return o.status === status;
    });
  };

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    switch (currentStatus) {
      case 'received':
      case 'confirmed':
        return 'preparing';
      case 'preparing':
        return 'ready';
      case 'ready':
        return 'served';
      default:
        return null;
    }
  };

  const pendingStaffRequests = store.staffRequests.filter((r) => r.status === 'pending');

  const getRequestIcon = (type: string) => {
    switch (type) {
      case 'water': return GlassWater;
      case 'spoon': return Utensils;
      case 'napkins': return Newspaper;
      case 'staff': return UserCheck;
      case 'bill': return Receipt;
      default: return AlertCircle;
    }
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col relative bg-slate-950 overflow-x-auto">
      {/* Background Picture with Dark Moody Overlay */}
      <div
        className="fixed inset-0 bg-cover bg-fixed bg-center bg-no-repeat pointer-events-none z-0 opacity-25 scale-105 transform animate-fade-in"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=2000&q=80')` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col flex-1">
        <header className="bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex items-center justify-between shadow-lg animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 text-white flex items-center justify-center font-black shadow-md shadow-orange-600/30 animate-pulse-glow">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg text-white leading-none">Kitchen Display System (KDS)</h1>
              <p className="text-slate-400 text-xs mt-0.5 font-medium">{store.cafe.name} • Live Order Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all hover:scale-105 active:scale-95 ${
                soundEnabled
                  ? 'bg-slate-800/80 text-emerald-400 border-slate-700 hover:bg-slate-700'
                  : 'bg-slate-900/80 text-slate-500 border-slate-800'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundEnabled ? 'Alerts ON' : 'Muted'}</span>
            </button>

            <div className="bg-slate-800/80 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-bold text-amber-400 border border-slate-700 flex items-center gap-2 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>{store.orders.filter((o) => o.status !== 'served').length} Active Kitchen Orders</span>
            </div>
          </div>
        </header>

        {pendingStaffRequests.length > 0 && (
          <div className="bg-amber-500/15 backdrop-blur-md border-b border-amber-500/30 px-6 py-2.5 flex items-center justify-between text-xs text-amber-300 animate-slide-up">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400 animate-bounce" />
              <span className="font-bold">Staff Requests ({pendingStaffRequests.length}):</span>
              <div className="flex items-center gap-2 flex-wrap">
                {pendingStaffRequests.map((req) => {
                  const Icon = getRequestIcon(req.type);
                  return (
                    <div
                      key={req.id}
                      className="bg-amber-500/20 backdrop-blur-sm border border-amber-500/40 px-2.5 py-1 rounded-xl flex items-center gap-2 text-white font-semibold shadow-sm animate-scale-in"
                    >
                      <Icon className="w-3.5 h-3.5 text-amber-400" />
                      <span>
                        Table <strong className="text-amber-300">{req.tableNumber}</strong> requested{' '}
                        <span className="uppercase text-[10px] tracking-wider font-extrabold">{req.type}</span>
                      </span>
                      <button
                        onClick={() => tableBiteStore.resolveStaffRequest(req.id)}
                        className="ml-1 text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-0.5 rounded-lg transition-all font-bold"
                      >
                        Done
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 p-6 overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 min-w-[1200px]">
            {columns.map((col, idx) => {
              const columnOrders = getOrdersByStatus(col.id);

              return (
                <div 
                  key={col.id} 
                  className="flex flex-col bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800/90 p-4 h-full shadow-2xl animate-slide-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${col.badge} animate-pulse`}></span>
                      <h3 className="font-extrabold text-base text-white">{col.title}</h3>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${col.badge}`}>
                      {columnOrders.length}
                    </span>
                  </div>

                  <div className="space-y-4 flex-1 overflow-y-auto pr-1">
                    {columnOrders.length === 0 ? (
                      <div className="py-12 text-center text-slate-500 text-xs font-medium">No orders in this column</div>
                    ) : (
                      columnOrders.map((order) => {
                        const nextStatus = getNextStatus(order.status);
                        const isHighPriority = order.priority === 'high';

                        return (
                          <div
                            key={order.id}
                            className={`bg-slate-950/90 backdrop-blur-md rounded-2xl p-4 border transition-all duration-300 space-y-3 hover:-translate-y-1 animate-scale-in ${
                              isHighPriority
                                ? 'border-rose-500 shadow-rose-900/40 ring-1 ring-rose-500'
                                : 'border-slate-800/90 hover:border-slate-700 shadow-lg'
                            }`}
                          >
                            <div className="flex justify-between items-start pb-2 border-b border-slate-800">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-black text-xl text-white">Table {order.tableNumber}</span>
                                  {isHighPriority && (
                                    <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase flex items-center gap-1 animate-pulse">
                                      <Flame className="w-3 h-3 fill-current" /> Priority
                                    </span>
                                  )}
                                </div>
                                <span className="text-slate-400 text-xs font-mono">Order #{order.id}</span>
                              </div>

                              <div className="text-right text-[11px] text-slate-400">
                                <span className="flex items-center gap-1 font-semibold text-slate-300">
                                  <Clock className="w-3 h-3 text-amber-500" />
                                  {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <span className="text-amber-400 font-bold">{order.estimatedPrepTimeMinutes} min target</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              {order.items.map((it, idx) => (
                                <div key={idx} className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/80">
                                  <div className="flex justify-between items-center text-sm">
                                    <span className="font-extrabold text-white">
                                      <span className="text-orange-400 font-black text-base mr-1.5">{it.quantity}×</span>
                                      {it.menuItem.name}
                                    </span>
                                  </div>

                                  {it.selectedOptions.length > 0 && (
                                    <div className="text-xs text-slate-400 mt-1 flex flex-wrap gap-1">
                                      {it.selectedOptions.map((opt, i) => (
                                        <span key={i} className="bg-slate-800/90 text-slate-300 px-1.5 py-0.5 rounded text-[11px]">
                                          + {opt.optionName}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  {it.specialInstructions && (
                                    <p className="text-xs text-amber-400 font-bold mt-1 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                                      ⚠️ {it.specialInstructions}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>

                            {order.generalNotes && (
                              <div className="text-xs bg-slate-900 text-amber-300 p-2 rounded-xl border border-amber-500/30">
                                Note: "{order.generalNotes}"
                              </div>
                            )}

                            {nextStatus && (
                              <button
                                onClick={() => tableBiteStore.updateOrderStatus(order.id, nextStatus)}
                                className={`w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:scale-102 active:scale-98 ${
                                  order.status === 'received' || order.status === 'confirmed'
                                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:opacity-95 text-white shadow-amber-600/30'
                                    : order.status === 'preparing'
                                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white shadow-emerald-600/30'
                                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                                }`}
                              >
                                <span>
                                  {order.status === 'received' || order.status === 'confirmed'
                                    ? 'Start Preparing'
                                    : order.status === 'preparing'
                                    ? 'Mark Food Ready'
                                    : 'Mark Served'}
                                </span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

