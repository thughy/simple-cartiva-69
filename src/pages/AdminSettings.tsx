import { useState } from 'react';
import { ArrowLeft, Save, Smartphone, Paintbrush, Store, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/context/StoreContext';
import { StoreSettings } from '@/types';
import { Textarea } from '@/components/ui/textarea';

const AdminSettings = () => {
  const navigate = useNavigate();
  const { settings, saveSettings, isLoading } = useStore();
  
  const [formData, setFormData] = useState<StoreSettings>({
    storeName: settings.storeName,
    storeWhatsApp: settings.storeWhatsApp,
    storeColors: {
      primary: settings.storeColors.primary,
      secondary: settings.storeColors.secondary,
      accent: settings.storeColors.accent
    },
    storeLogo: settings.storeLogo,
    storeFooter: settings.storeFooter || {
      description: "Produtos de qualidade com design minimalista e funcional.",
      contactEmail: "contato@cartiva.com",
      contactPhone: "+55 (11) 9999-9999",
      copyrightYear: new Date().getFullYear().toString()
    }
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('color')) {
      const colorKey = name.replace('color', '').toLowerCase() as 'primary' | 'secondary' | 'accent';
      setFormData(prev => ({
        ...prev,
        storeColors: {
          ...prev.storeColors,
          [colorKey]: value
        }
      }));
    } else if (name.startsWith('footer')) {
      const footerKey = name.replace('footer', '').toLowerCase() as 'description' | 'contactemail' | 'contactphone' | 'copyrightyear';
      const mappedKey = footerKey === 'contactemail' ? 'contactEmail' : 
                         footerKey === 'contactphone' ? 'contactPhone' : 
                         footerKey === 'copyrightyear' ? 'copyrightYear' : footerKey;
      
      setFormData(prev => ({
        ...prev,
        storeFooter: {
          ...prev.storeFooter!,
          [mappedKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSettings(formData);
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
            
            <h1 className="text-3xl font-bold mb-2">Configurações da Loja</h1>
            <p className="text-muted-foreground">
              Personalize as configurações da sua loja online
            </p>
          </div>
          
          <Button 
            onClick={handleSubmit}
            className="flex items-center gap-2 button-hover"
            disabled={isLoading}
          >
            <Save className="h-5 w-5" />
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Store className="h-4 w-4" />
                Geral
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Contato
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Paintbrush className="h-4 w-4" />
                Aparência
              </TabsTrigger>
              <TabsTrigger value="footer" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Rodapé
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="mt-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Básicas</CardTitle>
                  <CardDescription>
                    Configure as informações básicas da sua loja
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Nome da Loja</Label>
                    <Input
                      id="storeName"
                      name="storeName"
                      value={formData.storeName}
                      onChange={handleChange}
                      placeholder="Minha Loja"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="storeLogo">URL do Logo (opcional)</Label>
                    <Input
                      id="storeLogo"
                      name="storeLogo"
                      value={formData.storeLogo || ''}
                      onChange={handleChange}
                      placeholder="https://exemplo.com/logo.png"
                    />
                    
                    {formData.storeLogo && (
                      <div className="mt-2 rounded-md overflow-hidden w-32 h-32 border">
                        <img 
                          src={formData.storeLogo} 
                          alt="Logo Preview" 
                          className="w-full h-full object-contain p-2"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/e2e8f0/a0aec0?text=Logo+Inválido';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contact" className="mt-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                  <CardDescription>
                    Configure os dados de contato para receber pedidos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="storeWhatsApp">Número de WhatsApp</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="storeWhatsApp"
                        name="storeWhatsApp"
                        value={formData.storeWhatsApp}
                        onChange={handleChange}
                        placeholder="5511999999999"
                        className="flex-1"
                      />
                      <a 
                        href={`https://wa.me/${formData.storeWhatsApp}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="button button-outline"
                      >
                        <Button variant="outline" type="button">Testar</Button>
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Insira apenas números, incluindo o código do país (ex: 5511999999999)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance" className="mt-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cores e Aparência</CardTitle>
                  <CardDescription>
                    Personalize as cores da sua loja
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="colorPrimary">Cor Primária</Label>
                      <div className="flex gap-2">
                        <div 
                          className="w-10 h-10 rounded border" 
                          style={{ backgroundColor: formData.storeColors.primary }}
                        />
                        <Input
                          type="color"
                          id="colorPrimary"
                          name="colorPrimary"
                          value={formData.storeColors.primary}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="colorSecondary">Cor Secundária</Label>
                      <div className="flex gap-2">
                        <div 
                          className="w-10 h-10 rounded border" 
                          style={{ backgroundColor: formData.storeColors.secondary }}
                        />
                        <Input
                          type="color"
                          id="colorSecondary"
                          name="colorSecondary"
                          value={formData.storeColors.secondary}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="colorAccent">Cor de Destaque</Label>
                      <div className="flex gap-2">
                        <div 
                          className="w-10 h-10 rounded border" 
                          style={{ backgroundColor: formData.storeColors.accent }}
                        />
                        <Input
                          type="color"
                          id="colorAccent"
                          name="colorAccent"
                          value={formData.storeColors.accent}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Prévia</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div 
                        className="p-4 rounded-lg shadow-sm text-center"
                        style={{ backgroundColor: formData.storeColors.primary, color: '#ffffff' }}
                      >
                        <p className="font-medium">Cor Primária</p>
                        <p className="text-sm mt-1 opacity-90">{formData.storeColors.primary}</p>
                      </div>
                      
                      <div 
                        className="p-4 rounded-lg shadow-sm text-center"
                        style={{ backgroundColor: formData.storeColors.secondary, color: '#000000' }}
                      >
                        <p className="font-medium">Cor Secundária</p>
                        <p className="text-sm mt-1 opacity-70">{formData.storeColors.secondary}</p>
                      </div>
                      
                      <div 
                        className="p-4 rounded-lg shadow-sm text-center"
                        style={{ backgroundColor: formData.storeColors.accent, color: '#ffffff' }}
                      >
                        <p className="font-medium">Cor de Destaque</p>
                        <p className="text-sm mt-1 opacity-90">{formData.storeColors.accent}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="footer" className="mt-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Rodapé</CardTitle>
                  <CardDescription>
                    Personalize o texto e informações exibidas no rodapé do site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="footerDescription">Descrição da Loja</Label>
                    <Textarea
                      id="footerDescription"
                      name="footerDescription"
                      value={formData.storeFooter?.description}
                      onChange={handleChange}
                      placeholder="Produtos de qualidade com design minimalista e funcional."
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="footerContactEmail">Email de Contato</Label>
                    <Input
                      id="footerContactEmail"
                      name="footerContactEmail"
                      type="email"
                      value={formData.storeFooter?.contactEmail}
                      onChange={handleChange}
                      placeholder="contato@cartiva.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="footerContactPhone">Telefone de Contato</Label>
                    <Input
                      id="footerContactPhone"
                      name="footerContactPhone"
                      value={formData.storeFooter?.contactPhone}
                      onChange={handleChange}
                      placeholder="+55 (11) 9999-9999"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="footerCopyrightYear">Ano do Copyright</Label>
                    <Input
                      id="footerCopyrightYear"
                      name="footerCopyrightYear"
                      value={formData.storeFooter?.copyrightYear}
                      onChange={handleChange}
                      placeholder="2025"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </PageLayout>
  );
};

export default AdminSettings;
