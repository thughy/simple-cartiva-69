
import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

interface WhatsAppOrderProps {
  product: Product;
  quantity?: number;
}

const WhatsAppOrder = ({ product, quantity = 1 }: WhatsAppOrderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleWhatsAppOrder = () => {
    setIsLoading(true);
    
    try {
      // Adiciona o produto ao carrinho
      addToCart(product, quantity);
      
      // Redireciona para o checkout
      setTimeout(() => {
        navigate('/checkout');
        setIsLoading(false);
      }, 500);
      
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      setIsLoading(false);
    }
  };
  
  return (
    <button
      onClick={handleWhatsAppOrder}
      disabled={isLoading || product.stock <= 0}
      className={cn(
        "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg button-hover",
        "bg-[#25D366] text-white font-medium",
        (isLoading || product.stock <= 0) && "opacity-70 cursor-not-allowed"
      )}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white"></div>
      ) : (
        <>
          <MessageSquare className="h-5 w-5" />
          <span>Pedir via WhatsApp</span>
        </>
      )}
    </button>
  );
};

export default WhatsAppOrder;
