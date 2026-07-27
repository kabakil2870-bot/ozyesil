import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { Header } from './components/Header';
import { CategoryBar } from './components/CategoryBar';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { MobileMenu } from './components/MobileMenu';
import { InfoModal } from './components/InfoModal';
import { NotificationToast } from './components/NotificationToast';
import { SeoHead } from './components/SeoHead';

export default function App() {
  return (
    <ShopProvider>
      <SeoHead />
      <div className="min-h-screen bg-neutral-100/50 text-neutral-900 font-sans flex flex-col selection:bg-[#1B4D2E]/20 selection:text-[#1B4D2E]">
        {/* Header */}
        <Header />

        {/* Category & Filter Navigation Bar */}
        <CategoryBar />

        {/* Main Product Catalog */}
        <main className="flex-1">
          <ProductGrid />
        </main>

        {/* Corporate Clean Footer */}
        <Footer />

        {/* Modals & Slide-over Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <FavoritesDrawer />
        <MobileMenu />
        <InfoModal />
        <NotificationToast />
      </div>
    </ShopProvider>
  );
}
