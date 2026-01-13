import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./examView.css";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../ui/confirmModal";

const ExamViews = ({ onVolver }) => {
  const navigate = useNavigate();
  const [cursoActivo, setCursoActivo] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [moduloSeleccionado, setModuloSeleccionado] = useState(null);

  const toggleCurso = (cursoId) => {
    setCursoActivo(cursoActivo === cursoId ? null : cursoId);
  };

  const cursos = [
    {
      nombre: "Curso de Piloto Privado",
      modulos: [
        { nombre: "Módulo 1", examen: true },
        { nombre: "Módulo 2", examen: false },
      ],
    },
    {
      nombre: "Piloto Comercial de Avión",
      modulos: [
        { nombre: "Módulo 1", examen: true },
        { nombre: "Módulo 2", examen: false },
        { nombre: "Módulo 3", examen: false },
      ],
    },
  ];

  const goToExamForm = () => {
    navigate("/examForm");
  };

  const handleEliminarClick = (modulo) => {
    setModuloSeleccionado(modulo);
    setShowModal(true);
  };

  const handleConfirmEliminar = () => {
    console.log("Examen eliminado:", moduloSeleccionado);
    // aquí podrías actualizar estado o hacer request a la API
    setShowModal(false);
    setModuloSeleccionado(null);
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex align-items-center mb-2 mb-md-0">
        <button className="btn backBtn me-2 fs-4" onClick={onVolver}>
          <BsArrowLeft />
        </button>
        <h2 className="mb-0">Lista de exámenes</h2>
      </div>

      {cursos && cursos.length > 0 ? (
        <div className="accordion" id="cursosAccordion">
          {cursos.map((curso, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${
                    cursoActivo === index ? "" : "collapsed"
                  }`}
                  type="button"
                  onClick={() => toggleCurso(index)}
                >
                  {curso.nombre}
                </button>
              </h2>
              <div
                className={`accordion-collapse collapse ${
                  cursoActivo === index ? "show" : ""
                }`}
              >
                <div className="accordion-body">
                  {curso.modulos && curso.modulos.length > 0 ? (
                    <ul className="list-group">
                      {curso.modulos.map((modulo, idx) => (
                        <li
                          key={idx}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <span>{modulo.nombre}</span>
                          <div>
                            {modulo.examen ? (
                              <>
                                <button
                                  className="btn editBtn btn-sm me-2"
                                  onClick={goToExamForm}
                                >
                                  Modificar
                                </button>
                                <button
                                  className="btn editBtn btn-sm"
                                  onClick={() => handleEliminarClick(modulo)} // 👈 abre modal
                                >
                                  Eliminar
                                </button>
                              </>
                            ) : (
                              <button
                                className="btn editBtn btn-sm"
                                onClick={goToExamForm}
                              >
                                Crear
                              </button>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">
                      Este curso no tiene módulos disponibles.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No hay cursos con exámenes disponibles.</p>
      )}

      {/* Modal de confirmación */}
      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleConfirmEliminar}
        title="Confirmar eliminación"
        message={
          moduloSeleccionado
            ? `¿Seguro que deseas eliminar el examen de ${moduloSeleccionado.nombre}?`
            : "¿Seguro que deseas eliminar este examen?"
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default ExamViews;
