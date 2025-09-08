import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";
import { MdEdit, MdCheck } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import "./examForm.css";

const ExamForm = () => {
  const { examenId } = useParams();
  const navigate = useNavigate();
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    if (examenId) {
      const examenEjemplo = [
        {
          texto: "¿Cuál es la capital de Francia?",
          opciones: ["Madrid", "París", "Berlín", "Lisboa"],
          correcta: 1,
          editable: false
        },
        {
          texto: "¿2 + 2 = ?",
          opciones: ["3", "4", "5", "6"],
          correcta: 1,
          editable: false
        }
      ];
      setPreguntas(examenEjemplo);
    }
  }, [examenId]);

  const toggleEditar = (index) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index].editable = !nuevasPreguntas[index].editable;
    setPreguntas(nuevasPreguntas);
  };

  const eliminarPregunta = (index) => {
    const nuevasPreguntas = preguntas.filter((_, i) => i !== index);
    setPreguntas(nuevasPreguntas);
  };

  const agregarPregunta = () => {
    const nuevaPregunta = {
      texto: "Nueva pregunta",
      opciones: ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
      correcta: 0,
      editable: true
    };
    setPreguntas([...preguntas, nuevaPregunta]);
  };

  const actualizarPregunta = (index, campo, valor) => {
    const nuevasPreguntas = [...preguntas];
    if (campo.startsWith("opcion")) {
      const opcionIndex = parseInt(campo.replace("opcion", ""));
      nuevasPreguntas[index].opciones[opcionIndex] = valor;
    } else {
      nuevasPreguntas[index][campo] = valor;
    }
    setPreguntas(nuevasPreguntas);
  };

  const agregarOpcion = (index) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index].opciones.push("Nueva opción");
    setPreguntas(nuevasPreguntas);
  };

  const eliminarOpcion = (index) => {
    const nuevasPreguntas = [...preguntas];
    if (nuevasPreguntas[index].opciones.length > 1) {
      // Si la opción eliminada era la correcta, reasignar la correcta a la primera opción
      if (nuevasPreguntas[index].correcta >= nuevasPreguntas[index].opciones.length - 1) {
        nuevasPreguntas[index].correcta = 0;
      }
      nuevasPreguntas[index].opciones.pop();
      setPreguntas(nuevasPreguntas);
    }
  };

  const guardarCambios = () => {
    console.log("Datos a enviar:", preguntas);
    navigate("/exams");
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{examenId ? "Modificar Examen" : "Crear Examen"}</h2>
        <Button variant="success" onClick={guardarCambios}>
          Guardar cambios
        </Button>
      </div>

      <Form>
        {preguntas.map((pregunta, index) => (
          <Card className="mb-3" key={index}>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>Pregunta {index + 1}</span>
              <div>
                <Button
                  className="editBtn me-2"
                  onClick={() => toggleEditar(index)}
                >
                  {pregunta.editable ? <MdCheck /> : <MdEdit />}
                </Button>
                <Button className="editBtn" onClick={() => eliminarPregunta(index)}>
                  <BsFillTrashFill />
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Texto de la pregunta</Form.Label>
                <Form.Control
                  type="text"
                  value={pregunta.texto}
                  disabled={!pregunta.editable}
                  onChange={(e) => actualizarPregunta(index, "texto", e.target.value)}
                />
              </Form.Group>

              {pregunta.opciones.map((opcion, i) => (
                <Form.Check
                  type="radio"
                  key={i}
                  name={`pregunta-${index}`}
                  label={
                    <Form.Control
                      type="text"
                      value={opcion}
                      disabled={!pregunta.editable}
                      onChange={(e) => actualizarPregunta(index, `opcion${i}`, e.target.value)}
                      className="d-inline w-auto"
                    />
                  }
                  checked={pregunta.correcta === i}
                  onChange={() => {
                    if (pregunta.editable) actualizarPregunta(index, "correcta", i);
                  }}
                />
              ))}

              {pregunta.editable && (
                <div className="mt-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="me-2"
                    onClick={() => agregarOpcion(index)}
                  >
                    + Agregar opción
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => eliminarOpcion(index)}
                  >
                    - Quitar opción
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        ))}

        <Button className="editBtn mb-3 me-3" onClick={agregarPregunta}>
          Agregar nueva pregunta
        </Button>
      </Form>
    </div>
  );
};

export default ExamForm;
