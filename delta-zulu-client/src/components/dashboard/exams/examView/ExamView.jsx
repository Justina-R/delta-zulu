import React, { useState, useEffect } from "react";
import { Collapse } from "react-bootstrap";
import { BsArrowLeft, BsTrash } from "react-icons/bs";
import { MdEdit, MdCheckCircle, MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../api/client";
import ConfirmModal from "../../../ui/confirmModal";
import Loader from "../../../ui/Loader";

const styles = {
  page: { background: "#f4f6f9", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", paddingTop: "3rem", paddingBottom: "60px" },
  heroCard: { background: "linear-gradient(135deg, #10304a 0%, #0a1f30 100%)", borderRadius: "20px", padding: "40px 48px", color: "#ffffff", position: "relative", overflow: "hidden", marginBottom: "40px", boxShadow: "0 12px 48px rgba(0,0,0,0.15)" },
  heroTitle: { fontSize: "2.2rem", fontWeight: 700, margin: "0 0 12px 0", letterSpacing: "-0.02em" },
  heroSubtitle: { color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", margin: 0 },
  heroTag: { background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: "20px", padding: "4px 14px", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "16px" },
  statBox: { background: "rgba(255,255,255,0.06)", borderRadius: "14px", padding: "16px 24px", textAlign: "center", border: "1px solid rgba(255,255,255,0.1)", minWidth: "110px" },
  statNum: { fontSize: "1.8rem", fontWeight: 700, color: "#fff", lineHeight: 1 },
  statLabel: { fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "6px" },

  courseCard: { background: "#ffffff", borderRadius: "14px", border: "1px solid #e8ecf0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", overflow: "hidden", marginBottom: "16px" },
  courseHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", cursor: "pointer", background: "#fff" },
  courseTitle: { fontSize: "1.05rem", fontWeight: 700, color: "#1a2a3a", display: "flex", alignItems: "center", gap: "12px" },
  courseAccent: { width: "4px", height: "24px", background: "#205078", borderRadius: "4px" },

  moduleRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", borderTop: "1px solid #f0f3f6", background: "#fff" },
  moduleInfo: { display: "flex", alignItems: "center", gap: "16px" },
  moduleIndex: { fontSize: "0.75rem", fontWeight: 700, color: "#205078", background: "#f0f4f8", borderRadius: "6px", padding: "4px 8px", minWidth: "32px", textAlign: "center" },
  moduleName: { fontSize: "0.92rem", color: "#3a4a5a", fontWeight: 500 },

  badgeSuccess: { background: "#e8f5e9", color: "#2e7d32", padding: "5px 14px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" },
  badgeEmpty: { background: "#f5f5f5", color: "#9e9e9e", padding: "5px 14px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: 600 },

  btnCreate: { background: "#198754", color: "#fff", border: "none", borderRadius: "8px", minHeight: "38px", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" },
  btnEdit: { background: "#fff", color: "#205078", border: "1.5px solid #e8ecf0", borderRadius: "8px", minHeight: "38px", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" },
  btnDelete: { background: "#fff", color: "#d32f2f", border: "1.5px solid #e8ecf0", borderRadius: "8px", width: "40px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },

  backBtn: { background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "8px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginRight: "12px" }
};

const ExamViews = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCourses, setOpenCourses] = useState({});
  const [confirmConfig, setConfirmConfig] = useState({ show: false, id: null });

  const fetchData = async () => {
    try {
      const data = await api.get("/courses");
      setCourses(data);
      // Open the first course by default
      if (data.length > 0) setOpenCourses({ [data[0].id]: true });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleCourse = (id) => {
    setOpenCourses(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/exams/${confirmConfig.id}`);
      setConfirmConfig({ show: false, id: null });
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const totalExams = courses.reduce((acc, c) => acc + c.modules.filter(m => m.exam).length, 0);

  if (loading) return <Loader text="Cargando exámenes..." />;

  return (
    <div style={styles.page}>
      <div className="container">
        {/* HERO SECTION */}
        <div style={styles.heroCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button style={styles.backBtn} onClick={() => navigate("/dashboard")}><BsArrowLeft /></button>
                <div style={styles.heroTag}>Administración</div>
              </div>
              <h1 style={styles.heroTitle}>Lista de exámenes</h1>
              <p style={styles.heroSubtitle}>Creá, modificá y eliminá exámenes por módulo para cada curso.</p>
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={styles.statBox}>
                <div style={styles.statNum}>{courses.length}</div>
                <div style={styles.statLabel}>Cursos</div>
              </div>
              <div style={styles.statBox}>
                <div style={styles.statNum}>{totalExams}</div>
                <div style={styles.statLabel}>Exámenes</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#205078", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#205078" }} />
          Cursos y módulos
        </div>

        {/* COURSES LIST */}
        {courses.map(course => (
          <div key={course.id} style={styles.courseCard}>
            <div style={styles.courseHeader} onClick={() => toggleCourse(course.id)}>
              <div style={styles.courseTitle}>
                <div style={styles.courseAccent} />
                {course.nombre}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "0.75rem", background: "#f0f4f8", color: "#205078", padding: "4px 12px", borderRadius: "12px", fontWeight: 700 }}>
                  {course.modules.filter(m => m.exam).length} {course.modules.filter(m => m.exam).length === 1 ? 'examen' : 'exámenes'}
                </span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8a97a5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: openCourses[course.id] ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            <Collapse in={openCourses[course.id]}>
              <div>
                {course.modules.map((module, idx) => (
                  <div key={module.id} style={styles.moduleRow}>
                    <div style={styles.moduleInfo}>
                      <div style={styles.moduleIndex}>{String(idx + 1).padStart(2, "0")}</div>
                      <div style={styles.moduleName}>{module.nombre}</div>
                    </div>

                    <div className="d-flex align-items-center gap-2 gap-md-3">
                      {module.exam ? (
                        <>
                          <div style={styles.badgeSuccess}>
                            <MdCheckCircle size={14} /> <span className="d-none d-md-inline">Examen cargado</span>
                          </div>
                          <button className="px-2 px-md-3" style={styles.btnEdit} onClick={() => navigate(`/examForm/${module.exam.id}`)}>
                            <MdEdit size={16} /> <span className="d-none d-md-inline">Modificar</span>
                          </button>
                          <button style={styles.btnDelete} onClick={() => setConfirmConfig({ show: true, id: module.exam.id })}>
                            <BsTrash size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <div style={styles.badgeEmpty}><span className="d-none d-md-inline">Sin examen</span><span className="d-inline d-md-none"><MdErrorOutline /></span></div>
                          <button className="px-2 px-md-3" style={styles.btnCreate} onClick={() => navigate(`/examForm?moduleId=${module.id}`)}>
                            <span className="d-none d-md-inline">+ Crear examen</span>
                            <span className="d-inline d-md-none">+</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>
        ))}
      </div>

      <ConfirmModal
        show={confirmConfig.show}
        onHide={() => setConfirmConfig({ show: false, id: null })}
        onConfirm={handleDelete}
        title="Eliminar examen"
        message="¿Estás seguro de que deseas eliminar este examen? Esta acción no se puede deshacer."
      />
    </div>
  );
};

export default ExamViews;