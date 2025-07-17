import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaUserGraduate, FaBook, FaFileAlt } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="dashboard-container py-5">
      <Container>
        <h1 className="text-center mb-5">Panel de Administración</h1>
        <Row className="g-4 justify-content-center">
          <Col md={4}>
            <Card className="h-100 text-center shadow-sm dashboard-card">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <FaUserGraduate size={50} className="mb-3" />
                <Card.Title>Alumnos Inscriptos</Card.Title>
                <Button variant="primary" href="/alumnos">
                  Ver Alumnos
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center shadow-sm dashboard-card">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <FaBook size={50} className="mb-3" />
                <Card.Title>Cursos Cargados</Card.Title>
                <Button variant="primary" href="/cursos">
                  Ver Cursos
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center shadow-sm dashboard-card">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <FaFileAlt size={50} className="mb-3" />
                <Card.Title>Exámenes Cargados</Card.Title>
                <Button variant="primary" href="/examenes">
                  Ver Exámenes
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
