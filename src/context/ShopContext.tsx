import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Product, CartItem, CategoryId, FilterState, SortOption, InfoModalType } from '../types';
import { PRODUCTS } from '../data/products';
import { fetchProductsFromFirestore } from '../lib/firebase';

interface ToastNotification {
  id: string;
  text: string;
  type: 'cart' | 'favorite' | 'info';
}

interface ShopContextType {
  products: Product[];
  filteredProducts: Product[];
  cart: CartItem[];
  favorites: string[];
  recentlyViewed: string[];
  filterState: FilterState;
  activeProductId: string | null;
  activeProduct: Product | null;
  isCartOpen: boolean;
  isFavoritesOpen: boolean;
  isMobileMenuOpen: boolean;
  infoModalType: InfoModalType;
  toast: ToastNotification | null;

  // Actions
  setCategory: (cat: CategoryId) => void;
  setBrandFilter: (brand: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: SortOption) => void;
  toggleDiscountedFilter: () => void;
  toggleNewFilter: () => void;
  toggleInStockFilter: () => void;
  resetFilters: () => void;
  reloadProducts: () => Promise<void>;

  // Cart
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartTotalPrice: number;

  // Favorites
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // UI Modals
  openProductModal: (productId: string) => void;
  closeProductModal: () => void;
  setIsCartOpen: (isOpen: boolean) => void;
  setIsFavoritesOpen: (isOpen: boolean) => void;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setInfoModalType: (type: InfoModalType) => void;
  showToast: (text: string, type?: 'cart' | 'favorite' | 'info') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const LOCAL_CART_KEY = 'ozyesil_cart_v1';
const LOCAL_FAV_KEY = 'ozyesil_fav_v1';
const LOCAL_RECENT_KEY = 'ozyesil_recent_v1';

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  // Filters
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'all',
    brand: null,
    searchQuery: '',
    onlyDiscounted: false,
    onlyNew: false,
    onlyInStock: false,
    sortBy: 'featured',
    minPrice: null,
    maxPrice: null
  });

  // Storage states
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_FAV_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_RECENT_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Modals
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<InfoModalType>(null);
  const [toast, setToast] = useState<ToastNotification | null>(null);

  // Load products from Firestore on mount
  const reloadProducts = async () => {
    const firestoreItems = await fetchProductsFromFirestore();
    if (firestoreItems && firestoreItems.length > 0) {
      setProducts(firestoreItems as Product[]);
    } else {
      setProducts([]);
    }
  };

  useEffect(() => {
    reloadProducts();
  }, []);

  // Sync with URL query on init or changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prodParam = params.get('product');
    const catParam = params.get('category') as CategoryId;
    if (prodParam && products.some(p => p.id === prodParam)) {
      setActiveProductId(prodParam);
    }
    if (catParam) {
      setFilterState(prev => ({ ...prev, category: catParam }));
    }
  }, [products]);

  // Save Cart & Favorites & Recently Viewed to LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(LOCAL_FAV_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(LOCAL_RECENT_KEY, JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Toast Helper
  const showToast = (text: string, type: 'cart' | 'favorite' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({ id, text, type });
    setTimeout(() => {
      setToast(prev => (prev?.id === id ? null : prev));
    }, 3000);
  };

  // Product modal opener
  const openProductModal = (productId: string) => {
    setActiveProductId(productId);
    // Add to recently viewed
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
    // Update URL query string silently without refresh
    const url = new URL(window.location.href);
    url.searchParams.set('product', productId);
    window.history.pushState({}, '', url.toString());
  };

  const closeProductModal = () => {
    setActiveProductId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('product');
    window.history.pushState({}, '', url.toString());
  };

  // Active product calculation
  const activeProduct = useMemo(() => {
    if (!activeProductId) return null;
    return products.find(p => p.id === activeProductId) || null;
  }, [activeProductId, products]);

  // Filter setters
  const setCategory = (category: CategoryId) => {
    setFilterState(prev => ({ ...prev, category }));
    const url = new URL(window.location.href);
    if (category === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', category);
    }
    window.history.pushState({}, '', url.toString());
  };

  const setBrandFilter = (brand: string | null) => {
    setFilterState(prev => ({ ...prev, brand }));
  };

  const setSearchQuery = (searchQuery: string) => {
    setFilterState(prev => ({ ...prev, searchQuery }));
  };

  const setSortBy = (sortBy: SortOption) => {
    setFilterState(prev => ({ ...prev, sortBy }));
  };

  const toggleDiscountedFilter = () => {
    setFilterState(prev => ({ ...prev, onlyDiscounted: !prev.onlyDiscounted }));
  };

  const toggleNewFilter = () => {
    setFilterState(prev => ({ ...prev, onlyNew: !prev.onlyNew }));
  };

  const toggleInStockFilter = () => {
    setFilterState(prev => ({ ...prev, onlyInStock: !prev.onlyInStock }));
  };

  const resetFilters = () => {
    setFilterState({
      category: 'all',
      brand: null,
      searchQuery: '',
      onlyDiscounted: false,
      onlyNew: false,
      onlyInStock: false,
      sortBy: 'featured',
      minPrice: null,
      maxPrice: null
    });
  };

  // Cart operations
  const addToCart = (productId: string, quantity: number = 1) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCart(prev => {
      const existing = prev.find(item => item.product.id === productId);
      if (existing) {
        return prev.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    showToast(`${product.brand} ${product.name} sepetinize eklendi!`, 'cart');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Ürün sepetinizden çıkarıldı', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartTotalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  // Favorites operations
  const toggleFavorite = (productId: string) => {
    const product = products.find(p => p.id === productId);
    setFavorites(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Ürün favorilerinizden çıkarıldı', 'info');
        return prev.filter(id => id !== productId);
      } else {
        if (product) {
          showToast(`${product.name} favorilerinize eklendi!`, 'favorite');
        }
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: string) => {
    return favorites.includes(productId);
  };

  // Filtered Products computation
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category
      if (filterState.category !== 'all' && product.category !== filterState.category) {
        return false;
      }
      // Brand
      if (filterState.brand && product.brand !== filterState.brand) {
        return false;
      }
      // Search
      if (filterState.searchQuery.trim() !== '') {
        const q = filterState.searchQuery.toLowerCase().trim();
        const nameMatch = product.name.toLowerCase().includes(q);
        const brandMatch = product.brand.toLowerCase().includes(q);
        const skuMatch = product.sku.toLowerCase().includes(q);
        const tagMatch = product.tags?.some(t => t.toLowerCase().includes(q)) || false;
        if (!nameMatch && !brandMatch && !skuMatch && !tagMatch) return false;
      }
      // Badges
      if (filterState.onlyDiscounted && !product.isDiscounted) return false;
      if (filterState.onlyNew && !product.isNew) return false;
      if (filterState.onlyInStock && !product.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price-asc') return a.price - b.price;
      if (filterState.sortBy === 'price-desc') return b.price - a.price;
      if (filterState.sortBy === 'discount') {
        const discA = a.oldPrice ? ((a.oldPrice - a.price) / a.oldPrice) : 0;
        const discB = b.oldPrice ? ((b.oldPrice - b.price) / b.oldPrice) : 0;
        return discB - discA;
      }
      if (filterState.sortBy === 'newest') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      // Featured/default: Bestseller first
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [products, filterState]);

  return (
    <ShopContext.Provider
      value={{
        products,
        filteredProducts,
        cart,
        favorites,
        recentlyViewed,
        filterState,
        activeProductId,
        activeProduct,
        isCartOpen,
        isFavoritesOpen,
        isMobileMenuOpen,
        infoModalType,
        toast,
        setCategory,
        setBrandFilter,
        setSearchQuery,
        setSortBy,
        toggleDiscountedFilter,
        toggleNewFilter,
        toggleInStockFilter,
        resetFilters,
        reloadProducts,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalCount,
        cartTotalPrice,
        toggleFavorite,
        isFavorite,
        openProductModal,
        closeProductModal,
        setIsCartOpen,
        setIsFavoritesOpen,
        setIsMobileMenuOpen,
        setInfoModalType,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
