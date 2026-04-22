import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../../api/client";
import Loader from "../../ui/Loader";

const styles = {
  page: { background: "#f4f6f9", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", paddingTop: "3rem", paddingBottom: "60px" },
  heroCard: { background: "linear-gradient(135deg, #205078 0%, #1a3f60 60%, #122d46 100%)", borderRadius: "20px", padding: "40px 48px", color: "#ffffff", position: "relative", overflow: "hidden", marginBottom: "40px", boxShadow: "0 12px 48px rgba(32,80,120,0.25)" },
  heroAccent: { position: "absolute", top: "-60px", right: "-60px", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" },
  heroAccent2: { position: "absolute", bottom: "-80px", right: "120px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" },
  heroTag: { background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", borderRadius: "20px", padding: "4px 14px", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "inline-block", marginBottom: "12px" },
  heroTitle: { fontSize: "2rem", fontWeight: 700, margin: "0 0 8px 0", lineHeight: 1.2, letterSpacing: "-0.01em" },
  heroSubtitle: { color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", margin: 0 },
  statBox: { background: "rgba(255,255,255,0.08)", borderRadius: "12px", padding: "14px 20px", textAlign: "center", border: "1px solid rgba(255,255,255,0.1)" },
  statNum: { fontSize: "1.6rem", fontWeight: 700, color: "#fff", lineHeight: 1 },
  statLabel: { fontSize: "0.72rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "4px" },
  sectionTitle: { fontSize: "1.1rem", fontWeight: 700, color: "#205078", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" },
  sectionDot: { width: "8px", height: "8px", borderRadius: "50%", background: "#205078", flexShrink: 0, display: "inline-block" },
  card: { background: "#ffffff", borderRadius: "14px", border: "1px solid #e8ecf0", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", height: "100%", display: "flex", flexDirection: "column", transition: "all 0.2s" },
  cardImg: { width: "100%", height: "180px", objectFit: "cover", display: "block", background: "#eee" },
  cardBody: { padding: "20px 22px 22px", display: "flex", flexDirection: "column", flex: 1 },
  cardTitle: { fontSize: "1.05rem", fontWeight: 700, color: "#1a2a3a", margin: "0 0 16px 0", lineHeight: 1.35 },

  statusBadge: {
    padding: "6px 14px",
    borderRadius: "10px",
    fontSize: "0.68rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "12px",
    display: "inline-block"
  },

  btnComenzar: { background: "#205078", border: "none", color: "#fff", borderRadius: "10px", padding: "10px 20px", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "10px", transition: "all 0.2s", width: "100%", justifyContent: "center" },
  btnContinuar: { background: "#198754", border: "none", color: "#fff", borderRadius: "10px", padding: "10px 20px", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "10px", transition: "all 0.2s", width: "100%", justifyContent: "center" },
  btnCompletado: { background: "#fff", border: "1px solid #e8ecf0", color: "#b0bec9", borderRadius: "10px", padding: "10px 20px", fontSize: "0.85rem", fontWeight: 600, cursor: "default", display: "inline-flex", alignItems: "center", gap: "10px", width: "100%", justifyContent: "center" },
};

const IconPlane = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L11 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </svg>
);

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  // Calculate status
  let status = "DISPONIBLE";
  const modulesWithExams = course.modules.filter(m => m.exam);
  const totalExams = modulesWithExams.length;
  const passedExams = modulesWithExams.filter(m => m.exam.attempts.some(a => a.score >= 6)).length;
  const hasSomeAttempt = modulesWithExams.some(m => m.exam.attempts.length > 0);

  if (totalExams > 0 && passedExams === totalExams) {
    status = "COMPLETADO";
  } else if (hasSomeAttempt || passedExams > 0) {
    status = "EN PROGRESO";
  }

  const getStatusStyle = () => {
    switch (status) {
      case "COMPLETADO": return { background: "#f8fafc", color: "#6b7a87" };
      case "EN PROGRESO": return { background: "#e8f5e9", color: "#198754" };
      default: return { background: "rgba(32, 80, 120, 0.06)", color: "#205078" };
    }
  };

  return (
    <div style={styles.card}>
      <div style={{ position: "relative" }}>
        <img src={course.imagenUrl || "/images/delta_zulu.png"} alt={course.nombre} style={styles.cardImg} />
      </div>
      <div style={styles.cardBody}>
        <div style={{ ...styles.statusBadge, ...getStatusStyle() }}>{status}</div>
        <h5 style={styles.cardTitle}>{course.nombre}</h5>
        <div style={{ marginTop: "auto" }}>
          {status === "DISPONIBLE" && (
            <button style={styles.btnComenzar} onClick={() => navigate(`/courseDetail?id=${course.id}`)}>
              Comenzar curso →
            </button>
          )}
          {status === "EN PROGRESO" && (
            <button style={styles.btnContinuar} onClick={() => navigate(`/courseDetail?id=${course.id}`)}>
              Continuar curso →
            </button>
          )}
          {status === "COMPLETADO" && (
            <button style={{ ...styles.btnCompletado, cursor: "pointer" }} onClick={() => navigate(`/courseDetail?id=${course.id}`)}>
              ✓ Ver curso completado
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/courses/my-progress")
      .then(setCourses)
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader text="Cargando tus cursos..." />;

  const completedCount = courses.filter(c => {
    const modulesWithExams = c.modules.filter(m => m.exam);
    return modulesWithExams.length > 0 && modulesWithExams.every(m => m.exam.attempts.some(a => a.score >= 6));
  }).length;

  return (
    <div style={styles.page}>
      <Container>
        <div style={styles.heroCard}>
          <div style={styles.heroAccent} />
          <div style={styles.heroAccent2} />
          <Row className="align-items-end">
            <Col md={8}>
              <div style={styles.heroTag}><IconPlane /> Escuela de Vuelo</div>
              <h1 style={styles.heroTitle}>Mis cursos</h1>
              <p style={styles.heroSubtitle}>Accedé a tu formación aeronáutica y seguí tu progreso.</p>
            </Col>
            <Col md={4}>
              <Row className="g-2">
                <Col xs={6}>
                  <div style={styles.statBox}>
                    <div style={styles.statNum}>{courses.length}</div>
                    <div style={styles.statLabel}>Cursos</div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div style={styles.statBox}>
                    <div style={styles.statNum}>{completedCount}</div>
                    <div style={styles.statLabel}>Completados</div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div style={styles.sectionTitle}><span style={styles.sectionDot} />Cursos disponibles</div>
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