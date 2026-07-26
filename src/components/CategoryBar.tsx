import React, { useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';
import { CategoryId, SortOption } from '../types';
import { ArrowUpDown, X, Tag, Sparkles } from 'lucide-react';

export const CategoryBar: React.FC = () => {
  const {
    products,
    filterState,
    setCategory,
    setBrandFilter,
    setSortBy,
    toggleDiscountedFilter,
    toggleNewFilter,
    resetFilters
  } = useShop();

  const brands = useMemo(() => {
    return Array.from(new Set(products.map(p => p.brand).filter(Boolean))).sort();
  }, [products]);

  const isFilterActive =
    filterState.category !== 'all' ||
    filterState.brand !== null ||
    filterState.onlyDiscounted ||
    filterState.onlyNew ||
    filterState.searchQuery !== '';

  return (
    <div className="bg-white border-b border-neutral-200/80 sticky top-[52px] sm:top-[64px] z-30 shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Row 1: Primary Category Pills (Horizontal Scrollable, Single Line) */}
        <div className="flex items-center overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-2 gap-2 border-b border-neutral-100/80 scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isActive = filterState.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id as CategoryId)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#1B4D2E] text-white shadow-xs'
                    : 'bg-neutral-100/90 hover:bg-neutral-200/80 text-neutral-700 hover:text-neutral-900'
                }`}
              >
                {cat.id === 'all' && <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" />}
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Row 2: Sub-Filters & Sorting (Strictly 1 Single Row, Horizontal Scrollable on Mobile) */}
        <div className="py-2 flex items-center justify-between gap-2 text-xs overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-2 shrink-0">
            {/* Marka Seçimi Dropdown */}
            <select
              value={filterState.brand || ''}
              onChange={(e) => setBrandFilter(e.target.value === '' ? null : e.target.value)}
              className="bg-neutral-50 hover:bg-neutral-100 text-neutral-800 font-bold py-1 px-2.5 rounded-lg border border-neutral-200/90 cursor-pointer focus:outline-none focus:border-[#1B4D2E] text-xs shrink-0"
            >
              <option value="">Tüm Markalar ({brands.length})</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            {/* İndirimdekiler Chip */}
            <button
              onClick={toggleDiscountedFilter}
              className={`px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1 transition-colors cursor-pointer text-xs shrink-0 ${
                filterState.onlyDiscounted
                  ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold'
                  : 'bg-neutral-50 border-neutral-200/90 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Tag className="w-3 h-3 text-rose-500" />
              İndirimdekiler
            </button>

            {/* Yeni Gelenler Chip */}
            <button
              onClick={toggleNewFilter}
              className={`px-2.5 py-1 rounded-lg border font-semibold transition-colors cursor-pointer text-xs shrink-0 ${
                filterState.onlyNew
                  ? 'bg-emerald-50 border-emerald-300 text-[#1B4D2E] font-bold'
                  : 'bg-neutral-50 border-neutral-200/90 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              Yeni Gelenler
            </button>

            {/* Clear All Filters Button */}
            {isFilterActive && (
              <button
                onClick={resetFilters}
                className="px-2 py-1 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 font-bold cursor-pointer text-xs shrink-0"
              >
                <X className="w-3 h-3" />
                Sıfırla
              </button>
            )}
          </div>

          {/* Right Side: Sorting Dropdown */}
          <div className="flex items-center gap-1.5 shrink-0 ml-auto pl-2 border-l border-neutral-200">
            <ArrowUpDown className="w-3 h-3 text-neutral-400 shrink-0" />
            <select
              value={filterState.sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-neutral-50 hover:bg-neutral-100 text-neutral-800 font-bold py-1 px-2 rounded-lg border border-neutral-200/90 cursor-pointer focus:outline-none focus:border-[#1B4D2E] text-xs shrink-0"
            >
              <option value="featured">Sırala: Çok Satanlar</option>
              <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
              <option value="discount">En Yüksek İndirim</option>
              <option value="newest">En Yeniler</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
