import React from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_INFO } from '../data/storeInfo';
import { X, Phone, MessageCircle, Clock, ShieldCheck, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const InfoModal: React.FC = () => {
  const { infoModalType, setInfoModalType } = useShop();

  if (!infoModalType) return null;

  const closeModal = () => setInfoModalType(null);

  const renderContent = () => {
    switch (infoModalType) {
      case 'about':
        return (
          <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
            <h2 className="text-xl font-bold text-neutral-900 border-b pb-2">Hakkımızda - Özyeşil Kozmetik</h2>
            <p>
              <strong>Özyeşil Kozmetik</strong>, kozmetik ve kişisel bakım ürünlerinde bölgesinin ve e-ticaret dünyasının güvenilir markasıdır.
            </p>
            <p>
              Dünyaca ünlü dermokozmetik, lüks parfüm, profesyonel saç bakımı ve makyaj markalarının ürünlerini sizlere ulaştırıyoruz.
            </p>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-[#1B4D2E] space-y-1">
              <strong className="block text-sm">Misyonumuz:</strong>
              Her bütçeye uygun kozmetik ve cilt bakım ürünlerini hızlı, şeffaf ve güvenilir bir şekilde sunmak.
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4 text-sm text-neutral-700">
            <h2 className="text-xl font-bold text-neutral-900 border-b pb-2">İletişim & Destek</h2>
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#1B4D2E] shrink-0" />
                <div>
                  <strong className="block text-neutral-900 text-sm">Telefon İletişim:</strong>
                  <a href={`tel:${STORE_INFO.phoneRaw}`} className="text-[#1B4D2E] hover:underline font-bold">
                    {STORE_INFO.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-[#1B4D2E] shrink-0" />
                <div>
                  <strong className="block text-neutral-900 text-sm">WhatsApp Sipariş & Destek:</strong>
                  <a href={`https://wa.me/${STORE_INFO.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-[#1B4D2E] hover:underline font-bold">
                    {STORE_INFO.whatsappDisplay}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#1B4D2E] shrink-0" />
                <div>
                  <strong className="block text-neutral-900 text-sm">Çalışma Saatlerimiz:</strong>
                  <span>{STORE_INFO.workingHours}</span>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Temsilcimiz İle Görüş</span>
            </a>
          </div>
        );

      case 'kvkk':
        return (
          <div className="space-y-3 text-xs text-neutral-700 leading-relaxed">
            <h2 className="text-xl font-bold text-neutral-900 border-b pb-2">KVKK Aydınlatma Metni</h2>
            <p>
              Özyeşil Kozmetik olarak 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, müşterilerimizin özel hayatının gizliliğine saygı duyuyor ve kişisel verilerinizin güvenliğini sağlıyoruz.
            </p>
            <p>
              Sitemizde sipariş verme veya WhatsApp üzerinden iletişim kurma aşamasında paylaştığınız bilgiler yalnızca siparişinizin işlenmesi ve teslimatı için kullanılır. Verileriniz üçüncü taraflarla paylaşılmaz.
            </p>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-3 text-xs text-neutral-700 leading-relaxed">
            <h2 className="text-xl font-bold text-neutral-900 border-b pb-2">Gizlilik Politikası</h2>
            <p>
              Özyeşil Kozmetik, sitemizi ziyaret eden tüm kullanıcıların gizlilik haklarını korumayı taahhüt eder.
            </p>
            <p>
              Sitemiz çerezleri (cookies) sadece sepetinizdeki ürünleri ve favorilerinizi tarayıcınızda saklamak için kullanır. Herhangi bir hassas finansal veri saklanmaz.
            </p>
          </div>
        );

      case 'returns':
        return (
          <div className="space-y-3 text-xs text-neutral-700 leading-relaxed">
            <h2 className="text-xl font-bold text-neutral-900 border-b pb-2">İade ve Değişim Koşulları</h2>
            <p>
              Hijyen ve sağlık mevzuatı gereğince ambalajı, jelatini, emniyet bandı veya koruyucu kapağı açılmış, denenmiş veya kullanılmış kozmetik ürünlerinde iade kabul edilmemektedir.
            </p>
            <p>
              Ambalajı hasar görmemiş, koruyucu bandı açılmamış ürünleri teslim aldığınız tarihten itibaren 14 gün içerisinde iade/değişim için tarafımıza iletebilirsiniz.
            </p>
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-3 text-xs text-neutral-700 leading-relaxed">
            <h2 className="text-xl font-bold text-neutral-900 border-b pb-2">Kargo ve Teslimat Bilgileri</h2>
            <p>
              Siparişleriniz özel korumalı ambalajlar içerisinde 1-3 iş günü içerisinde kargoya teslim edilmektedir.
            </p>
            <p>
              Kargo süreçleri ve takip numaranız WhatsApp sipariş hattımız üzerinden anlık olarak paylaşılmaktadır.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="fixed inset-0" onClick={closeModal} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 p-6 space-y-4 my-auto border border-neutral-100"
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {renderContent()}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
