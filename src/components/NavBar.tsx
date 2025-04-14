
import React, { useState } from 'react';
import { Menu, X, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Componente para o Logo com ícone personalizado
const TalentlyLogo = () => {
  return (
    <div className="flex items-center">
      <div className="relative mr-2">
        <div className="w-10 h-10 bg-talently-purple rounded-full flex items-center justify-center">
          <Search className="text-white" size={20} />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex">
            <div className="w-2 h-5 bg-gray-400 rounded-full opacity-60 mx-0.5"></div>
            <div className="w-2 h-5 bg-talently-accent rounded-full mx-0.5"></div>
            <div className="w-2 h-5 bg-gray-400 rounded-full opacity-60 mx-0.5"></div>
          </div>
        </div>
      </div>
      <span className="text-2xl font-bold text-talently-purple">Talently</span>
    </div>
  );
};

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <TalentlyLogo />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-talently-gray hover:text-talently-purple transition-colors">
              Serviços
            </a>
            <a href="#differentials" className="text-talently-gray hover:text-talently-purple transition-colors">
              Diferenciais
            </a>
            <a href="#pricing" className="text-talently-gray hover:text-talently-purple transition-colors">
              Planos
            </a>
            <a href="#about" className="text-talently-gray hover:text-talently-purple transition-colors">
              Sobre nós
            </a>
            <Button 
              className="bg-talently-purple hover:bg-talently-blue text-white transition-colors"
              onClick={() => window.location.href='#contact'}
            >
              Fale conosco
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-talently-gray focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a href="#services" className="text-talently-gray hover:text-talently-purple transition-colors py-2" onClick={toggleMenu}>
                Serviços
              </a>
              <a href="#differentials" className="text-talently-gray hover:text-talently-purple transition-colors py-2" onClick={toggleMenu}>
                Diferenciais
              </a>
              <a href="#pricing" className="text-talently-gray hover:text-talently-purple transition-colors py-2" onClick={toggleMenu}>
                Planos
              </a>
              <a href="#about" className="text-talently-gray hover:text-talently-purple transition-colors py-2" onClick={toggleMenu}>
                Sobre nós
              </a>
              <Button 
                className="bg-talently-purple hover:bg-talently-blue text-white transition-colors w-full"
                onClick={() => {
                  window.location.href='#contact';
                  toggleMenu();
                }}
              >
                Fale conosco
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
