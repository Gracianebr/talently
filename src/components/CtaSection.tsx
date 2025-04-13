
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarPlus } from 'lucide-react';

const CtaSection = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-talently-purple">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para acelerar o crescimento da sua startup com os talentos certos?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Agende uma reunião com nossos consultores e descubra como a Talently pode transformar seu processo de recrutamento.
          </p>
          
          <div className="flex justify-center">
            <Button className="bg-white text-talently-purple hover:bg-talently-lightgray py-6 px-8 text-lg transition-all flex items-center gap-2">
              <CalendarPlus className="mr-2" size={20} />
              Agendar reunião
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
