import { Container, Row, Col } from "react-bootstrap";
import { FaUserGraduate, FaBook, FaFileAlt } from "react-icons/fa";

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
  card: {
    background: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e8ecf0",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "box-shadow 0.2s, transform 0.2s",
    textDecoration: "none",
    cursor: "pointer",
  },
  cardAccentBar: {
    height: "5px",
    width: "100%",
    background: "#205078",
  },
  cardBody: {
    padding: "32px 28px 28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    flex: 1,
  },
  iconWrapper: {
    width: "72px",
    height: "72px",
    borderRadius: "18px",
    background: "rgba(32,80,120,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "18px",
    color: "#205078",
    transition: "background 0.2s",
  },
  cardTitle: {
    fontSize: "1.05rem",
    fontWeight: 700,
    color: "#1a2a3a",
    margin: "0 0 6px 0",
  },
  cardDesc: {
    fontSize: "0.82rem",
    color: "#8a97a5",
    margin: "0 0 24px 0",
    lineHeight: 1.5,
  },
  cardBtn: {
    background: "#205078",
    border: "none",
    color: "#fff",
    borderRadius: "8px",
    padding: "9px 24px",
    fontSize: "0.85rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    transition: "background 0.18s",
    textDecoration: "none",
    marginTop: "auto",
  },
};

const IconArrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const IconShield = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const DashCard = ({ icon, title, description, href, label }) => (
  <div
    style={styles.card}
    onMouseEnter={e => {
      e.currentTarget.style.boxShadow = "0 8px 28px rgba(32,80,120,0.14)";
      e.currentTarget.style.transform = "translateY(-3px)";
      e.currentTarget.querySelector(".icon-wrap").style.background = "rgba(32,80,120,0.14)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.querySelector(".icon-wrap").style.background = "rgba(32,80,120,0.08)";
    }}
  >
    <div style={styles.cardAccentBar} />
    <div style={styles.cardBody}>
      <div className="icon-wrap" style={styles.iconWrapper}>
        {icon}
      </div>
      <h5 style={styles.cardTitle}>{title}</h5>
      <p style={styles.cardDesc}>{description}</p>
      <a
        href={href}
        style={styles.cardBtn}
        onMouseEnter={e => { e.currentTarget.style.background = "#1a3f60"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "#205078"; }}
      >
        {label} <IconArrow />
      </a>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div style={styles.page}>
      <Container>
        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div style={styles.heroCard}>
          <div style={styles.heroAccent} />
          <div style={styles.heroAccent2} />
          <div style={styles.heroTag}>
            <span style={{ marginRight: 4 }}><IconShield /></span>
            Administración
          </div>
          <h1 style={styles.heroTitle}>Panel de Administración</h1>
          <p style={styles.heroSubtitle}>
            Gestioná alumnos, cursos y exámenes desde un solo lugar.
          </p>
        </div>

        {/* ── CARDS ─────────────────────────────────────────────────────── */}
        <div style={styles.sectionTitle}>
          <span style={styles.sectionDot} />
          Accesos rápidos
        </div>

        <Row className="g-4 justify-content-center">
          <Col md={4} sm={6}>
            <DashCard
              icon={<FaUserGraduate size={28} />}
              title="Alumnos Inscriptos"
              description="Consultá el listado de alumnos registrados y su estado de inscripción."
              href="/students"
              label="Ver Alumnos"
            />
          </Col>
          <Col md={4} sm={6}>
            <DashCard
              icon={<FaBook size={28} />}
              title="Cursos Cargados"
              description="Administrá los cursos disponibles, sus módulos y materiales de estudio."
              href="/courses"
              label="Ver Cursos"
            />
          </Col>
          <Col md={4} sm={6}>
            <DashCard
              icon={<FaFileAlt size={28} />}
              title="Exámenes Cargados"
              description="Revisá los exámenes configurados y los resultados obtenidos por los alumnos."
              href="/exams"
              label="Ver Exámenes"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;