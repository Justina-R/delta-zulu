import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/client";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await api.post("/auth/login", form);

      // Guardar sesión
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Dispatch event to notify layout/header
      window.dispatchEvent(new Event("loginStatusChange"));

      // Redirigir según el rol
      if (data.user.role === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/myCourses");
      }
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container d-flex">
      <div className="login-image d-none d-md-block"></div>

      <div className="login-form-container d-flex flex-column justify-content-center px-5">
        <div className="text-center mb-4">
          <h2 className="mt-2">Centro de Entrenamiento</h2>
        </div>

        <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "400px", margin: "0 auto" }}>
          {error && <Alert variant="danger">{error}</Alert>}
          
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
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
