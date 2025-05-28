
import React from 'react';
import { Target, Clock, CheckCircle } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-talently-purple opacity-10 rounded-full"></div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-talently-blue opacity-10 rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1565688534245-05d6b5be184a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                alt="Equipe Talently" 
                className="w-full h-auto rounded-xl shadow-lg relative z-10"
              />
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-talently-darkblue mb-6">
              Quem Somos
            </h2>
            <p className="text-lg text-talently-gray mb-6">
              A Talently é uma startup focada em atender startups em fase de tração e scale-up — empresas que estão crescendo rapidamente, receberam investimento ou estão alcançando altos volumes de vendas, e agora enfrentam o desafio de contratar os talentos certos para continuar expandindo.
            </p>
            <p className="text-lg text-talently-gray mb-8">
              Nossa metodologia inclui match comportamental entre candidato e vaga, priorizando perfis com as soft skills ideais para a função, além de treinamentos gratuitos para candidatos em temas como soft skills, etiqueta profissional, expressão verbal, revisão gramatical e redação comercial.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-talently-purple bg-opacity-10 mr-4">
                  <Target className="w-5 h-5 text-talently-purple" />
                </div>
                <div>
                  <h4 className="font-bold text-talently-darkblue text-lg mb-1">Precisão</h4>
                  <p className="text-talently-gray">Para cada vaga, entregamos até 5 candidatos altamente qualificados.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-talently-purple bg-opacity-10 mr-4">
                  <Clock className="w-5 h-5 text-talently-purple" />
                </div>
                <div>
                  <h4 className="font-bold text-talently-darkblue text-lg mb-1">Agilidade</h4>
                  <p className="text-talently-gray">Entregamos até 5 profissionais qualificados por vaga em até 7 dias úteis.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-talently-purple bg-opacity-10 mr-4">
                  <CheckCircle className="w-5 h-5 text-talently-purple" />
                </div>
                <div>
                  <h4 className="font-bold text-talently-darkblue text-lg mb-1">Qualidade</h4>
                  <p className="text-talently-gray">Talentos pré-qualificados e alinhados com a cultura da sua empresa.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
