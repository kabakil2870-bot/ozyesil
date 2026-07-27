export type CategoryId =
  | 'all'
  | 'cilt-bakimi'
  | 'makyaj'
  | 'parfum'
  | 'sampuan'
  | 'sac-bakimi'
  | 'erkek-bakim'
  | 'anne-bebek'
  | 'aksesuar';

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  price: number;
  oldPrice?: number;
  image: string;
  additionalImages?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  isDiscounted?: boolean;
  inStock: boolean;
  stockCount: number;
  sku: string;
  description: string;
  usage?: string;
  skinType?: string;
  volume?: string;
  ingredients?: string[];
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'discount' | 'newest';

export interface FilterState {
  category: CategoryId;
  brand: string | null;
  searchQuery: string;
  onlyDiscounted: boolean;
  onlyNew: boolean;
  onlyInStock: boolean;
  sortBy: SortOption;
  minPrice: number | null;
  maxPrice: number | null;
}

export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  deliveryType: 'shipping' | 'store_pickup';
  city: string;
  district: string;
  address: string;
  note?: string;
}

export type InfoModalType =
  | 'about'
  | 'contact'
  | 'kvkk'
  | 'privacy'
  | 'returns'
  | 'shipping'
  | null;
