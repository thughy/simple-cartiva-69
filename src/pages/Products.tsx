
import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { mockProducts } from '@/data/mockData';
import { Product } from '@/types';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [isLoading, setIsLoading] = useState(true);
  
  // Extract unique categories
  const categories = ['Todos', ...new Set(mockProducts.map(product => product.category))];
  
  // Filter products based on search query and selected category
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      let results = mockProducts;
      
      // Filter by search query
      if (searchQuery) {
        results = results.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Filter by category
      if (selectedCategory && selectedCategory !== 'Todos') {
        results = results.filter(product => product.category === selectedCategory);
      }
      
      setFilteredProducts(results);
      setIsLoading(false);
    }, 300); // Small delay for better UX
    
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);
  
  // Simulate loading delay on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <PageLayout>
      <section className="section-padding page-transition">
        <div className="container mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Nossos Produtos</h1>
            <p className="text-muted-foreground">
              Explore nossa coleção de {mockProducts.length} produtos
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Category filter */}
            <div className="relative w-full md:w-64">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background appearance-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-xl aspect-square mb-4"></div>
                  <div className="bg-muted h-4 w-24 rounded mb-2"></div>
                  <div className="bg-muted h-6 w-40 rounded mb-3"></div>
                  <div className="bg-muted h-10 w-full rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            // Products grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-scale-in" 
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            // No results
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">Nenhum produto encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar seus filtros ou termos de busca.
              </p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Products;
