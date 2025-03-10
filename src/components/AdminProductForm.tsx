
import { useState } from 'react';
import { Product, ProductFormData } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AdminProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductFormData) => void;
  isLoading?: boolean;
}

const AdminProductForm = ({ 
  initialData, 
  onSubmit,
  isLoading = false
}: AdminProductFormProps) => {
  const { toast } = useToast();
  const isEditing = !!initialData;
  
  const defaultValues: ProductFormData = {
    name: '',
    description: '',
    price: 0,
    promotionalPrice: undefined,
    isOnSale: false,
    imageUrl: '',
    category: '',
    stock: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  const [formData, setFormData] = useState<ProductFormData>(initialData || defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'promotionalPrice' || name === 'stock' 
        ? parseFloat(value) || 0
        : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      isOnSale: checked
    }));
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }
    
    if (formData.price <= 0) {
      newErrors.price = 'Preço deve ser maior que zero';
    }
    
    if (formData.isOnSale && (!formData.promotionalPrice || formData.promotionalPrice >= formData.price)) {
      newErrors.promotionalPrice = 'Preço promocional deve ser menor que o preço original';
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'URL da imagem é obrigatória';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Categoria é obrigatória';
    }
    
    if (formData.stock < 0) {
      newErrors.stock = 'Estoque não pode ser negativo';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      toast({
        title: isEditing ? "Produto atualizado" : "Produto criado",
        description: isEditing 
          ? "O produto foi atualizado com sucesso." 
          : "O produto foi criado com sucesso.",
      });
      
      if (!isEditing) {
        setFormData(defaultValues);
      }
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Por favor, corrija os erros no formulário.",
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nome do Produto</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? "border-destructive" : ""}
          />
          {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={errors.description ? "border-destructive" : ""}
        />
        {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="price">Preço (R$)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            className={errors.price ? "border-destructive" : ""}
          />
          {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="isOnSale">Em Promoção</Label>
            <Switch
              id="isOnSale"
              checked={formData.isOnSale}
              onCheckedChange={handleSwitchChange}
            />
          </div>
          
          {formData.isOnSale && (
            <>
              <Label htmlFor="promotionalPrice">Preço Promocional (R$)</Label>
              <Input
                id="promotionalPrice"
                name="promotionalPrice"
                type="number"
                step="0.01"
                min="0"
                value={formData.promotionalPrice || ''}
                onChange={handleChange}
                className={errors.promotionalPrice ? "border-destructive" : ""}
              />
              {errors.promotionalPrice && <p className="text-sm text-destructive">{errors.promotionalPrice}</p>}
            </>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="stock">Estoque</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            className={errors.stock ? "border-destructive" : ""}
          />
          {errors.stock && <p className="text-sm text-destructive">{errors.stock}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="imageUrl">URL da Imagem</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className={errors.imageUrl ? "border-destructive" : ""}
          placeholder="https://exemplo.com/imagem.jpg"
        />
        {errors.imageUrl && <p className="text-sm text-destructive">{errors.imageUrl}</p>}
        
        {formData.imageUrl && (
          <div className="mt-2 rounded-md overflow-hidden w-32 h-32 border">
            <img 
              src={formData.imageUrl} 
              alt="Preview" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/e2e8f0/a0aec0?text=Imagem+Inválida';
              }}
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Salvando...' : isEditing ? 'Atualizar Produto' : 'Criar Produto'}
        </Button>
      </div>
    </form>
  );
};

export default AdminProductForm;
