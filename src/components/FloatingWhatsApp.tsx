
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  const whatsappLink = "https://wa.me/message/NZ54XTXJSETEO1";

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5B] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 cursor-pointer"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default FloatingWhatsApp;
