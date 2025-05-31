
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';

const PricingSection = () => {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-16 md:py-24 bg-talently-lightgray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-talently-darkblue mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-lg text-talently-gray max-w-3xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Contratação Avulsa */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-talently-darkblue mb-4">{t('pricing.plan1.title')}</h3>
            <p className="text-talently-gray mb-6">{t('pricing.plan1.description')}</p>
            
            <div className="mb-6">
              <div className="text-talently-darkblue font-bold text-3xl mb-1">{t('pricing.plan1.price')}</div>
              <p className="text-talently-gray text-sm">{t('pricing.plan1.period')}</p>
            </div>
            
            <div className="border-t border-gray-100 pt-6 mb-8">
              <p className="text-talently-purple font-bold mb-4">{t('pricing.plan1.included')}</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-talently-purple mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-talently-gray">{t('pricing.plan1.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-talently-purple mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-talently-gray">{t('pricing.plan1.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-talently-purple mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-talently-gray">{t('pricing.plan1.feature3')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-talently-purple mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-talently-gray">{t('pricing.plan1.feature4')}</span>
                </li>
              </ul>
            </div>
            
            <Button variant="outline" className="w-full py-6 border-talently-purple text-talently-purple hover:bg-talently-purple hover:text-white transition-colors" onClick={() => window.location.href='#contact'}>
              {t('pricing.plan1.cta')}
            </Button>
          </div>
          
          {/* Plano Recorrente */}
          <div className="bg-talently-purple text-white rounded-xl shadow-lg p-8 border border-talently-purple hover:shadow-xl transition-shadow relative transform md:scale-110 md:-translate-y-4">
            <div className="absolute -top-4 right-0 left-0 mx-auto w-max bg-talently-accent text-talently-darkblue px-4 py-1 rounded-full text-sm font-bold">
              {t('pricing.popular')}
            </div>
            
            <h3 className="text-2xl font-bold mb-4">{t('pricing.plan2.title')}</h3>
            <p className="text-white opacity-90 mb-6">{t('pricing.plan2.description')}</p>
            
            <div className="mb-6">
              <div className="font-bold text-3xl mb-1">{t('pricing.plan2.price')}</div>
              <p className="text-white opacity-80 text-sm">{t('pricing.plan2.period')}</p>
            </div>
            
            <div className="border-t border-white border-opacity-20 pt-6 mb-8">
              <p className="font-bold mb-4">{t('pricing.plan2.included')}</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-white opacity-90">{t('pricing.plan2.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-white opacity-90">{t('pricing.plan2.feature2')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-white opacity-90">{t('pricing.plan2.feature3')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-white opacity-90">{t('pricing.plan2.feature4')}</span>
                </li>
              </ul>
            </div>
            
            <Button className="w-full py-6 bg-white text-talently-purple hover:bg-talently-lightgray transition-colors" onClick={() => window.location.href='#contact'}>
              {t('pricing.plan2.cta')}
            </Button>
          </div>
          
          {/* Serviços Adicionais */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-talently-darkblue mb-4">{t('pricing.plan3.title')}</h3>
            <p className="text-talently-gray mb-6">{t('pricing.plan3.description')}</p>
            
            <div className="mb-6">
              <div className="text-talently-darkblue font-bold text-3xl mb-1">{t('pricing.plan3.price')}</div>
              <p className="text-talently-gray text-sm">{t('pricing.plan3.period')}</p>
            </div>
            
            <div className="border-t border-gray-100 pt-6 mb-8">
              <p className="text-talently-purple font-bold mb-4">{t('pricing.plan3.included')}</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-talently-purple mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-talently-gray">{t('pricing.plan3.feature1')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-talently-purple mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-talently-gray">{t('pricing.plan3.feature2')}</span>
                </li>
              </ul>
            </div>
            
            <Button variant="outline" className="w-full py-6 border-talently-purple text-talently-purple hover:bg-talently-purple hover:text-white transition-colors" onClick={() => window.location.href='#contact'}>
              {t('pricing.plan3.cta')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
