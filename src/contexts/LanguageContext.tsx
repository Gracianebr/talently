
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    'nav.services': 'Serviços',
    'nav.differentials': 'Diferenciais',
    'nav.pricing': 'Planos',
    'nav.about': 'Sobre nós',
    'nav.contact': 'Fale conosco',
    'hero.title': 'os talentos certos para',
    'hero.title.highlight1': 'Contrate',
    'hero.title.highlight2': 'acelerar',
    'hero.title.end': 'o crescimento da sua empresa',
    'hero.subtitle': 'Conectamos empresas e startups em fase de tração ou scale-up a profissionais altamente qualificados, com foco em agilidade e assertividade no processo de contratação.',
    'hero.cta1': 'Agende uma reunião',
    'hero.cta2': 'Conheça nossos serviços',
    'about.title': 'Quem Somos',
    'about.description1': 'A Talently é uma startup focada em atender startups em fase de tração e scale-up — empresas que estão crescendo rapidamente, receberam investimento ou estão alcançando altos volumes de vendas, e agora enfrentam o desafio de contratar os talentos certos para continuar expandindo.',
    'about.description2': 'Nossa metodologia inclui match comportamental entre candidato e vaga, priorizando perfis com as soft skills ideais para a função, além de treinamentos gratuitos para candidatos em temas como soft skills, etiqueta profissional, expressão verbal, revisão gramatical e redação comercial.',
    'about.precision.title': 'Precisão',
    'about.precision.description': 'Para cada vaga, entregamos até 5 candidatos altamente qualificados.',
    'about.agility.title': 'Agilidade',
    'about.agility.description': 'Entregamos até 5 profissionais qualificados por vaga em até 7 dias úteis.',
    'about.quality.title': 'Qualidade',
    'about.quality.description': 'Talentos pré-qualificados e alinhados com a cultura da sua empresa.',
    'footer.company.description': 'Conectando startups aos melhores talentos do mercado para acelerar seu crescimento.',
    'footer.services': 'Serviços',
    'footer.services.headhunter': 'Headhunter',
    'footer.services.onboarding': 'Onboarding Assistido',
    'footer.quickLinks': 'Links Rápidos',
    'footer.quickLinks.about': 'Sobre nós',
    'footer.quickLinks.pricing': 'Planos',
    'footer.quickLinks.differentials': 'Diferenciais',
    'footer.quickLinks.privacy': 'Política de Privacidade',
    'footer.contact': 'Contato',
    'footer.copyright': 'Todos os direitos reservados.'
  },
  en: {
    'nav.services': 'Services',
    'nav.differentials': 'Differentials',
    'nav.pricing': 'Plans',
    'nav.about': 'About Us',
    'nav.contact': 'Contact Us',
    'hero.title': 'the right talent to',
    'hero.title.highlight1': 'Hire',
    'hero.title.highlight2': 'accelerate',
    'hero.title.end': 'your company\'s growth',
    'hero.subtitle': 'We connect companies and startups in traction or scale-up phase to highly qualified professionals, focusing on agility and assertiveness in the hiring process.',
    'hero.cta1': 'Schedule a meeting',
    'hero.cta2': 'Learn about our services',
    'about.title': 'Who We Are',
    'about.description1': 'Talently is a startup focused on serving startups in traction and scale-up phase — companies that are growing rapidly, have received investment or are achieving high sales volumes, and now face the challenge of hiring the right talent to continue expanding.',
    'about.description2': 'Our methodology includes behavioral matching between candidate and position, prioritizing profiles with ideal soft skills for the role, plus free training for candidates on topics such as soft skills, professional etiquette, verbal expression, grammar review and commercial writing.',
    'about.precision.title': 'Precision',
    'about.precision.description': 'For each position, we deliver up to 5 highly qualified candidates.',
    'about.agility.title': 'Agility',
    'about.agility.description': 'We deliver up to 5 qualified professionals per position within 7 business days.',
    'about.quality.title': 'Quality',
    'about.quality.description': 'Pre-qualified talents aligned with your company culture.',
    'footer.company.description': 'Connecting startups to the best talent in the market to accelerate their growth.',
    'footer.services': 'Services',
    'footer.services.headhunter': 'Headhunter',
    'footer.services.onboarding': 'Assisted Onboarding',
    'footer.quickLinks': 'Quick Links',
    'footer.quickLinks.about': 'About Us',
    'footer.quickLinks.pricing': 'Plans',
    'footer.quickLinks.differentials': 'Differentials',
    'footer.quickLinks.privacy': 'Privacy Policy',
    'footer.contact': 'Contact',
    'footer.copyright': 'All rights reserved.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt' ? 'en' : 'pt');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
