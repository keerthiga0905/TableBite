import React, { useState } from 'react';
import { useTableBiteStore, tableBiteStore } from '../../store/tableBiteStore';
import type { Table, TableStatus } from '../../types';
import { QRCodeSVG } from 'qrcode.react';
import { Plus, Trash2, Printer, X, Eye } from 'lucide-react';

export const TableManagement: React.FC = () => {
  const store = useTableBiteStore();
  const [newTableNumber, setNewTableNumber] = useState('');
  const [selectedQRTable, setSelectedQRTable] = useState<Table | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const handleCreateTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableNumber) return;
    tableBiteStore.createTable(newTableNumber);
    setNewTableNumber('');
  };

  const getStatusColor = (status: TableStatus) => {
    switch (status) {
      case 'Available': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Occupied': return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Ordering': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Waiting': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Cleaning': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getQRScanUrl = (tableNum: string) => {
    return `${window.location.origin}/?table=${tableNum}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Table & QR Code Management</h2>
          <p className="text-slate-500 text-xs mt-0.5">Generate, manage, and print QR codes for all cafe tables</p>
        </div>

        <div className="flex items-center gap-3">
          <form onSubmit={handleCreateTable} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Table # (e.g. 13)"
              value={newTableNumber}
              onChange={(e) => setNewTableNumber(e.target.value)}
              className="w-32 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Table</span>
            </button>
          </form>

          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Print All QR Cards</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {store.tables.map((tbl) => {
          const scanUrl = getQRScanUrl(tbl.tableNumber);

          return (
            <div
              key={tbl.id}
              className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-900 font-black text-xl flex items-center justify-center border border-amber-200">
                    {tbl.tableNumber}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">Table {tbl.tableNumber}</h3>
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(tbl.status)}`}>
                      {tbl.status}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => tableBiteStore.deleteTable(tbl.id)}
                  className="text-slate-300 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Delete Table"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div
                onClick={() => setSelectedQRTable(tbl)}
                className="bg-amber-50/50 p-3 rounded-2xl border border-amber-100 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-amber-100/50 transition-colors group"
              >
                <div className="bg-white p-2 rounded-xl shadow-xs border border-slate-100 group-hover:scale-105 transition-transform">
                  <QRCodeSVG value={scanUrl} size={90} level="M" />
                </div>
                <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                  <Eye className="w-3 h-3 text-orange-500" /> Preview & Print QR
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {selectedQRTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">Table {selectedQRTable.tableNumber} QR Card</h3>
              <button
                onClick={() => setSelectedQRTable(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div id="printable-qr-card" className="bg-gradient-to-b from-amber-50 to-white p-6 rounded-3xl border-2 border-amber-200 shadow-md space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">TABLEBITE DIRECT</span>
                <h2 className="text-2xl font-black text-slate-900">TABLE {selectedQRTable.tableNumber}</h2>
                <p className="text-xs text-slate-500 font-medium">Scan with camera to order</p>
              </div>

              <div className="bg-white p-3 rounded-2xl shadow-inner border border-slate-200 inline-block">
                <QRCodeSVG value={getQRScanUrl(selectedQRTable.tableNumber)} size={160} level="H" />
              </div>

              <p className="text-[11px] text-amber-900 font-bold">Sit. Order. Enjoy.</p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-slate-900 text-white py-3 rounded-2xl font-bold text-xs shadow-md flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print QR Card</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-4xl bg-white rounded-3xl p-6 shadow-2xl space-y-6 my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Batch Printable QR Stand Cards</h3>
                <p className="text-slate-500 text-xs">Full sheet layout ready for printing table display stands</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
                >
                  <Printer className="w-4 h-4" /> Print Sheet
                </button>
                <button
                  onClick={() => setIsPrintModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2 bg-slate-50 rounded-2xl border border-slate-200">
              {store.tables.map((tbl) => (
                <div key={tbl.id} className="bg-white p-4 rounded-2xl border border-amber-200 text-center space-y-2 shadow-xs">
                  <span className="text-[9px] font-black uppercase text-orange-600 tracking-wider">TABLEBITE</span>
                  <h4 className="text-lg font-black text-slate-900">TABLE {tbl.tableNumber}</h4>
                  <div className="bg-amber-50 p-2 rounded-xl inline-block border border-amber-100">
                    <QRCodeSVG value={getQRScanUrl(tbl.tableNumber)} size={100} level="M" />
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">Scan camera to order</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
