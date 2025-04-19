
import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "A Talently transformou nossa forma de contratar. Encontramos perfis que realmente se encaixam na nossa cultura e nos ajudam a crescer.",
    author: "Ana Clara",
    position: "CEO da TechGrow",
    company: "TechGrow",
    avatar: "https://randomuser.me/api/portraits/women/42.jpg"
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
    quote: "O diferencial da Talently é o match comportamental. Isso nos ajudou a montar um time mais coeso e produtivo desde o primeiro dia.",
    author: "Carolina Santos",
    position: "Head de RH da GrowthSeed",
    company: "GrowthSeed",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
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
