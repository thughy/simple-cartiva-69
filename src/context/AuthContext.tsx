
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types';
import { loginUser } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });
  
  // Verificar se já está logado no localStorage
  useEffect(() => {
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('authUser');
      
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          console.error('Erro ao restaurar sessão:', error);
          localStorage.removeItem('authUser');
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false
        }));
      }
    };
    
    checkAuth();
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setAuthState(prev => ({
        ...prev,
        isLoading: true
      }));
      
      const user = await loginUser(email, password);
      
      if (user) {
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
        
        localStorage.setItem('authUser', JSON.stringify(user));
        
        toast({
          title: "Login realizado",
          description: `Bem-vindo de volta, ${user.name}!`,
        });
        
        return true;
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
        
        toast({
          variant: "destructive",
          title: "Erro ao fazer login",
          description: "E-mail ou senha incorretos.",
        });
        
        return false;
      }
    } catch (error) {
      console.error('Erro no login:', error);
      
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
      
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Ocorreu um erro durante o login. Tente novamente.",
      });
      
      return false;
    }
  };
  
  const logout = () => {
    localStorage.removeItem('authUser');
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };
  
  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
