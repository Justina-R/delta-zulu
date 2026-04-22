import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../../../api/client";
import Loader from "../../ui/Loader";

const styles = {
  page: { background: "#f4f6f9", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", paddingTop: "3rem", paddingBottom: "60px" },
  heroCard: { background: "linear-gradient(135deg, #205078 0%, #1a3f60 60%, #122d46 100%)", borderRadius: "24px", padding: "40px 48px", color: "#ffffff", position: "relative", overflow: "hidden", marginBottom: "40px", boxShadow: "0 12px 48px rgba(32,80,120,0.25)" },
  heroAccent: { position: "absolute", top: "-60px", right: "-60px", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" },
  heroAccent2: { position: "absolute", bottom: "-80px", right: "120px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" },
  backBtn: { background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: "8px", padding: "6px 16px", fontSize: "0.82rem", fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "20px" },
  heroTitle: { fontSize: "2.4rem", fontWeight: 700, margin: "0 0 8px 0" },
  heroSubtitle: { color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", margin: "0 0 32px 0", maxWidth: "800px" },
  progressWrapper: { width: "100%", maxWidth: "600px" },
  progressLabelRow: { display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" },
  progressPercent: { fontWeight: 700, color: "#fff" },
  progressTrack: { height: "10px", background: "rgba(255,255,255,0.1)", borderRadius: "10px", overflow: "hidden" },
  progressBar: { height: "100%", background: "#2ecc71", borderRadius: "10px", transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)" },
  statBox: { background: "rgba(255,255,255,0.08)", borderRadius: "16px", padding: "18px 24px", textAlign: "center", border: "1px solid rgba(255,255,255,0.1)", height: "100%" },
  statNum: { fontSize: "1.8rem", fontWeight: 800, color: "#fff", lineHeight: 1 },
  statLabel: { fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginTop: "8px", fontWeight: 700, letterSpacing: "0.05em" },
  sectionTitle: { fontSize: "1.1rem", fontWeight: 700, color: "#205078", marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" },
  moduleCard: { background: "#ffffff", borderRadius: "16px", border: "1px solid #e8ecf0", marginBottom: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", transition: "transform 0.2s" },
  moduleBody: { padding: "24px 32px", width: "100%" },
  moduleHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" },
  moduleTitle: { fontSize: "1.15rem", fontWeight: 700, color: "#1a2a3a", margin: 0 },
  btnMaterial: { background: "transparent", border: "1.5px solid #205078", color: "#205078", borderRadius: "8px", padding: "8px 20px", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", transition: "all 0.2s" },
  btnExam: { background: "#198754", border: "1.5px solid #198754", color: "#fff", borderRadius: "8px", padding: "8px 20px", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" },
  btnCompleted: { background: "transparent", border: "1.5px solid #198754", color: "#198754", borderRadius: "8px", padding: "8px 20px", fontSize: "0.85rem", fontWeight: 600, cursor: "default", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" },
  badgeCompleted: { background: "rgba(25, 135, 84, 0.1)", color: "#198754", padding: "4px 12px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px", border: "1px solid rgba(25, 135, 84, 0.2)" },
  scoreBadge: { fontSize: "0.85rem", fontWeight: 700, color: "#198754", background: "rgba(25, 135, 84, 0.05)", padding: "8px 14px", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "16px" }
};

const CourseDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("id");
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      api.get(`/courses/${courseId}`)
        .then(setCourse)
        .finally(() => setLoading(false));
    }
  }, [courseId]);

  if (loading) return <Loader text="Cargando detalles del curso..." />;
  if (!course) return <div className="p-5 text-center">Curso no encontrado</div>;

  const modules = course.modules || [];
  const totalModules = modules.length;
  const examsCount = modules.filter(m => m.exam).length;
  const completedModules = modules.filter(m => {
    const lastAttempt = m.exam?.attempts?.[0];
    return lastAttempt && lastAttempt.score >= 6;
  }).length;
  const progress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  return (
    <div style={styles.page}>
      <Container>
        <div style={styles.heroCard}>
          <div style={styles.heroAccent} /><div style={styles.heroAccent2} />
          <button style={styles.backBtn} onClick={() => navigate("/myCourses")}>← Volver a mis cursos</button>
          <Row className="align-items-end">
            <Col lg={8}>
              <div style={{...styles.badgeCompleted, display: 'inline-flex', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '16px'}}>
                <span style={{fontSize: '14px'}}>✈</span> VUELO BÁSICO
              </div>
              <h1 style={styles.heroTitle}>{course.nombre}</h1>
              <p style={styles.heroSubtitle}>{course.descripcion}</p>
              
              <div style={styles.progressWrapper}>
                <div style={styles.progressLabelRow}>
                  <span>Progreso del curso</span>
                  <span style={styles.progressPercent}>{progress}%</span>
                </div>
                <div style={styles.progressTrack}>
                  <div style={{...styles.progressBar, width: `${progress}%`}} />
                </div>
              </div>
            </Col>
            <Col lg={4} className="mt-4 mt-lg-0">
              <div className="d-flex flex-wrap gap-2 gap-md-3">
                <div style={styles.statBox} className="flex-grow-1">
                  <div style={styles.statNum}>{totalModules}</div>
                  <div style={styles.statLabel}>Módulos</div>
                </div>
                <div style={styles.statBox} className="flex-grow-1">
                  <div style={styles.statNum}>{completedModules}</div>
                  <div style={styles.statLabel}>Completados</div>
                </div>
                <div style={styles.statBox} className="flex-grow-1">
                  <div style={styles.statNum}>{examsCount}</div>
                  <div style={styles.statLabel}>Exámenes</div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div style={styles.sectionTitle}>Contenido del curso</div>
        {modules.map((modulo, index) => {
          const lastAttempt = modulo.exam?.attempts?.[0];
          const isCompleted = lastAttempt && lastAttempt.score >= 6;
          
          return (
            <div key={modulo.id} style={styles.moduleCard}>
              <div style={{ display: "flex", minHeight: "160px" }}>
                <div style={{ width: "6px", background: isCompleted ? "#198754" : "#205078" }} />
                <div style={styles.moduleBody}>
                  <div style={styles.moduleHeader}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: isCompleted ? "#198754" : "#205078", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      MÓDULO {String(index + 1).padStart(2, "0")}
                    </div>
                    {isCompleted && (
                      <div style={styles.badgeCompleted}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Completado
                      </div>
                    )}
                  </div>
                  <h5 style={styles.moduleTitle}>{modulo.nombre}</h5>
                  <p style={{ fontSize: "0.9rem", color: "#5a6a78", margin: "10px 0 20px 0", lineHeight: "1.5" }}>{modulo.descripcion}</p>
                  
                  {isCompleted && (
                    <div style={styles.scoreBadge}>
                      <span style={{fontSize: '1rem'}}>★</span>
                      Examen aprobado: {lastAttempt.score.toFixed(1)}/10
                    </div>
                  )}

                  <div className="d-flex gap-2">
                    {modulo.driveUrl && (
                      <a href={modulo.driveUrl} target="_blank" rel="noreferrer" style={styles.btnMaterial}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Ver material
                      </a>
                    )}
                    {modulo.exam && (
                      isCompleted ? (
                        <button 
                          style={{...styles.btnCompleted, cursor: "pointer"}}
                          onClick={() => navigate(`/studentExamView?id=${modulo.exam.id}&review=true`)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Ver resultados
                        </button>
                      ) : (
                        <button 
                          style={styles.btnExam}
                          onClick={() => navigate(`/studentExamView?id=${modulo.exam.id}`)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                          </svg>
                          Tomar el examen
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Container>
    </div>
  );
};

export default CourseDetail;
