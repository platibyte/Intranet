
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Image, Info, Menu, X, Calendar } from 'lucide-react';
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  
  // Animation setup
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const menuItems = [
    { path: '/', label: 'Startseite', icon: Home },
    { path: '/photos', label: 'Fotos', icon: Image },
    { path: '/plans', label: 'Pläne', icon: Calendar },
    { path: '/info', label: 'Informationen', icon: Info },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 glass-panel px-4 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <span className="bg-primary text-white rounded-md w-20 h-8 flex items-center justify-center">Imhof</span>
            Intranet
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-md transition duration-200 hover:bg-secondary",
                    isActive && "bg-secondary font-medium text-primary"
                  )}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-md hover:bg-secondary"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      
      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm pt-20 px-4 animate-fade-in">
          <nav className="flex flex-col space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-2 p-4 rounded-lg text-lg transition duration-200",
                    isActive ? "bg-primary text-white" : "bg-secondary"
                  )}
                >
                  <Icon size={22} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
      
      <main className={cn("flex-1 container mx-auto px-4 py-6", mounted && "animate-fade-in")}>
        {children}
      </main>
      
      <footer className="glass-panel py-4 mt-auto">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>Familie Imhof - Intranet &copy; {new Date().getFullYear()} - Alle Rechte vorbehalten</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
