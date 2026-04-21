import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BsArrowLeft } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";
import ConfirmModal from "../../../ui/confirmModal";
import { useNavigate } from "react-router-dom";
import CourseModal from "../courseModal/CourseModal";

const styles = {
  page: {
    background: "#f4f6f9",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    paddingTop: "1rem",
    paddingBottom: "60px",
  },
  heroCard: {
    background:
      "linear-gradient(135deg, #205078 0%, #1a3f60 60%, #122d46 100%)",
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
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#205078",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: 0,
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
  courseCard: {
    background: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e8ecf0",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    overflow: "hidden",
    marginBottom: "16px",
    transition: "box-shadow 0.2s",
  },
  courseHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 24px",
    cursor: "pointer",
    userSelect: "none",
    borderBottom: "1px solid transparent",
    transition: "background 0.15s",
  },
  courseHeaderOpen: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 24px",
    cursor: "pointer",
    userSelect: "none",
    borderBottom: "1px solid #e8ecf0",
    background: "#fafcff",
    transition: "background 0.15s",
  },
  courseAccentBar: {
    width: "5px",
    height: "100%",
    background: "#205078",
    borderRadius: "14px 0 0 14px",
    flexShrink: 0,
  },
  courseName: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#1a2a3a",
    margin: 0,
  },
  moduleBadge: {
    background: "rgba(32,80,120,0.08)",
    color: "#205078",
    borderRadius: "20px",
    padding: "3px 10px",
    fontSize: "0.72rem",
    fontWeight: 700,
    marginLeft: "10px",
    whiteSpace: "nowrap",
  },
  iconBtn: {
    background: "transparent",
    border: "1.5px solid #e8ecf0",
    borderRadius: "8px",
    width: "32px",
    height: "32px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.15s",
    margin: "0 3px",
    flexShrink: 0,
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
  chevron: {
    fontSize: "0.75rem",
    color: "#8a97a5",
    marginLeft: "8px",
    transition: "transform 0.2s",
    flexShrink: 0,
  },
  moduleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "13px 24px",
    borderBottom: "1px solid #f0f3f6",
    background: "#fff",
    transition: "background 0.12s",
    gap: "12px",
  },
  dragHandle: {
    color: "#c5cdd5",
    marginRight: "10px",
    cursor: "grab",
    fontSize: "1rem",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
  },
  moduleLabel: {
    fontSize: "0.9rem",
    color: "#2d3a45",
    flex: 1,
  },
  moduleEditBtn: {
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
  moduleDeleteBtn: {
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
  addModuleArea: {
    padding: "14px 24px",
    background: "#fafcff",
    borderTop: "1px solid #f0f3f6",
  },
  addModuleBtn: {
    background: "transparent",
    border: "1.5px dashed #b0bec9",
    color: "#6b7a87",
    borderRadius: "8px",
    padding: "8px 18px",
    fontSize: "0.82rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.15s",
    width: "100%",
    justifyContent: "center",
  },
  emptyModules: {
    padding: "28px 24px",
    textAlign: "center",
    color: "#8a97a5",
    fontSize: "0.87rem",
    fontStyle: "italic",
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconPlus = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconBook = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const IconGrip = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="6" r="1" fill="currentColor" />
    <circle cx="15" cy="6" r="1" fill="currentColor" />
    <circle cx="9" cy="12" r="1" fill="currentColor" />
    <circle cx="15" cy="12" r="1" fill="currentColor" />
    <circle cx="9" cy="18" r="1" fill="currentColor" />
    <circle cx="15" cy="18" r="1" fill="currentColor" />
  </svg>
);
const IconChevron = ({ open }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.2s",
      color: "#8a97a5",
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

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
  const [confirmConfig, setConfirmConfig] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const toggleCurso = (id) => {
    setCursos(
      cursos.map((c) => (c.id === id ? { ...c, abierto: !c.abierto } : c)),
    );
  };

  const handleSaveCourse = (cursoGuardado) => {
    if (cursoGuardado.id) {
      setCursos(
        cursos.map((c) =>
          c.id === cursoGuardado.id
            ? { ...c, nombre: cursoGuardado.nombre }
            : c,
        ),
      );
    } else {
      setCursos([
        ...cursos,
        {
          id: Date.now(),
          nombre: cursoGuardado.nombre,
          modulos: [],
          abierto: false,
        },
      ]);
    }
    setShowCourseModal(false);
    setSelectedCourse(null);
  };

  const eliminarCurso = (cursoId) => {
    setCursos(cursos.filter((c) => c.id !== cursoId));
    setConfirmConfig({ ...confirmConfig, show: false });
  };

  const eliminarModulo = (cursoId, index) => {
    setCursos(
      cursos.map((c) =>
        c.id === cursoId
          ? { ...c, modulos: c.modulos.filter((_, i) => i !== index) }
          : c,
      ),
    );
    setConfirmConfig({ ...confirmConfig, show: false });
  };

  const onDragEnd = (result, cursoId) => {
    if (!result.destination) return;
    const { source, destination } = result;
    setCursos(
      cursos.map((c) => {
        if (c.id === cursoId) {
          const newModules = Array.from(c.modulos);
          const [moved] = newModules.splice(source.index, 1);
          newModules.splice(destination.index, 0, moved);
          return { ...c, modulos: newModules };
        }
        return c;
      }),
    );
  };

  const handleCrearCurso = () => {
    if (nuevoCurso.trim() === "") return;
    setCursos([
      ...cursos,
      {
        id: Date.now(),
        nombre: nuevoCurso,
        modulos: [],
        abierto: false,
        editando: false,
      },
    ]);
    setNuevoCurso("");
  };

  const agregarModulo = (cursoId) => {
    setCursos(
      cursos.map((c) =>
        c.id === cursoId
          ? { ...c, modulos: [...c.modulos, "Nuevo módulo"] }
          : c,
      ),
    );
  };

  const onEditar = () => navigate("/moduleForm");

  const toggleEditarCurso = (cursoId) => {
    setCursos(
      cursos.map((c) =>
        c.id === cursoId ? { ...c, editando: !c.editando } : c,
      ),
    );
  };

  const cambiarNombreCurso = (cursoId, nuevoNombre) => {
    setCursos(
      cursos.map((c) => (c.id === cursoId ? { ...c, nombre: nuevoNombre } : c)),
    );
  };

  const totalModulos = cursos.reduce((sum, c) => sum + c.modulos.length, 0);

  return (
    <div style={styles.page}>
      <div className="container">
        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div style={styles.heroCard}>
          <div style={styles.heroAccent} />
          <div style={styles.heroAccent2} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <div>
              <button
                style={styles.backBtn}
                onClick={() => navigate("/dashboard")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.22)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                }}
              >
                <BsArrowLeft />
              </button>
              <div style={styles.heroTag}>
                <span style={{ marginRight: 4 }}>
                  <IconBook />
                </span>
                Administración
              </div>
              <h1 style={styles.heroTitle}>Lista de Cursos</h1>
              <p style={styles.heroSubtitle}>
                Creá, editá y organizá los cursos y sus módulos con arrastrar y
                soltar.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <div style={styles.statBox}>
                <div style={styles.statNum}>{cursos.length}</div>
                <div style={styles.statLabel}>Cursos</div>
              </div>
              <div style={styles.statBox}>
                <div style={styles.statNum}>{totalModulos}</div>
                <div style={styles.statLabel}>Módulos</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION HEADER ────────────────────────────────────────────── */}
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitle}>
            <span style={styles.sectionDot} />
            Cursos cargados
          </div>
          <button
            style={styles.addBtn}
            onClick={() => {
              setSelectedCourse(null);
              setShowCourseModal(true);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1a3f60";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#205078";
            }}
          >
            <IconPlus /> Agregar curso
          </button>
        </div>

        {/* ── COURSE LIST ───────────────────────────────────────────────── */}
        {cursos.map((curso) => (
          <div key={curso.id} style={styles.courseCard}>
            {/* Course header */}
            <div
              style={
                curso.abierto ? styles.courseHeaderOpen : styles.courseHeader
              }
              onClick={() => toggleCurso(curso.id)}
              onMouseEnter={(e) => {
                if (!curso.abierto)
                  e.currentTarget.style.background = "#f8fafc";
              }}
              onMouseLeave={(e) => {
                if (!curso.abierto) e.currentTarget.style.background = "";
              }}
            >
              {/* Left accent bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flex: 1,
                  minWidth: 0,
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    ...styles.courseAccentBar,
                    height: "28px",
                    borderRadius: "4px",
                    marginRight: "12px",
                  }}
                />

                <span style={styles.courseName}>{curso.nombre}</span>
                <span style={styles.moduleBadge}>
                  {curso.modulos.length} módulos
                </span>
              </div>

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  flexShrink: 0,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  style={styles.iconBtn}
                  title="Editar curso"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCourse(curso);
                    setShowCourseModal(true);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(32,80,120,0.08)";
                    e.currentTarget.style.borderColor = "#205078";
                    e.currentTarget.style.color = "#205078";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "#e8ecf0";
                    e.currentTarget.style.color = "inherit";
                  }}
                >
                  <MdEdit size={15} />
                </button>
                <button
                  style={styles.iconBtn}
                  title="Eliminar curso"
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmConfig({
                      show: true,
                      title: "Eliminar curso",
                      message: `¿Seguro que quieres eliminar el curso "${curso.nombre}" y todos sus módulos?`,
                      onConfirm: () => eliminarCurso(curso.id),
                    });
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(220,53,69,0.08)";
                    e.currentTarget.style.borderColor = "#dc3545";
                    e.currentTarget.style.color = "#dc3545";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "#e8ecf0";
                    e.currentTarget.style.color = "inherit";
                  }}
                >
                  <MdDelete size={15} />
                </button>
              </div>

              <div style={{ marginLeft: "10px" }}>
                <IconChevron open={curso.abierto} />
              </div>
            </div>

            {/* Collapsible module list */}
            <Collapse in={curso.abierto}>
              <div>
                <DragDropContext
                  onDragEnd={(result) => onDragEnd(result, curso.id)}
                >
                  <Droppable droppableId={`droppable-${curso.id}`}>
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {curso.modulos.length === 0 && (
                          <div style={styles.emptyModules}>
                            No hay módulos todavía
                          </div>
                        )}
                        {curso.modulos.map((modulo, index) => (
                          <Draggable
                            key={`${curso.id}-${index}`}
                            draggableId={`${curso.id}-${index}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                style={{
                                  ...styles.moduleRow,
                                  ...provided.draggableProps.style,
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = "#f8fafc";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = "#fff";
                                }}
                              >
                                <span
                                  style={styles.dragHandle}
                                  {...provided.dragHandleProps}
                                >
                                  <IconGrip />
                                </span>

                                {/* Module number */}
                                <span
                                  style={{
                                    fontSize: "0.7rem",
                                    fontWeight: 700,
                                    color: "#205078",
                                    background: "rgba(32,80,120,0.07)",
                                    borderRadius: "6px",
                                    padding: "2px 8px",
                                    marginRight: "10px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {String(index + 1).padStart(2, "0")}
                                </span>

                                <span style={styles.moduleLabel}>{modulo}</span>

                                <div style={{ display: "flex", flexShrink: 0 }}>
                                  <button
                                    style={styles.moduleEditBtn}
                                    onClick={onEditar}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background =
                                        "#205078";
                                      e.currentTarget.style.color = "#fff";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background =
                                        "transparent";
                                      e.currentTarget.style.color = "#205078";
                                    }}
                                  >
                                    <MdEdit size={13} /> Modificar
                                  </button>
                                  <button
                                    style={styles.moduleDeleteBtn}
                                    onClick={() =>
                                      setConfirmConfig({
                                        show: true,
                                        title: "Eliminar módulo",
                                        message: `¿Seguro que quieres eliminar "${modulo}" del curso "${curso.nombre}"?`,
                                        onConfirm: () =>
                                          eliminarModulo(curso.id, index),
                                      })
                                    }
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background =
                                        "rgba(220,53,69,0.07)";
                                      e.currentTarget.style.borderColor =
                                        "#dc3545";
                                      e.currentTarget.style.color = "#dc3545";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background =
                                        "transparent";
                                      e.currentTarget.style.borderColor =
                                        "#e8ecf0";
                                      e.currentTarget.style.color = "#8a97a5";
                                    }}
                                  >
                                    <MdDelete size={13} /> Eliminar
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                {/* Add module */}
                <div style={styles.addModuleArea}>
                  <button
                    style={styles.addModuleBtn}
                    onClick={() => agregarModulo(curso.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#205078";
                      e.currentTarget.style.color = "#205078";
                      e.currentTarget.style.background = "rgba(32,80,120,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#b0bec9";
                      e.currentTarget.style.color = "#6b7a87";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <IconPlus /> Agregar módulo
                  </button>
                </div>
              </div>
            </Collapse>
          </div>
        ))}
      </div>

      <CourseModal
        show={showCourseModal}
        onHide={() => setShowCourseModal(false)}
        onSave={handleSaveCourse}
        initialData={selectedCourse}
      />

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
