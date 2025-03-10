
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, CreditCard, Truck, MapPin, MessageSquare } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [observations, setObservations] = useState('');
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const formattedPrice = (price: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!name.trim()) errors.name = 'Nome é obrigatório';
    if (!email.trim()) errors.email = 'E-mail é obrigatório';
    if (!phone.trim()) errors.phone = 'Telefone é obrigatório';
    if (!address.trim()) errors.address = 'Endereço é obrigatório';
    if (!city.trim()) errors.city = 'Cidade é obrigatória';
    if (!state.trim()) errors.state = 'Estado é obrigatório';
    if (!zipCode.trim()) errors.zipCode = 'CEP é obrigatório';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleWhatsAppOrder = () => {
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Erro no formulário",
        description: "Por favor, preencha todos os campos obrigatórios.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const phoneNumber = '5511999999999'; // Substituir pelo número real
      
      let message = encodeURIComponent(
        `*NOVO PEDIDO*\n\n` +
        `*Dados do Cliente:*\n` +
        `Nome: ${name}\n` +
        `E-mail: ${email}\n` +
        `Telefone: ${phone}\n\n` +
        `*Endereço de Entrega:*\n` +
        `${address}\n` +
        `${city} - ${state}\n` +
        `CEP: ${zipCode}\n\n` +
        `*Itens do Pedido:*\n`
      );
      
      // Adicionar produtos ao pedido
      cart.forEach((item, index) => {
        const productPrice = item.product.isOnSale && item.product.promotionalPrice 
          ? item.product.promotionalPrice 
          : item.product.price;
          
        const productTotal = productPrice * item.quantity;
        
        message += encodeURIComponent(
          `${index + 1}. ${item.product.name}\n` +
          `   Quantidade: ${item.quantity}\n` +
          `   Preço unitário: ${formattedPrice(productPrice)}\n` +
          `   Subtotal: ${formattedPrice(productTotal)}\n\n`
        );
      });
      
      // Adicionar observações se houver
      if (observations.trim()) {
        message += encodeURIComponent(
          `*Observações:*\n${observations}\n\n`
        );
      }
      
      // Adicionar total do pedido
      message += encodeURIComponent(
        `*Total do Pedido: ${formattedPrice(totalPrice)}*\n\n` +
        `Aguardo confirmação do pedido. Obrigado!`
      );
      
      // Abrir WhatsApp após 1 segundo para simular processamento
      setTimeout(() => {
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
        
        setIsComplete(true);
        clearCart();
        
        toast({
          title: "Pedido enviado!",
          description: "Seu pedido foi enviado para o WhatsApp do vendedor.",
        });
        
        setIsSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      setIsSubmitting(false);
      
      toast({
        variant: "destructive",
        title: "Erro ao processar",
        description: "Ocorreu um erro ao processar seu pedido. Tente novamente.",
      });
    }
  };
  
  if (isComplete) {
    return (
      <PageLayout>
        <div className="container mx-auto py-16 px-4 page-transition">
          <div className="max-w-md mx-auto text-center py-12 animate-fade-up">
            <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Pedido Realizado com Sucesso!</h1>
            <p className="text-muted-foreground mb-8">
              Seu pedido foi enviado para o WhatsApp do vendedor. Em breve você receberá uma confirmação.
            </p>
            <Button onClick={() => navigate('/')} className="mx-2 mb-2">
              Voltar para a Home
            </Button>
            <Button variant="outline" onClick={() => navigate('/products')} className="mx-2 mb-2">
              Continuar Comprando
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 page-transition">
        <button 
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-sm mb-6 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a sacola
        </button>
        
        <h1 className="text-2xl font-bold mb-8">Finalizar Compra</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            <div className="bg-card rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                Informações de Entrega
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={formErrors.name ? "border-destructive" : ""}
                  />
                  {formErrors.name && <p className="text-xs text-destructive">{formErrors.name}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={formErrors.email ? "border-destructive" : ""}
                  />
                  {formErrors.email && <p className="text-xs text-destructive">{formErrors.email}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={formErrors.phone ? "border-destructive" : ""}
                  />
                  {formErrors.phone && <p className="text-xs text-destructive">{formErrors.phone}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className={formErrors.zipCode ? "border-destructive" : ""}
                  />
                  {formErrors.zipCode && <p className="text-xs text-destructive">{formErrors.zipCode}</p>}
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={formErrors.address ? "border-destructive" : ""}
                  />
                  {formErrors.address && <p className="text-xs text-destructive">{formErrors.address}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={formErrors.city ? "border-destructive" : ""}
                  />
                  {formErrors.city && <p className="text-xs text-destructive">{formErrors.city}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className={formErrors.state ? "border-destructive" : ""}
                  />
                  {formErrors.state && <p className="text-xs text-destructive">{formErrors.state}</p>}
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <Truck className="h-5 w-5 mr-2 text-primary" />
                Método de Entrega
              </h2>
              
              <Tabs defaultValue="standard">
                <TabsList className="w-full">
                  <TabsTrigger value="standard" className="flex-1">Padrão</TabsTrigger>
                  <TabsTrigger value="express" className="flex-1">Expressa</TabsTrigger>
                </TabsList>
                
                <TabsContent value="standard" className="pt-4">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium">Entrega Padrão</div>
                      <div className="text-sm text-muted-foreground">Entrega em até 7 dias úteis</div>
                    </div>
                    <div className="text-emerald-600 font-medium">Grátis</div>
                  </div>
                </TabsContent>
                
                <TabsContent value="express" className="pt-4">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium">Entrega Expressa</div>
                      <div className="text-sm text-muted-foreground">Entrega em até 2 dias úteis</div>
                    </div>
                    <div className="font-medium">R$ 20,00</div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="bg-card rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-lg font-medium mb-4">Observações</h2>
              <textarea 
                className="w-full h-24 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Alguma informação adicional sobre seu pedido..."
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
              ></textarea>
            </div>
          </div>
          
          <div className="w-full lg:w-96">
            <div className="bg-card rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="font-medium text-lg mb-4">Resumo do Pedido</h2>
              
              <ScrollArea className="h-56 mb-4">
                <div className="space-y-3">
                  {cart.map((item) => {
                    const price = item.product.isOnSale && item.product.promotionalPrice 
                      ? item.product.promotionalPrice 
                      : item.product.price;
                      
                    return (
                      <div key={item.product.id} className="flex items-center py-2">
                        <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="ml-3 flex-grow">
                          <div className="font-medium text-sm">{item.product.name}</div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>Qtd: {item.quantity}</span>
                            <span className="mx-1">•</span>
                            <span>{formattedPrice(price)}</span>
                          </div>
                        </div>
                        
                        <div className="font-medium text-sm">
                          {formattedPrice(price * item.quantity)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
              
              <Separator className="my-4" />
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formattedPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="text-emerald-600">Grátis</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-medium text-lg mb-6">
                <span>Total</span>
                <span>{formattedPrice(totalPrice)}</span>
              </div>
              
              <Button 
                onClick={handleWhatsAppOrder}
                className="w-full mb-3 bg-[#25D366] hover:bg-[#20bd59] text-white button-hover"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white"></div>
                ) : (
                  <>
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Finalizar via WhatsApp
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/cart')}
                disabled={isSubmitting}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Pagar com Cartão
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Checkout;
