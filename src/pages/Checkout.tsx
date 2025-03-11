
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import WhatsAppOrder from '@/components/WhatsAppOrder';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, totalPrice } = useCart();
  const [isComplete, setIsComplete] = useState(false);
  
  const formattedPrice = (price: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  
  if (isComplete) {
    return (
      <PageLayout>
        <div className="container mx-auto py-16 px-4 page-transition">
          <div className="max-w-md mx-auto text-center py-12 animate-fade-up">
            <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Pedido Realizado com Sucesso!</h1>
            <p className="text-muted-foreground mb-8">
              Seu pedido foi enviado para o WhatsApp do vendedor. Em breve você receberá uma confirmação.
            </p>
            <Button onClick={() => navigate('/')} className="mx-2 mb-2">
              Voltar para a Home
            </Button>
            <Button variant="outline" onClick={() => navigate('/products')} className="mx-2 mb-2">
              Continuar Comprando
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 page-transition">
        <button 
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-sm mb-6 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a sacola
        </button>
        
        <h1 className="text-2xl font-bold mb-8">Finalizar Compra</h1>
        
        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="font-medium text-lg mb-4">Resumo do Pedido</h2>
            
            <ScrollArea className="h-56 mb-4">
              <div className="space-y-3">
                {cart.map((item) => {
                  const price = item.product.isOnSale && item.product.promotionalPrice 
                    ? item.product.promotionalPrice 
                    : item.product.price;
                    
                  return (
                    <div key={item.product.id} className="flex items-center py-2">
                      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="ml-3 flex-grow">
                        <div className="font-medium text-sm">{item.product.name}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>Qtd: {item.quantity}</span>
                          <span className="mx-1">•</span>
                          <span>{formattedPrice(price)}</span>
                        </div>
                      </div>
                      
                      <div className="font-medium text-sm">
                        {formattedPrice(price * item.quantity)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            
            <Separator className="my-4" />
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formattedPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frete</span>
                <span className="text-emerald-600">Grátis</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between font-medium text-lg mb-6">
              <span>Total</span>
              <span>{formattedPrice(totalPrice)}</span>
            </div>
            
            <WhatsAppOrder product={null as any} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Checkout;
