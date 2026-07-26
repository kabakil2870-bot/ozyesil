import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const {
    filterState,
    setSearchQuery,
    cartTotalCount,
    cartTotalPrice,
    favorites,
    setIsCartOpen,
    setIsFavoritesOpen,
    setIsMobileMenuOpen,
    isMobileMenuOpen,
    products,
    openProductModal
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(filterState.searchQuery);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Handle shrink on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync search input with global filter state
  useEffect(() => {
    setLocalSearch(filterState.searchQuery);
  }, [filterState.searchQuery]);

  // Click outside listener for search autocomplete
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Autocomplete matching products (max 5)
  const searchResults = localSearch.trim() === ''
    ? []
    : products.filter(p => {
        const q = localSearch.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
        );
      }).slice(0, 5);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setShowAutocomplete(false);
  };

  const handleSelectAutocomplete = (productId: string) => {
    setShowAutocomplete(false);
    openProductModal(productId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-2xs transition-all duration-300">
      {/* Main Header Container - Clean Trendyol Style */}
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-300 flex items-center justify-between gap-4 ${
          isScrolled ? 'py-2 md:py-3' : 'py-3.5 md:py-4'
        }`}
      >
        {/* LOGO - User Uploaded Logo Branding */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center group shrink-0 py-1"
          title="Özyeşil Kozmetik Ana Sayfa"
        >
          <Logo variant="compact" className="group-hover:opacity-90 transition-opacity" />
        </a>

        {/* SEARCH BAR - Trendyol Style Wide Input */}
        <div ref={searchContainerRef} className="relative hidden md:block flex-1 max-w-xl mx-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Aradığınız ürün, marka veya kategoriyi yazınız..."
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                setSearchQuery(e.target.value);
                setShowAutocomplete(true);
              }}
              onFocus={() => setShowAutocomplete(true)}
              className="w-full bg-neutral-100/90 hover:bg-neutral-100 focus:bg-white text-neutral-900 placeholder:text-neutral-400 text-sm rounded-full pl-11 pr-10 py-2.5 border border-neutral-200/90 focus:border-[#1B4D2E] focus:ring-2 focus:ring-[#1B4D2E]/20 outline-none transition-all shadow-2xs"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            {localSearch && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch('');
                  setSearchQuery('');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {showAutocomplete && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-50 py-2"
              >
                <div className="px-4 py-2 text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex justify-between items-center border-b border-neutral-100">
                  <span>Arama Sonuçları ({searchResults.length})</span>
                  <span className="text-[#1B4D2E]">Özyeşil Stokları</span>
                </div>
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSelectAutocomplete(product.id)}
                    className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-emerald-50/60 transition-colors text-left group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-lg border border-neutral-200 group-hover:scale-105 transition-transform shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-[#1B4D2E] uppercase tracking-wide">
                        {product.brand}
                      </p>
                      <p className="text-sm font-medium text-neutral-900 truncate">
                        {product.name}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-neutral-900">
                        {product.price.toLocaleString('tr-TR')} TL
                      </p>
                      {product.oldPrice && (
                        <p className="text-[11px] text-neutral-400 line-through">
                          {product.oldPrice.toLocaleString('tr-TR')} TL
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT ACTIONS: FAVORITES & CART & MOBILE MENU */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-[#1B4D2E] hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="Arama yap"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* FAVORITES BUTTON */}
          <button
            onClick={() => setIsFavoritesOpen(true)}
            className="relative p-2.5 text-neutral-700 hover:text-[#1B4D2E] hover:bg-emerald-50/80 rounded-full transition-colors flex items-center gap-1.5 group"
            aria-label="Favorilerim"
            title="Favorilerim"
          >
            <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="hidden lg:inline text-xs font-semibold text-neutral-800">Favorilerim</span>
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 bg-rose-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-scale-in">
                {favorites.length}
              </span>
            )}
          </button>

          {/* CART BUTTON */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-[#1B4D2E] hover:bg-[#143B22] text-white px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm hover:shadow transition-all group shrink-0"
            aria-label="Sepetim"
          >
            <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline">Sepetim</span>
            {cartTotalCount > 0 ? (
              <span className="bg-[#C49A45] text-neutral-900 text-xs font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                {cartTotalCount}
              </span>
            ) : (
              <span className="hidden sm:inline text-xs text-emerald-200">0 TL</span>
            )}
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-[#1B4D2E] hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Menü"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE EXPANDABLE SEARCH BAR */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-neutral-200 px-4 py-3 bg-neutral-50"
          >
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Ürün veya marka ara..."
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  setSearchQuery(e.target.value);
                }}
                className="w-full bg-white text-neutral-900 placeholder:text-neutral-400 text-sm rounded-full pl-10 pr-10 py-2 border border-neutral-300 focus:border-[#1B4D2E] outline-none"
                autoFocus
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {localSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setLocalSearch('');
                    setSearchQuery('');
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

