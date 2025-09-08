import React, { useState } from "react";
import "./studentsView.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdEdit } from "react-icons/md";
import { BsFillTrash3Fill, BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../ui/confirmModal";

const StudentsView = ({ onEliminar, onVolver }) => {
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState([
    { nombre: "Juan Pérez", email: "juan.perez@example.com", fechaInicio: "2023-05-10" },
    { nombre: "María Gómez", email: "maria.gomez@example.com", fechaInicio: "2023-06-15" },
    { nombre: "Carlos López", email: "carlos.lopez@example.com", fechaInicio: "2023-07-01" },
    { nombre: "Ana Martínez", email: "ana.martinez@example.com", fechaInicio: "2023-07-20" },
    { nombre: "Lucía Fernández", email: "lucia.fernandez@example.com", fechaInicio: "2023-08-05" },
    { nombre: "Martín Rodríguez", email: "martin.rodriguez@example.com", fechaInicio: "2023-08-15" },
    { nombre: "Sofía Torres", email: "sofia.torres@example.com", fechaInicio: "2023-09-01" },
    { nombre: "Diego Ramírez", email: "diego.ramirez@example.com", fechaInicio: "2023-09-10" },
    { nombre: "Valentina Castro", email: "valentina.castro@example.com", fechaInicio: "2023-09-20" },
    { nombre: "Federico Silva", email: "federico.silva@example.com", fechaInicio: "2023-10-01" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  const onAgregar = () => {
    navigate("/studentForm");
  };

  const onEditar = (alumno) => {
    navigate("/studentForm", { state: alumno }); // paso el alumno como ejemplo
  };

  const handleEliminarClick = (alumno) => {
    setAlumnoSeleccionado(alumno);
    setShowModal(true);
  };

  const handleConfirmEliminar = () => {
    if (onEliminar) onEliminar(alumnoSeleccionado);

    // si querés también podés eliminarlo del estado local:
    setAlumnos((prev) =>
      prev.filter((a) => a.email !== alumnoSeleccionado.email)
    );

    setShowModal(false);
    setAlumnoSeleccionado(null);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
        <div className="d-flex align-items-center mb-2 mb-md-0">
          <button className="btn backBtn me-2 fs-4" onClick={onVolver}>
            <BsArrowLeft />
          </button>
          <h2 className="mb-0">Lista de alumnos</h2>
        </div>
        <button className="editBtn" onClick={onAgregar}>
          + Agregar alumno
        </button>
      </div>

      {/* Contenedor responsive */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Fecha de inicio</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alumnos && alumnos.length > 0 ? (
              alumnos.map((alumno, index) => (
                <tr key={index}>
                  <td>{alumno.nombre}</td>
                  <td className="text-break">{alumno.email}</td>
                  <td>{alumno.fechaInicio}</td>
                  <td className="text-center">
                    <button
                      className="editBtn"
                      onClick={() => onEditar(alumno)}
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="editBtn"
                      onClick={() => handleEliminarClick(alumno)} // 👈 abre el modal
                    >
                      <BsFillTrash3Fill />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No hay alumnos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación */}
      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleConfirmEliminar}
        title="Confirmar eliminación"
        message={
          alumnoSeleccionado
            ? `¿Seguro que deseas eliminar a ${alumnoSeleccionado.nombre}?`
            : "¿Seguro que deseas eliminar este alumno?"
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default StudentsView;
