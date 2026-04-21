import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsArrowLeft } from "react-icons/bs";
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
  courseCard: {
    background: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e8ecf0",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    overflow: "hidden",
    marginBottom: "16px",
  },
  courseHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 24px",
    cursor: "pointer",
    userSelect: "none",
    transition: "background 0.15s",
  },
  courseHeaderOpen: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 24px",
    cursor: "pointer",
    userSelect: "none",
    background: "#fafcff",
    borderBottom: "1px solid #e8ecf0",
  },
  courseAccentBar: {
    width: "5px",
    height: "28px",
    background: "#205078",
    borderRadius: "4px",
    marginRight: "14px",
    flexShrink: 0,
  },
  courseName: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#1a2a3a",
    flex: 1,
  },
  examCountBadge: {
    background: "rgba(32,80,120,0.08)",
    color: "#205078",
    borderRadius: "20px",
    padding: "3px 10px",
    fontSize: "0.72rem",
    fontWeight: 700,
    marginRight: "12px",
    whiteSpace: "nowrap",
  },
  moduleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "13px 24px",
    borderBottom: "1px solid #f0f3f6",
    gap: "12px",
    transition: "background 0.12s",
  },
  moduleIndexBadge: {
    fontSize: "0.7rem",
    fontWeight: 700,
    color: "#205078",
    background: "rgba(32,80,120,0.07)",
    borderRadius: "6px",
    padding: "2px 8px",
    marginRight: "10px",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  moduleLabel: {
    fontSize: "0.9rem",
    color: "#2d3a45",
    flex: 1,
  },
  examPresentBadge: {
    background: "rgba(25,135,84,0.09)",
    color: "#198754",
    border: "1px solid rgba(25,135,84,0.2)",
    borderRadius: "20px",
    padding: "3px 10px",
    fontSize: "0.7rem",
    fontWeight: 700,
    marginRight: "10px",
    whiteSpace: "nowrap",
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },
  noExamBadge: {
    background: "rgba(180,180,180,0.1)",
    color: "#a0adb8",
    border: "1px solid #e8ecf0",
    borderRadius: "20px",
    padding: "3px 10px",
    fontSize: "0.7rem",
    fontWeight: 700,
    marginRight: "10px",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  btnModify: {
    background: "transparent",
    border: "1.5px solid #205078",
    color: "#205078",
    borderRadius: "7px",
    padding: "5px 14px",
    fontSize: "0.78rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    transition: "all 0.15s",
    marginRight: "6px",
    whiteSpace: "nowrap",
  },
  btnDelete: {
    background: "transparent",
    border: "1.5px solid #e8ecf0",
    color: "#8a97a5",
    borderRadius: "7px",
    padding: "5px 14px",
    fontSize: "0.78rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    transition: "all 0.15s",
    whiteSpace: "nowrap",
  },
  btnCreate: {
    background: "#198754",
    border: "none",
    color: "#fff",
    borderRadius: "7px",
    padding: "5px 16px",
    fontSize: "0.78rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    transition: "background 0.15s",
    whiteSpace: "nowrap",
  },
  emptyText: {
    padding: "24px",
    textAlign: "center",
    color: "#8a97a5",
    fontSize: "0.87rem",
    fontStyle: "italic",
  },
  noCursosText: {
    background: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e8ecf0",
    padding: "40px",
    textAlign: "center",
    color: "#8a97a5",
    fontSize: "0.92rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
  },
};

const IconFileAlt = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const IconCheck = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconPlus = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const IconEdit = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const IconTrash = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

const IconChevron = ({ open }) => (
  <svg
    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", color: "#8a97a5" }}
  >
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

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

  const goToExamForm = () => navigate("/examForm");

  const handleEliminarClick = (modulo) => {
    setModuloSeleccionado(modulo);
    setShowModal(true);
  };

  const handleConfirmEliminar = () => {
    console.log("Examen eliminado:", moduloSeleccionado);
    setShowModal(false);
    setModuloSeleccionado(null);
  };

  const totalExamenes = cursos.reduce(
    (sum, c) => sum + c.modulos.filter((m) => m.examen).length,
    0
  );

  return (
    <div style={styles.page}>
      <div className="container">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div style={styles.heroCard}>
          <div style={styles.heroAccent} />
          <div style={styles.heroAccent2} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
            <div>
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
                  <span style={{ marginRight: 4 }}><IconFileAlt /></span>
                  Administración
                </div>
              </div>
              <h1 style={styles.heroTitle}>Lista de exámenes</h1>
              <p style={styles.heroSubtitle}>
                Creá, modificá y eliminá exámenes por módulo para cada curso.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <div style={styles.statBox}>
                <div style={styles.statNum}>{cursos.length}</div>
                <div style={styles.statLabel}>Cursos</div>
              </div>
              <div style={styles.statBox}>
                <div style={styles.statNum}>{totalExamenes}</div>
                <div style={styles.statLabel}>Exámenes</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION TITLE ─────────────────────────────────────────────── */}
        <div style={styles.sectionTitle}>
          <span style={styles.sectionDot} />
          Cursos y módulos
        </div>

        {/* ── ACCORDION ─────────────────────────────────────────────────── */}
        {cursos && cursos.length > 0 ? (
          cursos.map((curso, index) => {
            const isOpen = cursoActivo === index;
            const examCount = curso.modulos.filter(m => m.examen).length;
            return (
              <div key={index} style={styles.courseCard}>

                {/* Course header */}
                <div
                  style={isOpen ? styles.courseHeaderOpen : styles.courseHeader}
                  onClick={() => toggleCurso(index)}
                  onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = "#f8fafc"; }}
                  onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = ""; }}
                >
                  <div style={styles.courseAccentBar} />
                  <span style={styles.courseName}>{curso.nombre}</span>
                  <span style={styles.examCountBadge}>{examCount} examen{examCount !== 1 ? "es" : ""}</span>
                  <IconChevron open={isOpen} />
                </div>

                {/* Module list */}
                {isOpen && (
                  <div>
                    {curso.modulos && curso.modulos.length > 0 ? (
                      curso.modulos.map((modulo, idx) => (
                        <div
                          key={idx}
                          style={{
                            ...styles.moduleRow,
                            borderBottom: idx < curso.modulos.length - 1 ? "1px solid #f0f3f6" : "none",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = "#f8fafc"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = ""; }}
                        >
                          <span style={styles.moduleIndexBadge}>
                            {String(idx + 1).padStart(2, "0")}
                          </span>

                          <span style={styles.moduleLabel}>{modulo.nombre}</span>

                          {modulo.examen ? (
                            <span style={styles.examPresentBadge}>
                              <IconCheck /> Examen cargado
                            </span>
                          ) : (
                            <span style={styles.noExamBadge}>Sin examen</span>
                          )}

                          <div style={{ display: "flex", flexShrink: 0 }}>
                            {modulo.examen ? (
                              <>
                                <button
                                  style={styles.btnModify}
                                  onClick={goToExamForm}
                                  onMouseEnter={e => { e.currentTarget.style.background = "#205078"; e.currentTarget.style.color = "#fff"; }}
                                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#205078"; }}
                                >
                                  <IconEdit /> Modificar
                                </button>
                                <button
                                  style={styles.btnDelete}
                                  onClick={() => handleEliminarClick(modulo)}
                                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(220,53,69,0.07)"; e.currentTarget.style.borderColor = "#dc3545"; e.currentTarget.style.color = "#dc3545"; }}
                                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#e8ecf0"; e.currentTarget.style.color = "#8a97a5"; }}
                                >
                                  <IconTrash /> Eliminar
                                </button>
                              </>
                            ) : (
                              <button
                                style={styles.btnCreate}
                                onClick={goToExamForm}
                                onMouseEnter={e => { e.currentTarget.style.background = "#146c43"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = "#198754"; }}
                              >
                                <IconPlus /> Crear examen
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={styles.emptyText}>
                        Este curso no tiene módulos disponibles.
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div style={styles.noCursosText}>
            No hay cursos con exámenes disponibles.
          </div>
        )}

      </div>

      {/* ── CONFIRM MODAL ─────────────────────────────────────────────── */}
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