import { Container, Row, Col } from "react-bootstrap";

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

  // ── Shared section ────────────────────────────────────────────────────────
  sectionWhite: {
    background: "#ffffff",
    padding: "80px 0",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  sectionGray: {
    background: "#f4f6f9",
    padding: "80px 0",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  sectionTag: {
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
    marginBottom: "14px",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  sectionTitle: {
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 800,
    color: "#1a2a3a",
    margin: "0 0 16px",
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
  },
  sectionLead: {
    fontSize: "1rem",
    color: "#3a4a58",
    lineHeight: 1.75,
    margin: "0 0 14px",
  },
  sectionText: {
    fontSize: "0.95rem",
    color: "#5a6a78",
    lineHeight: 1.8,
    margin: 0,
  },

  // ── Image ─────────────────────────────────────────────────────────────────
  roundImg: {
    width: "100%",
    maxWidth: "380px",
    aspectRatio: "1 / 1",
    objectFit: "cover",
    borderRadius: "50%",
    boxShadow: "0 12px 40px rgba(32,80,120,0.18)",
    display: "block",
    margin: "0 auto",
    border: "5px solid #fff",
  },

  // ── Specs list ─────────────────────────────────────────────────────────────
  specsList: {
    listStyle: "none",
    padding: 0,
    margin: "16px 0 0",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  specItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "0.92rem",
    color: "#3a4a58",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  specDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#205078",
    flexShrink: 0,
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconPlane = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L11 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
  </svg>
);
const IconCog = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const IconMonitor = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const IconUser = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconShield = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

// ─── Reusable section block ────────────────────────────────────────────────
const SectionBlock = ({ tag, tagIcon, title, children, imgSrc, imgAlt, reverse = false, gray = false }) => (
  <section style={gray ? styles.sectionGray : styles.sectionWhite}>
    <Container>
      <Row className={`align-items-center g-5 ${reverse ? "flex-md-row-reverse" : ""}`}>
        <Col md={6}>
          <div style={styles.sectionTag}>
            {tagIcon} {tag}
          </div>
          <h2 style={styles.sectionTitle}>{title}</h2>
          {children}
        </Col>
        <Col md={6} className="text-center">
          <img src={imgSrc} alt={imgAlt} style={styles.roundImg} />
        </Col>
      </Row>
    </Container>
  </section>
);

const FlightSchool = () => {
  return (
    <div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={styles.hero}>
        <div style={styles.heroAccent1} />
        <div style={styles.heroAccent2} />
        <div style={styles.heroInner}>
          <div style={styles.heroTag}>
            <IconPlane /> Delta Zulu — Las Parejas, Santa Fe
          </div>
          <h1 style={styles.heroTitle}>Escuela de Aviación</h1>
          <p style={styles.heroSubtitle}>
            Formación certificada por ANAC, con flota propia y equipo humano de excelencia.
          </p>
        </div>
      </div>

      {/* ── ¿QUIÉNES SOMOS? ───────────────────────────────────────────────── */}
      <SectionBlock
        tag="Nuestra historia"
        tagIcon={<IconShield />}
        title="¿Quiénes somos?"
        imgSrc="images/avion2.jpeg"
        imgAlt="Escuela de vuelo Delta Zulu"
      >
        <p style={styles.sectionLead}>
          Delta Zulu es una Escuela de Vuelo con sede en Las Parejas, Santa Fe,
          dedicada a la formación de pilotos civiles desde los primeros pasos
          hasta niveles avanzados.
        </p>
        <p style={styles.sectionText}>
          Nuestra misión es brindar una instrucción aérea de calidad, segura y
          accesible, combinando tecnología moderna, una flota propia y un equipo
          humano altamente calificado. Nuestro Centro de Instrucción y
          Entrenamiento (CIAC) Tipo 3 está certificado por ANAC, lo que garantiza
          el cumplimiento de los más altos estándares de aviación civil.
        </p>
      </SectionBlock>

      {/* ── AVIÓN DE APRENDIZAJE ──────────────────────────────────────────── */}
      <SectionBlock
        tag="Nuestra flota"
        tagIcon={<IconPlane />}
        title="Nuestro avión de aprendizaje"
        imgSrc="images/cessna.jpeg"
        imgAlt="Avión Cessna"
        reverse
        gray
      >
        <p style={styles.sectionText}>
          Delta Zulu cuenta con un avión de aprendizaje Cessna 150, lo que
          garantiza una excelente experiencia de vuelo por parte de los alumnos y
          favorece la continuidad de su aprendizaje.
        </p>
        <ul style={styles.specsList}>
          {[
            "Hélice: 2 palas – paso fijo",
            "Tren: Triciclo fijo",
            "Motor: Lycoming",
            "Potencia: 110 hp",
            "Velocidad: 180 km/h",
            "Autonomía: 4 horas",
            "Capacidad: 2 pasajeros",
          ].map((spec, i) => (
            <li key={i} style={styles.specItem}>
              <span style={styles.specDot} />
              {spec}
            </li>
          ))}
        </ul>
      </SectionBlock>

      {/* ── SIMULADOR ─────────────────────────────────────────────────────── */}
      <SectionBlock
        tag="Entrenamiento"
        tagIcon={<IconMonitor />}
        title="Simulador de vuelo"
        imgSrc="images/simulador.jpg"
        imgAlt="Simulador de vuelo"
      >
        <p style={styles.sectionText}>
          En Delta Zulu contamos con un simulador de vuelo profesional que permite
          a nuestros alumnos practicar procedimientos, navegación instrumental y
          manejo de situaciones de emergencia sin salir del suelo. Esta herramienta
          de entrenamiento es ideal para afianzar conocimientos, desarrollar
          reflejos en la toma de decisiones y reforzar la seguridad operacional
          antes de cada vuelo real.
        </p>
      </SectionBlock>

      {/* ── CLASES PERSONALIZADAS ─────────────────────────────────────────── */}
      <SectionBlock
        tag="Instrucción"
        tagIcon={<IconUser />}
        title="Clases personalizadas"
        imgSrc="images/clases.jpeg"
        imgAlt="Instructora de vuelo"
        reverse
        gray
      >
        <p style={styles.sectionText}>
          Delta Zulu ofrece clases individuales y personalizadas con la instructora
          de vuelo Virginia Zarantonello, una profesional con años de experiencia en
          instrucción aeronáutica. Las clases personalizadas permiten adaptar el
          ritmo de aprendizaje a cada alumno, reforzar temas específicos y construir
          confianza con acompañamiento cercano, lo cual potencia el rendimiento y
          seguridad del futuro piloto.
        </p>
      </SectionBlock>

    </div>
  );
};

export default FlightSchool;