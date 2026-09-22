import React from 'react';
import { Smartphone, ChefHat, Grid, Home, RefreshCw } from 'lucide-react';
import { tableBiteStore, useTableBiteStore } from '../../store/tableBiteStore';

interface RoleBarProps {
  currentRole: 'landing' | 'customer' | 'kitchen' | 'admin';
  onNavigate: (role: 'landing' | 'customer' | 'kitchen' | 'admin') => void;
}

export const RoleBar: React.FC<RoleBarProps> = ({ currentRole, onNavigate }) => {
  const store = useTableBiteStore();

  return (
    <div className="bg-slate-950 text-white text-xs px-4 py-2 flex items-center justify-between border-b border-slate-800 shrink-0 z-50">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-1.5 font-black text-amber-400 hover:text-white transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>TABLEBITE</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 border-l border-slate-800 pl-4">
          <span className="text-slate-400 font-medium text-[11px]">Table Context:</span>
          <select
            value={store.currentTableNumber}
            onChange={(e) => tableBiteStore.setCurrentTable(e.target.value)}
            className="bg-slate-900 text-orange-400 border border-slate-700 px-2 py-0.5 rounded-lg text-xs font-bold focus:outline-none"
          >
            {store.tables.map((t) => (
              <option key={t.id} value={t.tableNumber}>
                Table {t.tableNumber}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-slate-500 font-bold uppercase text-[10px] mr-2 hidden md:inline">Demo Switcher:</span>

        <button
          onClick={() => onNavigate('landing')}
          className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
            currentRole === 'landing'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <span>Landing</span>
        </button>

        <button
          onClick={() => onNavigate('customer')}
          className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
            currentRole === 'customer'
              ? 'bg-orange-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Customer App</span>
        </button>

        <button
          onClick={() => onNavigate('kitchen')}
          className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
            currentRole === 'kitchen'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <ChefHat className="w-3.5 h-3.5" />
          <span>Kitchen Display</span>
        </button>

        <button
          onClick={() => onNavigate('admin')}
          className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
            currentRole === 'admin'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          <span>Admin</span>
        </button>

        <button
          onClick={() => tableBiteStore.resetDemoData()}
          className="ml-2 text-slate-500 hover:text-rose-400 p-1"
          title="Reset Demo Data"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
