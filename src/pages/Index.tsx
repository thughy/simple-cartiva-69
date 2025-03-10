
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/data/mockData';

const Index = () => {
  const navigate = useNavigate();
  
  // Get featured products (first 3)
  const featuredProducts = mockProducts.slice(0, 3);
  
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80" 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6 animate-fade-up">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Produtos com Design Excepcional</h1>
            <p className="text-lg md:text-xl mb-8 text-white/80">
              Descubra produtos que unem funcionalidade e estética minimalista
            </p>
            <Button 
              onClick={() => navigate('/products')}
              size="lg" 
              className="button-hover"
            >
              Explorar Produtos
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Produtos em Destaque</h2>
              <p className="text-muted-foreground">Conheça nossa seleção especial</p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/products')}
              className="hidden sm:flex items-center gap-2 button-hover"
            >
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="animate-scale-in">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Button 
              variant="outline" 
              onClick={() => navigate('/products')}
              className="items-center gap-2 button-hover"
            >
              Ver todos os produtos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 animate-fade-up">
              <h2 className="text-3xl font-bold mb-4">Sobre a Cartiva</h2>
              <p className="text-muted-foreground mb-6">
                Somos uma marca dedicada a oferecer produtos com design excepcional, 
                funcionalidade intuitiva e qualidade superior. Nossa missão é trazer 
                beleza e simplicidade para o seu dia a dia através de produtos cuidadosamente selecionados.
              </p>
              <Button 
                variant="default" 
                className="button-hover"
                onClick={() => navigate('/products')}
              >
                Nossos Produtos
              </Button>
            </div>
            
            <div className="order-1 md:order-2">
              <img 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
                alt="About Cartiva" 
                className="w-full h-auto rounded-xl shadow-lg animate-scale-in"
              />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
