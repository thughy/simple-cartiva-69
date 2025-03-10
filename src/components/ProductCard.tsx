
import { Link } from 'react-router-dom';
import { ShoppingBag, Percent } from 'lucide-react';
import { Product } from '@/types';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const hasPromotion = product.isOnSale && product.promotionalPrice;
  const discount = hasPromotion 
    ? Math.round(((product.price - (product.promotionalPrice || 0)) / product.price) * 100) 
    : 0;
    
  const formattedPrice = (price: number) => 
    new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group relative card-hover overflow-hidden rounded-xl bg-card">
      <Link to={`/products/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {hasPromotion && (
          <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground rounded-full p-1">
            <Percent className="h-4 w-4" />
          </div>
        )}
      </Link>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Link to={`/products/${product.id}`} className="text-sm text-muted-foreground">
            {product.category}
          </Link>
          
          <button 
            className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5 button-hover"
            aria-label="Ver detalhes do produto"
          >
            Ver mais
          </button>
        </div>
        
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="font-medium text-base mb-1 line-clamp-1">{product.name}</h3>
          
          <div className="flex items-center gap-2 mb-3">
            {hasPromotion ? (
              <>
                <span className="text-destructive font-semibold">{formattedPrice(product.promotionalPrice || 0)}</span>
                <span className="text-sm text-muted-foreground line-through">{formattedPrice(product.price)}</span>
                <span className="text-xs bg-destructive/10 text-destructive rounded-full px-2 py-0.5">
                  -{discount}%
                </span>
              </>
            ) : (
              <span className="font-semibold">{formattedPrice(product.price)}</span>
            )}
          </div>
        </Link>
        
        <button 
          onClick={handleAddToCart}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg button-hover",
            "bg-primary text-primary-foreground"
          )}
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Adicionar</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
