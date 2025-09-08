import { useState } from "react";
import { Table, Button, Form, InputGroup, Container, Row, Col } from "react-bootstrap";
import { FaTrash, FaPen, FaArrowLeft } from "react-icons/fa";
import "./StudentsTable.css";
import students from "../../../../data/students.json"
import { useNavigate } from "react-router-dom";

const StudentsTable = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleAddStudent = () => {
    navigate("./formulario-estudiantes")
  }

  const handleEditStudent = () => {
    navigate("./formulario-estudiantes")
    //Falta agregar info del estudiante
  }

  const filteredStudents = students.filter((student) =>
    student.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-1">
      <Button href="/dashboard" variant="link" className="text-decoration-none mb-4 d-flex align-items-center">
        <FaArrowLeft className="me-2" /> Volver
      </Button>
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <Button onClick={handleAddStudent} className="add-btn">Agregar nuevo alumno</Button>
        </Col>
        <Col md={6} className="text-md-end mt-3 mt-md-0">
          <InputGroup className="search-box">
            <Form.Control
              placeholder="Buscar alumno por nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Fecha de inscripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.nombre}</td>
              <td>{student.mail}</td>
              <td>{student.fechaInscripción}</td>
              <td>
                <Button onClick={handleEditStudent} variant="outline-primary" size="sm" className="me-2">
                  <FaPen />
                </Button>
                <Button variant="outline-danger" size="sm">
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default StudentsTable;
