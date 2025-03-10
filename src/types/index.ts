
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  isOnSale: boolean;
  imageUrl: string;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
