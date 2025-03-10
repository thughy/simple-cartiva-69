
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ShoppingCart, Trash2 } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, totalItems, totalPrice, clearCart } = useCart();
  
  const formattedPrice = (price: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  
  if (cart.length === 0) {
    return (
      <PageLayout>
        <div className="container mx-auto py-16 px-4 page-transition">
          <div className="max-w-2xl mx-auto text-center py-12">
            <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Sua sacola está vazia</h1>
            <p className="text-muted-foreground mb-6">
              Você ainda não adicionou nenhum produto à sua sacola de compras.
            </p>
            <Button onClick={() => navigate('/products')}>
              Continuar Comprando
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 page-transition">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm mb-6 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <ShoppingBag className="h-6 w-6" />
                Sacola de Compras
                <span className="text-base font-normal text-muted-foreground">
                  ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
                </span>
              </h1>
              
              <Button 
                variant="outline" 
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={clearCart}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar
              </Button>
            </div>
            
            <div className="bg-card rounded-lg shadow-sm p-6">
              {cart.map(item => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full md:w-auto"
                onClick={() => navigate('/products')}
              >
                Continuar Comprando
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-80">
            <div className="bg-card rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="font-medium text-lg mb-4">Resumo do Pedido</h2>
              
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
              
              <Button 
                className="w-full button-hover"
                onClick={() => navigate('/checkout')}
              >
                Finalizar Compra
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Cart;
