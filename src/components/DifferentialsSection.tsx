
import React from 'react';
import { Globe, UserCheck, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const DifferentialsSection = () => {
  const { t } = useLanguage();

  const differentials = [
    {
      id: 1,
      title: t('differentials.international.title'),
      description: t('differentials.international.description'),
      icon: Globe,
    },
    {
      id: 2,
      title: t('differentials.onboarding.title'),
      description: t('differentials.onboarding.description'),
      icon: UserCheck,
    },
    {
      id: 3,
      title: t('differentials.guarantee.title'),
      description: t('differentials.guarantee.description'),
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="differentials" className="py-16 md:py-24 bg-talently-lightgray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-talently-darkblue mb-4">
            {t('differentials.title')}
          </h2>
          <p className="text-lg text-talently-gray max-w-3xl mx-auto">
            {t('differentials.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item, index) => (
            <div 
              key={item.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-talently-purple"
            >
              <div className="flex items-start mb-4">
                <div className="p-2 rounded-md bg-talently-purple bg-opacity-10 mr-4">
                  <item.icon className="w-6 h-6 text-talently-purple" />
                </div>
                <h3 className="text-xl font-bold text-talently-darkblue">
                  {item.title}
                </h3>
              </div>
              <p className="text-talently-gray">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
