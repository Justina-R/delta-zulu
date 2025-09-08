import React from "react";
import "./DashboardHome.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaUserGraduate, FaBook, FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const navigate = useNavigate();

  const handleStudentBtn = () => {
    navigate("./estudiantes");
  };

  return (
    <Container fluid className="dashboard-container d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-center mb-5 dashboard-title">Panel de Administración</h1>
      <Row className="g-5 justify-content-center w-75">
        <Col md={4}>
          <Card className="h-100 text-center shadow dashboard-card">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center p-5">
              <FaUserGraduate size={70} className="mb-4 icon" />
              <Card.Title className="mb-4 fs-4">Alumnos Inscriptos</Card.Title>
              <Button variant="primary" onClick={handleStudentBtn}>
                Ver Alumnos
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 text-center shadow dashboard-card">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center p-5">
              <FaBook size={70} className="mb-4 icon" />
              <Card.Title className="mb-4 fs-4">Cursos Cargados</Card.Title>
              <Button variant="primary" href="/cursos">
                Ver Cursos
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 text-center shadow dashboard-card">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center p-5">
              <FaFileAlt size={70} className="mb-4 icon" />
              <Card.Title className="mb-4 fs-4">Exámenes Cargados</Card.Title>
              <Button variant="primary" href="/examenes">
                Ver Exámenes
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardHome;
