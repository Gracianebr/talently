
import React from 'react';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import DifferentialsSection from '../components/DifferentialsSection';
import PricingSection from '../components/PricingSection';
import TestimonialSection from '../components/TestimonialSection';
import AboutSection from '../components/AboutSection';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <HeroSection />
      <ServicesSection />
      <DifferentialsSection />
      <AboutSection />
      <PricingSection />
      <TestimonialSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
