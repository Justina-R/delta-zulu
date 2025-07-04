import { Container, Row, Col } from "react-bootstrap";
import "./FlightSchool.css";

const FlightSchool = () => {
  return (
    <div>
      {/* Sección 1: Imagen de portada */}
      <div className="hero-image-escuela d-flex align-items-center justify-content-center">
        <h1 className="hero-title-escuela text-center w-100">
          Escuela de Aviación
        </h1>
      </div>

      {/* Sección 2: ¿Quiénes somos? */}
      <section className="bg-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="mb-4 text-md-start text-center">
                ¿Quiénes somos?
              </h2>
              <p className="lead text-md-start text-center">
                Delta Zulu es una Escuela de Vuelo con sede en Las Parejas,
                Santa Fe, dedicada a la formación de pilotos civiles desde los
                primeros pasos hasta niveles avanzados. Nuestra misión es
                brindar una instrucción aérea de calidad, segura y accesible,
                combinando tecnología moderna, una flota propia y un equipo
                humano altamente calificado. Nuestro Centro de Instrucción y
                Entrenamiento (CIAC) Tipo 3 está certificado por ANAC, lo que
                garantiza el cumplimiento de los más altos estándares de
                aviación civil.
              </p>
            </Col>
            <Col md={6} className="text-center">
              <img
                src="images/avion2.jpeg"
                alt="Escuela de vuelo Delta Zulu"
                className="img-fluid rounded-circle shadow escuela-img"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Sección 3: Avión de aprendizaje */}
      <section className="bg-light py-5">
        <Container>
          <Row className="align-items-center flex-md-row-reverse">
            <Col md={6}>
              <h2 className="mb-4 text-md-start text-center">
                Nuestro avión de aprendizaje
              </h2>
              <p className="fs-5 text-md-start text-center">
                Delta Zulu cuenta con un avión de aprendizaje Cessna 150, lo que
                garantiza una excelente experiencia de vuelo por parte de los
                alumnos y favorece la continuidad de su aprendizaje.
              </p>
              <ul className="text-md-start text-center">
                <li>— Hélice: 2 palas – paso fijo</li>
                <li>— Tren: Triciclo fijo</li>
                <li>— Motor: Lycoming</li>
                <li>— Potencia: 110 hp</li>
                <li>— Velocidad: 180 km/h</li>
                <li>— Autonomía: 4 horas</li>
                <li>— Capacidad: 2 pasajeros</li>
              </ul>
            </Col>
            <Col md={6} className="text-center">
              <img
                src="images/cessna.jpeg"
                alt="Avión Cessna"
                className="img-fluid rounded-circle shadow escuela-img"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Sección 4: Simulador */}
      <section className="bg-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="mb-4 text-md-start text-center">
                Simulador de vuelo
              </h2>
              <p className="fs-5 text-md-start text-center">
                En Delta Zulu contamos con un simulador de vuelo profesional que
                permite a nuestros alumnos practicar procedimientos, navegación
                instrumental y manejo de situaciones de emergencia sin salir del
                suelo. Esta herramienta de entrenamiento es ideal para afianzar
                conocimientos, desarrollar reflejos en la toma de decisiones y
                reforzar la seguridad operacional antes de cada vuelo real.
              </p>
            </Col>
            <Col md={6} className="text-center">
              <img
                src="images/simulador.jpg"
                alt="Simulador de vuelo"
                className="img-fluid rounded-circle shadow escuela-img"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Sección 5: Clases personalizadas */}
      <section className="bg-light py-5">
        <Container>
          <Row className="align-items-center flex-md-row-reverse">
            <Col md={6}>
              <h2 className="mb-4 text-md-start text-center">
                Clases personalizadas
              </h2>
              <p className="fs-5 text-md-start text-center">
                Delta Zulu ofrece clases individuales y personalizadas con la
                instructora de vuelo Virginia Zarantonello, una profesional con
                años de experiencia en instrucción aeronáutica. Las clases
                personalizadas permiten adaptar el ritmo de aprendizaje a cada
                alumno, reforzar temas específicos y construir confianza con
                acompañamiento cercano, lo cual potencia el rendimiento y
                seguridad del futuro piloto.
              </p>
            </Col>
            <Col md={6} className="text-center">
              <img
                src="images/clases.jpeg"
                alt="Instructora de vuelo"
                className="img-fluid rounded-circle shadow escuela-img"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default FlightSchool;
