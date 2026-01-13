// src/components/admin/courses/CourseModal.jsx
import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

const CourseModal = ({ show, onHide, onSave, initialData }) => {
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState(null); // File o string
  const [preview, setPreview] = useState(null); // Para mostrar la imagen

  // Cargar valores iniciales al abrir
  useEffect(() => {
    setNombre(initialData?.nombre || "");
    setImagen(initialData?.imagen || null);
    setPreview(initialData?.imagen || null);
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagen(file);

    // Crear una vista previa
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (nombre.trim() === "") return;

    onSave({
      ...initialData,
      nombre,
      imagen, // devolvemos archivo o string
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {initialData ? "Editar curso" : "Agregar curso"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Título */}
        <Form.Group className="mb-3">
          <Form.Label>Título del curso</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingrese el título"
          />
        </Form.Group>

        {/* Imagen */}
        <Form.Group>
          <Form.Label>Imagen del curso</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />

          {/* Vista previa */}
          {preview && (
            <div className="mt-3 text-center">
              <img
                src={preview}
                alt="Vista previa"
                style={{
                  maxWidth: "100%",
                  maxHeight: "180px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button className="editBtn" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CourseModal;
