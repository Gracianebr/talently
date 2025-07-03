
import { Phone } from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const FloatingWhatsApp = () => {
  const { adminUser } = useAdminAuth();
  const whatsappLink = "https://wa.me/message/NZ54XTXJSETEO1";

  // Não mostrar WhatsApp para administradores
  if (adminUser) {
    return null;
  }

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5B] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 cursor-pointer flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <Phone size={24} strokeWidth={2.5} className="text-white" />
    </a>
  );
};

export default FloatingWhatsApp;
