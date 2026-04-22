import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

const CourseModal = ({ show, onHide, onSave, initialData }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  useEffect(() => {
    setNombre(initialData?.nombre || "");
    setDescripcion(initialData?.descripcion || "");
    setImagenUrl(initialData?.imagenUrl || "");
  }, [initialData, show]);

  const handleSave = () => {
    if (nombre.trim() === "") return;
    onSave({
      id: initialData?.id,
      nombre,
      descripcion,
      imagenUrl,
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Editar curso" : "Agregar curso"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Título del curso</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingrese el título"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción del curso"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>URL de Imagen</Form.Label>
          <Form.Control 
            type="url" 
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg" 
          />
          {imagenUrl && (
            <div className="mt-3 text-center">
              <img src={imagenUrl} alt="Preview" style={{ maxWidth: "100%", maxHeight: "150px", borderRadius: "8px" }} />
            </div>
          )}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button style={{ backgroundColor: "#205078" }} onClick={handleSave}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CourseModal;
