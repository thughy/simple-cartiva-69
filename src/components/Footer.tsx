
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Cartiva</h3>
          <p className="text-muted-foreground">
            Produtos de qualidade com design minimalista e funcional.
          </p>
        </div>
        
        <div>
          <h4 className="text-base font-medium mb-4">Links Rápidos</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Início
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Produtos
              </Link>
            </li>
            <li>
              <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Administração
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-base font-medium mb-4">Contato</h4>
          <p className="text-sm text-muted-foreground mb-2">
            contato@cartiva.com
          </p>
          <p className="text-sm text-muted-foreground">
            +55 (11) 9999-9999
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-border">
        <p className="text-sm text-center text-muted-foreground">
          © {currentYear} Cartiva. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
