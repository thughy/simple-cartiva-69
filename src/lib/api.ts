import { Product, ProductFormData, User, StoreSettings } from '@/types';
import db from '@/data/db.json';

// Simula um delay para parecer uma API real
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Clona o objeto db para simular uma base de dados
let database = JSON.parse(JSON.stringify(db));

// API de produtos
export const getProducts = async (): Promise<Product[]> => {
  await delay(500);
  return database.products;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  await delay(300);
  const product = database.products.find((p: Product) => p.id === id);
  return product || null;
};

export const createProduct = async (productData: ProductFormData): Promise<Product> => {
  await delay(800);
  
  const newProduct: Product = {
    ...productData,
    id: `prod_${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  database.products.unshift(newProduct);
  return newProduct;
};

export const updateProduct = async (id: string, productData: ProductFormData): Promise<Product> => {
  await delay(800);
  
  const index = database.products.findIndex((p: Product) => p.id === id);
  if (index === -1) throw new Error("Produto não encontrado");
  
  const updatedProduct: Product = {
    ...database.products[index],
    ...productData,
    updatedAt: new Date()
  };
  
  database.products[index] = updatedProduct;
  return updatedProduct;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await delay(600);
  
  const index = database.products.findIndex((p: Product) => p.id === id);
  if (index === -1) throw new Error("Produto não encontrado");
  
  database.products.splice(index, 1);
};

// API de autenticação
export const loginUser = async (email: string, password: string): Promise<User | null> => {
  await delay(700);
  
  const user = database.users.find((u: User) => u.email === email && u.password === password);
  
  if (!user) return null;
  
  // Não retorna a senha para o cliente
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
};

// API de configurações da loja
export const getStoreSettings = async (): Promise<StoreSettings> => {
  await delay(400);
  return database.storeSettings || {
    storeName: "Minha Loja",
    storeWhatsApp: "5511999999999",
    storeColors: {
      primary: "#3b82f6",
      secondary: "#f3f4f6",
      accent: "#8b5cf6"
    },
    storeFooter: {
      description: "Produtos de qualidade com design minimalista e funcional.",
      contactEmail: "contato@cartiva.com",
      contactPhone: "+55 (11) 9999-9999",
      copyrightYear: new Date().getFullYear().toString()
    }
  };
};

export const updateStoreSettings = async (settings: StoreSettings): Promise<StoreSettings> => {
  await delay(800);
  
  database.storeSettings = settings;
  return settings;
};

// Função para resetar o banco de dados (útil para testes)
export const resetDatabase = () => {
  database = JSON.parse(JSON.stringify(db));
};
