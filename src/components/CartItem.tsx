
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  
  const currentPrice = product.isOnSale && product.promotionalPrice 
    ? product.promotionalPrice 
    : product.price;
  
  const totalPrice = currentPrice * quantity;
  
  const handleIncrease = () => {
    if (quantity < product.stock) {
      updateQuantity(product.id, quantity + 1);
    }
  };
  
  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };
  
  return (
    <div className="flex items-center py-4 border-b">
      <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.category}</p>
        
        <div className="flex items-center mt-2">
          <span className="font-medium">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentPrice)}
          </span>
          
          {product.isOnSale && product.promotionalPrice && (
            <span className="text-xs text-muted-foreground line-through ml-2">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 w-8 p-0 rounded-full"
          onClick={handleDecrease}
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <span className="w-10 text-center font-medium">{quantity}</span>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 w-8 p-0 rounded-full"
          onClick={handleIncrease}
          disabled={quantity >= product.stock}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="w-24 text-right font-medium">
        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
      </div>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="ml-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={() => removeFromCart(product.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CartItem;
