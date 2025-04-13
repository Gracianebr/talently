
import React from 'react';
import { GraduationCap, Users, LifeBuoy, ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    id: 1,
    title: "Education Recruiting",
    description: "Seleção especializada para instituições de ensino e startups edtech, com foco em perfis pedagógicos e técnicos.",
    icon: GraduationCap,
    color: "bg-blue-100"
  },
  {
    id: 2,
    title: "Headhunter",
    description: "Busca ativa de talentos alinhados ao perfil comportamental e técnico da sua startup, com match perfeito para crescimento acelerado.",
    icon: Users,
    color: "bg-purple-100"
  },
  {
    id: 3,
    title: "Outplacement",
    description: "Suporte na recolocação de profissionais em processos de reestruturação, preservando a cultura e reputação da empresa.",
    icon: ArrowUpRight,
    color: "bg-green-100"
  },
  {
    id: 4,
    title: "Onboarding Assistido",
    description: "Acompanhamento nos primeiros 30 dias do colaborador, garantindo integração eficiente e ajuste de expectativas.",
    icon: LifeBuoy,
    color: "bg-orange-100"
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-talently-darkblue mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg text-talently-gray max-w-3xl mx-auto">
            Soluções completas para atrair, selecionar e integrar os melhores talentos à sua startup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={service.id} className="border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
              <CardContent className="p-6">
                <div className={`p-4 rounded-full ${service.color} w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8 text-talently-purple" />
                </div>
                <h3 className="text-xl font-bold text-talently-darkblue mb-3 group-hover:text-talently-purple transition-colors">
                  {service.title}
                </h3>
                <p className="text-talently-gray">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
