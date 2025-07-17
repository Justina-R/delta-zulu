//ICONS
import { FaPlane } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { PiPlantFill } from "react-icons/pi";
import { FaPersonChalkboard } from "react-icons/fa6";
import { RiComputerFill } from "react-icons/ri";
import { AiFillDashboard } from "react-icons/ai";
import { GoChecklist } from "react-icons/go";
//CSS
import "./CourseList.css";
import { Card, Container, Row, Col } from "react-bootstrap";

const CourseList = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-5">Nuestros Cursos</h2>
      <Row className="g-4">
        <Col xs={12} md={6} lg={3}>
          <Card className="h-100 text-center shadow-sm card-curso">
            <Card.Body>
              <FaPlane size={40} color="#044b81" className="mb-3" />
              <Card.Title>Curso de Piloto Privado</Card.Title>
              <Card.Text>
                Aprendé a volar desde cero con instructores certificados y
                materiales actualizados.
              </Card.Text>
              <a
                  href="https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Piloto%20Privado%20de%20Avión."
                  className="link-curso"
                  target="_blank" rel="noopener noreferrer"
                >
                  Más info <span className="flecha">→</span>
                </a>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <Card className="h-100 text-center shadow-sm card-curso">
            <Card.Body>
              <GrMoney size={40} color="#044b81" className="mb-3" />
              <Card.Title>Curso de Piloto Comercial</Card.Title>
              <Card.Text>
                Perfeccioná tus habilidades como piloto profesional y accedé a
                oportunidades laborales en aerolíneas y empresas privadas.
              </Card.Text>
              <a
                  href="https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Piloto%20Comercial%20de%20Avión."
                  className="link-curso"
                  target="_blank" rel="noopener noreferrer"
                >
                  Más info <span className="flecha">→</span>
                </a>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <Card className="h-100 text-center shadow-sm card-curso">
            <Card.Body>
              <PiPlantFill size={40} color="#044b81" className="mb-3" />
              <Card.Title>Curso de Piloto Aeroaplicador</Card.Title>
              <Card.Text>
                Capacitate en operaciones agrícolas aéreas, con énfasis en
                seguridad, precisión y normativas vigentes.
              </Card.Text>
             <a
                  href="https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Piloto%20Aeroaplicador."
                  className="link-curso"
                  target="_blank" rel="noopener noreferrer"
                >
                  Más info <span className="flecha">→</span>
                </a>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <Card className="h-100 text-center shadow-sm card-curso">
            <Card.Body>
              <FaPersonChalkboard size={40} color="#044b81" className="mb-3" />
              <Card.Title>Curso de Instructor de Vuelo</Card.Title>
              <Card.Text>
                Formate como instructor certificado y transmití tus
                conocimientos a nuevos aspirantes a piloto.
              </Card.Text>
              <a
                  href="https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Piloto%Instructor%20de%20Vuelo."
                  className="link-curso"
                  target="_blank" rel="noopener noreferrer"
                >
                  Más info <span className="flecha">→</span>
                </a>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={3}>
          <Card className="h-100 text-center shadow-sm card-curso">
            <Card.Body>
              <RiComputerFill size={40} color="#044b81" className="mb-3" />
              <Card.Title>Curso de Piloto Instructor ETVI</Card.Title>
              <Card.Text>
                Convertite en guía especializado en instrucción con simuladores
                terrestres certificados para vuelo instrumental.
              </Card.Text>
               <a
                  href="https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Piloto%20Instructor%20de%20ETVI."
                  className="link-curso"
                  target="_blank" rel="noopener noreferrer"
                >
                  Más info <span className="flecha">→</span>
                </a>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <Card className="h-100 text-center shadow-sm card-curso">
            <Card.Body>
              <AiFillDashboard size={40} color="#044b81" className="mb-3" />
              <Card.Title>Habilitación de Vuelo por Instrumento</Card.Title>
              <Card.Text>
                Aprendé a volar con precisión en condiciones de baja visibilidad
                utilizando exclusivamente instrumentos de vuelo.
              </Card.Text>
              <a
                  href="https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Habilitación%20de%20Vuelo%20Por%20Instrumento."
                  className="link-curso"
                  target="_blank" rel="noopener noreferrer"
                >
                  Más info <span className="flecha">→</span>
                </a>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <Card className="h-100 text-center shadow-sm card-curso">
            <Card.Body>
              <GoChecklist size={40} color="#044b81" className="mb-3" />
              <Card.Title>Habilitación VFR Controlado</Card.Title>
              <Card.Text>
                Obtené la habilitación para operar en espacios aéreos
                controlados respetando procedimientos y comunicación ATC.
              </Card.Text>
              <a
                  href="https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Habilitación%20VFR%20Controlado."
                  className="link-curso"
                  target="_blank" rel="noopener noreferrer"
                >
                  Más info <span className="flecha">→</span>
                </a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseList;
