import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { generateSingleProductWhatsAppLink } from '../data/storeInfo';
import {
  X,
  Heart,
  ShoppingBag,
  Check,
  MessageCircle,
  ShieldCheck,
  Truck,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { ProductCard } from './ProductCard';
import { motion, AnimatePresence } from 'motion/react';

export const ProductDetailModal: React.FC = () => {
  const {
    activeProduct,
    closeProductModal,
    addToCart,
    toggleFavorite,
    isFavorite,
    cart,
    products,
    recentlyViewed
  } = useShop();

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'usage' | 'ingredients'>('desc');

  useEffect(() => {
    if (activeProduct) {
      setSelectedImage(activeProduct.image);
      setQuantity(1);
      setActiveTab('desc');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeProduct]);

  if (!activeProduct) return null;

  const fav = isFavorite(activeProduct.id);
  const isInCart = cart.some(item => item.product.id === activeProduct.id);

  const imagesList = [activeProduct.image, ...(activeProduct.additionalImages || [])];

  const discountPercent = activeProduct.oldPrice
    ? Math.round(((activeProduct.oldPrice - activeProduct.price) / activeProduct.oldPrice) * 100)
    : 0;

  // WhatsApp Order Link
  const waLink = generateSingleProductWhatsAppLink(
    activeProduct.name,
    activeProduct.brand,
    activeProduct.price,
    activeProduct.sku
  );

  // Similar Products (Same Category)
  const similarProducts = products
    .filter(p => p.category === activeProduct.category && p.id !== activeProduct.id)
    .slice(0, 4);

  // Same Brand Products
  const sameBrandProducts = products
    .filter(p => p.brand === activeProduct.brand && p.id !== activeProduct.id)
    .slice(0, 4);

  // Recently Viewed Products
  const recentlyViewedProducts = products
    .filter(p => recentlyViewed.includes(p.id) && p.id !== activeProduct.id)
    .slice(0, 4);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6">
        {/* Backdrop Click */}
        <div className="fixed inset-0" onClick={closeProductModal} />

        {/* Modal Main Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col border border-neutral-100"
        >
          {/* MODAL HEADER BAR */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/80 sticky top-0 z-20">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
              <span className="text-[#1B4D2E] font-bold">{activeProduct.brand}</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
              <span className="truncate max-w-[200px] sm:max-w-md">{activeProduct.name}</span>
            </div>
            <button
              onClick={closeProductModal}
              className="p-2 text-neutral-400 hover:text-neutral-900 bg-white hover:bg-neutral-100 rounded-full border border-neutral-200 transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MODAL SCROLLABLE BODY */}
          <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-8 divide-y divide-neutral-100">
            {/* PRODUCT TOP SECTION: GALLERY + DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
              {/* LEFT: IMAGE GALLERY */}
              <div className="space-y-4">
                <div className="relative aspect-square w-full bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200/80 group">
                  <img
                    src={selectedImage || activeProduct.image}
                    alt={activeProduct.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {discountPercent > 0 && (
                    <span className="absolute top-3 left-3 bg-rose-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-md uppercase tracking-wider">
                      %{discountPercent} İNDİRİM
                    </span>
                  )}
                </div>

                {/* Thumbnails */}
                {imagesList.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {imagesList.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`w-16 h-16 rounded-xl border-2 overflow-hidden shrink-0 transition-all ${
                          selectedImage === img
                            ? 'border-[#1B4D2E] ring-2 ring-[#1B4D2E]/20 scale-105'
                            : 'border-neutral-200 hover:border-neutral-300 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Authenticity Guarantee Badge */}
                <div className="p-3.5 bg-emerald-50/80 border border-emerald-100 rounded-2xl flex items-center gap-3 text-xs text-[#1B4D2E]">
                  <ShieldCheck className="w-5 h-5 shrink-0 text-[#1B4D2E]" />
                  <div>
                    <strong className="block font-bold">Güvenli Alışveriş & Hızlı Kargo</strong>
                    <span>En uygun fiyatlar ve hızlı kargo seçeneği ile kapınızda.</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: DETAILS & ACTIONS */}
              <div className="flex flex-col justify-between space-y-5">
                <div>
                  {/* Brand & Stock status */}
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#1B4D2E] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                      {activeProduct.brand}
                    </span>
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Stokta Var
                    </span>
                  </div>

                  {/* Product Title */}
                  <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-tight mt-2">
                    {activeProduct.name}
                  </h1>

                  {/* SKU & Code */}
                  <p className="text-xs text-neutral-400 mt-1">
                    Ürün Kodu: <strong className="text-neutral-600">{activeProduct.sku}</strong>
                  </p>

                  {/* PRICE BLOCK */}
                  <div className="my-4 p-4 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-neutral-400 block font-medium">Satış Fiyatı</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-neutral-900">
                          {activeProduct.price.toLocaleString('tr-TR')} TL
                        </span>
                        {activeProduct.oldPrice && (
                          <span className="text-sm text-neutral-400 line-through font-semibold">
                            {activeProduct.oldPrice.toLocaleString('tr-TR')} TL
                          </span>
                        )}
                      </div>
                    </div>
                    {discountPercent > 0 && (
                      <div className="bg-rose-50 text-rose-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-rose-200">
                        {activeProduct.oldPrice! - activeProduct.price} TL Kazanç
                      </div>
                    )}
                  </div>

                  {/* QUICK SPECS CHIPS */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    {activeProduct.skinType && (
                      <div className="p-2.5 bg-neutral-100/60 rounded-xl">
                        <span className="text-neutral-400 block font-medium">Cilt Tipi:</span>
                        <strong className="text-neutral-800">{activeProduct.skinType}</strong>
                      </div>
                    )}
                    {activeProduct.volume && (
                      <div className="p-2.5 bg-neutral-100/60 rounded-xl">
                        <span className="text-neutral-400 block font-medium">Miktar / Hacim:</span>
                        <strong className="text-neutral-800">{activeProduct.volume}</strong>
                      </div>
                    )}
                  </div>

                  {/* QUANTITY & SEPETE EKLE */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-neutral-200 rounded-2xl bg-neutral-50 p-1">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-8 h-8 rounded-xl bg-white hover:bg-neutral-100 font-bold text-neutral-700 flex items-center justify-center border border-neutral-200 shadow-2xs"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-bold text-sm text-neutral-900">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-8 h-8 rounded-xl bg-white hover:bg-neutral-100 font-bold text-neutral-700 flex items-center justify-center border border-neutral-200 shadow-2xs"
                        >
                          +
                        </button>
                      </div>

                      {/* Add to Cart */}
                      <button
                        onClick={() => addToCart(activeProduct.id, quantity)}
                        className={`flex-1 py-3 px-6 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer ${
                          isInCart
                            ? 'bg-emerald-100 text-[#1B4D2E] border border-emerald-300'
                            : 'bg-[#1B4D2E] hover:bg-[#143B22] text-white'
                        }`}
                      >
                        {isInCart ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                        {isInCart ? 'Sepete Eklendi' : 'Sepete Ekle'}
                      </button>

                      {/* Favorite Toggle */}
                      <button
                        onClick={() => toggleFavorite(activeProduct.id)}
                        className={`p-3 rounded-2xl border transition-colors cursor-pointer ${
                          fav
                            ? 'bg-rose-50 border-rose-300 text-rose-600'
                            : 'bg-white border-neutral-200 text-neutral-400 hover:text-rose-500'
                        }`}
                        aria-label="Favori"
                      >
                        <Heart className={`w-5 h-5 ${fav ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* WHATSAPP SİPARİŞ VER BUTTON */}
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5 group"
                    >
                      <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>WhatsApp İle Hızlı Sipariş Ver</span>
                    </a>
                  </div>
                </div>

                {/* TRUST BADGES */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-neutral-100 text-[11px] text-neutral-600">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#1B4D2E]" />
                    <span>Müşteri Memnuniyeti</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#1B4D2E]" />
                    <span>Hızlı Kargo Gönderimi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* DESCRIPTION & USAGE TABS */}
            <div className="pt-8">
              <div className="flex border-b border-neutral-200 space-x-6 text-sm font-bold">
                <button
                  onClick={() => setActiveTab('desc')}
                  className={`pb-3 transition-colors relative cursor-pointer ${
                    activeTab === 'desc'
                      ? 'text-[#1B4D2E] border-b-2 border-[#1B4D2E]'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  Ürün Açıklaması
                </button>
                {activeProduct.usage && (
                  <button
                    onClick={() => setActiveTab('usage')}
                    className={`pb-3 transition-colors relative cursor-pointer ${
                      activeTab === 'usage'
                        ? 'text-[#1B4D2E] border-b-2 border-[#1B4D2E]'
                        : 'text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    Kullanım Şekli
                  </button>
                )}
                {activeProduct.ingredients && activeProduct.ingredients.length > 0 && (
                  <button
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-3 transition-colors relative cursor-pointer ${
                      activeTab === 'ingredients'
                        ? 'text-[#1B4D2E] border-b-2 border-[#1B4D2E]'
                        : 'text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    İçerik Bilgisi
                  </button>
                )}
              </div>

              <div className="py-4 text-sm text-neutral-700 leading-relaxed">
                {activeTab === 'desc' && <p>{activeProduct.description}</p>}
                {activeTab === 'usage' && <p>{activeProduct.usage}</p>}
                {activeTab === 'ingredients' && (
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.ingredients?.map((ing, idx) => (
                      <span
                        key={idx}
                        className="bg-neutral-100 text-neutral-800 px-3 py-1 rounded-lg text-xs font-medium border border-neutral-200"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* BENZER ÜRÜNLER SECTION */}
            {similarProducts.length > 0 && (
              <div className="pt-8">
                <h3 className="text-base font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1B4D2E]" /> Benzer Ürünler
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {similarProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}

            {/* AYNI MARKA ÜRÜNLERİ */}
            {sameBrandProducts.length > 0 && (
              <div className="pt-8">
                <h3 className="text-base font-bold text-neutral-900 mb-4">
                  {activeProduct.brand} Markasına Ait Diğer Ürünler
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {sameBrandProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}

            {/* SON GÖRÜNTÜLENEN ÜRÜNLER */}
            {recentlyViewedProducts.length > 0 && (
              <div className="pt-8">
                <h3 className="text-base font-bold text-neutral-900 mb-4 text-neutral-500">
                  Son Görüntülediğiniz Ürünler
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recentlyViewedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
