
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  promotionalPrice?: number | null;
  isOnSale: boolean;
  imageUrl: string;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  password?: string; // Opcional porque não deve ser retornado da API
  role: 'admin' | 'customer';
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface StoreSettings {
  storeName: string;
  storeWhatsApp: string;
  storeColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  storeLogo?: string;
  storeFooter?: {
    description: string;
    contactEmail: string;
    contactPhone: string;
    copyrightYear: string;
  };
}
