import { Container, Row, Col } from "react-bootstrap";
import { FaPlane } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { PiPlantFill } from "react-icons/pi";
import { FaPersonChalkboard } from "react-icons/fa6";
import { RiComputerFill } from "react-icons/ri";
import { AiFillDashboard } from "react-icons/ai";
import { GoChecklist } from "react-icons/go";

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
    fontFamily: "'Segoe UI', system-ui, sans-serif",
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
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.72)",
    fontSize: "1rem",
    margin: 0,
    maxWidth: "480px",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.6,
  },

  // ── Intro section ──────────────────────────────────────────────────────────
  introSection: {
    background: "#ffffff",
    padding: "72px 0",
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
  },
  introTitle: {
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 800,
    color: "#1a2a3a",
    margin: "0 0 18px",
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
  },
  introLead: {
    fontSize: "1.08rem",
    color: "#3a4a58",
    lineHeight: 1.7,
    margin: "0 0 14px",
    fontWeight: 400,
  },
  introText: {
    fontSize: "0.95rem",
    color: "#6b7a87",
    lineHeight: 1.75,
    margin: 0,
  },

  // ── Schema image section ───────────────────────────────────────────────────
  schemaSection: {
    background: "#f4f6f9",
    padding: "60px 0",
  },

  // ── Course list section ────────────────────────────────────────────────────
  listSection: {
    background: "#f4f6f9",
    padding: "72px 0 80px",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  listSectionHeader: {
    textAlign: "center",
    marginBottom: "44px",
  },
  listTitle: {
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 800,
    color: "#1a2a3a",
    margin: "0 0 10px",
    letterSpacing: "-0.02em",
  },
  listSubtitle: {
    fontSize: "0.95rem",
    color: "#6b7a87",
    margin: 0,
  },

  // ── Course row card ────────────────────────────────────────────────────────
  courseRow: {
    background: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e8ecf0",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "20px 24px",
    gap: "18px",
    transition: "box-shadow 0.2s, transform 0.2s",
    position: "relative",
    overflow: "hidden",
  },
  courseRowAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "5px",
    height: "100%",
    background: "#205078",
    borderRadius: "14px 0 0 14px",
  },
  iconWrap: {
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    background: "rgba(32,80,120,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#205078",
    flexShrink: 0,
    transition: "background 0.2s",
  },
  courseTitle: {
    fontSize: "0.97rem",
    fontWeight: 700,
    color: "#1a2a3a",
    margin: 0,
    flex: 1,
  },
  moreInfoBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "transparent",
    border: "1.5px solid #205078",
    color: "#205078",
    borderRadius: "8px",
    padding: "7px 18px",
    fontSize: "0.83rem",
    fontWeight: 700,
    textDecoration: "none",
    transition: "all 0.18s",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconPlaneSmall = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L11 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
  </svg>
);
const IconArrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

// ─── Course Row Component ─────────────────────────────────────────────────────
const CourseItem = ({ icon, title, href }) => (
  <Col xs={12} md={10} className="mx-auto">
    <div
      style={styles.courseRow}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(32,80,120,0.13)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.querySelector(".icon-wrap").style.background = "rgba(32,80,120,0.14)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.querySelector(".icon-wrap").style.background = "rgba(32,80,120,0.08)";
      }}
    >
      <div style={styles.courseRowAccent} />
      <div className="icon-wrap" style={styles.iconWrap}>{icon}</div>
      <h5 style={styles.courseTitle}>{title}</h5>
      <a
        href={href}
        style={styles.moreInfoBtn}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={e => { e.currentTarget.style.background = "#205078"; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#205078"; }}
      >
        Más info <IconArrow />
      </a>
    </div>
  </Col>
);

const Courses = () => {
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={styles.hero}>
        <div style={styles.heroAccent1} />
        <div style={styles.heroAccent2} />
        <div style={styles.heroInner}>
          <div style={styles.heroTag}>
            <IconPlaneSmall /> Formación aeronáutica
          </div>
          <h1 style={styles.heroTitle}>Cursos</h1>
          <p style={styles.heroSubtitle}>
            Programas certificados para cada etapa de tu carrera como piloto profesional.
          </p>
        </div>
      </div>

      {/* ── INTRO ─────────────────────────────────────────────────────────── */}
      <section style={styles.introSection}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <div style={styles.sectionTag}>
                <IconStar /> Delta Zulu
              </div>
              <h2 style={styles.introTitle}>
                Formación profesional para futuros pilotos
              </h2>
              <p style={styles.introLead}>
                En Delta Zulu desarrollamos programas académicos pensados para que
                cada alumno alcance su máximo potencial como piloto profesional.
              </p>
              <p style={styles.introText}>
                Gracias a una combinación de entrenamiento práctico, recursos
                actualizados y un cuerpo docente experimentado, nuestros egresados
                se destacan por su excelente preparación técnica y humana.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── SCHEMA IMAGE ──────────────────────────────────────────────────── */}
      <section style={styles.schemaSection} className="d-none d-md-block">
        <Container className="text-center">
          <img
            src="images/carrera-piloto-profesional.png"
            alt="Esquema de cursos"
            className="img-fluid rounded"
            style={{
              maxWidth: "1000px",
              boxShadow: "0 4px 24px rgba(32,80,120,0.1)",
              borderRadius: "14px",
            }}
          />
        </Container>
      </section>

      {/* ── COURSE LIST ───────────────────────────────────────────────────── */}
      <section style={styles.listSection}>
        <Container>
          <div style={styles.listSectionHeader}>
            <div style={styles.sectionTag}>
              <IconPlaneSmall /> Programas disponibles
            </div>
            <h3 style={styles.listTitle}>Nuestros cursos disponibles</h3>
            <p style={styles.listSubtitle}>
              Hacé click en "Más info" para consultar por WhatsApp.
            </p>
          </div>

          <Row className="g-3">
            <CourseItem
              icon={<FaPlane size={22} />}
              title="Piloto Privado de Avión"
              href="https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Piloto%20Privado%20de%20Avión."
            />
            <CourseItem
              icon={<GrMoney size={22} />}
              title="Piloto Comercial de Avión"
              href="https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Piloto%20Comercial%20de%20Avión."
            />
            <CourseItem
              icon={<PiPlantFill size={22} />}
              title="Piloto Aeroaplicador"
              href="https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Piloto%20Aeroaplicador."
            />
            <CourseItem
              icon={<FaPersonChalkboard size={22} />}
              title="Piloto Instructor de Vuelo"
              href="https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Piloto%Instructor%20de%20Vuelo."
            />
            <CourseItem
              icon={<RiComputerFill size={22} />}
              title="Piloto Instructor de Entrenador Terrestre de Vuelo por Instrumento (ETVI)"
              href="https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Piloto%20Instructor%20de%20ETVI."
            />
            <CourseItem
              icon={<AiFillDashboard size={22} />}
              title="Habilitación de Vuelo por Instrumento (HVI)"
              href="https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Habilitación%20de%20Vuelo%20Por%20Instrumento."
            />
            <CourseItem
              icon={<GoChecklist size={22} />}
              title="Habilitación VFR Controlado"
              href="https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Habilitación%20VFR%20Controlado."
            />
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Courses;