
import { useNavigate } from 'react-router-dom';
import { Package2, BarChart3, Settings, LogOut } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/api';
import { useStore } from '@/context/StoreContext';

const Admin = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { settings } = useStore();
  
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });
  
  // Stats calculation
  const totalProducts = products.length;
  const productsInStock = products.filter(p => p.stock > 0).length;
  const productsOnSale = products.filter(p => p.isOnSale).length;
  
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 page-transition">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">Administração de {settings.storeName}</h1>
            <p className="text-muted-foreground">
              Bem-vindo, {user?.name}. Gerencie produtos e configurações da loja.
            </p>
          </div>
          
          <Button variant="outline" onClick={logout} className="md:w-auto w-full">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
          
          <Card className="cursor-pointer card-hover" onClick={() => navigate('/admin/settings')}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-primary" />
                Configurações da Loja
              </CardTitle>
              <CardDescription>
                Personalize nome, cores e WhatsApp da loja
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
