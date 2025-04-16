
import React from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PrivacyPolicyDialog } from './PrivacyPolicyDialog';

const Footer = () => {
  return (
    <footer className="bg-talently-darkblue text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Talently</h3>
            <p className="text-gray-300 mb-4">
              Conectando startups aos melhores talentos do mercado para acelerar seu crescimento.
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
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Education Recruiting</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Headhunter</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Outplacement</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Onboarding Assistido</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">Sobre nós</a></li>
              <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Planos</a></li>
              <li><a href="#differentials" className="text-gray-300 hover:text-white transition-colors">Diferenciais</a></li>
              <li>
                <PrivacyPolicyDialog>
                  <button className="text-gray-300 hover:text-white transition-colors text-left">
                    Política de Privacidade
                  </button>
                </PrivacyPolicyDialog>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contato</h4>
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
                <span className="text-gray-300">São Paulo, SP - Brasil</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Talently. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
