import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdEdit, MdCheck } from "react-icons/md";
import { BsFillTrashFill, BsArrowLeft } from "react-icons/bs";

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
    flexWrap: "wrap",
    gap: "12px",
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
  // Question card
  questionCard: {
    background: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e8ecf0",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    overflow: "hidden",
    marginBottom: "20px",
  },
  questionCardEditing: {
    background: "#ffffff",
    borderRadius: "14px",
    border: "1.5px solid #205078",
    boxShadow: "0 4px 20px rgba(32,80,120,0.12)",
    overflow: "hidden",
    marginBottom: "20px",
  },
  questionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 22px",
    borderBottom: "1px solid #f0f3f6",
    background: "#fafcff",
  },
  questionHeaderEditing: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 22px",
    borderBottom: "1px solid #dce8f4",
    background: "rgba(32,80,120,0.05)",
  },
  questionNumberBadge: {
    fontSize: "0.7rem",
    fontWeight: 700,
    color: "#205078",
    background: "rgba(32,80,120,0.08)",
    borderRadius: "6px",
    padding: "3px 10px",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  editingBadge: {
    fontSize: "0.7rem",
    fontWeight: 700,
    color: "#205078",
    background: "rgba(32,80,120,0.1)",
    border: "1px solid rgba(32,80,120,0.2)",
    borderRadius: "20px",
    padding: "3px 10px",
    marginLeft: "10px",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
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
    color: "#6b7a87",
  },
  questionBody: {
    padding: "22px 24px",
  },
  label: {
    display: "block",
    fontSize: "0.78rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "#5a6a78",
    marginBottom: "8px",
  },
  questionInput: {
    width: "100%",
    padding: "11px 16px",
    fontSize: "0.92rem",
    color: "#1a2a3a",
    background: "#f8fafc",
    border: "1.5px solid #e8ecf0",
    borderRadius: "10px",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s, background 0.15s",
    fontFamily: "inherit",
    marginBottom: "18px",
  },
  questionInputDisabled: {
    width: "100%",
    padding: "11px 16px",
    fontSize: "0.92rem",
    color: "#6b7a87",
    background: "#f4f6f9",
    border: "1.5px solid #eef0f3",
    borderRadius: "10px",
    outline: "none",
    fontFamily: "inherit",
    marginBottom: "18px",
    cursor: "default",
  },
  optionsDivider: {
    fontSize: "0.72rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#b0bec9",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  optionsDividerLine: {
    flex: 1,
    height: "1px",
    background: "#eef0f3",
  },
  optionRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  radioWrap: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid #ccd3db",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  radioWrapChecked: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid #198754",
    background: "#198754",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  radioInner: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#fff",
    display: "block",
  },
  optionInput: {
    flex: 1,
    padding: "9px 14px",
    fontSize: "0.88rem",
    color: "#1a2a3a",
    background: "#f8fafc",
    border: "1.5px solid #e8ecf0",
    borderRadius: "9px",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    fontFamily: "inherit",
  },
  optionInputDisabled: {
    flex: 1,
    padding: "9px 14px",
    fontSize: "0.88rem",
    color: "#6b7a87",
    background: "#f4f6f9",
    border: "1.5px solid #eef0f3",
    borderRadius: "9px",
    outline: "none",
    fontFamily: "inherit",
    cursor: "default",
  },
  optionInputCorrect: {
    flex: 1,
    padding: "9px 14px",
    fontSize: "0.88rem",
    color: "#198754",
    background: "rgba(25,135,84,0.05)",
    border: "1.5px solid rgba(25,135,84,0.3)",
    borderRadius: "9px",
    outline: "none",
    fontFamily: "inherit",
    fontWeight: 600,
  },
  correctLabel: {
    fontSize: "0.7rem",
    fontWeight: 700,
    color: "#198754",
    background: "#d1f5e0",
    borderRadius: "20px",
    padding: "2px 9px",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  optionActions: {
    display: "flex",
    gap: "8px",
    marginTop: "14px",
    paddingTop: "14px",
    borderTop: "1px solid #eef0f3",
  },
  btnAddOption: {
    background: "transparent",
    border: "1.5px dashed #b0bec9",
    color: "#6b7a87",
    borderRadius: "8px",
    padding: "6px 14px",
    fontSize: "0.78rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    transition: "all 0.15s",
  },
  btnRemoveOption: {
    background: "transparent",
    border: "1.5px solid #e8ecf0",
    color: "#8a97a5",
    borderRadius: "8px",
    padding: "6px 14px",
    fontSize: "0.78rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    transition: "all 0.15s",
  },
  bottomBar: {
    background: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e8ecf0",
    padding: "22px 28px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "14px",
    marginTop: "8px",
  },
  btnAddQuestion: {
    background: "transparent",
    border: "1.5px dashed #205078",
    color: "#205078",
    borderRadius: "9px",
    padding: "10px 22px",
    fontSize: "0.85rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    transition: "all 0.18s",
  },
  btnSave: {
    background: "#198754",
    border: "none",
    color: "#fff",
    borderRadius: "10px",
    padding: "11px 30px",
    fontSize: "0.9rem",
    fontWeight: 700,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    transition: "background 0.18s",
    letterSpacing: "0.01em",
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconPlus = () => (
  <svg
    width="13"
    height="13"
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
const IconMinus = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconSave = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);
const IconFileAlt = () => (
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);
const IconPencil = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const focusStyle = (e) => {
  e.target.style.borderColor = "#205078";
  e.target.style.boxShadow = "0 0 0 3px rgba(32,80,120,0.1)";
  e.target.style.background = "#fff";
};
const blurStyle = (e) => {
  e.target.style.borderColor = "#e8ecf0";
  e.target.style.boxShadow = "none";
  e.target.style.background = "#f8fafc";
};
const optFocusStyle = (e) => {
  e.target.style.borderColor = "#205078";
  e.target.style.boxShadow = "0 0 0 3px rgba(32,80,120,0.08)";
};
const optBlurStyle = (e) => {
  e.target.style.borderColor = "#e8ecf0";
  e.target.style.boxShadow = "none";
};

const ExamForm = () => {
  const { examenId } = useParams();
  const navigate = useNavigate();
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    if (examenId) {
      setPreguntas([
        {
          texto: "¿Cuál es la capital de Francia?",
          opciones: ["Madrid", "París", "Berlín", "Lisboa"],
          correcta: 1,
          editable: false,
        },
        {
          texto: "¿2 + 2 = ?",
          opciones: ["3", "4", "5", "6"],
          correcta: 1,
          editable: false,
        },
      ]);
    }
  }, [examenId]);

  const toggleEditar = (index) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index].editable = !nuevasPreguntas[index].editable;
    setPreguntas(nuevasPreguntas);
  };

  const eliminarPregunta = (index) => {
    setPreguntas(preguntas.filter((_, i) => i !== index));
  };

  const agregarPregunta = () => {
    setPreguntas([
      ...preguntas,
      {
        texto: "Nueva pregunta",
        opciones: ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
        correcta: 0,
        editable: true,
      },
    ]);
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
      if (
        nuevasPreguntas[index].correcta >=
        nuevasPreguntas[index].opciones.length - 1
      ) {
        nuevasPreguntas[index].correcta = 0;
      }
      nuevasPreguntas[index].opciones.pop();
      setPreguntas(nuevasPreguntas);
    }
  };

  const verificarCamposGuardados = () => {};

  const guardarCambios = () => {
    console.log("Datos a enviar:", preguntas);
    verificarCamposGuardados();
    navigate("/exams");
  };

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
                onClick={() => navigate("/exams")}
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
                  <IconFileAlt />
                </span>
                Administración
              </div>
              <h1 style={styles.heroTitle}>
                {examenId ? "Modificar Examen" : "Crear Examen"}
              </h1>
              <p style={styles.heroSubtitle}>
                {examenId
                  ? "Editá las preguntas y opciones del examen existente."
                  : "Agregá preguntas de múltiple choice y marcá la respuesta correcta de cada una."}
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <div style={styles.statBox}>
                <div style={styles.statNum}>{preguntas.length}</div>
                <div style={styles.statLabel}>Preguntas</div>
              </div>
              <div style={styles.statBox}>
                <div style={styles.statNum}>
                  {preguntas.reduce((s, p) => s + p.opciones.length, 0)}
                </div>
                <div style={styles.statLabel}>Opciones</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION TITLE ─────────────────────────────────────────────── */}
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitle}>
            <span style={styles.sectionDot} />
            Preguntas del examen
          </div>
        </div>

        {/* ── QUESTION CARDS ────────────────────────────────────────────── */}
        {preguntas.map((pregunta, index) => (
          <div
            key={index}
            style={
              pregunta.editable
                ? styles.questionCardEditing
                : styles.questionCard
            }
          >
            {/* Header */}
            <div
              style={
                pregunta.editable
                  ? styles.questionHeaderEditing
                  : styles.questionHeader
              }
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={styles.questionNumberBadge}>
                  Pregunta {String(index + 1).padStart(2, "0")}
                </span>
                {pregunta.editable && (
                  <span style={styles.editingBadge}>
                    <IconPencil /> Editando
                  </span>
                )}
              </div>

              <div style={{ display: "flex" }}>
                <button
                  style={styles.iconBtn}
                  onClick={() => toggleEditar(index)}
                  title={
                    pregunta.editable ? "Guardar pregunta" : "Editar pregunta"
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(32,80,120,0.08)";
                    e.currentTarget.style.borderColor = "#205078";
                    e.currentTarget.style.color = "#205078";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "#e8ecf0";
                    e.currentTarget.style.color = "#6b7a87";
                  }}
                >
                  {pregunta.editable ? (
                    <MdCheck size={15} />
                  ) : (
                    <MdEdit size={15} />
                  )}
                </button>
                <button
                  style={styles.iconBtn}
                  onClick={() => eliminarPregunta(index)}
                  title="Eliminar pregunta"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(220,53,69,0.08)";
                    e.currentTarget.style.borderColor = "#dc3545";
                    e.currentTarget.style.color = "#dc3545";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "#e8ecf0";
                    e.currentTarget.style.color = "#6b7a87";
                  }}
                >
                  <BsFillTrashFill size={13} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div style={styles.questionBody}>
              {/* Question text */}
              <label style={styles.label}>Texto de la pregunta</label>
              <input
                type="text"
                style={
                  pregunta.editable
                    ? styles.questionInput
                    : styles.questionInputDisabled
                }
                value={pregunta.texto}
                disabled={!pregunta.editable}
                onFocus={pregunta.editable ? focusStyle : undefined}
                onBlur={pregunta.editable ? blurStyle : undefined}
                onChange={(e) =>
                  actualizarPregunta(index, "texto", e.target.value)
                }
              />

              {/* Options */}
              <div style={styles.optionsDivider}>
                <span>Opciones — seleccioná la correcta</span>
                <div style={styles.optionsDividerLine} />
              </div>

              {pregunta.opciones.map((opcion, i) => {
                const isCorrect = pregunta.correcta === i;
                return (
                  <div key={i} style={styles.optionRow}>
                    {/* Custom radio */}
                    <div
                      style={
                        isCorrect ? styles.radioWrapChecked : styles.radioWrap
                      }
                      onClick={() => {
                        if (pregunta.editable)
                          actualizarPregunta(index, "correcta", i);
                      }}
                    >
                      {isCorrect && <span style={styles.radioInner} />}
                    </div>

                    {/* Hidden native radio for form semantics */}
                    <input
                      type="radio"
                      name={`pregunta-${index}`}
                      checked={isCorrect}
                      onChange={() => {
                        if (pregunta.editable)
                          actualizarPregunta(index, "correcta", i);
                      }}
                      style={{ display: "none" }}
                    />

                    <input
                      type="text"
                      style={
                        !pregunta.editable
                          ? isCorrect
                            ? styles.optionInputCorrect
                            : styles.optionInputDisabled
                          : styles.optionInput
                      }
                      value={opcion}
                      disabled={!pregunta.editable}
                      onFocus={pregunta.editable ? optFocusStyle : undefined}
                      onBlur={pregunta.editable ? optBlurStyle : undefined}
                      onChange={(e) =>
                        actualizarPregunta(index, `opcion${i}`, e.target.value)
                      }
                    />

                    {isCorrect && (
                      <span style={styles.correctLabel}>Correcta</span>
                    )}
                  </div>
                );
              })}

              {/* Option management buttons */}
              {pregunta.editable && (
                <div style={styles.optionActions}>
                  <button
                    style={styles.btnAddOption}
                    onClick={() => agregarOpcion(index)}
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
                    <IconPlus /> Agregar opción
                  </button>
                  <button
                    style={styles.btnRemoveOption}
                    onClick={() => eliminarOpcion(index)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(220,53,69,0.07)";
                      e.currentTarget.style.borderColor = "#dc3545";
                      e.currentTarget.style.color = "#dc3545";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "#e8ecf0";
                      e.currentTarget.style.color = "#8a97a5";
                    }}
                  >
                    <IconMinus /> Quitar opción
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* ── BOTTOM BAR ────────────────────────────────────────────────── */}
        <div style={styles.bottomBar}>
          <button
            style={styles.btnAddQuestion}
            onClick={agregarPregunta}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(32,80,120,0.06)";
              e.currentTarget.style.borderStyle = "solid";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderStyle = "dashed";
            }}
          >
            <IconPlus /> Agregar nueva pregunta
          </button>

          <button
            style={styles.btnSave}
            onClick={guardarCambios}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#146c43";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#198754";
            }}
          >
            <IconSave /> Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamForm;
