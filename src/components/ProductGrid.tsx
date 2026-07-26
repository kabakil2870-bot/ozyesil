import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { PackageX, RefreshCw, ShoppingBag, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductGrid: React.FC = () => {
  const { products, filteredProducts, resetFilters, filterState } = useShop();

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto my-16 p-8 sm:p-10 bg-white rounded-3xl border border-neutral-200 text-center shadow-sm"
      >
        <div className="w-20 h-20 bg-emerald-50 text-[#1B4D2E] rounded-3xl flex items-center justify-center mx-auto mb-5 border border-emerald-100">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">
          Henüz Ürün Eklenmedi
        </h3>
        <p className="text-sm text-neutral-500 leading-relaxed mb-6">
          Özyeşil Kozmetik mağazamız yayına hazırdır. Yönetim paneli üzerinden eklenecek ürünler anında burada listelenecektir.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-[#1B4D2E] text-xs font-semibold rounded-full border border-emerald-100">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sistem Hazır ve Aktif</span>
        </div>
      </motion.div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto my-12 p-8 bg-white rounded-3xl border border-neutral-200 text-center shadow-sm"
      >
        <div className="w-16 h-16 bg-emerald-50 text-[#1B4D2E] rounded-full flex items-center justify-center mx-auto mb-4">
          <PackageX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-neutral-900 mb-2">
          Aradığınız kriterlere uygun ürün bulunamadı
        </h3>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
          Arama teriminizi değiştirmeyi veya filtreleri temizleyerek tüm mağaza stoklarımızı incelemeyi deneyebilirsiniz.
        </p>
        <button
          onClick={resetFilters}
          className="bg-[#1B4D2E] hover:bg-[#143B22] text-white font-semibold text-sm px-6 py-2.5 rounded-full shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" /> Tüm Ürünleri Göster
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Search Header Info Banner if searching */}
      {filterState.searchQuery && (
        <div className="mb-4 p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl text-xs sm:text-sm text-[#1B4D2E] flex items-center justify-between">
          <span>
            "<strong>{filterState.searchQuery}</strong>" araması için <strong>{filteredProducts.length}</strong> sonuç bulundu
          </span>
          <button
            onClick={resetFilters}
            className="text-xs font-semibold underline hover:text-emerald-900 cursor-pointer"
          >
            Aramayı Temizle
          </button>
        </div>
      )}

      {/* Grid: Mobile 2, Tablet 3, Desktop 4 */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
