
import React, { useState } from 'react';
import { Menu, X, Users, User, UserRound, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';

// Logo Option 1: Three distinct user icons with middle one filled
const LogoOption1 = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex space-x-1">
        <User size={32} className="text-talently-purple" />
        <User size={32} className="text-talently-purple fill-talently-lightblue" />
        <User size={32} className="text-talently-purple" />
      </div>
      <span className="text-3xl font-bold tracking-tight text-talently-purple font-[Inter] uppercase">
        Talently
      </span>
    </div>
  );
};

// Logo Option 2: Single user icon
const LogoOption2 = () => {
  return (
    <div className="flex items-center gap-2">
      <User size={36} className="text-talently-purple" />
      <span className="text-3xl font-bold tracking-tight text-talently-purple font-[Inter] uppercase">
        Talently
      </span>
    </div>
  );
};

// Logo Option 3: Single user rounded icon
const LogoOption3 = () => {
  return (
    <div className="flex items-center gap-2">
      <UserRound size={36} className="text-talently-purple" />
      <span className="text-3xl font-bold tracking-tight text-talently-purple font-[Inter] uppercase">
        Talently
      </span>
    </div>
  );
};

// Logo Option 4: Single user rounded icon filled
const LogoOption4 = () => {
  return (
    <div className="flex items-center gap-2">
      <UserRound size={36} className="text-talently-purple fill-talently-lightblue" />
      <span className="text-3xl font-bold tracking-tight text-talently-purple font-[Inter] uppercase">
        Talently
      </span>
    </div>
  );
};

// Logo Option 5: Single users icon (multiple people)
const LogoOption5 = () => {
  return (
    <div className="flex items-center gap-2">
      <Users size={36} className="text-talently-purple" />
      <span className="text-3xl font-bold tracking-tight text-talently-purple font-[Inter] uppercase">
        Talently
      </span>
    </div>
  );
};

// Current logo selection - change the number to test different options (1-5)
const TalentlyLogo = () => {
  const logoOption: 1 | 2 | 3 | 4 | 5 = 1;
  
  switch(logoOption) {
    case 1: return <LogoOption1 />;
    case 2: return <LogoOption2 />;
    case 3: return <LogoOption3 />;
    case 4: return <LogoOption4 />;
    case 5: return <LogoOption5 />;
    default: return <LogoOption1 />;
  }
};

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

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
              {t('nav.services')}
            </a>
            <a href="#differentials" className="text-talently-gray hover:text-talently-purple transition-colors">
              {t('nav.differentials')}
            </a>
            <a href="#pricing" className="text-talently-gray hover:text-talently-purple transition-colors">
              {t('nav.pricing')}
            </a>
            <a href="#about" className="text-talently-gray hover:text-talently-purple transition-colors">
              {t('nav.about')}
            </a>
            <Button 
              variant="ghost"
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-talently-gray hover:text-talently-purple"
            >
              <Globe size={18} />
              {language === 'pt' ? 'EN' : 'PT'}
            </Button>
            <Button 
              className="bg-talently-purple hover:bg-talently-blue text-white transition-colors"
              onClick={() => window.location.href='#contact'}
            >
              {t('nav.contact')}
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
                {t('nav.services')}
              </a>
              <a href="#differentials" className="text-talently-gray hover:text-talently-purple transition-colors py-2" onClick={toggleMenu}>
                {t('nav.differentials')}
              </a>
              <a href="#pricing" className="text-talently-gray hover:text-talently-purple transition-colors py-2" onClick={toggleMenu}>
                {t('nav.pricing')}
              </a>
              <a href="#about" className="text-talently-gray hover:text-talently-purple transition-colors py-2" onClick={toggleMenu}>
                {t('nav.about')}
              </a>
              <Button 
                variant="ghost"
                onClick={() => {
                  toggleLanguage();
                  toggleMenu();
                }}
                className="flex items-center gap-2 text-talently-gray hover:text-talently-purple justify-start"
              >
                <Globe size={18} />
                {language === 'pt' ? 'English' : 'Português'}
              </Button>
              <Button 
                className="bg-talently-purple hover:bg-talently-blue text-white transition-colors w-full"
                onClick={() => {
                  window.location.href='#contact';
                  toggleMenu();
                }}
              >
                {t('nav.contact')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
