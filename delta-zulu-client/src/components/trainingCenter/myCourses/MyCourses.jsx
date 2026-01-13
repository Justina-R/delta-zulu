import { Container, Row, Col, Card, Button } from "react-bootstrap";

const MyCourses = () => {
  // Ejemplo de cursos. En un futuro los traerás desde tu backend:
  const courses = [
    {
      id: 1,
      title: "Curso de Tácticas Iniciales",
      image: "/images/curso1.jpg",
      status: "available", // available | in_progress | coming_soon
    },
    {
      id: 2,
      title: "Curso Avanzado de Rescate",
      image: "/images/curso2.jpg",
      status: "in_progress",
    },
    {
      id: 3,
      title: "Curso de Operaciones Aéreas",
      image: "/images/curso3.jpg",
      status: "coming_soon",
    }
  ];

  const renderButton = (status) => {
    switch (status) {
      case "available":
        return <Button variant="primary">Comenzar curso</Button>;
      case "in_progress":
        return <Button variant="success">Continuar curso</Button>;
      case "coming_soon":
        return (
          <Button variant="secondary" disabled>
            Próximamente
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Container className="py-5" style={{ marginTop: "140px" }}>
      <h2 className="mb-4">Mis cursos</h2>

      <Row className="g-4">
        {courses.map((course) => (
          <Col key={course.id} md={4} sm={6}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={course.image}
                alt={course.title}
                style={{ height: "180px", objectFit: "cover" }}
              />

              <Card.Body className="d-flex flex-column">
                <Card.Title>{course.title}</Card.Title>

                <div className="mt-auto">
                  {renderButton(course.status)}
                </div>
              </Card.Body>

            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyCourses;
