import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Badge,
  Button,
  ProgressBar,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// ─── Inline styles (no external CSS file needed) ────────────────────────────
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
  backBtn: {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
    borderRadius: "8px",
    padding: "6px 16px",
    fontSize: "0.82rem",
    fontWeight: 500,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "20px",
    transition: "background 0.2s",
    textDecoration: "none",
  },
  courseTag: {
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
    margin: "0 0 28px 0",
  },
  progressLabel: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.8rem",
    color: "rgba(255,255,255,0.7)",
    marginBottom: "6px",
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
    display: "inline-block",
  },
  moduleCard: {
    background: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e8ecf0",
    padding: "0",
    marginBottom: "16px",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    transition: "box-shadow 0.2s, transform 0.2s",
    position: "relative",
  },
  moduleCardLocked: {
    background: "#fafafa",
    borderRadius: "14px",
    border: "1px solid #e8ecf0",
    padding: "0",
    marginBottom: "16px",
    overflow: "hidden",
    boxShadow: "none",
    position: "relative",
    opacity: 0.65,
  },
  moduleCardCompleted: {
    background: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #d1e8d8",
    padding: "0",
    marginBottom: "16px",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(25,135,84,0.08)",
    position: "relative",
  },
  moduleLeft: {
    width: "6px",
    flexShrink: 0,
  },
  moduleBody: {
    padding: "22px 24px",
    flex: 1,
  },
  moduleNumber: {
    fontSize: "0.7rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "4px",
  },
  moduleTitle: {
    fontSize: "1.05rem",
    fontWeight: 700,
    color: "#1a2a3a",
    margin: "0 0 8px 0",
  },
  moduleTitleLocked: {
    fontSize: "1.05rem",
    fontWeight: 700,
    color: "#888",
    margin: "0 0 8px 0",
  },
  moduleDesc: {
    fontSize: "0.875rem",
    color: "#5a6a78",
    margin: "0 0 18px 0",
    lineHeight: 1.6,
  },
  moduleDescLocked: {
    fontSize: "0.875rem",
    color: "#aaa",
    margin: "0 0 18px 0",
    lineHeight: 1.6,
  },
  btnMaterial: {
    background: "transparent",
    border: "1.5px solid #205078",
    color: "#205078",
    borderRadius: "8px",
    padding: "7px 18px",
    fontSize: "0.82rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.18s",
    textDecoration: "none",
  },
  btnExam: {
    background: "#198754",
    border: "none",
    color: "#fff",
    borderRadius: "8px",
    padding: "7px 18px",
    fontSize: "0.82rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.18s",
  },
  btnExamDone: {
    background: "transparent",
    border: "1.5px solid #198754",
    color: "#198754",
    borderRadius: "8px",
    padding: "7px 18px",
    fontSize: "0.82rem",
    fontWeight: 600,
    cursor: "default",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },
  lockBadge: {
    position: "absolute",
    top: "16px",
    right: "20px",
    background: "#dcdbdb",
    borderRadius: "20px",
    padding: "4px 12px",
    fontSize: "0.72rem",
    fontWeight: 600,
    color: "#777",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  completedBadge: {
    position: "absolute",
    top: "16px",
    right: "20px",
    background: "#d1f5e0",
    borderRadius: "20px",
    padding: "4px 12px",
    fontSize: "0.72rem",
    fontWeight: 600,
    color: "#198754",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  scorePill: {
    background: "#e8f5ee",
    borderRadius: "8px",
    padding: "4px 12px",
    fontSize: "0.78rem",
    color: "#198754",
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },
  requirementNote: {
    fontSize: "0.78rem",
    color: "#e67e22",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginTop: "10px",
  },
};

// ─── Mock data ───────────────────────────────────────────────────────────────
const courseData = {
  id: 1,
  title: "Curso de Tácticas Iniciales",
  category: "Vuelo Básico",
  description:
    "Fundamentos esenciales para pilotos en formación. Domina los principios de aerodinámica, comunicaciones y maniobras básicas antes de pasar al vuelo real.",
  totalModules: 6,
  modules: [
    {
      id: 1,
      title: "Introducción a la Aerodinámica",
      description:
        "Principios físicos que hacen posible el vuelo: sustentación, resistencia, empuje y peso. Comprendé cómo interactúan las fuerzas sobre la aeronave.",
      driveLink: "https://drive.google.com",
      hasExam: false,
      status: "completed", // completed | available | locked
      examScore: null,
    },
    {
      id: 2,
      title: "Cabina y Controles",
      description:
        "Reconocimiento de instrumentos primarios y secundarios. Procedimientos de pre-vuelo y checklist estándar OACI para aeronaves de entrenamiento.",
      driveLink: "https://drive.google.com",
      hasExam: true,
      status: "completed",
      examScore: 8.5,
    },
    {
      id: 3,
      title: "Comunicaciones Aeronáuticas",
      description:
        "Fraseología ICAO, uso de radio VHF, contacto con torre de control, ATIS y procedimientos en caso de falla de comunicaciones.",
      driveLink: "https://drive.google.com",
      hasExam: true,
      status: "available",
      examScore: null,
    },
    {
      id: 4,
      title: "Maniobras Básicas de Vuelo",
      description:
        "Ejecución de virajes, ascensos y descensos coordinados. Corrección de actitud y control de velocidad en vuelo recto y nivelado.",
      driveLink: "https://drive.google.com",
      hasExam: true,
      status: "locked",
      examScore: null,
      requiresPrevious: "Comunicaciones Aeronáuticas",
    },
    {
      id: 5,
      title: "Meteorología para Pilotos",
      description:
        "Interpretación de cartas del tiempo, METAR y TAF. Fenómenos meteorológicos peligrosos y toma de decisiones ante condiciones adversas.",
      driveLink: "https://drive.google.com",
      hasExam: true,
      status: "locked",
      examScore: null,
      requiresPrevious: "Maniobras Básicas de Vuelo",
    },
    {
      id: 6,
      title: "Navegación y Planificación de Vuelo",
      description:
        "Uso de cartas de navegación VFR, cálculo de rumbos, consumo de combustible y elaboración completa de un plan de vuelo.",
      driveLink: "https://drive.google.com",
      hasExam: false,
      status: "locked",
      examScore: null,
      requiresPrevious: "Meteorología para Pilotos",
    },
  ],
};

// ─── Icons (SVG inline) ──────────────────────────────────────────────────────
const IconLock = () => (
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
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IconCheck = () => (
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
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconExternalLink = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
const IconClipboard = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);
const IconWarn = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const IconStar = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconBack = () => (
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
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);
const IconPlane = () => (
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
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L11 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </svg>
);

// ─── Module Card Component ───────────────────────────────────────────────────
const ModuleCard = ({ module, index }) => {
  const navigate = useNavigate();

  const isLocked = module.status === "locked";
  const isCompleted = module.status === "completed";
  const isAvailable = module.status === "available";

  const accentColor = isCompleted
    ? "#198754"
    : isLocked
      ? "#dcdbdb"
      : "#205078";
  const cardStyle = isLocked
    ? styles.moduleCardLocked
    : isCompleted
      ? styles.moduleCardCompleted
      : styles.moduleCard;

  return (
    <div style={cardStyle}>
      {/* Left accent bar */}
      <div style={{ display: "flex" }}>
        <div style={{ ...styles.moduleLeft, background: accentColor }} />
        <div style={styles.moduleBody}>
          {/* Status badge */}
          {isLocked && (
            <div style={styles.lockBadge}>
              <IconLock /> Bloqueado
            </div>
          )}
          {isCompleted && (
            <div style={styles.completedBadge}>
              <IconCheck /> Completado
            </div>
          )}

          {/* Module number */}
          <div style={{ ...styles.moduleNumber, color: accentColor }}>
            Módulo {String(index + 1).padStart(2, "0")}
          </div>

          {/* Title */}
          <h5 style={isLocked ? styles.moduleTitleLocked : styles.moduleTitle}>
            {module.title}
          </h5>

          {/* Description */}
          <p style={isLocked ? styles.moduleDescLocked : styles.moduleDesc}>
            {module.description}
          </p>

          {/* Score pill if exam was passed */}
          {isCompleted && module.examScore && (
            <div style={{ marginBottom: "16px" }}>
              <span style={styles.scorePill}>
                <IconStar /> Examen aprobado: {module.examScore}/10
              </span>
            </div>
          )}

          {/* Action buttons */}
          {!isLocked && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {/* Ver material button */}
              <a
                href={module.driveLink}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.btnMaterial}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#205078";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#205078";
                }}
              >
                <IconExternalLink /> Ver material
              </a>

              {/* Exam button */}
              {module.hasExam &&
                (isCompleted ? (
                  <span style={styles.btnExamDone}>
                    <IconCheck /> Examen realizado
                  </span>
                ) : (
                  <button
                    style={styles.btnExam}
                    onClick={() => navigate("/studentExamView")}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#146c43";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#198754";
                    }}
                  >
                    <IconClipboard /> Tomar el examen
                  </button>
                ))}

              {/* No exam badge */}
              {!module.hasExam && isAvailable && (
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: "#888",
                    fontStyle: "italic",
                  }}
                >
                  Sin examen requerido
                </span>
              )}
            </div>
          )}

          {/* Lock reason */}
          {isLocked && module.requiresPrevious && (
            <div style={styles.requirementNote}>
              <IconWarn />
              Debés aprobar el examen de "{module.requiresPrevious}" para
              desbloquear este módulo.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main CourseDetail Component ─────────────────────────────────────────────
const CourseDetail = ({ onBack }) => {
  const navigate = useNavigate();
  const course = courseData;

  const completedModules = course.modules.filter(
    (m) => m.status === "completed",
  ).length;
  const totalModules = course.modules.length;
  const progressPercent = Math.round((completedModules / totalModules) * 100);
  const modulesWithExam = course.modules.filter((m) => m.hasExam).length;

  return (
    <div style={styles.page}>
      <Container>
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <div style={styles.heroCard}>
          {/* Decorative circles */}
          <div style={styles.heroAccent} />
          <div style={styles.heroAccent2} />

          {/* Back button */}
          <button
            style={styles.backBtn}
            onClick={() => navigate("/myCourses")}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
            }}
          >
            <IconBack /> Volver a mis cursos
          </button>

          <Row className="align-items-end">
            <Col md={8}>
              <div style={styles.courseTag}>
                <span style={{ marginRight: 4 }}>
                  <IconPlane />
                </span>
                {course.category}
              </div>
              <h1 style={styles.heroTitle}>{course.title}</h1>
              <p style={styles.heroSubtitle}>{course.description}</p>

              {/* Progress bar */}
              <div>
                <div style={styles.progressLabel}>
                  <span>Progreso del curso</span>
                  <span style={{ fontWeight: 700, color: "#fff" }}>
                    {progressPercent}%
                  </span>
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    borderRadius: "99px",
                    height: "8px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${progressPercent}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #4ade80, #22c55e)",
                      borderRadius: "99px",
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
              </div>
            </Col>

            {/* Stats */}
            <Col md={4} className="mt-4 mt-md-0">
              <Row className="g-2">
                <Col xs={4}>
                  <div style={styles.statBox}>
                    <div style={styles.statNum}>{totalModules}</div>
                    <div style={styles.statLabel}>Módulos</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div style={styles.statBox}>
                    <div style={styles.statNum}>{completedModules}</div>
                    <div style={styles.statLabel}>Completados</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div style={styles.statBox}>
                    <div style={styles.statNum}>{modulesWithExam}</div>
                    <div style={styles.statLabel}>Exámenes</div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        {/* ── MODULE LIST ──────────────────────────────────────────── */}
        <div style={styles.sectionTitle}>
          <span style={styles.sectionDot} />
          Contenido del curso
        </div>

        {course.modules.map((module, index) => (
          <ModuleCard key={module.id} module={module} index={index} />
        ))}
      </Container>
    </div>
  );
};

export default CourseDetail;
