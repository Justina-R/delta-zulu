import { useState } from "react";
import { Container } from "react-bootstrap";

const styles = {
  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    position: "relative",
    background: "linear-gradient(135deg, #205078 0%, #1a3f60 60%, #122d46 100%)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "320px",
    paddingTop: "3rem",
    paddingBottom: "64px",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  heroAccent1: {
    position: "absolute",
    top: "-80px",
    right: "-80px",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.04)",
    pointerEvents: "none",
  },
  heroAccent2: {
    position: "absolute",
    bottom: "-100px",
    left: "60px",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.03)",
    pointerEvents: "none",
  },
  heroInner: {
    textAlign: "center",
    color: "#fff",
    position: "relative",
    zIndex: 1,
  },
  heroTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "#fff",
    borderRadius: "20px",
    padding: "4px 16px",
    fontSize: "0.74rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "18px",
  },
  heroTitle: {
    fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
    fontWeight: 800,
    margin: "0 0 12px",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    color: "#fff",
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.72)",
    fontSize: "1rem",
    margin: 0,
    maxWidth: "460px",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.6,
  },

  // ── Page body ─────────────────────────────────────────────────────────────
  body: {
    background: "#f4f6f9",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    paddingBottom: "80px",
  },

  // ── Group header ──────────────────────────────────────────────────────────
  groupHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    paddingTop: "56px",
    // margin: "56px 0 20px",
  },
  groupTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(32,80,120,0.08)",
    border: "1px solid rgba(32,80,120,0.15)",
    color: "#205078",
    borderRadius: "20px",
    padding: "4px 14px",
    fontSize: "0.73rem",
    fontWeight: 700,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    flexShrink: 0,
  },
  groupLine: {
    flex: 1,
    height: "1px",
    background: "#dce4ec",
  },
  groupTitle: {
    fontSize: "clamp(1.3rem, 2.5vw, 1.6rem)",
    fontWeight: 800,
    color: "#1a2a3a",
    margin: 0,
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
  },

  // ── Accordion wrapper ─────────────────────────────────────────────────────
  accordionWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  // ── Accordion item ────────────────────────────────────────────────────────
  accordionItem: {
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e8ecf0",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    transition: "box-shadow 0.2s",
  },
  accordionItemOpen: {
    background: "#ffffff",
    borderRadius: "12px",
    border: "1.5px solid #205078",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(32,80,120,0.1)",
  },
  accordionBtn: {
    width: "100%",
    background: "transparent",
    border: "none",
    padding: "17px 22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "14px",
    cursor: "pointer",
    textAlign: "left",
    transition: "background 0.15s",
  },
  accordionBtnOpen: {
    width: "100%",
    background: "rgba(32,80,120,0.04)",
    border: "none",
    padding: "17px 22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "14px",
    cursor: "pointer",
    textAlign: "left",
    borderBottom: "1px solid #dce4ec",
  },
  accordionQuestion: {
    fontSize: "0.93rem",
    fontWeight: 600,
    color: "#1a2a3a",
    lineHeight: 1.4,
    margin: 0,
    flex: 1,
  },
  accordionQuestionOpen: {
    fontSize: "0.93rem",
    fontWeight: 700,
    color: "#205078",
    lineHeight: 1.4,
    margin: 0,
    flex: 1,
  },
  chevron: {
    flexShrink: 0,
    color: "#8a97a5",
    transition: "transform 0.2s",
  },
  chevronOpen: {
    flexShrink: 0,
    color: "#205078",
    transform: "rotate(180deg)",
    transition: "transform 0.2s",
  },
  accordionBody: {
    padding: "16px 22px 20px",
    fontSize: "0.9rem",
    color: "#3a4a58",
    lineHeight: 1.75,
    borderTop: "none",
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconQ = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const IconPlane = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L11 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
  </svg>
);
const IconMoney = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const IconChevron = ({ open }) => (
  <svg
    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={open ? styles.chevronOpen : styles.chevron}
  >
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

// ─── Single accordion item ────────────────────────────────────────────────────
const FaqItem = ({ question, children, eventKey }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={open ? styles.accordionItemOpen : styles.accordionItem}>
      <button
        style={open ? styles.accordionBtnOpen : styles.accordionBtn}
        onClick={() => setOpen(!open)}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = "#f8fafc"; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = "transparent"; }}
      >
        <span style={open ? styles.accordionQuestionOpen : styles.accordionQuestion}>
          {question}
        </span>
        <IconChevron open={open} />
      </button>
      {open && (
        <div style={styles.accordionBody}>
          {children}
        </div>
      )}
    </div>
  );
};

// ─── Group heading ────────────────────────────────────────────────────────────
const GroupHeading = ({ icon, label, title }) => (
  <div>
    <div style={styles.groupHeader}>
      <div style={styles.groupTag}>{icon} {label}</div>
      <div style={styles.groupLine} />
    </div>
    <h2 style={styles.groupTitle}>{title}</h2>
    <div style={{ marginBottom: "20px" }} />
  </div>
);

const Faq = () => {
  return (
    <div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={styles.hero}>
        <div style={styles.heroAccent1} />
        <div style={styles.heroAccent2} />
        <div style={styles.heroInner}>
          <div style={styles.heroTag}>
            <IconQ /> Atención al alumno
          </div>
          <h1 style={styles.heroTitle}>Preguntas Frecuentes</h1>
          <p style={styles.heroSubtitle}>
            Todo lo que necesitás saber antes de comenzar tu formación como piloto.
          </p>
        </div>
      </div>

      {/* ── CONTENT ───────────────────────────────────────────────────────── */}
      <div style={styles.body}>
        <Container>

          {/* Piloto Privado */}
          <GroupHeading
            icon={<IconPlane />}
            label="PPA"
            title="Sobre el Curso de Piloto Privado (PPA)"
          />
          <div style={styles.accordionWrapper}>
            <FaqItem question="Si soy argentino, ¿cuáles son los requisitos de inscripción para el curso de Piloto Privado?">
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                <li>Ser mayor de 16 años y 9 meses. Los menores de 18 deben presentar autorización de los padres certificada.</li>
                <li>Certificado de estudios primarios escolares.</li>
                <li>Certificado médico aeronáutico de Argentina.</li>
                <li>Foto 4×4 cm con fondo azul.</li>
              </ul>
            </FaqItem>

            <FaqItem question="¿Cómo iniciar los trámites para el estudio psicofísico (CMA) del curso de Piloto Privado?">
              <ol style={{ paddingLeft: "18px", margin: 0 }}>
                <li>Solicitar CLAVE FISCAL NIVEL 3 de AFIP.</li>
                <li>Registrarse en el CAD: https://cad.anac.gov.ar</li>
                <li>Confirmar el registro desde el email.</li>
                <li>Esperar correo de confirmación (1 a 3 días hábiles).</li>
                <li>Ingresar al CAD, ir a CMA, seleccionar CMA inicial.</li>
                <li>Completar los 3 pasos del formulario.</li>
                <li>Confirmar y guardar el número de trámite.</li>
                <li>Solicitar turno en un centro médico habilitado.</li>
              </ol>
            </FaqItem>

            <FaqItem question="¿Cuál es la edad mínima requerida para iniciar el curso de Piloto Privado?">
              16 años y 9 meses.
            </FaqItem>

            <FaqItem question="¿Cuál es la edad máxima requerida para iniciar el curso de Piloto Privado?">
              No hay límite de edad.
            </FaqItem>

            <FaqItem question="¿Cuándo es la fecha de inicio del curso de Piloto Privado?">
              El curso inicia cuando el alumno lo desee. Las clases se programan por teléfono o en persona.
            </FaqItem>

            <FaqItem question="¿Con qué avión se realiza el curso de Piloto Privado de Avión?">
              Con aviones de instrucción Cessna 150.
            </FaqItem>

            <FaqItem question="¿El precio de la hora de vuelo incluye el instructor?">
              Sí.
            </FaqItem>

            <FaqItem question="¿El precio de la hora de vuelo incluye el combustible?">
              Sí.
            </FaqItem>

            <FaqItem question="¿A partir de qué momento se empieza a contar la hora de vuelo?">
              Desde que se pone en marcha el avión hasta que se detiene.
            </FaqItem>

            <FaqItem question="¿En qué consiste el examen de Piloto Privado?">
              Consiste en un examen teórico de opción múltiple y un vuelo práctico con inspector de ANAC.
            </FaqItem>

            <FaqItem question="¿Con qué métodos de pago puedo pagar el curso?">
              En efectivo, transferencia o depósito bancario.
            </FaqItem>

            <FaqItem question="¿Debo abonar el curso antes de su inicio?">
              No. El curso se puede pagar clase por clase.
            </FaqItem>

            <FaqItem question="¿Qué duración tiene el curso?">
              Entre 2 meses y 2 años, según ritmo del alumno y frecuencia de vuelo.
            </FaqItem>

            <FaqItem question="¿Qué aviones puedo volar con la licencia de Piloto Privado?">
              Aviones monomotores de hasta 5.700 kg.
            </FaqItem>

            <FaqItem question="¿Con la licencia de Piloto Privado puedo realizar vuelos comerciales?">
              No. Para eso se requiere el curso de Piloto Comercial c/HVI.
            </FaqItem>

            <FaqItem question="¿Cuántas horas de vuelo son requeridas para obtener la licencia?">
              Mínimo, 40 horas.
            </FaqItem>
          </div>

          {/* Piloto Comercial */}
          <GroupHeading
            icon={<IconMoney />}
            label="Comercial"
            title="Sobre el Curso de Piloto Comercial"
          />
          <div style={{ ...styles.accordionWrapper, marginBottom: "40px" }}>
            <FaqItem question="Si soy argentino, ¿cuáles son los requisitos de inscripción para el curso de Piloto Comercial?">
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                <li>Tener licencia de Piloto Privado de Avión.</li>
                <li>Certificado de estudios secundarios.</li>
                <li>Certificado médico aeronáutico Clase I.</li>
              </ul>
            </FaqItem>

            <FaqItem question="¿Cuándo es la fecha de inicio del curso de Piloto Comercial?">
              Primera semana de marzo y de agosto (teórico). El práctico inicia cuando el alumno lo desee.
            </FaqItem>

            <FaqItem question="¿Puedo realizar tanto el curso práctico como el teórico en Delta Zulu?">
              Sí, Delta Zulu está habilitada para ofrecer ambos cursos.
            </FaqItem>

            <FaqItem question="¿Es necesario hacer el curso teórico y el práctico al mismo tiempo?">
              No. Son cursos independientes pero ambos son obligatorios para solicitar examen.
            </FaqItem>

            <FaqItem question="¿Qué duración tiene el curso de Piloto Comercial?">
              El teórico dura 5 meses. El práctico depende de la constancia del alumno.
            </FaqItem>

            <FaqItem question="¿Con qué avión se realiza el curso?">
              En aviones Cessna 150.
            </FaqItem>

            <FaqItem question="¿Con la licencia de Piloto Comercial puedo cobrar por mis servicios?">
              Sí.
            </FaqItem>

            <FaqItem question="¿Qué aviones puedo volar con esta licencia?">
              Aviones monomotores de hasta 5.700 kg.
            </FaqItem>

            <FaqItem question="¿Cuántas horas de vuelo son requeridas?">
              Mínimo, 200 horas.
            </FaqItem>
          </div>

        </Container>
      </div>
    </div>
  );
};

export default Faq;