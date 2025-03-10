
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Percent, Plus, Minus } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import WhatsAppOrder from '@/components/WhatsAppOrder';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartContext';
import { getProductById } from '@/lib/api';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setIsLoading(true);
      
      try {
        const foundProduct = await getProductById(id);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          toast({
            variant: "destructive",
            title: "Produto não encontrado",
            description: "O produto que você está procurando não existe.",
          });
          navigate('/products');
        }
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar produto",
          description: "Ocorreu um erro ao carregar o produto. Tente novamente.",
        });
        navigate('/products');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, navigate, toast]);
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToBag = () => {
    if (!product) return;
    
    addToCart(product, quantity);
  };
  
  if (isLoading || !product) {
    return (
      <PageLayout>
        <div className="container mx-auto py-16 px-4">
          <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-muted rounded-xl aspect-square"></div>
            <div className="space-y-4">
              <div className="bg-muted h-8 w-3/4 rounded"></div>
              <div className="bg-muted h-6 w-1/4 rounded"></div>
              <div className="bg-muted h-24 w-full rounded mt-4"></div>
              <div className="bg-muted h-10 w-32 rounded"></div>
              <div className="bg-muted h-12 w-full rounded"></div>
              <div className="bg-muted h-12 w-full rounded"></div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  const hasPromotion = product.isOnSale && product.promotionalPrice;
  const currentPrice = hasPromotion ? product.promotionalPrice! : product.price;
  const discount = hasPromotion 
    ? Math.round(((product.price - product.promotionalPrice!) / product.price) * 100) 
    : 0;
    
  const formattedPrice = (price: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 page-transition">
        <button 
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-sm mb-8 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para produtos
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="rounded-xl overflow-hidden relative">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-auto object-cover aspect-square animate-fade-in"
            />
            {hasPromotion && (
              <div className="absolute top-4 right-4 bg-destructive text-white rounded-full px-3 py-1 flex items-center gap-1">
                <Percent className="h-4 w-4" />
                <span className="font-medium">{discount}% OFF</span>
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="animate-fade-up">
            <div className="mb-6">
              <div className="text-sm text-muted-foreground mb-2">{product.category}</div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center gap-3 mb-2">
                {hasPromotion ? (
                  <>
                    <span className="text-2xl font-bold text-destructive">
                      {formattedPrice(product.promotionalPrice!)}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {formattedPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold">
                    {formattedPrice(product.price)}
                  </span>
                )}
              </div>
              
              <div className="text-sm">
                {product.stock > 0 ? (
                  <span className="text-emerald-600">Em estoque: {product.stock} unidades</span>
                ) : (
                  <span className="text-destructive">Produto indisponível</span>
                )}
              </div>
            </div>
            
            <p className="text-muted-foreground mb-8">{product.description}</p>
            
            <div className="mb-6">
              <div className="text-sm font-medium mb-2">Quantidade</div>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-14 text-center font-medium">{quantity}</div>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex flex-col gap-4">
              <Button 
                variant="default" 
                size="lg" 
                className="w-full button-hover"
                onClick={handleAddToBag}
                disabled={product.stock === 0}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Adicionar à Sacola
              </Button>
              
              <WhatsAppOrder product={product} quantity={quantity} />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetail;
