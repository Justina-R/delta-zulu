import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentForm = ({ student }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (student) {
      setName(student.name);
      setEmail(student.email);
    }
  }, [student]);

  const validateEmail = (email) => email.includes("@");
  const validatePassword = (password) => /\d/.test(password) && password.length >= 5;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || (!student && !password)||(!student && !password2)) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!validateEmail(email)) {
      setError("El correo debe contener '@'.");
      return;
    }

    if (!student && !validatePassword(password)) {
      setError("La contraseña debe tener al menos 5 caracteres y 1 número.");
      return;
    }

    if (password != password2) {
      setError("La contraseña debe ser igual en ambos campos.");
      return;
    }

    // Aquí iría la lógica para crear o actualizar en la BBDD

    console.log({
      name,
      email,
      ...(student ? {} : { password }),
    });

    navigate(-1);
  };

  return (
    <Container className="mt-1">
      <Button variant="link" className="text-decoration-none mb-4 d-flex align-items-center" onClick={() => navigate(-1)}>
        <FaArrowLeft className="me-2" /> Volver
      </Button>

      <h2 className="mb-4">{student ? "Editar Alumno" : "Agregar Nuevo Alumno"}</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={!student}
            disabled={!!student}
            placeholder={student ? "No se puede modificar la contraseña" : ""}
          />
        </Form.Group>
        <Form.Group controlId="password2" className="mb-3">
          <Form.Label>Repetir contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required={!student}
            disabled={!!student}
            placeholder={student ? "No se puede modificar la contraseña" : ""}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          {student ? "Guardar cambios" : "Agregar alumno"}
        </Button>
      </Form>
    </Container>
  );
};

export default StudentForm;
