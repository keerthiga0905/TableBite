import React, { useState } from 'react';
import { useTableBiteStore } from '../../store/tableBiteStore';
import { TableManagement } from './TableManagement';
import { MenuManagement } from './MenuManagement';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Grid,
  UtensilsCrossed,
  BarChart3
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const store = useTableBiteStore();
  const [activeTab, setActiveTab] = useState<'analytics' | 'tables' | 'menu'>('analytics');

  const totalRevenue = store.orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = store.orders.length;
  const activeTablesCount = store.tables.filter((t) => t.status === 'Occupied' || t.status === 'Ordering').length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

  const hourlyData = [
    { hour: '10 AM', revenue: 1200, orders: 4 },
    { hour: '11 AM', revenue: 2400, orders: 8 },
    { hour: '12 PM', revenue: 4800, orders: 15 },
    { hour: '1 PM', revenue: 6200, orders: 21 },
    { hour: '2 PM', revenue: 3900, orders: 12 },
    { hour: '3 PM', revenue: 2100, orders: 7 },
    { hour: '4 PM', revenue: 3100, orders: 10 },
    { hour: '5 PM', revenue: 5400, orders: 18 },
  ];

  const popularDishesData = [
    { name: 'Crispy Chicken Burger', sales: 42 },
    { name: 'Cold Coffee', sales: 38 },
    { name: 'Artisan Margherita Pizza', sales: 29 },
    { name: 'Peri-Peri Fries', sales: 27 },
    { name: 'Chocolate Brownie', sales: 21 },
  ];

  return (
    <div className="min-h-screen text-slate-900 pb-16 relative bg-slate-950">
      {/* Background Picture with Ambient Gradient Backdrop */}
      <div
        className="fixed inset-0 bg-cover bg-fixed bg-center bg-no-repeat pointer-events-none z-0 opacity-15 scale-105 transform animate-fade-in"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2000&q=80')` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/90 to-[#FAF7F2] pointer-events-none z-0" />

      <div className="relative z-10">
        <header className="bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 px-6 py-4 sticky top-0 z-30 shadow-md animate-fade-in">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center font-black text-xl text-white shadow-md animate-pulse-glow">
                TB
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-extrabold text-lg leading-none">{store.cafe.name}</h1>
                  <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                    Admin Panel
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-0.5 font-medium">SaaS Cafe Management & Realtime Analytics</p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-slate-950/90 p-1 rounded-2xl border border-slate-800">
              {[
                { id: 'analytics', label: 'Analytics & KPIs', icon: BarChart3 },
                { id: 'tables', label: 'Table & QR Codes', icon: Grid },
                { id: 'menu', label: 'Menu & Stock', icon: UtensilsCrossed },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSel = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 ${
                      isSel
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 pt-6">
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-slide-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-white/60 shadow-sm space-y-2 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <span>Today's Revenue</span>
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900">₹{totalRevenue.toLocaleString()}</div>
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +14.2% vs yesterday
                  </span>
                </div>

                <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-white/60 shadow-sm space-y-2 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <span>Total Orders</span>
                    <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900">{totalOrdersCount} orders</div>
                  <span className="text-[11px] font-bold text-slate-500">Live order processing</span>
                </div>

                <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-white/60 shadow-sm space-y-2 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <span>Active Table Sessions</span>
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                      <Grid className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900">{activeTablesCount} / {store.tables.length}</div>
                  <span className="text-[11px] font-bold text-amber-600">Occupancy rate: {Math.round((activeTablesCount / store.tables.length) * 100)}%</span>
                </div>

                <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-white/60 shadow-sm space-y-2 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <span>Avg Order Value</span>
                    <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900">₹{avgOrderValue}</div>
                  <span className="text-[11px] font-bold text-slate-500">Per table check</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">Hourly Sales & Velocity</h3>
                      <p className="text-slate-400 text-xs">Real-time revenue flow throughout operating hours</p>
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-full">
                      Today
                    </span>
                  </div>

                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={hourlyData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F27A35" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#F27A35" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="hour" stroke="#94A3B8" fontSize={11} tickLine={false} />
                        <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1F2421',
                            borderRadius: '12px',
                            color: '#fff',
                            fontSize: '12px',
                            border: 'none'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#F27A35"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorRevenue)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-sm space-y-4">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">Top Selling Dishes</h3>
                    <p className="text-slate-400 text-xs">Most ordered items by customer count</p>
                  </div>

                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={popularDishesData} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                        <XAxis type="number" stroke="#94A3B8" fontSize={11} />
                        <YAxis dataKey="name" type="category" stroke="#64748B" fontSize={10} width={90} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1F2421',
                            borderRadius: '12px',
                            color: '#fff',
                            fontSize: '12px',
                          }}
                        />
                        <Bar dataKey="sales" fill="#E05A47" radius={[0, 8, 8, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-sm space-y-4">
                <h3 className="font-extrabold text-slate-900 text-base">Recent Table Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50/80 text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Table</th>
                        <th className="p-3">Items Summary</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Total</th>
                        <th className="p-3 text-right">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                      {store.orders.slice(0, 5).map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 font-mono font-bold text-slate-900">#{ord.id}</td>
                          <td className="p-3">
                            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                              Table {ord.tableNumber}
                            </span>
                          </td>
                          <td className="p-3 text-slate-600 truncate max-w-xs">
                            {ord.items.map((i) => `${i.quantity}× ${i.menuItem.name}`).join(', ')}
                          </td>
                          <td className="p-3">
                            <span className="capitalize text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full font-bold">
                              {ord.status}
                            </span>
                          </td>
                          <td className="p-3 font-extrabold text-slate-900">₹{ord.total}</td>
                          <td className="p-3 text-right text-slate-400">
                            {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tables' && <div className="animate-fade-in"><TableManagement /></div>}
          {activeTab === 'menu' && <div className="animate-fade-in"><MenuManagement /></div>}
        </main>
      </div>
    </div>
  );
};

