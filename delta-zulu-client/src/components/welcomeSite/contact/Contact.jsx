import { Container, Row, Col } from "react-bootstrap";
import { FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Imagen de portada */}
      <div className="contact-hero d-flex align-items-center justify-content-center">
        <h1 className="contact-title text-white text-center">Contacto</h1>
      </div>

      {/* Datos de contacto */}
      <section className="bg-white py-5">
        <Container>
          <Row className="text-center mb-4">
            <h2 className="fs-1 mb-4">¿Querés comunicarte con nosotros?</h2>
            <p className="fs-5">
              Estamos disponibles para resolver tus dudas y asesorarte.
            </p>
          </Row>

          <Row className="text-center g-4 justify-content-center">
            <Col xs={12} md={4}>
              <div className="contact-item">
                <FaWhatsapp className="contact-icon" />
                <h5>WhatsApp</h5>
                <p>+54 9 3471 676535</p>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <h5>Email</h5>
                <p>info@deltazulu.com.ar</p>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <h5>Teléfono</h5>
                <p>+54 3471 676535</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Cómo llegar */}
      <section className="bg-light py-5">
        <Container>
          <h3 className="fs-1 mb-4 text-center">¿Cómo llegar?</h3>
          <Row className="g-4 align-items-center">
            <Col md={6}>
              <iframe
                title="Mapa Delta Zulu"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3360.323641984416!2d-61.547501024993174!3d-32.62420375567478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c9f16ac87549b1%3A0x992206ffdbcd7af2!2sZarantonello%20Serv.%20A%C3%A9reos.%20-%20Delta%20Zulu%20Escuela%20de%20Vuelo!5e0!3m2!1ses!2sar!4v1752512253609!5m2!1ses!2sar"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Col>
            <Col md={6}>
              <p className="fs-5">
                Nuestra escuela está ubicada sobre la Ruta Nacional 178 Km 18,
                en Las Parejas, Santa Fe. Contamos con instalaciones modernas,
                cómodas y de fácil acceso tanto en vehículo particular como en
                transporte público.
              </p>
              <ul>
                <li>Estacionamiento gratuito dentro del predio.</li>
                <li>Acceso señalizado desde la ruta principal.</li>
                <li>A 10 minutos del centro de Las Parejas.</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Contact;
