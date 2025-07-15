import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaPlane } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", form);
    // Aquí iría la lógica de autenticación
  };

  return (
    <div className="login-container d-flex">
      <div className="login-image d-none d-md-block"></div>

      <div className="login-form-container d-flex flex-column justify-content-center px-5">
        <div className="text-center mb-4">
          <h2 className="mt-2">Centro de Entrenamiento</h2>
        </div>

        <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "400px", margin: "0 auto" }}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Ingrese su correo"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              required
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={{ backgroundColor: "#044b81", borderColor: "#044b81" }}
          >
            Iniciar sesión
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
