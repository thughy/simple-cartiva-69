
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import PageLayout from '@/components/PageLayout';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-16 px-4">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  // Only admin routes require authentication
  if (location.pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    // Verify admin role
    if (user?.role !== 'admin') {
      return <Navigate to="/" replace />;
    }
  }
  
  return <>{children}</>;
};

export default PrivateRoute;
