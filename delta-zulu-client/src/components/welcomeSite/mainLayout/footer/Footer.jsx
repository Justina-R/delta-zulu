import { Container, Row, Col } from 'react-bootstrap'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <Container className="py-5">
        <Row>
          {/* Columna izquierda */}
          <Col xs={12} md={6} className="mb-4 mb-md-0">
            <h5 className="fw-bold mb-0">Delta Zulu</h5>
            <p className="mb-2">
              Escuela de Vuelo y servicios aéreos
            </p>
            <p className="mb-0">
              RN 178 Km 18, S2505, Las Parejas, Santa Fe
            </p>
            <p className="mb-3 fs-8">
              -32.62417149989004, -61.544753190774344
            </p>
            <p className="mb-0">
              Centro de Instrucción y Entrenamiento (CIAC) Tipo 3 certificado por ANAC
            </p>
          </Col>

          {/* Columna derecha */}
          <Col xs={12} md={6} className="mb-4 mb-md-0 d-none d-md-block">
            <h5 className="fw-bold">Más información</h5>
            <ul className="list-unstyled">
              <li><a href="/escuela">Escuela de aviación</a></li>
              <li><a href="/cursos">Cursos</a></li>
              <li><a href="/faq">Preguntas frecuentes</a></li>
              <li><a href="/contacto">Contacto</a></li>
              <li><a href="/login">Centro de Entrenamiento</a></li>
            </ul>
          </Col>
        </Row>

        {/* Íconos sociales */}
        <Row className="mt-4">
          <Col className="text-center">
            <a
              href="https://www.instagram.com/deltazuluescueladevuelo/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/EscueladeVueloDeltaZuluDeZarantonelloHd/?locale=es_LA"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://wa.me/5493471676535" // REEMPLAZAR CON NÚMERO CORRECTO
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaWhatsapp />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer