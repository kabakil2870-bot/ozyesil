import React from 'react';
import { Heart, ShoppingBag, Check, Sparkles, Flame, Eye, Star } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    toggleFavorite,
    isFavorite,
    addToCart,
    openProductModal,
    cart
  } = useShop();

  const fav = isFavorite(product.id);
  const isInCart = cart.some(item => item.product.id === product.id);

  // Calculate discount percentage
  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-2xl border border-neutral-200/90 hover:border-[#1B4D2E]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative h-full"
    >
      {/* CARD TOP IMAGE CONTAINER */}
      <div
        className="relative aspect-square w-full bg-neutral-50 overflow-hidden cursor-pointer"
        onClick={() => openProductModal(product.id)}
      >
        <img
          src={product.image}
          alt={`${product.brand} - ${product.name}`}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* OVERLAY QUICK VIEW BUTTON */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 backdrop-blur-xs text-neutral-900 text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#1B4D2E]" /> İncele
          </span>
        </div>

        {/* BADGES CONTAINER */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
          {discountPercent > 0 && (
            <span className="bg-rose-600 text-white font-extrabold text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded shadow-2xs uppercase tracking-wider">
              %{discountPercent} İNDİRİM
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#1B4D2E] text-white font-bold text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded shadow-2xs uppercase tracking-wider flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" /> YENİ
            </span>
          )}
          {product.isBestseller && !product.isNew && (
            <span className="bg-amber-500 text-white font-bold text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded shadow-2xs uppercase tracking-wider flex items-center gap-0.5">
              <Flame className="w-2.5 h-2.5" /> ÇOK SATAN
            </span>
          )}
        </div>

        {/* FAVORITE BUTTON */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className={`absolute top-2 right-2 p-1.5 sm:p-2 rounded-full shadow-md backdrop-blur-md transition-all duration-200 z-20 ${
            fav
              ? 'bg-rose-500 text-white scale-105'
              : 'bg-white/90 text-neutral-400 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label="Favorilere ekle"
          title="Favorilerime Ekle"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${fav ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* CARD BODY CONTENT */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between gap-1.5">
        <div>
          {/* BRAND NAME */}
          <span className="text-[10px] sm:text-[11px] font-bold text-[#1B4D2E] uppercase tracking-wider block mb-0.5">
            {product.brand}
          </span>

          {/* PRODUCT TITLE */}
          <h3
            onClick={() => openProductModal(product.id)}
            className="text-xs sm:text-sm font-medium text-neutral-900 line-clamp-2 hover:text-[#1B4D2E] cursor-pointer transition-colors leading-snug min-h-[2rem] sm:min-h-[2.5rem]"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* RATING STARS */}
          <div className="flex items-center gap-1 mt-1 text-[11px] sm:text-xs text-neutral-500">
            <div className="flex items-center text-amber-400">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              <span className="ml-1 text-[11px] sm:text-xs font-bold text-neutral-800">{product.rating}</span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-neutral-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* PRICE & ADD TO CART ACTION */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-1 mt-auto">
          {/* PRICES */}
          <div className="min-w-0 flex-1">
            {product.oldPrice && (
              <span className="text-[10px] sm:text-xs text-neutral-400 line-through block leading-none mb-0.5">
                {product.oldPrice.toLocaleString('tr-TR')} TL
              </span>
            )}
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm sm:text-base md:text-lg font-extrabold text-neutral-900 truncate">
                {product.price.toLocaleString('tr-TR')}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-neutral-600">TL</span>
            </div>
          </div>

          {/* ADD TO CART BUTTON */}
          <button
            type="button"
            onClick={() => addToCart(product.id)}
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1 shrink-0 ${
              isInCart
                ? 'bg-emerald-100 text-[#1B4D2E] hover:bg-emerald-200'
                : 'bg-[#1B4D2E] hover:bg-[#143B22] text-white shadow-xs hover:shadow-md'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Eklendi</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Ekle</span>
                <span className="xs:hidden">Ekle</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
