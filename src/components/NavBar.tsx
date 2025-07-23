
import React, { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Função para navegar à página de login futuramente
  const goToLogin = () => {
    window.location.href = "/login"; // Quando rota /login estiver pronta, pode ser ajustado para react-router
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-talently-purple">Talently</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-talently-gray hover:text-talently-purple transition-colors"
            >
              {t('nav.services')}
            </button>
            <button 
              onClick={() => scrollToSection('differentials')}
              className="text-talently-gray hover:text-talently-purple transition-colors"
            >
              {t('nav.differentials')}
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-talently-gray hover:text-talently-purple transition-colors"
            >
              {t('nav.pricing')}
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-talently-gray hover:text-talently-purple transition-colors"
            >
              {t('nav.about')}
            </button>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Botão Fale Conosco */}
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-talently-purple text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              {t('nav.contact')}
            </button>
            {/* Botão Login */}
            <button
              onClick={goToLogin}
              className="flex items-center bg-talently-darkblue text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors ml-2"
            >
              <LogIn size={18} className="mr-2" />
              <span className="text-sm font-semibold">Acessar</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Language Selector Mobile */}
            <LanguageSelector />
            
            <button onClick={toggleMenu} className="text-talently-gray hover:text-talently-purple">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="py-4 space-y-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="block w-full text-left text-talently-gray hover:text-talently-purple transition-colors"
              >
                {t('nav.services')}
              </button>
              <button 
                onClick={() => scrollToSection('differentials')}
                className="block w-full text-left text-talently-gray hover:text-talently-purple transition-colors"
              >
                {t('nav.differentials')}
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left text-talently-gray hover:text-talently-purple transition-colors"
              >
                {t('nav.pricing')}
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-talently-gray hover:text-talently-purple transition-colors"
              >
                {t('nav.about')}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left bg-talently-purple text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
              >
                {t('nav.contact')}
              </button>
              {/* Botão Login Mobile */}
              <button
                onClick={goToLogin}
                className="flex items-center w-full text-left bg-talently-darkblue text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
              >
                <LogIn size={18} className="mr-2" />
                <span className="text-sm font-semibold">Acessar</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
