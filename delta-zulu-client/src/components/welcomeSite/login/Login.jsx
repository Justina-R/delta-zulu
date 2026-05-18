import { useState } from "react";
import { Form, Button, Alert, InputGroup } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../../../api/client";
import { motion } from "framer-motion";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isExpired = new URLSearchParams(location.search).get("expired") === "true";

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="login-container d-flex"
    >
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="login-image d-none d-md-block"
      ></motion.div>

      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="login-form-container d-flex flex-column justify-content-center px-5"
      >
        <div className="text-center mb-4">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-2"
          >
            Centro de Entrenamiento
          </motion.h2>
        </div>

        <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "400px", margin: "0 auto" }}>
          {isExpired && !error && (
            <Alert variant="warning" className="text-center small">
              Tu sesión ha expirado por seguridad. Por favor, ingresa de nuevo.
            </Alert>
          )}
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
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Ingrese su contraseña"
                required
              />
              <Button 
                variant="outline-secondary"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
            </InputGroup>
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
      </motion.div>
    </motion.div>
  );
};

export default Login;
