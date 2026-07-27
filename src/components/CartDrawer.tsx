import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { generateCartWhatsAppLink } from '../data/storeInfo';
import {
  X,
  Trash2,
  ShoppingBag,
  MessageCircle,
  Truck,
  ArrowRight,
  Plus,
  Minus,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotalCount,
    cartTotalPrice
  } = useShop();

  const [deliveryType, setDeliveryType] = useState<'shipping' | 'store_pickup'>('shipping');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [nameError, setNameError] = useState(false);

  if (!isCartOpen) return null;

  // Format cart items for WhatsApp
  const cartFormattedForWa = cart.map((item) => ({
    name: item.product.name,
    brand: item.product.brand,
    quantity: item.quantity,
    price: item.product.price,
    sku: item.product.sku
  }));

  const waLink = generateCartWhatsAppLink(cartFormattedForWa, cartTotalPrice, {
    fullName: customerName,
    phone: customerPhone,
    deliveryType,
    address,
    note
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/50 backdrop-blur-xs"
        />

        {/* Drawer Content */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
          >
            {/* DRAWER HEADER */}
            <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1B4D2E] text-white flex items-center justify-center font-bold">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-neutral-900">Alışveriş Sepetim</h2>
                  <p className="text-xs text-neutral-500">{cartTotalCount} Parça Ürün</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-rose-600 hover:text-rose-800 p-1.5 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 font-semibold cursor-pointer"
                    title="Sepeti Temizle"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Temizle</span>
                  </button>
                )}
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-200/60 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* DRAWER ITEMS LIST */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="my-auto py-16 text-center space-y-4">
                  <div className="w-20 h-20 bg-emerald-50 text-[#1B4D2E] rounded-full flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900">Sepetiniz Boş</h3>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                    Mağazamızdaki kişisel bakım ve kozmetik ürünleri arasından beğendiklerinizi hemen sepetinize ekleyin!
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 bg-[#1B4D2E] text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-[#143B22] transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Ürünleri İncele</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200/70 flex gap-3 items-center"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-xl border border-neutral-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-[#1B4D2E] uppercase tracking-wider block">
                            {item.product.brand}
                          </span>
                          <h4 className="text-xs font-semibold text-neutral-900 truncate">
                            {item.product.name}
                          </h4>
                          <div className="text-xs font-extrabold text-neutral-900 mt-1">
                            {item.product.price.toLocaleString('tr-TR')} TL
                          </div>

                          {/* QUANTITY CONTROLS */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-neutral-200 rounded-lg bg-white p-0.5">
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 hover:bg-neutral-100 text-neutral-600 rounded cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-bold text-neutral-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 hover:bg-neutral-100 text-neutral-600 rounded cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-neutral-400 hover:text-rose-600 p-1 cursor-pointer"
                              title="Çıkar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CUSTOMER INFO FOR WHATSAPP ORDER */}
                  <div className="pt-3 border-t border-neutral-200 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Teslimat & Müşteri Bilgileri
                    </h4>

                    {/* Delivery Option */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setDeliveryType('shipping')}
                        className={`p-2.5 rounded-xl border font-semibold flex items-center gap-2 justify-center transition-all cursor-pointer ${
                          deliveryType === 'shipping'
                            ? 'bg-emerald-50 border-[#1B4D2E] text-[#1B4D2E]'
                            : 'bg-neutral-50 border-neutral-200 text-neutral-600'
                        }`}
                      >
                        <Truck className="w-3.5 h-3.5" />
                        Adrese Kargo
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryType('store_pickup')}
                        className={`p-2.5 rounded-xl border font-semibold flex items-center gap-2 justify-center transition-all cursor-pointer ${
                          deliveryType === 'store_pickup'
                            ? 'bg-emerald-50 border-[#1B4D2E] text-[#1B4D2E]'
                            : 'bg-neutral-50 border-neutral-200 text-neutral-600'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Elden Teslim
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                        Adınız Soyadınız <span className="text-rose-600">* (Zorunlu)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Örn: Ahmet Yılmaz"
                        value={customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                          if (e.target.value.trim()) setNameError(false);
                        }}
                        className={`w-full bg-neutral-50 text-xs py-2 px-3 rounded-xl border outline-none ${
                          nameError
                            ? 'border-rose-500 bg-rose-50/50'
                            : 'border-neutral-200 focus:border-[#1B4D2E]'
                        }`}
                      />
                      {nameError && (
                        <p className="text-[11px] text-rose-600 font-medium mt-1">
                          Lütfen siparişi tamamlamadan önce adınızı ve soyadınızı giriniz.
                        </p>
                      )}
                    </div>

                    {deliveryType === 'shipping' && (
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                          Teslimat Adresiniz
                        </label>
                        <textarea
                          placeholder="İl, ilçe, mahalle ve açık adresiniz"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          rows={2}
                          className="w-full bg-neutral-50 text-xs py-2 px-3 rounded-xl border border-neutral-200 focus:border-[#1B4D2E] outline-none"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                        Sipariş Notu / Açıklama <span className="text-neutral-400 font-normal">(Opsiyonel)</span>
                      </label>
                      <textarea
                        placeholder="Varsa siparişinizle ilgili özel talimatlar veya notlar..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={2}
                        className="w-full bg-neutral-50 text-xs py-2 px-3 rounded-xl border border-neutral-200 focus:border-[#1B4D2E] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* DRAWER FOOTER */}
            {cart.length > 0 && (
              <div className="p-6 bg-neutral-50 border-t border-neutral-200 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-neutral-200/80">
                    <span className="text-neutral-900 font-bold">Toplam Tutar</span>
                    <span className="text-xl font-black text-neutral-900">
                      {cartTotalPrice.toLocaleString('tr-TR')} TL
                    </span>
                  </div>
                </div>

                {/* WHATSAPP ORDER ACTION BUTTON */}
                <a
                  href={customerName.trim() ? waLink : '#'}
                  target={customerName.trim() ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!customerName.trim()) {
                      e.preventDefault();
                      setNameError(true);
                    }
                  }}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>WhatsApp ile Siparişi Tamamla</span>
                </a>

                <p className="text-[11px] text-center text-neutral-500">
                  Siparişiniz doğrudan Özyeşil Kozmetik yetkilisine WhatsApp mesajı olarak iletilecektir.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
