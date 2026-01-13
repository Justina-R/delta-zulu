import React, { useState } from "react";
import { Card, Button, Collapse, ListGroup } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdEdit, MdDelete } from "react-icons/md";
import ConfirmModal from "../../../ui/confirmModal";
import "./coursesView.css";
import { useNavigate } from "react-router-dom";
import CourseModal from "../courseModal/CourseModal";

const CoursesView = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([
    {
      id: 1,
      nombre: "Curso de Piloto Privado",
      modulos: ["Módulo 1", "Módulo 2", "Módulo 3"],
      abierto: false,
      editando: false,
    },
    {
      id: 2,
      nombre: "Piloto Comercial de Avión",
      modulos: ["Módulo 1: Introducción", "Módulo 2"],
      abierto: false,
      editando: false,
    },
  ]);

  const [showCourseModal, setShowCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [nuevoCurso, setNuevoCurso] = useState("");

  // Estado para confirmaciones
  const [confirmConfig, setConfirmConfig] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  // Abrir/cerrar curso
  const toggleCurso = (id) => {
    setCursos(
      cursos.map((curso) =>
        curso.id === id ? { ...curso, abierto: !curso.abierto } : curso
      )
    );
  };

  const handleSaveCourse = (cursoGuardado) => {
    if (cursoGuardado.id) {
      // EDITAR EXISTENTE
      setCursos(
        cursos.map((c) =>
          c.id === cursoGuardado.id ? { ...c, nombre: cursoGuardado.nombre } : c
        )
      );
    } else {
      // CREAR NUEVO
      const nuevo = {
        id: Date.now(),
        nombre: cursoGuardado.nombre,
        modulos: [],
        abierto: false,
      };
      setCursos([...cursos, nuevo]);
    }

    setShowCourseModal(false);
    setSelectedCourse(null);
  };

  // Eliminar curso completo
  const eliminarCurso = (cursoId) => {
    setCursos(cursos.filter((curso) => curso.id !== cursoId));
    setConfirmConfig({ ...confirmConfig, show: false });
  };

  // Eliminar módulo
  const eliminarModulo = (cursoId, index) => {
    setCursos(
      cursos.map((curso) =>
        curso.id === cursoId
          ? {
              ...curso,
              modulos: curso.modulos.filter((_, i) => i !== index),
            }
          : curso
      )
    );
    setConfirmConfig({ ...confirmConfig, show: false });
  };

  // Drag & Drop
  const onDragEnd = (result, cursoId) => {
    if (!result.destination) return;

    const { source, destination } = result;

    setCursos(
      cursos.map((curso) => {
        if (curso.id === cursoId) {
          const newModules = Array.from(curso.modulos);
          const [moved] = newModules.splice(source.index, 1);
          newModules.splice(destination.index, 0, moved);

          return { ...curso, modulos: newModules };
        }
        return curso;
      })
    );
  };

  // Agregar curso
  const handleCrearCurso = () => {
    if (nuevoCurso.trim() === "") return;

    const nuevo = {
      id: Date.now(),
      nombre: nuevoCurso,
      modulos: [],
      abierto: false,
      editando: false,
    };

    setCursos([...cursos, nuevo]);
    setNuevoCurso("");
    setShowModal(false);
  };

  // Agregar módulo
  const agregarModulo = (cursoId) => {
    setCursos(
      cursos.map((curso) =>
        curso.id === cursoId
          ? { ...curso, modulos: [...curso.modulos, "Nuevo módulo"] }
          : curso
      )
    );
  };

  const onEditar = () => {
    navigate("/moduleForm");
  };

  // Editar nombre de curso
  const toggleEditarCurso = (cursoId) => {
    setCursos(
      cursos.map((curso) =>
        curso.id === cursoId ? { ...curso, editando: !curso.editando } : curso
      )
    );
  };

  const cambiarNombreCurso = (cursoId, nuevoNombre) => {
    setCursos(
      cursos.map((curso) =>
        curso.id === cursoId ? { ...curso, nombre: nuevoNombre } : curso
      )
    );
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Lista de Cursos</h2>
        <Button
          className="editBtn"
          onClick={() => {
            setSelectedCourse(null);
            setShowCourseModal(true);
          }}
        >
          + Agregar curso
        </Button>
      </div>

      {cursos.map((curso) => (
        <Card key={curso.id} className="mb-3 shadow-sm">
          <Card.Header
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => toggleCurso(curso.id)}
          >
            <div className="d-flex align-items-center flex-grow-1">
              <span>{curso.nombre}</span>

              <Button
                variant="link"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCourse(curso); // enviamos el curso al modal
                  setShowCourseModal(true); // abrimos modal
                }}
              >
                <MdEdit color="black" size={18} />
              </Button>
              <Button
                variant="link"
                className="deleteIcon"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmConfig({
                    show: true,
                    title: "Eliminar curso",
                    message: `¿Seguro que quieres eliminar el curso "${curso.nombre}" y todos sus módulos?`,
                    onConfirm: () => eliminarCurso(curso.id),
                  });
                }}
              >
                <MdDelete size={18} color="black" />
              </Button>
            </div>
            <span>{curso.abierto ? "▲" : "▼"}</span>
          </Card.Header>

          <Collapse in={curso.abierto}>
            <div>
              <DragDropContext
                onDragEnd={(result) => onDragEnd(result, curso.id)}
              >
                <Droppable droppableId={`droppable-${curso.id}`}>
                  {(provided) => (
                    <ListGroup
                      variant="flush"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {curso.modulos.map((modulo, index) => (
                        <Draggable
                          key={`${curso.id}-${index}`}
                          draggableId={`${curso.id}-${index}`}
                          index={index}
                        >
                          {(provided) => (
                            <ListGroup.Item
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="d-flex justify-content-between align-items-center"
                            >
                              <span className="flex-grow-1">{modulo}</span>
                              <div>
                                <Button
                                  className="editBtn me-2"
                                  onClick={onEditar}
                                >
                                  Modificar
                                </Button>
                                <Button
                                  className="editBtn"
                                  onClick={() =>
                                    setConfirmConfig({
                                      show: true,
                                      title: "Eliminar módulo",
                                      message: `¿Seguro que quieres eliminar "${modulo}" del curso "${curso.nombre}"?`,
                                      onConfirm: () =>
                                        eliminarModulo(curso.id, index),
                                    })
                                  }
                                >
                                  Eliminar
                                </Button>
                              </div>
                            </ListGroup.Item>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ListGroup>
                  )}
                </Droppable>
              </DragDropContext>

              <div className="p-3">
                <Button
                  className="editBtn"
                  onClick={() => agregarModulo(curso.id)}
                >
                  + Agregar módulo
                </Button>
              </div>
            </div>
          </Collapse>
        </Card>
      ))}

      <CourseModal
        show={showCourseModal}
        onHide={() => setShowCourseModal(false)}
        onSave={handleSaveCourse}
        initialData={selectedCourse}
      />

      {/* Modal de confirmación */}
      <ConfirmModal
        show={confirmConfig.show}
        onHide={() => setConfirmConfig({ ...confirmConfig, show: false })}
        onConfirm={confirmConfig.onConfirm}
        title={confirmConfig.title}
        message={confirmConfig.message}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default CoursesView;
