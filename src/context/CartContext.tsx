
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Carregar carrinho do localStorage ao iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);
  
  // Salvar carrinho no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Se o produto já existe, atualize a quantidade
        const newQuantity = existingItem.quantity + quantity;
        const updatedCart = prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: newQuantity } 
            : item
        );
        
        toast({
          title: "Produto atualizado",
          description: `${product.name} agora tem ${newQuantity} unidades na sacola.`,
        });
        
        return updatedCart;
      } else {
        // Adicionar novo produto ao carrinho
        toast({
          title: "Produto adicionado",
          description: `${product.name} foi adicionado à sacola.`,
        });
        
        return [...prevCart, { product, quantity }];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.find(item => item.product.id === productId);
      if (itemToRemove) {
        toast({
          title: "Produto removido",
          description: `${itemToRemove.product.name} foi removido da sacola.`,
        });
      }
      
      return prevCart.filter(item => item.product.id !== productId);
    });
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(productId);
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
    toast({
      title: "Sacola esvaziada",
      description: "Todos os produtos foram removidos da sacola.",
    });
  };
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = cart.reduce((total, item) => {
    const price = item.product.isOnSale && item.product.promotionalPrice 
      ? item.product.promotionalPrice 
      : item.product.price;
    return total + (price * item.quantity);
  }, 0);
  
  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
