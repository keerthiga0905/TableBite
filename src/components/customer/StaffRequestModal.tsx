import React, { useState } from 'react';
import type { StaffRequestType } from '../../types';
import { GlassWater, Utensils, Newspaper, UserCheck, Receipt, CheckCircle, X } from 'lucide-react';

interface StaffRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: string;
  onRequestStaff: (type: StaffRequestType) => void;
}

export const StaffRequestModal: React.FC<StaffRequestModalProps> = ({
  isOpen,
  onClose,
  tableNumber,
  onRequestStaff,
}) => {
  if (!isOpen) return null;

  const [submittedType, setSubmittedType] = useState<StaffRequestType | null>(null);

  const options: { type: StaffRequestType; title: string; desc: string; icon: any; color: string }[] = [
    { type: 'water', title: 'Request Water', desc: 'Fresh drinking water for table', icon: GlassWater, color: 'text-blue-500 bg-blue-50' },
    { type: 'spoon', title: 'Extra Cutlery', desc: 'Spoon, fork, or butter knife', icon: Utensils, color: 'text-amber-500 bg-amber-50' },
    { type: 'napkins', title: 'Extra Napkins', desc: 'Tissue box & wet wipes', icon: Newspaper, color: 'text-emerald-500 bg-emerald-50' },
    { type: 'staff', title: 'Request Staff', desc: 'Ask waiter to come to table', icon: UserCheck, color: 'text-purple-500 bg-purple-50' },
    { type: 'bill', title: 'Request Printed Bill', desc: 'Bring total paper receipt', icon: Receipt, color: 'text-rose-500 bg-rose-50' },
  ];

  const handleSelect = (type: StaffRequestType) => {
    onRequestStaff(type);
    setSubmittedType(type);
    setTimeout(() => {
      setSubmittedType(null);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-4 animate-scaleUp">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Need Staff Assistance?</h3>
            <p className="text-slate-400 text-xs font-medium">Table {tableNumber} • Quick Request</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submittedType ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Request Sent to Staff!</h4>
            <p className="text-slate-500 text-xs">
              Staff dashboard alerted for Table {tableNumber}. A team member will attend to you shortly.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {options.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => handleSelect(opt.type)}
                  className="w-full p-3 rounded-2xl border border-slate-100 hover:border-orange-200 bg-white hover:bg-orange-50/50 flex items-center gap-3 text-left transition-all group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${opt.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 text-xs group-hover:text-orange-600 transition-colors">
                      {opt.title}
                    </h4>
                    <p className="text-[11px] text-slate-400">{opt.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
