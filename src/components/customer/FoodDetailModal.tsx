import React, { useState } from 'react';
import type { MenuItem, SelectedOption } from '../../types';
import { X, Plus, Minus, Clock, ShoppingBag, Utensils } from 'lucide-react';

interface FoodDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (
    menuItem: MenuItem,
    quantity: number,
    selectedOptions: SelectedOption[],
    specialInstructions: string
  ) => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, SelectedOption>>({});
  const [specialInstructions, setSpecialInstructions] = useState('');

  React.useEffect(() => {
    if (item.customizationGroups) {
      const initialOptions: Record<string, SelectedOption> = {};
      item.customizationGroups.forEach((group) => {
        if (group.type === 'single' && group.options.length > 0) {
          initialOptions[group.id] = {
            groupName: group.name,
            optionName: group.options[0].name,
            price: group.options[0].price,
          };
        }
      });
      setSelectedOptions(initialOptions);
    }
  }, [item]);

  const handleOptionToggle = (groupId: string, groupName: string, optionName: string, price: number, isSingle: boolean) => {
    const key = isSingle ? groupId : `${groupId}-${optionName}`;

    setSelectedOptions((prev) => {
      const next = { ...prev };
      if (isSingle) {
        next[groupId] = { groupName, optionName, price };
      } else {
        if (next[key]) {
          delete next[key];
        } else {
          next[key] = { groupName, optionName, price };
        }
      }
      return next;
    });
  };

  const totalPrice = (item.price + optionsCost(selectedOptions)) * quantity;

  function optionsCost(opts: Record<string, SelectedOption>): number {
    return Object.values(opts).reduce((sum, o) => sum + o.price, 0);
  }

  const handleSubmit = () => {
    const optionsArray = Object.values(selectedOptions);
    onAddToCart(item, quantity, optionsArray, specialInstructions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-sm p-0 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh]">
        <div className="relative h-56 sm:h-64 w-full bg-slate-100 shrink-0">
          <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 text-white flex items-center justify-center hover:bg-slate-900 backdrop-blur-md transition-all shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
            <span className="bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-white/20">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Est. {item.prepTimeMinutes} mins prep
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
              } text-white shadow-sm`}
            >
              {item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            </span>
          </div>
        </div>

        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">{item.name}</h2>
            <p className="text-slate-600 text-sm mt-1 leading-relaxed">{item.description}</p>
          </div>

          {item.customizationGroups && item.customizationGroups.length > 0 && (
            <div className="space-y-5 border-t border-slate-100 pt-4">
              {item.customizationGroups.map((group) => (
                <div key={group.id} className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">{group.name}</span>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {group.type === 'single' ? 'Choose 1' : 'Optional'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {group.options.map((option) => {
                      const isSingle = group.type === 'single';
                      const key = isSingle ? group.id : `${group.id}-${option.name}`;
                      const isSelected = isSingle
                        ? selectedOptions[group.id]?.optionName === option.name
                        : !!selectedOptions[key];

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() =>
                            handleOptionToggle(group.id, group.name, option.name, option.price, isSingle)
                          }
                          className={`flex items-center justify-between p-3 rounded-2xl border text-sm transition-all ${
                            isSelected
                              ? 'border-orange-500 bg-orange-50/60 text-orange-950 font-medium shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-${
                                isSingle ? 'full' : 'md'
                              } border flex items-center justify-center ${
                                isSelected
                                  ? 'border-orange-600 bg-orange-600 text-white'
                                  : 'border-slate-300 bg-slate-50'
                              }`}
                            >
                              {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
                            </div>
                            <span>{option.name}</span>
                          </div>
                          <span className="text-xs font-bold text-slate-600">
                            {option.price > 0 ? `+₹${option.price}` : 'Free'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-slate-100 pt-4 space-y-2">
            <label className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Utensils className="w-4 h-4 text-orange-500" />
              <span>Preferences & Special Requests</span>
            </label>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Less Spicy', 'No Onion', 'Extra Crispy', 'Less Ice', 'Separate Dressing'].map((pref) => (
                <button
                  key={pref}
                  type="button"
                  onClick={() => {
                    if (!specialInstructions.includes(pref)) {
                      setSpecialInstructions((prev) => (prev ? `${prev}, ${pref}` : pref));
                    }
                  }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-slate-200 text-slate-600 hover:border-orange-300 hover:bg-orange-50 transition-colors"
                >
                  + {pref}
                </button>
              ))}
            </div>
            <textarea
              rows={2}
              placeholder="e.g. Please make it extra hot with less sauce..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full text-xs p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-slate-800 mt-2"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-extrabold text-slate-900 text-base">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white py-3.5 px-5 rounded-2xl font-bold text-sm shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </div>
            <span className="bg-white/20 px-2.5 py-1 rounded-xl text-xs font-extrabold">₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
