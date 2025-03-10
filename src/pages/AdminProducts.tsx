
import { useState } from 'react';
import { PlusCircle, Pencil, Trash2, ArrowLeft, Package2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import AdminProductForm from '@/components/AdminProductForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product, ProductFormData } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/lib/api';

const AdminProducts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  
  const handleCreateProduct = async (data: ProductFormData) => {
    setIsActionLoading(true);
    
    try {
      await createProduct(data);
      
      // Invalidar cache para recarregar lista
      queryClient.invalidateQueries({ queryKey: ['products'] });
      
      setIsCreateDialogOpen(false);
      setIsActionLoading(false);
      
      toast({
        title: "Produto criado",
        description: "O produto foi adicionado com sucesso."
      });
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      setIsActionLoading(false);
      
      toast({
        variant: "destructive",
        title: "Erro ao criar produto",
        description: "Ocorreu um erro ao criar o produto. Tente novamente."
      });
    }
  };
  
  const handleUpdateProduct = async (data: ProductFormData) => {
    if (!editingProduct) return;
    
    setIsActionLoading(true);
    
    try {
      await updateProduct(editingProduct.id, data);
      
      // Invalidar cache para recarregar lista
      queryClient.invalidateQueries({ queryKey: ['products'] });
      
      setEditingProduct(null);
      setIsActionLoading(false);
      
      toast({
        title: "Produto atualizado",
        description: "As alterações foram salvas com sucesso."
      });
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      setIsActionLoading(false);
      
      toast({
        variant: "destructive",
        title: "Erro ao atualizar produto",
        description: "Ocorreu um erro ao atualizar o produto. Tente novamente."
      });
    }
  };
  
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    
    setIsActionLoading(true);
    
    try {
      await deleteProduct(productToDelete.id);
      
      // Invalidar cache para recarregar lista
      queryClient.invalidateQueries({ queryKey: ['products'] });
      
      setProductToDelete(null);
      setIsDeleteDialogOpen(false);
      setIsActionLoading(false);
      
      toast({
        title: "Produto removido",
        description: "O produto foi removido com sucesso."
      });
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      setIsActionLoading(false);
      
      toast({
        variant: "destructive",
        title: "Erro ao remover produto",
        description: "Ocorreu um erro ao remover o produto. Tente novamente."
      });
    }
  };
  
  const openDeleteDialog = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };
  
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 page-transition">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <button 
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 text-sm mb-4 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para Administração
            </button>
            
            <h1 className="text-3xl font-bold mb-2">Gerenciar Produtos</h1>
            <p className="text-muted-foreground">
              Adicione, edite e remova produtos da loja
            </p>
          </div>
          
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="flex items-center gap-2 button-hover"
          >
            <PlusCircle className="h-5 w-5" />
            Novo Produto
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="in-stock">Em Estoque</TabsTrigger>
            <TabsTrigger value="on-sale">Em Promoção</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <ProductsTable
              products={products}
              onEdit={setEditingProduct}
              onDelete={openDeleteDialog}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="in-stock" className="mt-4">
            <ProductsTable
              products={products.filter(p => p.stock > 0)}
              onEdit={setEditingProduct}
              onDelete={openDeleteDialog}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="on-sale" className="mt-4">
            <ProductsTable
              products={products.filter(p => p.isOnSale)}
              onEdit={setEditingProduct}
              onDelete={openDeleteDialog}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
        
        {/* Create Product Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Novo Produto</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para adicionar um novo produto.
              </DialogDescription>
            </DialogHeader>
            
            <AdminProductForm 
              onSubmit={handleCreateProduct}
              isLoading={isActionLoading}
            />
          </DialogContent>
        </Dialog>
        
        {/* Edit Product Dialog */}
        <Dialog 
          open={!!editingProduct} 
          onOpenChange={(open) => !open && setEditingProduct(null)}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Produto</DialogTitle>
              <DialogDescription>
                Modifique os campos necessários para atualizar o produto.
              </DialogDescription>
            </DialogHeader>
            
            {editingProduct && (
              <AdminProductForm
                initialData={editingProduct}
                onSubmit={handleUpdateProduct}
                isLoading={isActionLoading}
              />
            )}
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <AlertDialog 
          open={isDeleteDialogOpen} 
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o produto "{productToDelete?.name}"? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isActionLoading}>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteProduct}
                disabled={isActionLoading}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isActionLoading ? 'Excluindo...' : 'Excluir'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PageLayout>
  );
};

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  isLoading: boolean;
}

const ProductsTable = ({ products, onEdit, onDelete, isLoading }: ProductsTableProps) => {
  if (isLoading) {
    return (
      <div className="bg-muted/30 rounded-lg p-8 text-center">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
        <p className="mt-4 text-muted-foreground">Carregando produtos...</p>
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="bg-muted/30 rounded-lg p-8 text-center">
        <Package2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground/60" />
        <h3 className="text-lg font-medium mb-2">Nenhum produto encontrado</h3>
        <p className="text-muted-foreground">
          Não há produtos disponíveis nesta categoria.
        </p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left p-4 font-medium">Produto</th>
            <th className="text-left p-4 font-medium">Categoria</th>
            <th className="text-left p-4 font-medium">Preço</th>
            <th className="text-left p-4 font-medium">Estoque</th>
            <th className="text-left p-4 font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => {
            const hasPromotion = product.isOnSale && product.promotionalPrice;
            
            return (
              <tr key={product.id} className="border-t hover:bg-muted/20 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded overflow-hidden bg-muted/30 flex-shrink-0">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/e2e8f0/a0aec0?text=Imagem';
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {product.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">
                  {hasPromotion ? (
                    <div>
                      <div className="text-destructive font-medium">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.promotionalPrice!)}
                      </div>
                      <div className="text-xs text-muted-foreground line-through">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                      </div>
                    </div>
                  ) : (
                    <div className="font-medium">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <span className={product.stock > 0 ? 'text-emerald-600' : 'text-destructive'}>
                    {product.stock}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onEdit(product)}
                      className="h-8 w-8 p-0"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => onDelete(product)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
