import React from 'react';
import type { MenuItem } from '../../types';
import { Clock, Star, Plus, Flame, Check } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  cartQuantity: number;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onSelect, cartQuantity }) => {
  return (
    <div
      onClick={() => item.isAvailable && onSelect(item)}
      className={`group relative bg-white rounded-3xl p-3 sm:p-4 border transition-all duration-300 ${
        item.isAvailable
          ? 'border-amber-100 hover:border-orange-300 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer'
          : 'border-gray-200 opacity-60 cursor-not-allowed'
      }`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-amber-50/50 mb-3">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute top-2.5 left-2.5 z-10 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full shadow-sm flex items-center gap-1 border border-white/60">
          <span
            className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
              item.isVeg ? 'border-green-600' : 'border-red-600'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></span>
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-700">
            {item.isVeg ? 'Veg' : 'Non-Veg'}
          </span>
        </div>

        {item.isPopular && (
          <div className="absolute top-2.5 right-2.5 z-10 bg-amber-500 text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-md flex items-center gap-1">
            <Flame className="w-3 h-3 fill-current" />
            <span>Chef's Choice</span>
          </div>
        )}

        {!item.isAvailable && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center p-2 text-center">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between gap-1 mb-1">
          <h3 className="font-bold text-slate-800 text-base group-hover:text-orange-600 transition-colors line-clamp-1">
            {item.name}
          </h3>
          <div className="flex items-center gap-0.5 text-xs text-amber-600 font-semibold bg-amber-50 px-1.5 py-0.5 rounded-md shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.8</span>
          </div>
        </div>

        <p className="text-slate-500 text-xs line-clamp-2 mb-3 min-h-[32px] leading-relaxed">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
          <div>
            <span className="text-xs text-slate-400 font-medium">Price</span>
            <div className="text-slate-900 font-extrabold text-lg">₹{item.price}</div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium bg-slate-100 px-2 py-1 rounded-lg">
              <Clock className="w-3 h-3 text-slate-400" />
              {item.prepTimeMinutes}m
            </span>

            <button
              disabled={!item.isAvailable}
              onClick={(e) => {
                e.stopPropagation();
                if (item.isAvailable) onSelect(item);
              }}
              className={`relative flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                cartQuantity > 0
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200'
                  : 'bg-orange-600 text-white hover:bg-orange-700 shadow-orange-200 hover:scale-105'
              }`}
            >
              {cartQuantity > 0 ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{cartQuantity} in Cart</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
