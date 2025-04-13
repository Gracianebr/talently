
import React from 'react';
import { Brain, GamepadIcon, Globe, UserCheck, LineChart, HeartHandshake } from 'lucide-react';

const differentials = [
  {
    id: 1,
    title: "Inteligência Artificial no Match",
    description: "Nossa plataforma com IA fornece dados em tempo real, testes, vídeos de apresentação e análise de compatibilidade comportamental.",
    icon: Brain,
  },
  {
    id: 2,
    title: "Testes Gamificados",
    description: "Avaliações técnicas, de lógica e soft skills automatizadas, com simulações de situações reais e análise comportamental.",
    icon: GamepadIcon,
  },
  {
    id: 3,
    title: "Vagas Internacionais",
    description: "Busca de talentos na América Latina para posições remotas, incluindo curso intensivo de português para estrangeiros.",
    icon: Globe,
  },
  {
    id: 4,
    title: "Onboarding Assistido",
    description: "Acompanhamento especializado nos primeiros 30 dias, com ajustes de expectativas e feedback contínuo para garantir sucesso.",
    icon: UserCheck,
  },
  {
    id: 5,
    title: "Dashboard de KPIs",
    description: "Métricas de recrutamento em tempo real, com indicadores de desempenho para tomada de decisão baseada em dados.",
    icon: LineChart,
  },
  {
    id: 6,
    title: "Culture Match",
    description: "Análise de fit cultural entre candidato e empresa, reduzindo turnover e melhorando engajamento a longo prazo.",
    icon: HeartHandshake,
  },
];

const DifferentialsSection = () => {
  return (
    <section id="differentials" className="py-16 md:py-24 bg-talently-lightgray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-talently-darkblue mb-4">
            Nossos Diferenciais
          </h2>
          <p className="text-lg text-talently-gray max-w-3xl mx-auto">
            Inovações que transformam o processo de recrutamento e seleção para startups em crescimento.
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
