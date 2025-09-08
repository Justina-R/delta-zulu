import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";

const ModuleForm = ({ moduloInicial, onGuardar, onVolver }) => {
  const [nombre, setNombre] = useState(moduloInicial?.nombre || "");
  const [descripcion, setDescripcion] = useState(moduloInicial?.descripcion || "");
  const [imagenUrl, setImagenUrl] = useState(moduloInicial?.imagenUrl || "");
  const [driveUrl, setDriveUrl] = useState(moduloInicial?.driveUrl || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const datosModulo = {
      nombre,
      descripcion,
      imagenUrl,
      driveUrl,
    };
    onGuardar(datosModulo); // Llama la función del padre para guardar
  };

  return (
    <div className="container mt-4 mb-5">
      {/* Header con flecha y título */}
      <div className="d-flex align-items-center mb-4">
        <button className="btn backBtn me-2 fs-4" onClick={onVolver}>
          <BsArrowLeft />
        </button>
        <h2 className="mb-0">Modificar módulo</h2>
      </div>

      {/* Formulario */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre del módulo</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingrese el nombre del módulo"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Ingrese una descripción"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>URL de imagen de portada</Form.Label>
          <Form.Control
            type="url"
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
            placeholder="Ingrese el enlace de la portada"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enlace a la clase grabada (Drive)</Form.Label>
          <Form.Control
            type="url"
            value={driveUrl}
            onChange={(e) => setDriveUrl(e.target.value)}
            placeholder="Ingrese el enlace de la clase en Drive"
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button type="submit" className="editBtn">
            Guardar cambios
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ModuleForm;
