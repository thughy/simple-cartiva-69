
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { HomeIcon, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-sm max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Página não encontrada</p>
        <p className="text-gray-500 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/" className="flex items-center gap-2">
              <HomeIcon size={18} />
              Voltar para Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/cart" className="flex items-center gap-2">
              <ShoppingCart size={18} />
              Ver Sacola
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
