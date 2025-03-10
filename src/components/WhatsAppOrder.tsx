
import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/types';

interface WhatsAppOrderProps {
  product: Product;
  quantity?: number;
}

const WhatsAppOrder = ({ product, quantity = 1 }: WhatsAppOrderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleWhatsAppOrder = () => {
    setIsLoading(true);
    
    try {
      const phoneNumber = '5511999999999'; // Substituir pelo número real
      const message = encodeURIComponent(
        `Olá! Gostaria de fazer um pedido:\n\n` +
        `*Produto:* ${product.name}\n` +
        `*Quantidade:* ${quantity}\n` +
        `*Preço unitário:* ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
          product.isOnSale && product.promotionalPrice ? product.promotionalPrice : product.price
        )}\n` +
        `*Total:* ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
          (product.isOnSale && product.promotionalPrice ? product.promotionalPrice : product.price) * quantity
        )}`
      );
      
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error('Erro ao abrir WhatsApp:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <button
      onClick={handleWhatsAppOrder}
      disabled={isLoading}
      className={cn(
        "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg button-hover",
        "bg-[#25D366] text-white font-medium",
        isLoading && "opacity-70 cursor-not-allowed"
      )}
    >
      <MessageSquare className="h-5 w-5" />
      <span>Pedir via WhatsApp</span>
    </button>
  );
};

export default WhatsAppOrder;
