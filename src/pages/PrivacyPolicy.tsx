import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  useEffect(() => {
    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 id="top" className="text-3xl font-bold text-gray-900 mb-4">Política de Privacidade – Talently</h1>
          <p className="mb-6">
            <strong>Última atualização:</strong> abril de 2025
          </p>

          <p className="mb-6">
            A Talently valoriza a sua privacidade e está comprometida com a proteção dos seus dados pessoais, 
            em conformidade com a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados – LGPD). 
            Esta política descreve como coletamos, utilizamos, armazenamos e protegemos suas informações.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Quais dados coletamos</h2>
          <p className="mb-3">Coletamos os seguintes dados pessoais por meio de nossos formulários:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Nome completo</li>
            <li>E-mail</li>
            <li>Telefone</li>
            <li>Empresa e cargo</li>
            <li>Localização (cidade e estado)</li>
            <li>Informações sobre a vaga e número de contratações</li>
            <li>Outros dados fornecidos voluntariamente</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Finalidade do uso dos dados</h2>
          <p className="mb-3">Os dados coletados são utilizados para:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Entrar em contato e apresentar uma proposta personalizada</li>
            <li>Entender as necessidades da sua empresa</li>
            <li>Enviar comunicações relacionadas aos nossos serviços</li>
            <li>Melhorar nossos processos de atendimento e oferta</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Compartilhamento de dados</h2>
          <p className="mb-6">
            Não compartilhamos seus dados com terceiros, exceto quando necessário para execução do serviço 
            ou cumprimento de obrigações legais, sempre garantindo a confidencialidade das informações.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Armazenamento e segurança</h2>
          <p className="mb-6">
            Os dados são armazenados de forma segura e acessível apenas a pessoas autorizadas. 
            Utilizamos medidas técnicas e organizacionais para proteger suas informações de 
            acessos não autorizados ou uso indevido.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Seus direitos como titular</h2>
          <p className="mb-3">Nos termos da LGPD, você pode exercer os seguintes direitos:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Confirmar a existência de tratamento de seus dados</li>
            <li>Acessar, corrigir, atualizar ou excluir seus dados</li>
            <li>Revogar o consentimento a qualquer momento</li>
            <li>Solicitar a portabilidade dos dados</li>
          </ul>
          <p className="mb-6">
            Para exercer esses direitos, entre em contato conosco pelo e-mail <strong>contato@talently.com.br</strong>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Uso de cookies</h2>
          <p className="mb-6">
            Nosso site pode utilizar cookies para melhorar a sua experiência de navegação. 
            Você pode desabilitar os cookies nas configurações do seu navegador.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Alterações nesta política</h2>
          <p className="mb-6">
            Esta política pode ser atualizada periodicamente. Recomendamos revisá-la regularmente. 
            Notificaremos alterações significativas através do nosso site.
          </p>

          <p className="mb-6">
            Em caso de dúvidas ou solicitações, entre em contato com o nosso Encarregado de Dados (DPO) 
            pelo e-mail: <strong>contato@talently.com.br</strong>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
