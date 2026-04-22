import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { BsArrowLeft, BsAirplane } from "react-icons/bs";
import { api } from "../../../api/client";
import Loader from "../../ui/Loader";
import ExamResultModal from "./ExamResultModal";

const styles = {
  page: { background: "#f4f6f9", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", paddingTop: "4rem", paddingBottom: "80px" },
  heroCard: { 
    background: "linear-gradient(135deg, #1e3c5a 0%, #162d44 100%)", 
    borderRadius: "24px", 
    padding: "32px 40px", 
    color: "#ffffff", 
    position: "relative", 
    overflow: "hidden", 
    marginBottom: "40px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)" 
  },
  heroAccent: {
    position: "absolute",
    right: "-50px",
    top: "-50px",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
    pointerEvents: "none"
  },
  backBtn: { 
    background: "rgba(255,255,255,0.1)", 
    border: "1px solid rgba(255,255,255,0.15)", 
    color: "rgba(255,255,255,0.9)", 
    borderRadius: "8px", 
    padding: "8px 16px", 
    fontSize: "0.85rem",
    fontWeight: 600,
    cursor: "pointer", 
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "background 0.2s"
  },
  courseBadge: {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
    borderRadius: "20px",
    padding: "5px 16px",
    fontSize: "0.72rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px"
  },
  heroTitle: { fontSize: "2.4rem", fontWeight: 700, margin: "0 0 10px 0", letterSpacing: "-0.01em" },
  heroSubtitle: { color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", margin: 0, maxWidth: "600px" },
  
  statBox: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "16px",
    padding: "16px 20px",
    textAlign: "center",
    minWidth: "100px",
    backdropFilter: "blur(4px)"
  },
  statNum: { fontSize: "1.8rem", fontWeight: 800, color: "#fff", lineHeight: 1 },
  statLabel: { fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "8px" },

  questionCard: { 
    background: "#ffffff", 
    borderRadius: "16px", 
    border: "1px solid #e8ecf0", 
    padding: "32px 40px", 
    marginBottom: "24px", 
    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
    position: "relative",
    overflow: "hidden"
  },
  cardAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "4px",
    background: "#205078"
  },
  questionLabel: {
    fontSize: "0.7rem",
    fontWeight: 800,
    color: "#205078",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: "12px",
    display: "block"
  },
  questionText: { 
    fontSize: "1.15rem", 
    fontWeight: 700, 
    color: "#1a2a3a", 
    marginBottom: "28px",
    lineHeight: "1.5"
  },
  optionLabel: { 
    display: "flex", 
    alignItems: "center", 
    gap: "16px", 
    padding: "12px 24px", 
    borderRadius: "12px", 
    border: "1px solid #e8ecf0", 
    marginBottom: "10px", 
    cursor: "pointer", 
    background: "#fff", 
    transition: "all 0.2s" 
  },
  optionLabelSelected: { 
    display: "flex", 
    alignItems: "center", 
    gap: "16px", 
    padding: "12px 24px", 
    borderRadius: "12px", 
    border: "1.5px solid #205078", 
    marginBottom: "10px", 
    cursor: "pointer", 
    background: "rgba(32,80,120,0.02)", 
    transition: "all 0.2s" 
  },
  radio: { 
    width: "22px", 
    height: "22px", 
    borderRadius: "50%", 
    border: "2px solid #cbd5e0", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    transition: "all 0.2s",
    flexShrink: 0
  },
  radioInner: { width: "10px", height: "10px", borderRadius: "50%", background: "#205078" },
  optionText: { fontSize: "0.95rem", color: "#4a5568", transition: "all 0.2s" },
  optionTextSelected: { fontSize: "0.95rem", color: "#1a2a3a", fontWeight: 600 },
  
  submitBtn: { background: "#205078", border: "none", color: "#fff", borderRadius: "10px", padding: "14px 40px", fontSize: "1rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 15px rgba(32,80,120,0.2)" },
};

const StudentExamView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const examId = queryParams.get("id");
  const isReview = queryParams.get("review") === "true";

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    if (examId) {
      api.get(`/exams/${examId}`)
        .then(data => {
          setExam({
            ...data,
            questions: data.questions.map(q => ({
              ...q,
              options: q.opciones
            }))
          });
        })
        .finally(() => setLoading(false));
    }
  }, [examId]);

  const handleSubmit = async () => {
    if (isReview) return;
    
    try {
      const response = await api.post(`/exams/${examId}/attempt`, { answers });
      setScore(response.score);
      setShowResultModal(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReturnToCourse = () => {
    setShowResultModal(false);
    if (exam.module?.courseId) {
      navigate(`/courseDetail?id=${exam.module.courseId}`);
    } else {
      navigate("/myCourses");
    }
  };

  if (loading) return <Loader text="Preparando tu examen..." />;
  if (!exam) return <div className="p-5 text-center">Examen no encontrado</div>;

  const totalQuestions = exam.questions.length;
  const answeredCount = Object.keys(answers).length;
  const courseName = exam.module?.course?.nombre || "Cargando curso...";

  return (
    <div style={styles.page}>
      <Container>
        <div style={styles.heroCard}>
          <div style={styles.heroAccent} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <button style={styles.backBtn} onClick={() => navigate(-1)}>
              <BsArrowLeft size={16} /> Volver al curso
            </button>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
              <div>
                <div style={styles.courseBadge}>
                  <BsAirplane size={14} /> {courseName}
                </div>
                <h1 style={styles.heroTitle}>
                  {isReview ? `Revisión: ${exam.titulo}` : `Examen: ${exam.titulo}`}
                </h1>
                <p style={styles.heroSubtitle}>
                  {isReview 
                    ? "Estás viendo las respuestas correctas de este examen. Las opciones marcadas en verde son las correctas." 
                    : "Respondé todas las preguntas y enviá tus respuestas al final. Necesitás al menos 6 puntos para aprobar."
                  }
                </p>
              </div>
              
              {!isReview && (
                <div className="d-flex flex-wrap gap-3 mt-4 mt-md-0">
                  <div style={styles.statBox} className="flex-grow-1 flex-md-grow-0">
                    <div style={styles.statNum}>{totalQuestions}</div>
                    <div style={styles.statLabel}>Preguntas</div>
                  </div>
                  <div style={styles.statBox} className="flex-grow-1 flex-md-grow-0">
                    <div style={styles.statNum}>{answeredCount}</div>
                    <div style={styles.statLabel}>Respondidas</div>
                  </div>
                  <div style={styles.statBox} className="flex-grow-1 flex-md-grow-0">
                    <div style={styles.statNum}>6.0</div>
                    <div style={styles.statLabel}>Mínimo</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {exam.questions.map((q, qIdx) => (
          <div key={qIdx} style={styles.questionCard}>
            <div style={styles.cardAccent} />
            <span style={styles.questionLabel}>Pregunta {qIdx + 1}</span>
            <div style={styles.questionText}>
              {q.texto}
            </div>
            {q.options.map((opt, oIdx) => {
              const isCorrect = isReview && oIdx === q.correcta;
              const isSelected = answers[qIdx] === oIdx;
              
              let labelStyle = isSelected ? styles.optionLabelSelected : styles.optionLabel;
              if (isCorrect) {
                labelStyle = {
                  ...styles.optionLabel,
                  borderColor: "#198754",
                  background: "rgba(25, 135, 84, 0.05)",
                  borderWidth: "2px"
                };
              }

              return (
                <div
                  key={oIdx}
                  style={{...labelStyle, cursor: isReview ? "default" : "pointer"}}
                  onClick={() => !isReview && setAnswers({ ...answers, [qIdx]: oIdx })}
                >
                  <div style={{ 
                    ...styles.radio, 
                    borderColor: isCorrect ? "#198754" : (isSelected ? "#205078" : "#cbd5e0"),
                    borderWidth: isCorrect || isSelected ? "6px" : "2px"
                  }} />
                  <span style={isSelected || isCorrect ? styles.optionTextSelected : styles.optionText}>
                    {opt}
                    {isCorrect && <span style={{ marginLeft: "10px", color: "#198754", fontWeight: 700 }}>(Respuesta correcta)</span>}
                  </span>
                </div>
              );
            })}
          </div>
        ))}

        {!isReview && (
          <div style={{ 
            background: "#ffffff", 
            borderRadius: "16px", 
            padding: "24px 32px", 
            border: "1px solid #e8ecf0", 
            marginTop: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 4px 15px rgba(0,0,0,0.03)"
          }}>
            <div>
              {totalQuestions - answeredCount > 0 ? (
                <>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "#1a2a3a" }}>
                    Faltan {totalQuestions - answeredCount} {totalQuestions - answeredCount === 1 ? 'respuesta' : 'respuestas'}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#f59e0b", display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                    <span style={{ fontSize: "1.1rem" }}>⚠</span> Respondé todas las preguntas para poder enviar.
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "#198754" }}>
                    ¡Todo listo!
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#6b7a87", marginTop: "4px" }}>
                    Ya puedes enviar tus respuestas para ser calificadas.
                  </div>
                </>
              )}
            </div>

            <button 
              style={{ 
                ...styles.submitBtn, 
                background: answeredCount < totalQuestions ? "#b0bec9" : "#205078",
                cursor: answeredCount < totalQuestions ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }} 
              disabled={answeredCount < totalQuestions}
              onClick={handleSubmit}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              Enviar respuestas
            </button>
          </div>
        )}
      </Container>

      <ExamResultModal 
        show={showResultModal}
        onHide={() => setShowResultModal(false)}
        score={score || 0}
        onReturn={handleReturnToCourse}
      />
    </div>
  );
};

export default StudentExamView;