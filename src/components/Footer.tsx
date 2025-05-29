
import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PrivacyPolicyDialog } from './PrivacyPolicyDialog';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-talently-darkblue text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Talently</h3>
            <p className="text-gray-300 mb-4">
              {t('footer.company.description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/company/talently-recruiter/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://www.instagram.com/talently.recruiter/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">{t('footer.services.headhunter')}</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">{t('footer.services.onboarding')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">{t('footer.quickLinks.about')}</a></li>
              <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors">{t('footer.quickLinks.pricing')}</a></li>
              <li><a href="#differentials" className="text-gray-300 hover:text-white transition-colors">{t('footer.quickLinks.differentials')}</a></li>
              <li>
                <PrivacyPolicyDialog>
                  <button className="text-gray-300 hover:text-white transition-colors text-left">
                    {t('footer.quickLinks.privacy')}
                  </button>
                </PrivacyPolicyDialog>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="mr-2 flex-shrink-0 mt-1" size={18} />
                <span className="text-gray-300">contato@talently.com.br</span>
              </li>
              <li className="flex items-start">
                <Phone className="mr-2 flex-shrink-0 mt-1" size={18} />
                <span className="text-gray-300">(19) 99741-6289</span>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 flex-shrink-0 mt-1" size={18} />
                <span className="text-gray-300">Campinas, SP - Brasil</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Talently. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
