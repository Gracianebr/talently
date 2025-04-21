import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "A Talently transformou nossa forma de contratar. Encontramos perfis que realmente se encaixam na nossa cultura e nos ajudam a crescer.",
    author: "Suzanna",
    position: "Co-founder da",
    company: "Zold Brasil",
    avatar: "/lovable-uploads/f1266160-07dc-44b6-9633-aabc0c115594.png",
    companyUrl: "https://www.zoldbrasil.com/"
  },
  {
    id: 2,
    quote: "A Talently nos disponibilizou de forma muito rápida e eficiente, dois SDRs que nos ajudou muito na validação do ICP de nosso produto na fase de planejamento de nossa startup.",
    author: "Peter Godoi",
    position: "Co-Fundador da",
    company: "Let's Vou",
    avatar: "/lovable-uploads/89bf49da-f4e7-476a-96a6-4412076321a5.png",
    linkedinUrl: "https://www.linkedin.com/in/peter-godoi-16025410?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    companyUrl: "https://www.letsvou.com/"
  },
  {
    id: 3,
    quote: "Hoje consigo produzir conteúdo para diversas redes sociais, de forma consistente e condizente com a minha proposta e perfil, graças a uma excelente profissional que veio pela Talently",
    author: "Danilo Mendes",
    position: "Sócio da",
    company: "MartelloEF",
    avatar: "/lovable-uploads/3d7be94e-b169-4f4d-b478-4d2750692f3d.png",
    linkedinUrl: "https://www.instagram.com/aqueledann/",
    companyUrl: "https://martelloef.com.br/"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-talently-lightgray to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-talently-darkblue mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg text-talently-gray max-w-3xl mx-auto">
            Startups que cresceram com o talento certo no time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow relative">
              <Quote className="text-talently-purple opacity-20 w-16 h-16 absolute -top-6 -left-6" />
              <div className="relative z-10">
                <p className="text-talently-gray italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    {testimonial.linkedinUrl ? (
                      <h4 className="font-bold text-talently-darkblue">
                        <a 
                          href={testimonial.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {testimonial.author}
                        </a>
                      </h4>
                    ) : (
                      <h4 className="font-bold text-talently-darkblue">{testimonial.author}</h4>
                    )}
                    <p className="text-talently-gray text-sm">
                      {testimonial.position}{' '}
                      {testimonial.companyUrl ? (
                        <a 
                          href={testimonial.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {testimonial.company}
                        </a>
                      ) : (
                        testimonial.company
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
