import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FavoritesDrawer: React.FC = () => {
  const {
    favorites,
    isFavoritesOpen,
    setIsFavoritesOpen,
    products,
    toggleFavorite,
    addToCart,
    openProductModal
  } = useShop();

  if (!isFavoritesOpen) return null;

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsFavoritesOpen(false)}
          className="absolute inset-0 bg-black/50 backdrop-blur-xs"
        />

        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
          >
            {/* HEADER */}
            <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-neutral-900">Favori Ürünlerim</h2>
                  <p className="text-xs text-neutral-500">{favoriteProducts.length} Kayıtlı Ürün</p>
                </div>
              </div>

              <button
                onClick={() => setIsFavoritesOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* LIST */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {favoriteProducts.length === 0 ? (
                <div className="my-auto py-16 text-center space-y-4">
                  <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">Henüz Favori Ürününüz Yok</h3>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                    Beğendiğiniz ürünlerin üzerindeki kalp simgesine dokunarak favori listenize ekleyebilirsiniz.
                  </p>
                  <button
                    onClick={() => setIsFavoritesOpen(false)}
                    className="mt-2 bg-[#2E7D32] text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-emerald-800 transition-colors inline-flex items-center gap-2"
                  >
                    <span>Ürünleri Keşfet</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {favoriteProducts.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200/70 flex gap-3 items-center group"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        onClick={() => {
                          setIsFavoritesOpen(false);
                          openProductModal(product.id);
                        }}
                        className="w-16 h-16 object-cover rounded-xl border border-neutral-200 shrink-0 cursor-pointer group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-[#2E7D32] uppercase tracking-wider block">
                          {product.brand}
                        </span>
                        <h4
                          onClick={() => {
                            setIsFavoritesOpen(false);
                            openProductModal(product.id);
                          }}
                          className="text-xs font-semibold text-neutral-900 truncate cursor-pointer hover:text-[#2E7D32]"
                        >
                          {product.name}
                        </h4>
                        <div className="text-xs font-extrabold text-neutral-900 mt-0.5">
                          {product.price.toLocaleString('tr-TR')} TL
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => addToCart(product.id)}
                            className="bg-[#2E7D32] hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Sepete Ekle</span>
                          </button>
                          <button
                            onClick={() => toggleFavorite(product.id)}
                            className="text-neutral-400 hover:text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Favorilerden Çıkar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FOOTER ACTION */}
            {favoriteProducts.length > 0 && (
              <div className="p-6 bg-neutral-50 border-t border-neutral-200">
                <button
                  onClick={() => {
                    favoriteProducts.forEach((p) => addToCart(p.id));
                    setIsFavoritesOpen(false);
                  }}
                  className="w-full py-3.5 bg-[#2E7D32] hover:bg-emerald-800 text-white font-bold text-sm rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Tümünü Sepete Ekle</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
