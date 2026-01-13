import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./studentForm.css";

const StudentForm = ({ initialData = null, onGuardar }) => {
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || "",
    apellido: initialData?.apellido || "",
    email: initialData?.email || "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar contraseña solo si se está creando o cambiando
    if (!initialData || formData.password) {
      if (formData.password !== formData.confirmPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }
    }

    setError("");
    onGuardar(formData);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">
        {initialData ? "Modificar usuario" : "Crear usuario"}
      </h2>

      <form onSubmit={handleSubmit} className="p-3 border rounded bg-light mb-4">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Apellido</label>
          <input
            type="text"
            name="apellido"
            className="form-control"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required={!initialData} // obligatoria solo en creación
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </button>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Confirmar contraseña</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              required={!!formData.password || !initialData} // requerida si se crea o se cambia contraseña
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
            </button>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="editBtn">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default StudentForm;