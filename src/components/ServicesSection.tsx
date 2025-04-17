
import React from 'react';
import { Search, FileCheck, Users, CalendarCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Headhunting service steps based on Kaptas workflow
const headhuntingSteps = [
  {
    id: 1,
    title: "Entendimento do perfil",
    description: "Compreendemos profundamente as necessidades técnicas e comportamentais da sua empresa, cultura organizacional e objetivos de negócio.",
    icon: Search,
    color: "bg-blue-100"
  },
  {
    id: 2,
    title: "Busca qualificada",
    description: "Utilizamos nosso banco de talentos e metodologias avançadas para encontrar profissionais que se encaixam perfeitamente nos requisitos definidos.",
    icon: FileCheck,
    color: "bg-purple-100"
  },
  {
    id: 3,
    title: "Entrevistas e seleção",
    description: "Realizamos triagens técnicas e comportamentais para garantir o alinhamento do candidato com a posição e cultura da empresa.",
    icon: Users,
    color: "bg-green-100"
  },
  {
    id: 4,
    title: "Apresentação e fechamento",
    description: "Apresentamos os melhores candidatos com relatórios detalhados e acompanhamos todo o processo de contratação até a integração.",
    icon: CalendarCheck,
    color: "bg-orange-100"
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-talently-darkblue mb-4">
            Headhunting Especializado
          </h2>
          <p className="text-lg text-talently-gray max-w-3xl mx-auto">
            Busca ativa de talentos alinhados ao perfil comportamental e técnico da sua empresa, com match perfeito para crescimento acelerado.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto mb-10">
          <h3 className="text-2xl font-bold text-talently-purple mb-8 text-center">Como funciona nosso processo</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {headhuntingSteps.map((step) => (
              <Card key={step.id} className="border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className={`p-4 rounded-full ${step.color} w-16 h-16 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                      <step.icon className="w-8 h-8 text-talently-purple" />
                    </div>
                    <span className="text-3xl font-bold text-talently-purple">{step.id}</span>
                  </div>
                  <h3 className="text-xl font-bold text-talently-darkblue mb-3 group-hover:text-talently-purple transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-talently-gray">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-talently-gray italic max-w-3xl mx-auto mb-8">
            "Nossa metodologia de headhunting foi desenvolvida para identificar não apenas as habilidades técnicas, mas também o alinhamento cultural que garante contratações duradouras e de alto impacto."
          </p>
          <div className="inline-flex justify-center">
            <a
              href="#contact"
              className="bg-talently-purple hover:bg-talently-blue text-white py-3 px-6 rounded-md transition-colors flex items-center gap-2"
            >
              Conheça mais sobre nosso processo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
