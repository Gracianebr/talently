
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-talently-lightgray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-talently-darkblue mb-4">
            Planos e Investimento
          </h2>
          <p className="text-lg text-talently-gray max-w-3xl mx-auto">
            Escolha o plano ideal para as necessidades de contratação da sua startup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Contratação Avulsa */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-talently-darkblue mb-4">Contratação Avulsa</h3>
            <p className="text-talently-gray mb-6">Ideal para startups com necessidades pontuais de contratação.</p>
            
            <div className="mb-6">
              <div className="text-talently-darkblue font-bold text-3xl mb-1">A partir de R$ 3.500</div>
              <p className="text-talently-gray text-sm">por vaga</p>
            </div>
            
            <div className="border-t border-gray-100 pt-6 mb-8">
              <p className="text-talently-purple font-bold mb-4">O que está incluído:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-talently-purple mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-talently-gray">Até 5 candidatos qualificados</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-talently-purple mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-talently-gray">Match comportamental</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-talently-purple mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-talently-gray">Treinamentos gratuitos para candidatos</span>
                </li>
              </ul>
            </div>
            
            <Button variant="outline" className="w-full py-6 border-talently-purple text-talently-purple hover:bg-talently-purple hover:text-white transition-colors" onClick={() => window.location.href='#contact'}>
              Fale com um consultor
            </Button>
          </div>
          
          {/* Plano Recorrente */}
          <div className="bg-talently-purple text-white rounded-xl shadow-lg p-8 border border-talently-purple hover:shadow-xl transition-shadow relative transform md:scale-110 md:-translate-y-4">
            <div className="absolute -top-4 right-0 left-0 mx-auto w-max bg-talently-accent text-talently-darkblue px-4 py-1 rounded-full text-sm font-bold">
              MAIS POPULAR
            </div>
            
            <h3 className="text-2xl font-bold mb-4">Plano Recorrente</h3>
            <p className="text-white opacity-90 mb-6">Ideal para startups em fase de crescimento contínuo.</p>
            
            <div className="mb-6">
              <div className="font-bold text-3xl mb-1">Personalizado</div>
              <p className="text-white opacity-80 text-sm">pacotes anuais (mín. 12 meses)</p>
            </div>
            
            <div className="border-t border-white border-opacity-20 pt-6 mb-8">
              <p className="font-bold mb-4">O que está incluído:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-white opacity-90">Pacotes de contratações anuais</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-white opacity-90">Preços diferenciados por volume</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-white opacity-90">Dashboard de KPIs exclusivo</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-white opacity-90">Prioridade nos processos</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-white opacity-90">Consultor dedicado</span>
                </li>
              </ul>
            </div>
            
            <Button className="w-full py-6 bg-white text-talently-purple hover:bg-talently-lightgray transition-colors" onClick={() => window.location.href='#contact'}>
              Fale com um consultor
            </Button>
          </div>
          
          {/* Serviços Adicionais */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold text-talently-darkblue mb-4">Serviços Adicionais</h3>
            <p className="text-talently-gray mb-6">Complemente sua estratégia de recrutamento.</p>
            
            <div className="mb-6">
              <div className="text-talently-darkblue font-bold text-3xl mb-1">Sob consulta</div>
              <p className="text-talently-gray text-sm">preços personalizados</p>
            </div>
            
            <div className="border-t border-gray-100 pt-6 mb-8">
              <p className="text-talently-purple font-bold mb-4">Serviços disponíveis:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-talently-purple mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-talently-gray">Onboarding Assistido (30 dias)</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-talently-purple mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-talently-gray">Curso de português para estrangeiros</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-talently-purple mr-2 flex-shrink-0 mt-1" size={18} />
                  <span className="text-talently-gray">Culture Match personalizado</span>
                </li>
              </ul>
            </div>
            
            <Button variant="outline" className="w-full py-6 border-talently-purple text-talently-purple hover:bg-talently-purple hover:text-white transition-colors" onClick={() => window.location.href='#contact'}>
              Saiba mais
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
