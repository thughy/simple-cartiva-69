
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package2, BarChart3, Settings } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/data/mockData';

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Simulating authentication
  
  // Stats calculation
  const totalProducts = mockProducts.length;
  const productsInStock = mockProducts.filter(p => p.stock > 0).length;
  const productsOnSale = mockProducts.filter(p => p.isOnSale).length;
  
  if (!isAuthenticated) {
    return (
      <PageLayout>
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
            <p className="text-muted-foreground mb-6">
              Você precisa estar autenticado para acessar esta área.
            </p>
            <Button onClick={() => setIsAuthenticated(true)}>
              Entrar
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 page-transition">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Administração</h1>
          <p className="text-muted-foreground">
            Gerencie os produtos e visualize estatísticas
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Package2 className="h-5 w-5 mr-2 text-primary" />
                Total de Produtos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalProducts}</div>
              <CardDescription>
                Produtos cadastrados na plataforma
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Em Estoque
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{productsInStock}</div>
              <CardDescription>
                Produtos disponíveis para venda
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Settings className="h-5 w-5 mr-2 text-primary" />
                Em Promoção
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{productsOnSale}</div>
              <CardDescription>
                Produtos com preço promocional
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        
        {/* Admin Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="cursor-pointer card-hover" onClick={() => navigate('/admin/products')}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package2 className="h-5 w-5 mr-2 text-primary" />
                Gerenciar Produtos
              </CardTitle>
              <CardDescription>
                Adicione, edite e remova produtos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Acessar</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Admin;
