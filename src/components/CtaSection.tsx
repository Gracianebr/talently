
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarPlus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CtaSection = () => {
  const { t } = useLanguage();

  const handleScheduleMeeting = () => {
    window.open('https://calendly.com/talentlyoficial', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-talently-purple">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          
          <div className="flex justify-center">
            <Button 
              onClick={handleScheduleMeeting}
              className="bg-white text-talently-purple hover:bg-talently-lightgray py-6 px-8 text-lg transition-all flex items-center gap-2"
            >
              <CalendarPlus className="mr-2" size={20} />
              {t('cta.button')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
