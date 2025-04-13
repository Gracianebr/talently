
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-talently-lightblue to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-talently-darkblue mb-6 animate-fade-in">
              <span className="text-talently-purple">Contrate</span> os talentos certos para <span className="text-talently-purple">acelerar</span> o crescimento da sua startup
            </h1>
            <p className="text-lg md:text-xl text-talently-gray mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Conectamos startups em fase de tração a profissionais altamente qualificados, com foco em agilidade e assertividade no processo de contratação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button 
                className="bg-talently-purple hover:bg-talently-blue text-white py-6 px-8 text-lg transition-all hover:shadow-lg flex items-center gap-2"
                onClick={() => window.location.href='#contact'}
              >
                Agende uma reunião <ArrowRight size={20} />
              </Button>
              <Button 
                variant="outline" 
                className="border-talently-purple text-talently-purple hover:bg-talently-purple hover:text-white py-6 px-8 text-lg transition-all"
                onClick={() => window.location.href='#services'}
              >
                Conheça nossos serviços
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-talently-lightblue opacity-20 rounded-full"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-talently-purple opacity-20 rounded-full"></div>
              <div className="rounded-lg shadow-xl relative z-10 overflow-hidden">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  className="w-full h-auto"
                  poster="https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
                >
                  <source src="https://cdn.dribbble.com/userupload/2450898/file/original-b9d4f8fb6e6a52f9477d7d860bb46730.mp4" type="video/mp4" />
                  Seu navegador não suporta vídeos HTML5.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
