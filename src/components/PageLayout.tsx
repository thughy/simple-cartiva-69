
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 mt-16 ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
