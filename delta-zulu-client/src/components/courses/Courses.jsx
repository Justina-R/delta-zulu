import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaPlane } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { PiPlantFill } from "react-icons/pi";
import { FaPersonChalkboard } from "react-icons/fa6";
import { RiComputerFill } from "react-icons/ri";
import { AiFillDashboard } from "react-icons/ai";
import { GoChecklist } from "react-icons/go";
import "./Courses.css";

const Courses = () => {
  return (
    <div>
      {/* Imagen de portada */}
      <div className="courses-hero d-flex align-items-center justify-content-center">
        <h1 className="courses-title text-white text-center">Cursos</h1>
      </div>

      {/* Presentación */}
      <section className="bg-white py-5">
        <Container>
          <h2 className="text-center mb-3 fs-3">
            Formación profesional para futuros pilotos
          </h2>
          <p className="lead text-center fs-4">
            En Delta Zulu desarrollamos programas académicos pensados para que
            cada alumno alcance su máximo potencial como piloto profesional.
          </p>
          <p className="text-center fs-5">
            Gracias a una combinación de entrenamiento práctico, recursos
            actualizados y un cuerpo docente experimentado, nuestros egresados
            se destacan por su excelente preparación técnica y humana.
          </p>
        </Container>
      </section>

      {/* Imagen esquemática */}
      <section className="bg-light py-5 d-none d-md-block">
        <Container className="text-center">
          <img
            src="images/carrera-piloto-profesional.png"
            alt="Esquema de cursos"
            className="img-fluid mb-4 rounded"
            style={{ maxWidth: "1000px" }}
          />
        </Container>
      </section>

      {/* Lista de cursos */}
      <section className="bg-white py-5">
        <Container>
          <h3 className="mb-4 text-center">Nuestros cursos disponibles</h3>
          <Row className="g-4 ">
            <Col xs={12} md={10} className="mx-auto px-3">
              <Card className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between shadow-sm p-3 gap-3">
                <FaPlane size={32} color="#044b81" className="me-3" />
                <div className="flex-grow-1">
                  <h5 className="mb-2">Piloto Privado de Avión</h5>
                </div>
                <Button className="btn-mas-info">
                  Más información <span className="ms-1">→</span>
                </Button>
              </Card>
            </Col>
            <Col xs={12} md={10} className="mx-auto px-3">
              <Card className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between shadow-sm p-3 gap-3">
                <GrMoney size={32} color="#044b81" className="me-3" />
                <div className="flex-grow-1">
                  <h5 className="mb-2">Piloto Comercial de Avión</h5>
                </div>
                <Button className="btn-mas-info">
                  Más información <span className="ms-1">→</span>
                </Button>
              </Card>
            </Col>
            <Col xs={12} md={10} className="mx-auto px-3">
              <Card className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between shadow-sm p-3 gap-3">
                <PiPlantFill size={32} color="#044b81" className="me-3" />
                <div className="flex-grow-1">
                  <h5 className="mb-2">Piloto Aeroaplicador</h5>
                </div>
                <Button className="btn-mas-info">
                  Más información <span className="ms-1">→</span>
                </Button>
              </Card>
            </Col>
            <Col xs={12} md={10} className="mx-auto px-3">
              <Card className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between shadow-sm p-3 gap-3">
                <FaPersonChalkboard
                  size={32}
                  color="#044b81"
                  className="me-3"
                />
                <div className="flex-grow-1">
                  <h5 className="mb-2">Piloto Instructor de Vuelo</h5>
                </div>
                <Button className="btn-mas-info">
                  Más información <span className="ms-1">→</span>
                </Button>
              </Card>
            </Col>
            <Col xs={12} md={10} className="mx-auto px-3">
              <Card className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between shadow-sm p-3 gap-3">
                <RiComputerFill size={32} color="#044b81" className="me-3" />
                <div className="flex-grow-1">
                  <h5 className="mb-2">
                    Piloto Instructor de Entrenador Terrestre de Vuelo por
                    Instrumento (ETVI)
                  </h5>
                </div>
                <Button className="btn-mas-info">
                  Más información <span className="ms-1">→</span>
                </Button>
              </Card>
            </Col>
            <Col xs={12} md={10} className="mx-auto px-3">
              <Card className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between shadow-sm p-3 gap-3">
                <AiFillDashboard size={32} color="#044b81" className="me-3" />
                <div className="flex-grow-1">
                  <h5 className="mb-2">
                    Habilitación de Vuelo por Instrumento (HVI)
                  </h5>
                </div>
                <Button className="btn-mas-info">
                  Más información <span className="ms-1">→</span>
                </Button>
              </Card>
            </Col>
            <Col xs={12} md={10} className="mx-auto px-3">
              <Card className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between shadow-sm p-3 gap-3">
                <GoChecklist size={32} color="#044b81" className="me-3" />
                <div className="flex-grow-1">
                  <h5 className="mb-2">Habilitación VFR Controlado</h5>
                </div>
                <Button className="btn-mas-info">
                  Más información <span className="ms-1">→</span>
                </Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Courses;
