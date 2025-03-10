
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { LogIn } from 'lucide-react';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const fromPage = (location.state as LocationState)?.from?.pathname || '/admin';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    const success = await login(email, password);
    if (success) {
      navigate(fromPage, { replace: true });
    }
  };
  
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 flex items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md animate-fade-up">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Acesso Administrativo
            </CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais de administrador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={error && !email ? "border-destructive" : ""}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={error && !password ? "border-destructive" : ""}
                  required
                />
              </div>
              
              {error && (
                <div className="text-sm text-destructive">{error}</div>
              )}
              
              <Button 
                type="submit"
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2" />
                    Entrar
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-xs text-center text-muted-foreground mt-4">
              <strong>Usuário demonstrativo:</strong> admin@example.com<br />
              <strong>Senha:</strong> admin123
            </div>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Login;
