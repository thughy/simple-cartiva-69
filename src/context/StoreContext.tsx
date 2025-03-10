
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StoreSettings } from '@/types';
import { getStoreSettings, updateStoreSettings } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface StoreContextType {
  settings: StoreSettings;
  isLoading: boolean;
  saveSettings: (newSettings: StoreSettings) => Promise<void>;
}

const defaultSettings: StoreSettings = {
  storeName: "Minha Loja",
  storeWhatsApp: "5511999999999",
  storeColors: {
    primary: "#3b82f6",
    secondary: "#f3f4f6",
    accent: "#8b5cf6"
  }
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<StoreSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getStoreSettings();
        setSettings(data);
      } catch (error) {
        console.error('Erro ao carregar configurações da loja:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSettings();
  }, []);
  
  const saveSettings = async (newSettings: StoreSettings) => {
    setIsLoading(true);
    
    try {
      const updatedSettings = await updateStoreSettings(newSettings);
      setSettings(updatedSettings);
      
      toast({
        title: "Configurações salvas",
        description: "As configurações da loja foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as configurações da loja.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <StoreContext.Provider value={{
      settings,
      isLoading,
      saveSettings
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
