import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// ─── Styles (consistent with CourseDetail) ──────────────────────────────────
const styles = {
  page: {
    background: "#f4f6f9",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    paddingTop: "3rem",
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
    padding: "6px 16px",
    fontSize: "0.82rem",
    fontWeight: 500,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "20px",
    transition: "background 0.2s",
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
  questionCard: {
    background: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e8ecf0",
    padding: "28px 28px 24px",
    marginBottom: "20px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    position: "relative",
    overflow: "hidden",
  },
  questionCardLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "5px",
    height: "100%",
    background: "#205078",
    borderRadius: "14px 0 0 14px",
  },
  questionNumber: {
    fontSize: "0.7rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#205078",
    marginBottom: "6px",
  },
  questionText: {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#1a2a3a",
    margin: "0 0 20px 0",
    lineHeight: 1.5,
  },
  optionLabel: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1.5px solid #e8ecf0",
    marginBottom: "10px",
    cursor: "pointer",
    transition: "all 0.15s",
    background: "#fafafa",
    userSelect: "none",
  },
  optionLabelSelected: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1.5px solid #205078",
    marginBottom: "10px",
    cursor: "pointer",
    background: "rgba(32,80,120,0.06)",
    userSelect: "none",
  },
  optionLabelCorrect: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1.5px solid #198754",
    marginBottom: "10px",
    cursor: "default",
    background: "rgba(25,135,84,0.07)",
    userSelect: "none",
  },
  optionLabelWrong: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1.5px solid #dc3545",
    marginBottom: "10px",
    cursor: "default",
    background: "rgba(220,53,69,0.06)",
    userSelect: "none",
  },
  optionLabelMuted: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1.5px solid #e8ecf0",
    marginBottom: "10px",
    cursor: "default",
    background: "#fafafa",
    opacity: 0.5,
    userSelect: "none",
  },
  optionCircle: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid #ccd3db",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  optionCircleSelected: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid #205078",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#205078",
  },
  optionCircleCorrect: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid #198754",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#198754",
  },
  optionCircleWrong: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid #dc3545",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#dc3545",
  },
  optionText: {
    fontSize: "0.9rem",
    color: "#2d3a45",
    lineHeight: 1.4,
  },
  submitArea: {
    background: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e8ecf0",
    padding: "28px 32px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
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
  submitBtnDisabled: {
    background: "#b0bec9",
    border: "none",
    color: "#fff",
    borderRadius: "10px",
    padding: "12px 32px",
    fontSize: "0.92rem",
    fontWeight: 700,
    cursor: "not-allowed",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    letterSpacing: "0.01em",
  },
  resultOverlay: {
    position: "fixed",
    inset: 0,
    marginTop: "10rem",
    background: "rgba(10,20,35,0.65)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
  },
  resultCard: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "48px 40px",
    maxWidth: "460px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
    animation: "slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)",
  },
  resultIcon: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
    fontSize: "2.2rem",
  },
  resultTitle: {
    fontSize: "1.6rem",
    fontWeight: 800,
    marginBottom: "8px",
    letterSpacing: "-0.02em",
  },
  resultSubtitle: {
    fontSize: "0.92rem",
    color: "#6b7a87",
    marginBottom: "28px",
    lineHeight: 1.6,
  },
  resultScore: {
    fontSize: "3.5rem",
    fontWeight: 800,
    lineHeight: 1,
    marginBottom: "4px",
    letterSpacing: "-0.03em",
  },
  resultScoreLabel: {
    fontSize: "0.78rem",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontWeight: 600,
    marginBottom: "28px",
  },
  resultDivider: {
    border: "none",
    borderTop: "1px solid #eef0f3",
    margin: "0 0 28px 0",
  },
  resultBtn: {
    width: "100%",
    borderRadius: "10px",
    padding: "13px",
    fontSize: "0.92rem",
    fontWeight: 700,
    cursor: "pointer",
    border: "none",
    transition: "background 0.18s",
    letterSpacing: "0.01em",
  },
  unansweredNote: {
    fontSize: "0.78rem",
    color: "#e67e22",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginTop: "4px",
  },
};

// ─── Icons ───────────────────────────────────────────────────────────────────
const IconBack = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const IconPlane = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L11 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
  </svg>
);
const IconSend = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IconCheck = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconX = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconWarn = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

// ─── Mock exam data ───────────────────────────────────────────────────────────
const examData = {
  moduleTitle: "Comunicaciones Aeronáuticas",
  courseTitle: "Curso de Tácticas Iniciales",
  questions: [
    {
      id: 1,
      text: "¿Cuál es la frecuencia de emergencia internacional utilizada en aviación?",
      options: [
        { id: "a", text: "118.0 MHz" },
        { id: "b", text: "121.5 MHz" },
        { id: "c", text: "128.3 MHz" },
        { id: "d", text: "136.9 MHz" },
      ],
      correctId: "b",
    },
    {
      id: 2,
      text: "¿Qué significa la sigla ATIS en aviación?",
      options: [
        { id: "a", text: "Automatic Terminal Information Service" },
        { id: "b", text: "Air Traffic Integrated System" },
        { id: "c", text: "Aeronautical Terminal Identification Signal" },
        { id: "d", text: "Automatic Transponder Identifier System" },
      ],
      correctId: "a",
    },
    {
      id: 3,
      text: "¿Qué frase se utiliza para indicar que se ha recibido y comprendido un mensaje?",
      options: [
        { id: "a", text: "Roger" },
        { id: "b", text: "Wilco" },
        { id: "c", text: "Affirmative" },
      ],
      correctId: "a",
    },
    {
      id: 4,
      text: "En caso de falla total de comunicaciones en zona controlada, el piloto debe:",
      options: [
        { id: "a", text: "Aterrizar inmediatamente en el aeródromo más cercano" },
        { id: "b", text: "Hacer señas con las alas y continuar en ruta" },
        { id: "c", text: "Seguir el procedimiento NORDO y observar señales luminosas de la torre" },
        { id: "d", text: "Cambiar el transpondedor a código 7600 y seguir el procedimiento establecido" },
      ],
      correctId: "d",
    },
    {
      id: 5,
      text: "¿Cuántos dígitos tiene un código de transpondedor estándar (squawk)?",
      options: [
        { id: "a", text: "3 dígitos" },
        { id: "b", text: "4 dígitos" },
        { id: "c", text: "5 dígitos" },
        { id: "d", text: "6 dígitos" },
      ],
      correctId: "b",
    },
  ],
};

// ─── Keyframe injection ───────────────────────────────────────────────────────
const injectKeyframes = () => {
  if (typeof document === "undefined") return;
  if (document.getElementById("exam-keyframes")) return;
  const style = document.createElement("style");
  style.id = "exam-keyframes";
  style.textContent = `
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ExamView = ({ onBack }) => {
  const navigate = useNavigate();
  injectKeyframes();

  const exam = examData;
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const allAnswered = exam.questions.every(q => answers[q.id] !== undefined);
  const answeredCount = Object.keys(answers).length;

  const handleSelect = (questionId, optionId) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    if (!allAnswered) return;
    let correct = 0;
    exam.questions.forEach(q => {
      if (answers[q.id] === q.correctId) correct++;
    });
    const finalScore = parseFloat(((correct / exam.questions.length) * 10).toFixed(1));
    setScore(finalScore);
    setSubmitted(true);
    setShowResult(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const passed = score !== null && score >= 6;

  const getOptionStyle = (question, option) => {
    if (!submitted) {
      return answers[question.id] === option.id ? styles.optionLabelSelected : styles.optionLabel;
    }
    if (option.id === question.correctId) return styles.optionLabelCorrect;
    if (answers[question.id] === option.id) return styles.optionLabelWrong;
    return styles.optionLabelMuted;
  };

  const getCircleStyle = (question, option) => {
    if (!submitted) {
      return answers[question.id] === option.id ? styles.optionCircleSelected : styles.optionCircle;
    }
    if (option.id === question.correctId) return styles.optionCircleCorrect;
    if (answers[question.id] === option.id) return styles.optionCircleWrong;
    return styles.optionCircle;
  };

  const getCircleContent = (question, option) => {
    if (!submitted) {
      return answers[question.id] === option.id
        ? <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#fff", display: "block" }} />
        : null;
    }
    if (option.id === question.correctId) return <IconCheck />;
    if (answers[question.id] === option.id) return <IconX />;
    return null;
  };

  return (
    <div style={styles.page}>
      {/* ── RESULT OVERLAY ──────────────────────────────────────────────── */}
      {showResult && (
        <div style={{ ...styles.resultOverlay, animation: "fadeIn 0.25s ease" }}>
          <div style={styles.resultCard}>
            <div style={{ ...styles.resultIcon, background: passed ? "rgba(25,135,84,0.1)" : "rgba(220,53,69,0.1)" }}>
              {passed ? "🎉" : "📋"}
            </div>

            <div style={{ ...styles.resultScore, color: passed ? "#198754" : "#dc3545" }}>
              {score}
            </div>
            <div style={{ ...styles.resultScoreLabel, color: passed ? "#198754" : "#b0bec9" }}>
              puntos sobre 10
            </div>

            <hr style={styles.resultDivider} />

            <div style={{ ...styles.resultTitle, color: passed ? "#198754" : "#1a2a3a" }}>
              {passed ? "¡Módulo aprobado!" : "No aprobaste esta vez"}
            </div>
            <p style={styles.resultSubtitle}>
              {passed
                ? "Superaste el mínimo requerido (6 puntos). El siguiente módulo ya está disponible para vos."
                : "Necesitás al menos 6 puntos para aprobar. Podés repasar el material y volver a tomar el examen cuando quieras."}
            </p>

            <button
              style={{ ...styles.resultBtn, background: passed ? "#198754" : "#205078", color: "#fff" }}
              onClick={() => { setShowResult(false); onBack?.(); }}
              onMouseEnter={e => { e.currentTarget.style.background = passed ? "#146c43" : "#1a3f60"; }}
              onMouseLeave={e => { e.currentTarget.style.background = passed ? "#198754" : "#205078"; }}
            >
              {passed ? "Continuar al siguiente módulo →" : "Ver respuestas"}
            </button>
          </div>
        </div>
      )}

      <Container>
        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <div style={styles.heroCard}>
          <div style={styles.heroAccent} />
          <div style={styles.heroAccent2} />

          <button
            style={styles.backBtn}
            onClick={() => navigate("/courseDetail")}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.22)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
          >
            <IconBack /> Volver al curso
          </button>

          <Row className="align-items-end">
            <Col md={8}>
              <div style={styles.courseTag}>
                <span style={{ marginRight: 4 }}><IconPlane /></span>
                {exam.courseTitle}
              </div>
              <h1 style={styles.heroTitle}>Examen: {exam.moduleTitle}</h1>
              <p style={styles.heroSubtitle}>
                Respondé todas las preguntas y enviá tus respuestas al final.{" "}
                Necesitás al menos <strong style={{ color: "#fff" }}>6 puntos</strong> para aprobar.
              </p>
            </Col>

            <Col md={4} className="mt-4 mt-md-0">
              <Row className="g-2">
                <Col xs={4}>
                  <div style={styles.statBox}>
                    <div style={styles.statNum}>{exam.questions.length}</div>
                    <div style={styles.statLabel}>Preguntas</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div style={styles.statBox}>
                    <div style={styles.statNum}>{answeredCount}</div>
                    <div style={styles.statLabel}>Respondidas</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div style={styles.statBox}>
                    <div style={styles.statNum}>6.0</div>
                    <div style={styles.statLabel}>Mínimo</div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        {/* ── QUESTION LIST ────────────────────────────────────────────────── */}
        <div style={styles.sectionTitle}>
          <span style={styles.sectionDot} />
          Preguntas del examen
          {submitted && (
            <span style={{
              marginLeft: "auto",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: passed ? "#198754" : "#dc3545",
              background: passed ? "#d1f5e0" : "#fde8ea",
              padding: "3px 12px",
              borderRadius: "20px",
            }}>
              {exam.questions.filter(q => answers[q.id] === q.correctId).length}/{exam.questions.length} correctas
            </span>
          )}
        </div>

        {exam.questions.map((question, qIndex) => (
          <div key={question.id} style={styles.questionCard}>
            <div style={styles.questionCardLeft} />
            <div style={{ paddingLeft: "8px" }}>
              <div style={styles.questionNumber}>Pregunta {qIndex + 1}</div>
              <p style={styles.questionText}>{question.text}</p>

              {question.options.map(option => (
                <div
                  key={option.id}
                  style={getOptionStyle(question, option)}
                  onClick={() => handleSelect(question.id, option.id)}
                  onMouseEnter={e => {
                    if (!submitted && answers[question.id] !== option.id) {
                      e.currentTarget.style.background = "#f0f4f8";
                      e.currentTarget.style.borderColor = "#b0bec9";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!submitted && answers[question.id] !== option.id) {
                      e.currentTarget.style.background = "#fafafa";
                      e.currentTarget.style.borderColor = "#e8ecf0";
                    }
                  }}
                >
                  <div style={getCircleStyle(question, option)}>
                    {getCircleContent(question, option)}
                  </div>

                  <span style={{
                    ...styles.optionText,
                    fontWeight: submitted && option.id === question.correctId ? 600 : 400,
                    color: submitted && option.id === question.correctId
                      ? "#198754"
                      : submitted && answers[question.id] === option.id && option.id !== question.correctId
                      ? "#dc3545"
                      : "#2d3a45",
                  }}>
                    {option.text}
                  </span>

                  {submitted && option.id === question.correctId && (
                    <span style={{
                      marginLeft: "auto",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#198754",
                      background: "#d1f5e0",
                      padding: "2px 10px",
                      borderRadius: "20px",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}>
                      Correcta
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* ── SUBMIT AREA ──────────────────────────────────────────────────── */}
        {!submitted && (
          <div style={styles.submitArea}>
            <div>
              <div style={{ fontWeight: 600, color: "#1a2a3a", marginBottom: "4px" }}>
                {allAnswered
                  ? "¡Todas las preguntas respondidas!"
                  : `Faltan ${exam.questions.length - answeredCount} respuesta${exam.questions.length - answeredCount !== 1 ? "s" : ""}`}
              </div>
              {!allAnswered && (
                <div style={styles.unansweredNote}>
                  <IconWarn /> Respondé todas las preguntas para poder enviar.
                </div>
              )}
            </div>

            <button
              style={allAnswered ? styles.submitBtn : styles.submitBtnDisabled}
              disabled={!allAnswered}
              onClick={handleSubmit}
              onMouseEnter={e => { if (allAnswered) e.currentTarget.style.background = "#1a3f60"; }}
              onMouseLeave={e => { if (allAnswered) e.currentTarget.style.background = "#205078"; }}
            >
              <IconSend /> Enviar respuestas
            </button>
          </div>
        )}

        {/* ── POST-SUBMIT BANNER ───────────────────────────────────────────── */}
        {submitted && (
          <div style={{
            background: passed ? "rgba(25,135,84,0.06)" : "rgba(220,53,69,0.06)",
            border: `1.5px solid ${passed ? "#c3e6cb" : "#f5c6cb"}`,
            borderRadius: "14px",
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}>
            <div>
              <div style={{ fontWeight: 700, color: passed ? "#198754" : "#dc3545", marginBottom: "2px", fontSize: "1rem" }}>
                {passed ? `Aprobaste con ${score}/10` : `No aprobaste — obtuviste ${score}/10`}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#5a6a78" }}>
                {passed ? "El siguiente módulo ya fue desbloqueado." : "Podés volver a tomar el examen cuando quieras."}
              </div>
            </div>
            <button
              style={{
                background: passed ? "#198754" : "#205078",
                border: "none", color: "#fff", borderRadius: "10px",
                padding: "10px 24px", fontSize: "0.88rem", fontWeight: 700,
                cursor: "pointer", transition: "background 0.18s",
              }}
              onClick={() => onBack?.()}
              onMouseEnter={e => { e.currentTarget.style.background = passed ? "#146c43" : "#1a3f60"; }}
              onMouseLeave={e => { e.currentTarget.style.background = passed ? "#198754" : "#205078"; }}
            >
              {passed ? "Continuar →" : "Volver al curso"}
            </button>
          </div>
        )}

        <div style={{ height: "24px" }} />
      </Container>
    </div>
  );
};

export default ExamView;