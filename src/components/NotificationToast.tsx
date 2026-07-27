import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Heart, ShoppingBag, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NotificationToast: React.FC = () => {
  const { toast } = useShop();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'cart':
        return <ShoppingBag className="w-4 h-4 text-[#2E7D32]" />;
      case 'favorite':
        return <Heart className="w-4 h-4 text-rose-500 fill-current" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-neutral-800 flex items-center gap-3 text-xs font-semibold max-w-sm"
      >
        <div className="p-1.5 bg-neutral-800 rounded-xl">
          {getIcon()}
        </div>
        <span className="leading-snug">{toast.text}</span>
      </motion.div>
    </AnimatePresence>
  );
};
