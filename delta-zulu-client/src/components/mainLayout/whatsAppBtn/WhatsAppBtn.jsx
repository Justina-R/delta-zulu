import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppBtn.css";

const WhatsAppBtn = () => {
  return (
    <a
      href="https://wa.me/5493471200014" // Reemplaza por tu número correcto
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      <FaWhatsapp className="whatsapp-icon" />
      <span className="whatsapp-text">Contactate con nosotros</span>
    </a>
  );
};

export default WhatsAppBtn;
