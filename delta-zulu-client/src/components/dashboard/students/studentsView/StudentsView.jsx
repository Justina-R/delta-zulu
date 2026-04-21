import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdEdit } from "react-icons/md";
import { BsFillTrash3Fill, BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../ui/confirmModal";

const styles = {
  page: {
    background: "#f4f6f9",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    paddingTop: "1rem",
    paddingBottom: "60px",
  },
  heroCard: {
    background: "linear-gradient(135deg, #205078 0%, #1a3f60 60%, #122d46 100%)",
    borderRadius: "20px",
    padding: "40px 48px",
    color: "#ffffff",
    position: "relative",
    overflow: "hidden",
    marginBottom: "40px",
    boxShadow: "0 12px 48px rgba(32,80,120,0.25)",
  },
  heroAccent: {
    position: "absolute",
    top: "-60px",
    right: "-60px",
    width: "280px",
    height: "280px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.04)",
    pointerEvents: "none",
  },
  heroAccent2: {
    position: "absolute",
    bottom: "-80px",
    right: "120px",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.03)",
    pointerEvents: "none",
  },
  heroTag: {
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "#fff",
    borderRadius: "20px",
    padding: "4px 14px",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    display: "inline-block",
    marginBottom: "12px",
  },
  heroTitle: {
    fontSize: "2rem",
    fontWeight: 700,
    margin: "0 0 8px 0",
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "0.95rem",
    margin: 0,
  },
  statBox: {
    background: "rgba(255,255,255,0.08)",
    borderRadius: "12px",
    padding: "14px 20px",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  statNum: {
    fontSize: "1.6rem",
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1,
  },
  statLabel: {
    fontSize: "0.72rem",
    color: "rgba(255,255,255,0.6)",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginTop: "4px",
  },
  backBtn: {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
    borderRadius: "8px",
    padding: "6px 14px",
    fontSize: "1.1rem",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    transition: "background 0.2s",
    marginRight: "14px",
    flexShrink: 0,
  },
  sectionTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#205078",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  sectionDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#205078",
    flexShrink: 0,
    display: "inline-block",
  },
  addBtn: {
    background: "#205078",
    border: "none",
    color: "#fff",
    borderRadius: "8px",
    padding: "9px 20px",
    fontSize: "0.85rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    transition: "background 0.18s",
    whiteSpace: "nowrap",
  },
  tableWrapper: {
    background: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e8ecf0",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    margin: 0,
  },
  thead: {
    background: "#205078",
  },
  th: {
    padding: "14px 20px",
    fontSize: "0.75rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    color: "rgba(255,255,255,0.85)",
    borderBottom: "none",
    whiteSpace: "nowrap",
  },
  thCenter: {
    padding: "14px 20px",
    fontSize: "0.75rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    color: "rgba(255,255,255,0.85)",
    borderBottom: "none",
    textAlign: "center",
  },
  td: {
    padding: "14px 20px",
    fontSize: "0.9rem",
    color: "#2d3a45",
    borderBottom: "1px solid #f0f3f6",
    verticalAlign: "middle",
  },
  tdCenter: {
    padding: "14px 20px",
    fontSize: "0.9rem",
    color: "#2d3a45",
    borderBottom: "1px solid #f0f3f6",
    verticalAlign: "middle",
    textAlign: "center",
  },
  tdEmpty: {
    padding: "48px 20px",
    fontSize: "0.92rem",
    color: "#8a97a5",
    textAlign: "center",
    borderBottom: "none",
  },
  namePill: {
    fontWeight: 600,
    color: "#1a2a3a",
  },
  emailText: {
    color: "#5a6a78",
    fontSize: "0.87rem",
    wordBreak: "break-all",
  },
  dateBadge: {
    background: "rgba(32,80,120,0.07)",
    color: "#205078",
    borderRadius: "6px",
    padding: "3px 10px",
    fontSize: "0.8rem",
    fontWeight: 600,
    display: "inline-block",
  },
  iconBtn: {
    background: "transparent",
    border: "1.5px solid #e8ecf0",
    borderRadius: "8px",
    width: "34px",
    height: "34px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.15s",
    margin: "0 3px",
  },
};

const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const IconGraduate = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const StudentsView = ({ onEliminar }) => {
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState([
    { id: 1, nombre: "Juan Pérez", email: "juan.perez@example.com", fechaInicio: "2023-05-10" },
    { id: 2, nombre: "María Gómez", email: "maria.gomez@example.com", fechaInicio: "2023-06-15" },
    { id: 3, nombre: "Carlos López", email: "carlos.lopez@example.com", fechaInicio: "2023-07-01" },
    { id: 4, nombre: "Ana Martínez", email: "ana.martinez@example.com", fechaInicio: "2023-07-20" },
    { id: 5, nombre: "Lucía Fernández", email: "lucia.fernandez@example.com", fechaInicio: "2023-08-05" },
    { id: 6, nombre: "Martín Rodríguez", email: "martin.rodriguez@example.com", fechaInicio: "2023-08-15" },
    { id: 7, nombre: "Sofía Torres", email: "sofia.torres@example.com", fechaInicio: "2023-09-01" },
    { id: 8, nombre: "Diego Ramírez", email: "diego.ramirez@example.com", fechaInicio: "2023-09-10" },
    { id: 9, nombre: "Valentina Castro", email: "valentina.castro@example.com", fechaInicio: "2023-09-20" },
    { id: 10, nombre: "Federico Silva", email: "federico.silva@example.com", fechaInicio: "2023-10-01" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  const onAgregar = () => navigate("/studentForm");
  const onEditar = (alumno) => navigate(`/studentForm/${alumno.id}`);

  const handleEliminarClick = (alumno) => {
    setAlumnoSeleccionado(alumno);
    setShowModal(true);
  };

  const handleConfirmEliminar = () => {
    if (onEliminar) onEliminar(alumnoSeleccionado);
    setAlumnos((prev) => prev.filter((a) => a.email !== alumnoSeleccionado.email));
    setShowModal(false);
    setAlumnoSeleccionado(null);
  };

  return (
    <div style={styles.page}>
      <div className="container">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div style={styles.heroCard}>
          <div style={styles.heroAccent} />
          <div style={styles.heroAccent2} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
            <div>
              {/* Back + tag row */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                <button
                  style={styles.backBtn}
                  onClick={() => navigate("/dashboard")}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.22)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
                >
                  <BsArrowLeft />
                </button>
                <div style={styles.heroTag}>
                  <span style={{ marginRight: 4 }}><IconGraduate /></span>
                  Administración
                </div>
              </div>

              <h1 style={styles.heroTitle}>Lista de alumnos</h1>
              <p style={styles.heroSubtitle}>
                Consultá, editá y gestioná los alumnos inscriptos en la escuela.
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={styles.statBox}>
                <div style={styles.statNum}>{alumnos.length}</div>
                <div style={styles.statLabel}>Inscriptos</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION HEADER ────────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div style={styles.sectionTitle}>
            <span style={styles.sectionDot} />
            Alumnos registrados
          </div>
          <button
            style={styles.addBtn}
            onClick={onAgregar}
            onMouseEnter={e => { e.currentTarget.style.background = "#1a3f60"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#205078"; }}
          >
            <IconPlus /> Agregar alumno
          </button>
        </div>

        {/* ── TABLE ─────────────────────────────────────────────────────── */}
        <div style={styles.tableWrapper}>
          <div className="table-responsive">
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={styles.th}>Nombre</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Fecha de inicio</th>
                  <th style={styles.thCenter}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {alumnos && alumnos.length > 0 ? (
                  alumnos.map((alumno, index) => (
                    <tr
                      key={index}
                      onMouseEnter={e => { e.currentTarget.style.background = "#f8fafc"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                    >
                      <td style={styles.td}>
                        <span style={styles.namePill}>{alumno.nombre}</span>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.emailText}>{alumno.email}</span>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.dateBadge}>{alumno.fechaInicio}</span>
                      </td>
                      <td style={styles.tdCenter}>
                        <button
                          style={styles.iconBtn}
                          title="Editar"
                          onClick={() => onEditar(alumno)}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = "rgba(32,80,120,0.08)";
                            e.currentTarget.style.borderColor = "#205078";
                            e.currentTarget.style.color = "#205078";
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.borderColor = "#e8ecf0";
                            e.currentTarget.style.color = "inherit";
                          }}
                        >
                          <MdEdit size={15} />
                        </button>
                        <button
                          style={styles.iconBtn}
                          title="Eliminar"
                          onClick={() => handleEliminarClick(alumno)}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = "rgba(220,53,69,0.08)";
                            e.currentTarget.style.borderColor = "#dc3545";
                            e.currentTarget.style.color = "#dc3545";
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.borderColor = "#e8ecf0";
                            e.currentTarget.style.color = "inherit";
                          }}
                        >
                          <BsFillTrash3Fill size={13} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={styles.tdEmpty}>
                      No hay alumnos registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ── CONFIRM MODAL ─────────────────────────────────────────────── */}
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