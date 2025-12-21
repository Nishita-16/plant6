import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusCircle, Map, User, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/search', icon: Search, label: 'Search' },
  { path: '/add-post', icon: PlusCircle, label: 'Add Post' },
  { path: '/map', icon: Map, label: 'Map' },
];

const TopNavbar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useApp();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border hidden md:block">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-semibold text-foreground leading-tight">
                AYUSH Garden
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                Virtual Herbal Garden
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Profile / Auth */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/profile">
                <motion.div
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary"
                  />
                  <span className="text-sm font-medium text-foreground">{user?.name}</span>
                </motion.div>
              </Link>
            ) : (
              <Link to="/profile">
                <Button variant="default" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
