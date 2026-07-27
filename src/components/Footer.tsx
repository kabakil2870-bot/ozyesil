import React from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_INFO } from '../data/storeInfo';
import { MessageCircle, Instagram, Phone } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const { setInfoModalType, setCategory } = useShop();

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-10 pb-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* TOP MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {/* COL 1: BRAND LOGO & SOCIAL */}
          <div className="space-y-4">
            <div className="flex flex-col items-start">
              <Logo variant="light" showTagline={true} />
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Özyeşil Kozmetik, cilt bakımı, makyaj, parfüm, saç bakımı ve anne-bebek ürünlerinde güvenilir e-ticaret vitrininizdir.
            </p>

            <div className="pt-1 flex items-center gap-2.5">
              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl transition-colors"
                title="WhatsApp Destek"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 p-2 rounded-xl transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`tel:${STORE_INFO.phoneRaw}`}
                className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 p-2 rounded-xl transition-colors"
                title="Telefon et"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COL 2: KATEGORİLER */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Kategoriler
            </h3>
            <ul className="space-y-2 text-xs font-medium text-neutral-400">
              <li>
                <button onClick={() => setCategory('cilt-bakimi')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Cilt Bakımı
                </button>
              </li>
              <li>
                <button onClick={() => setCategory('makyaj')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Makyaj & Kozmetik
                </button>
              </li>
              <li>
                <button onClick={() => setCategory('parfum')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Parfüm & Deodorant
                </button>
              </li>
              <li>
                <button onClick={() => setCategory('sampuan')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Şampuan & Saç Bakımı
                </button>
              </li>
              <li>
                <button onClick={() => setCategory('erkek-bakim')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Erkek Bakım
                </button>
              </li>
              <li>
                <button onClick={() => setCategory('anne-bebek')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Anne & Bebek
                </button>
              </li>
            </ul>
          </div>

          {/* COL 3: MÜŞTERİ HİZMETLERİ */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Müşteri Hizmetleri
            </h3>
            <ul className="space-y-2 text-xs font-medium text-neutral-400">
              <li>
                <button onClick={() => setInfoModalType('about')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Hakkımızda
                </button>
              </li>
              <li>
                <button onClick={() => setInfoModalType('contact')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  İletişim & Destek
                </button>
              </li>
              <li>
                <button onClick={() => setInfoModalType('returns')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  İade ve Değişim Koşulları
                </button>
              </li>
              <li>
                <button onClick={() => setInfoModalType('shipping')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Kargo ve Teslimat Bilgileri
                </button>
              </li>
            </ul>
          </div>

          {/* COL 4: GİZLİLİK & YASAL */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Yasal & Güvenlik
            </h3>
            <ul className="space-y-2 text-xs font-medium text-neutral-400">
              <li>
                <button onClick={() => setInfoModalType('kvkk')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  KVKK Aydınlatma Metni
                </button>
              </li>
              <li>
                <button onClick={() => setInfoModalType('privacy')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Gizlilik Politikası
                </button>
              </li>
              <li className="pt-2 text-neutral-500 text-[11px] leading-relaxed">
                Hızlı ve güvenli kargo gönderimi.
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
          <span>© {new Date().getFullYear()} Özyeşil Kozmetik. Tüm hakları saklıdır.</span>
          <span className="text-[10px] text-neutral-600">
            Güvenli E-Ticaret Alışverişi
          </span>
        </div>
      </div>
    </footer>
  );
};
