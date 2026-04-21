import { Container, Row, Col } from "react-bootstrap";
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
  },
  cardImg: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    display: "block",
  },
  cardBody: {
    padding: "20px 22px 22px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  cardTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#1a2a3a",
    margin: "0 0 6px 0",
    lineHeight: 1.35,
  },
  btnAvailable: {
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
    width: "100%",
    justifyContent: "center",
  },
  btnInProgress: {
    background: "#198754",
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
    width: "100%",
    justifyContent: "center",
  },
  btnCompleted: {
    background: "transparent",
    border: "1.5px solid #dcdbdb",
    color: "#999",
    borderRadius: "8px",
    padding: "9px 20px",
    fontSize: "0.85rem",
    fontWeight: 600,
    cursor: "default",
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    width: "100%",
    justifyContent: "center",
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconPlane = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L11 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconPlay = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);
const IconCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// ─── Status badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const config = {
    available: { label: "Disponible", bg: "rgba(32,80,120,0.1)", color: "#205078", border: "rgba(32,80,120,0.2)" },
    in_progress: { label: "En progreso", bg: "rgba(25,135,84,0.1)", color: "#198754", border: "rgba(25,135,84,0.2)" },
    completed: { label: "Completado", bg: "rgba(100,100,100,0.08)", color: "#888", border: "#dcdbdb" },
  }[status];

  return (
    <span style={{
      fontSize: "0.7rem",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      background: config.bg,
      color: config.color,
      border: `1px solid ${config.border}`,
      borderRadius: "20px",
      padding: "3px 10px",
      display: "inline-block",
      marginBottom: "10px",
    }}>
      {config.label}
    </span>
  );
};

// ─── Course Card ──────────────────────────────────────────────────────────────
const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const accentColor =
    course.status === "completed" ? "#dcdbdb"
    : course.status === "in_progress" ? "#198754"
    : "#205078";

  return (
    <div
      style={styles.card}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(32,80,120,0.14)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Image with accent bar overlay */}
      <div style={{ position: "relative" }}>
        <img src={course.image} alt={course.title} style={styles.cardImg} />
        {/* Bottom accent bar */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "4px",
          background: accentColor,
        }} />
        {/* Subtle gradient overlay */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "80px",
          background: "linear-gradient(to top, rgba(10,20,35,0.45), transparent)",
          pointerEvents: "none",
        }} />
      </div>

      <div style={styles.cardBody}>
        <StatusBadge status={course.status} />
        <h5 style={styles.cardTitle}>{course.title}</h5>

        <div style={{ marginTop: "auto", paddingTop: "16px" }}>
          {course.status === "available" && (
            <button
              style={styles.btnAvailable}
              onClick={() => navigate("/courseDetail")}
              onMouseEnter={e => { e.currentTarget.style.background = "#1a3f60"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#205078"; }}
            >
              <IconPlay /> Comenzar curso <IconArrow />
            </button>
          )}
          {course.status === "in_progress" && (
            <button
              style={styles.btnInProgress}
              onClick={() => navigate("/courseDetail")}
              onMouseEnter={e => { e.currentTarget.style.background = "#146c43"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#198754"; }}
            >
              <IconArrow /> Continuar curso
            </button>
          )}
          {course.status === "completed" && (
            <button style={styles.btnCompleted} disabled>
              <IconCheck /> Completado
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const MyCourses = () => {
  const courses = [
    { id: 1, title: "Curso de Tácticas Iniciales", image: "/images/LV-BYE.jpeg", status: "available" },
    { id: 2, title: "Curso Avanzado de Rescate", image: "/images/avion.jpeg", status: "in_progress" },
    { id: 3, title: "Curso de Operaciones Aéreas", image: "/images/simulador.jpg", status: "completed" },
  ];

  const available = courses.filter(c => c.status === "available").length;
  const inProgress = courses.filter(c => c.status === "in_progress").length;
  const completed = courses.filter(c => c.status === "completed").length;

  return (
    <div style={styles.page}>
      <Container>
        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div style={styles.heroCard}>
          <div style={styles.heroAccent} />
          <div style={styles.heroAccent2} />

          <Row className="align-items-end">
            <Col md={8}>
              <div style={styles.heroTag}>
                <span style={{ marginRight: 4 }}><IconPlane /></span>
                Escuela de Vuelo
              </div>
              <h1 style={styles.heroTitle}>Mis cursos</h1>
              <p style={styles.heroSubtitle}>
                Accedé a tu formación aeronáutica, seguí tu progreso y retomá donde lo dejaste.
              </p>
            </Col>

            <Col md={4} className="mt-4 mt-md-0">
              <Row className="g-2">
                <Col xs={4}>
                  <div style={styles.statBox}>
                    <div style={styles.statNum}>{courses.length}</div>
                    <div style={styles.statLabel}>Total</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div style={styles.statBox}>
                    <div style={styles.statNum}>{inProgress}</div>
                    <div style={styles.statLabel}>En curso</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div style={styles.statBox}>
                    <div style={styles.statNum}>{completed}</div>
                    <div style={styles.statLabel}>Finalizados</div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        {/* ── COURSE GRID ───────────────────────────────────────────────── */}
        <div style={styles.sectionTitle}>
          <span style={styles.sectionDot} />
          Cursos disponibles
        </div>

        <Row className="g-4">
          {courses.map(course => (
            <Col key={course.id} md={4} sm={6}>
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default MyCourses;