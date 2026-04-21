import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

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
  formCard: {
    background: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e8ecf0",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  formCardAccent: {
    height: "5px",
    background: "#205078",
  },
  formBody: {
    padding: "36px 40px 40px",
  },
  fieldGroup: {
    marginBottom: "22px",
  },
  label: {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "#5a6a78",
    marginBottom: "8px",
  },
  input: {
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
    resize: "none",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #eef0f3",
    margin: "28px 0",
  },
  sectionLabel: {
    fontSize: "0.72rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "#b0bec9",
    marginBottom: "18px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  sectionLabelLine: {
    flex: 1,
    height: "1px",
    background: "#eef0f3",
  },
  inputHint: {
    fontSize: "0.76rem",
    color: "#a0adb8",
    marginTop: "5px",
  },
  submitBtn: {
    background: "#205078",
    border: "none",
    color: "#fff",
    borderRadius: "10px",
    padding: "12px 32px",
    fontSize: "0.92rem",
    fontWeight: 700,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    transition: "background 0.18s",
    letterSpacing: "0.01em",
  },
};

const IconModule = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const IconSave = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
  </svg>
);

const IconLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const Field = ({ label, hint, children }) => (
  <div style={styles.fieldGroup}>
    <label style={styles.label}>{label}</label>
    {children}
    {hint && <p style={styles.inputHint}>{hint}</p>}
  </div>
);

const ModuleForm = ({ moduloInicial, onGuardar, onVolver }) => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState(moduloInicial?.nombre || "");
  const [descripcion, setDescripcion] = useState(moduloInicial?.descripcion || "");
  const [imagenUrl, setImagenUrl] = useState(moduloInicial?.imagenUrl || "");
  const [driveUrl, setDriveUrl] = useState(moduloInicial?.driveUrl || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar({ nombre, descripcion, imagenUrl, driveUrl });
  };

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

  return (
    <div style={styles.page}>
      <div className="container">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div style={styles.heroCard}>
          <div style={styles.heroAccent} />
          <div style={styles.heroAccent2} />

          <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
            <button
              style={styles.backBtn}
              onClick={() => navigate("/courses")}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.22)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
            >
              <BsArrowLeft />
            </button>
            <div style={styles.heroTag}>
              <span style={{ marginRight: 4 }}><IconModule /></span>
              Administración
            </div>
          </div>

          <h1 style={styles.heroTitle}>Modificar módulo</h1>
          <p style={styles.heroSubtitle}>
            Actualizá el contenido, descripción y los enlaces del módulo.
          </p>
        </div>

        {/* ── SECTION TITLE ─────────────────────────────────────────────── */}
        <div style={styles.sectionTitle}>
          <span style={styles.sectionDot} />
          Datos del módulo
        </div>

        {/* ── FORM CARD ─────────────────────────────────────────────────── */}
        <div style={styles.formCard}>
          <div style={styles.formCardAccent} />
          <div style={styles.formBody}>
            <form onSubmit={handleSubmit}>

              {/* General info */}
              <div style={styles.sectionLabel}>
                <span>Información general</span>
                <div style={styles.sectionLabelLine} />
              </div>

              <Field label="Nombre del módulo">
                <input
                  type="text"
                  style={styles.input}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  placeholder="Ej: Introducción a la Aerodinámica"
                  required
                />
              </Field>

              <Field label="Descripción">
                <textarea
                  rows={4}
                  style={styles.input}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  placeholder="Describí brevemente los temas que cubre este módulo..."
                />
              </Field>

              <hr style={styles.divider} />

              {/* Links */}
              <div style={styles.sectionLabel}>
                <span>
                  <span style={{ marginRight: "5px" }}><IconLink /></span>
                  Enlaces
                </span>
                <div style={styles.sectionLabelLine} />
              </div>

              <Field
                label="URL de imagen de portada"
                hint="Usada como imagen de previsualización del módulo."
              >
                <input
                  type="url"
                  style={styles.input}
                  value={imagenUrl}
                  onChange={(e) => setImagenUrl(e.target.value)}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </Field>

              <Field
                label="Enlace a la clase grabada (Drive)"
                hint="Pegá el enlace compartido de la carpeta o archivo en Google Drive."
              >
                <input
                  type="url"
                  style={styles.input}
                  value={driveUrl}
                  onChange={(e) => setDriveUrl(e.target.value)}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                  placeholder="https://drive.google.com/..."
                />
              </Field>

              <hr style={styles.divider} />

              {/* Submit */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="submit"
                  style={styles.submitBtn}
                  onMouseEnter={e => { e.currentTarget.style.background = "#1a3f60"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#205078"; }}
                >
                  <IconSave /> Guardar cambios
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ModuleForm;