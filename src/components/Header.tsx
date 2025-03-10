
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
        isScrolled ? "glass-effect shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-semibold tracking-tight"
          onClick={closeMenu}
        >
          Cartiva
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" isActive={isActive('/')}>Início</NavLink>
          <NavLink to="/products" isActive={isActive('/products')}>Produtos</NavLink>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/bag" 
            className="p-2 rounded-full hover:bg-black/5 transition-colors relative"
            aria-label="Sacola de compras"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </Link>
          
          <button 
            className="md:hidden p-2 rounded-full hover:bg-black/5 transition-colors"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 pt-20 px-6 transition-transform duration-300 md:hidden",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav className="flex flex-col space-y-6 text-lg">
          <MobileNavLink to="/" onClick={closeMenu} isActive={isActive('/')}>
            Início
          </MobileNavLink>
          <MobileNavLink to="/products" onClick={closeMenu} isActive={isActive('/products')}>
            Produtos
          </MobileNavLink>
          <MobileNavLink to="/admin" onClick={closeMenu} isActive={isActive('/admin')}>
            Administração
          </MobileNavLink>
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({ 
  children, 
  to, 
  isActive 
}: { 
  children: React.ReactNode; 
  to: string; 
  isActive: boolean;
}) => (
  <Link 
    to={to} 
    className={cn(
      "text-sm font-medium transition-colors hover:text-primary",
      isActive ? "text-primary" : "text-foreground"
    )}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ 
  children, 
  to, 
  onClick,
  isActive 
}: { 
  children: React.ReactNode; 
  to: string;
  onClick: () => void;
  isActive: boolean;
}) => (
  <Link 
    to={to} 
    className={cn(
      "text-lg font-medium py-2 transition-colors hover:text-primary",
      isActive ? "text-primary" : "text-foreground"
    )}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Header;
