import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { BsArrowLeft, BsTrash, BsCheck } from "react-icons/bs";
import { MdAdd, MdRemove } from "react-icons/md";
import { api } from "../../../../api/client";
import Loader from "../../../ui/Loader";

const styles = {
  page: { background: "#f4f6f9", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", paddingTop: "1rem", paddingBottom: "80px" },
  heroCard: { background: "linear-gradient(135deg, #205078 0%, #1a3f60 60%, #122d46 100%)", borderRadius: "20px", padding: "40px 48px", color: "#ffffff", position: "relative", overflow: "hidden", marginBottom: "40px", boxShadow: "0 12px 48px rgba(32,80,120,0.25)" },
  heroTitle: { fontSize: "2rem", fontWeight: 700, margin: "0 0 8px 0" },
  backBtn: { background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: "8px", padding: "6px 14px", fontSize: "1.1rem", cursor: "pointer", display: "inline-flex", alignItems: "center", marginRight: "14px" },
  heroTag: { background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", borderRadius: "20px", padding: "4px 14px", fontSize: "0.75rem", fontWeight: 600, display: "inline-block", marginBottom: "12px" },
  
  questionCard: { background: "#ffffff", borderRadius: "14px", border: "1px solid #e8ecf0", marginBottom: "24px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid #f0f3f6", background: "#fafcff" },
  questionBadge: { background: "#e8ecf0", color: "#5a6a78", padding: "4px 12px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" },
  cardBody: { padding: "24px" },
  label: { display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#8a97a5", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" },
  input: { width: "100%", padding: "12px 18px", background: "#f8fafc", border: "1.5px solid #e8ecf0", borderRadius: "10px", outline: "none", transition: "all 0.2s", fontSize: "0.95rem" },
  optionRow: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px", position: "relative" },
  optionInput: { flex: 1, padding: "10px 16px", background: "#f8fafc", border: "1.5px solid #e8ecf0", borderRadius: "10px", fontSize: "0.92rem", outline: "none" },
  radio: { width: "20px", height: "20px", cursor: "pointer", accentColor: "#198754" },
  correctBadge: { background: "#e8f5e9", color: "#198754", padding: "2px 10px", borderRadius: "20px", fontSize: "0.68rem", fontWeight: 700, position: "absolute", right: "12px" },
  
  btnAction: { background: "transparent", border: "1.5px solid #e8ecf0", borderRadius: "8px", padding: "6px 14px", fontSize: "0.8rem", fontWeight: 600, color: "#5a6a78", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", transition: "all 0.15s" },
  iconBtn: { background: "#f8fafc", border: "1px solid #e8ecf0", borderRadius: "6px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#8a97a5" },
  
  submitBtn: { background: "#198754", color: "#fff", border: "none", borderRadius: "10px", padding: "14px 40px", fontSize: "1rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s", boxShadow: "0 4px 12px rgba(25,135,84,0.2)" },
};

const ExamForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const moduleIdFromQuery = queryParams.get("moduleId");

  const [moduleName, setModuleName] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actualModuleId, setActualModuleId] = useState(moduleIdFromQuery);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (id) {
          const exam = await api.get(`/exams/${id}`);
          setPreguntas(exam.questions.map(q => ({ ...q, options: q.opciones })));
          
          // Get module name
          if (exam.moduleId) {
            const mod = await api.get(`/courses/modules/${exam.moduleId}`);
            setModuleName(mod.nombre);
            setActualModuleId(exam.moduleId);
          }
        } else if (moduleIdFromQuery) {
          const mod = await api.get(`/courses/modules/${moduleIdFromQuery}`);
          setModuleName(mod.nombre);
          if (preguntas.length === 0) {
            setPreguntas([{ texto: "", options: ["", "", "", ""], correcta: 0 }]);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, moduleIdFromQuery]);

  const agregarPregunta = () => {
    setPreguntas([...preguntas, { texto: "", options: ["", "", "", ""], correcta: 0 }]);
  };

  const eliminarPregunta = (idx) => {
    setPreguntas(preguntas.filter((_, i) => i !== idx));
  };

  const updatePregunta = (idx, field, value) => {
    const newP = [...preguntas];
    newP[idx][field] = value;
    setPreguntas(newP);
  };

  const agregarOpcion = (pIdx) => {
    const newP = [...preguntas];
    if (newP[pIdx].options.length < 6) {
      newP[pIdx].options.push("");
      setPreguntas(newP);
    }
  };

  const quitarOpcion = (pIdx) => {
    const newP = [...preguntas];
    if (newP[pIdx].options.length > 2) {
      newP[pIdx].options.pop();
      if (newP[pIdx].correcta >= newP[pIdx].options.length) {
        newP[pIdx].correcta = 0;
      }
      setPreguntas(newP);
    }
  };

  const guardarExamen = async () => {
    const payload = {
      titulo: moduleName, // Use module name as title
      moduleId: id ? undefined : (actualModuleId ? Number(actualModuleId) : null),
      questions: preguntas.map(q => ({
        texto: q.texto,
        opciones: q.options,
        correcta: q.correcta
      }))
    };

    try {
      if (id) {
        await api.put(`/exams/${id}`, payload);
      } else {
        await api.post("/exams", payload);
      }
      navigate("/exams");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <Loader text="Cargando examen..." />;

  return (
    <div style={styles.page}>
      <div className="container">
        <div style={styles.heroCard}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <button style={styles.backBtn} onClick={() => navigate("/exams")}><BsArrowLeft /></button>
            <div style={styles.heroTag}>Administración de Exámenes</div>
          </div>
          <h1 style={styles.heroTitle}>{id ? "Editar Examen" : "Nuevo Examen"}</h1>
          <p style={{ color: "rgba(255,255,255,0.7)" }}>Módulo: <span style={{ color: "#fff", fontWeight: 700 }}>{moduleName || "Cargando..." }</span></p>
        </div>

        {preguntas.map((q, pIdx) => (
          <div key={pIdx} style={styles.questionCard}>
            <div style={styles.cardHeader}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={styles.questionBadge}>Pregunta {String(pIdx + 1).padStart(2, "0")}</div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <div style={styles.iconBtn} onClick={() => eliminarPregunta(pIdx)}><BsTrash size={16} /></div>
              </div>
            </div>
            
            <div style={styles.cardBody}>
              <div style={{ marginBottom: "28px" }}>
                <label style={styles.label}>Texto de la pregunta</label>
                <input 
                  type="text" 
                  style={styles.input} 
                  value={q.texto} 
                  onChange={(e) => updatePregunta(pIdx, "texto", e.target.value)}
                  placeholder="Escribe aquí la pregunta..."
                />
              </div>

              <div>
                <label style={styles.label}>Opciones — seleccioná la correcta</label>
                {q.options.map((opt, oIdx) => (
                  <div key={oIdx} style={styles.optionRow}>
                    <input 
                      type="radio" 
                      name={`correcta-${pIdx}`} 
                      checked={q.correcta === oIdx}
                      onChange={() => updatePregunta(pIdx, "correcta", oIdx)}
                      style={styles.radio}
                    />
                    <input 
                      type="text" 
                      style={styles.optionInput} 
                      value={opt}
                      onChange={(e) => {
                        const newOptions = [...q.options];
                        newOptions[oIdx] = e.target.value;
                        updatePregunta(pIdx, "options", newOptions);
                      }}
                      placeholder={`Opción ${oIdx + 1}`}
                    />
                    {q.correcta === oIdx && <span style={styles.correctBadge}>Correcta</span>}
                  </div>
                ))}

                <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                  <button style={styles.btnAction} onClick={() => agregarOpcion(pIdx)}>
                    <MdAdd size={16} /> Agregar opción
                  </button>
                  <button style={styles.btnAction} onClick={() => quitarOpcion(pIdx)}>
                    <MdRemove size={16} /> Quitar opción
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center", marginBottom: "100px" }}>
          <button 
            style={{ ...styles.btnAction, padding: "10px 24px", background: "#fff", borderColor: "#205078", color: "#205078" }}
            onClick={agregarPregunta}
          >
            + Agregar nueva pregunta
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "40px" }}>
          <button style={styles.submitBtn} onClick={guardarExamen}>
            Guardar Examen
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamForm;
