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
          <Form.Label>Imagen de portada</Form.Label>
          <Form.Select 
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
          >
            <option value="">Seleccione una imagen</option>
            <option value="/images/covers/avion.jpeg">Avión</option>
            <option value="/images/covers/cessna.jpeg">Cessna</option>
            <option value="/images/covers/clases.jpeg">Clases</option>
            <option value="/images/covers/cursos.jpeg">Cursos</option>
          </Form.Select>
          {imagenUrl && (
            <div className="mt-3 text-center p-2 border rounded bg-light">
              <p className="small text-muted mb-2">Previsualización:</p>
              <img 
                src={imagenUrl} 
                alt="Preview" 
                style={{ 
                  maxWidth: "100%", 
                  maxHeight: "180px", 
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)" 
                }} 
              />
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
