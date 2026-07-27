import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';
import { STORE_INFO } from '../data/storeInfo';
import { CategoryId } from '../types';
import {
  X,
  Phone,
  MessageCircle,
  FileText,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

export const MobileMenu: React.FC = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setCategory,
    setInfoModalType,
    filterState
  } = useShop();

  if (!isMobileMenuOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/50 backdrop-blur-xs"
        />

        <div className="absolute inset-y-0 left-0 max-w-full flex pr-10">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-xs bg-white shadow-2xl flex flex-col justify-between"
          >
            {/* HEADER */}
            <div className="px-5 py-4 bg-white border-b border-neutral-200 flex items-center justify-between">
              <Logo variant="compact" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-800 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* BODY */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* CATEGORIES SECTION */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  Kategoriler
                </h3>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setCategory(cat.id as CategoryId);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        filterState.category === cat.id
                          ? 'bg-emerald-50 text-[#1B4D2E] font-bold'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* QUICK LINKS SECTION */}
              <div className="pt-4 border-t border-neutral-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  Kurumsal & Bilgi
                </h3>
                <div className="space-y-2 text-xs font-medium text-neutral-700">
                  <button
                    onClick={() => {
                      setInfoModalType('about');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-1.5 hover:text-[#1B4D2E] flex items-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Hakkımızda</span>
                  </button>
                  <button
                    onClick={() => {
                      setInfoModalType('contact');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-1.5 hover:text-[#1B4D2E] flex items-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    <span>İletişim & Destek</span>
                  </button>
                  <button
                    onClick={() => {
                      setInfoModalType('kvkk');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-1.5 hover:text-[#1B4D2E] flex items-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                    <span>KVKK & Gizlilik</span>
                  </button>
                  <button
                    onClick={() => {
                      setInfoModalType('returns');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-1.5 hover:text-[#1B4D2E] flex items-center gap-2 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
                    <span>İade & Değişim Koşulları</span>
                  </button>
                </div>
              </div>
            </div>

            {/* FOOTER WHATSAPP ACTION */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-200">
              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp İle İletişim</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
