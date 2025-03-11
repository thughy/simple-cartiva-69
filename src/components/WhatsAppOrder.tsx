
import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useStore } from '@/context/StoreContext';

interface WhatsAppOrderProps {
  product: Product;
  quantity?: number;
}

const WhatsAppOrder = ({ product, quantity = 1 }: WhatsAppOrderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart, cart, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const { settings } = useStore();

  const formattedPrice = (price: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

  const handleWhatsAppOrder = () => {
    setIsLoading(true);
    
    try {
      // Add product to cart if coming from product detail
      if (product) {
        addToCart(product, quantity);
      }
      
      // Generate WhatsApp message with cart items
      const whatsappNumber = settings?.storeWhatsApp || '5511999999999';
      let message = encodeURIComponent(
        `*NOVO PEDIDO*\n\n` +
        `*Itens do Pedido:*\n`
      );
      
      // Add products to the order
      cart.forEach((item, index) => {
        const productPrice = item.product.isOnSale && item.product.promotionalPrice 
          ? item.product.promotionalPrice 
          : item.product.price;
          
        const productTotal = productPrice * item.quantity;
        
        message += encodeURIComponent(
          `${index + 1}. ${item.product.name}\n` +
          `   Quantidade: ${item.quantity}\n` +
          `   Preço unitário: ${formattedPrice(productPrice)}\n` +
          `   Subtotal: ${formattedPrice(productTotal)}\n\n`
        );
      });
      
      // Add total price
      message += encodeURIComponent(
        `*Total do Pedido: ${formattedPrice(totalPrice)}*\n\n` +
        `Aguardo confirmação do pedido. Obrigado!`
      );
      
      // Open WhatsApp with the message
      setTimeout(() => {
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
        
        clearCart();
        setIsLoading(false);
        
        toast({
          title: "Pedido enviado!",
          description: "Seu pedido foi enviado para o WhatsApp do vendedor.",
        });
      }, 500);
      
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      setIsLoading(false);
      
      toast({
        variant: "destructive",
        title: "Erro ao processar",
        description: "Ocorreu um erro ao processar seu pedido. Tente novamente.",
      });
    }
  };
  
  return (
    <button
      onClick={handleWhatsAppOrder}
      disabled={isLoading || (product && product.stock <= 0)}
      className={cn(
        "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg button-hover",
        "bg-[#25D366] text-white font-medium",
        (isLoading || (product && product.stock <= 0)) && "opacity-70 cursor-not-allowed"
      )}
      style={{ backgroundColor: "#25D366" }}
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
