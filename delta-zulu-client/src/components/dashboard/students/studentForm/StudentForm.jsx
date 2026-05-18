import React, { useState, useEffect } from "react";
import { BsEye, BsEyeSlash, BsArrowLeft } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../../api/client";
import Loader from "../../../ui/Loader";

const styles = {
  page: { background: "#f4f6f9", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", paddingTop: "90px", paddingBottom: "60px" },
  heroCard: { background: "linear-gradient(135deg, #205078 0%, #1a3f60 60%, #122d46 100%)", borderRadius: "20px", padding: "40px 48px", color: "#ffffff", position: "relative", overflow: "hidden", marginBottom: "40px", boxShadow: "0 12px 48px rgba(32,80,120,0.25)" },
  heroAccent: { position: "absolute", top: "-60px", right: "-60px", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" },
  heroAccent2: { position: "absolute", bottom: "-80px", right: "120px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" },
  heroTag: { background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", borderRadius: "20px", padding: "4px 14px", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "inline-block", marginBottom: "12px" },
  heroTitle: { fontSize: "2rem", fontWeight: 700, margin: "0 0 8px 0", lineHeight: 1.2, letterSpacing: "-0.01em" },
  heroSubtitle: { color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", margin: 0 },
  backBtn: { background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: "8px", padding: "6px 14px", fontSize: "1.1rem", cursor: "pointer", display: "inline-flex", alignItems: "center", transition: "background 0.2s", marginRight: "14px", flexShrink: 0 },
  sectionTitle: { fontSize: "1.1rem", fontWeight: 700, color: "#205078", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" },
  sectionDot: { width: "8px", height: "8px", borderRadius: "50%", background: "#205078", flexShrink: 0, display: "inline-block" },
  formCard: { background: "#ffffff", borderRadius: "14px", border: "1px solid #e8ecf0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", overflow: "hidden" },
  formCardAccent: { height: "5px", background: "#205078" },
  formBody: { padding: "36px 40px 40px" },
  fieldGroup: { marginBottom: "22px" },
  label: { display: "block", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#5a6a78", marginBottom: "8px" },
  input: { width: "100%", padding: "11px 16px", fontSize: "0.92rem", color: "#1a2a3a", background: "#f8fafc", border: "1.5px solid #e8ecf0", borderRadius: "10px", outline: "none", transition: "border-color 0.15s, box-shadow 0.15s", fontFamily: "inherit" },
  inputGroup: { display: "flex", alignItems: "stretch" },
  inputGroupField: { flex: 1, padding: "11px 16px", fontSize: "0.92rem", color: "#1a2a3a", background: "#f8fafc", border: "1.5px solid #e8ecf0", borderRadius: "10px 0 0 10px", outline: "none", transition: "border-color 0.15s, box-shadow 0.15s", fontFamily: "inherit", borderRight: "none" },
  eyeBtn: { background: "#f0f4f8", border: "1.5px solid #e8ecf0", borderLeft: "none", borderRadius: "0 10px 10px 0", padding: "0 14px", cursor: "pointer", color: "#6b7a87", display: "flex", alignItems: "center", transition: "background 0.15s, color 0.15s", flexShrink: 0 },
  divider: { border: "none", borderTop: "1px solid #eef0f3", margin: "28px 0" },
  errorBox: { background: "rgba(220,53,69,0.06)", border: "1.5px solid rgba(220,53,69,0.25)", borderRadius: "10px", padding: "12px 16px", fontSize: "0.87rem", color: "#dc3545", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" },
  submitBtn: { background: "#205078", border: "none", color: "#fff", borderRadius: "10px", padding: "12px 32px", fontSize: "0.92rem", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", transition: "background 0.18s", letterSpacing: "0.01em" },
  sectionLabel: { fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#b0bec9", marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" },
  sectionLabelLine: { flex: 1, height: "1px", background: "#eef0f3" },
  courseCardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginTop: "12px" },
  courseCard: { 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "space-between", 
    padding: "16px 20px", 
    borderRadius: "12px", 
    border: "1.5px solid #e8ecf0", 
    background: "#fff", 
    cursor: "pointer", 
    transition: "all 0.2s ease" 
  },
  courseCardActive: { 
    borderColor: "#198754", 
    background: "rgba(25, 135, 84, 0.02)",
    boxShadow: "0 4px 12px rgba(25, 135, 84, 0.08)" 
  },
  courseInfo: { display: "flex", flexDirection: "column", gap: "4px" },
  courseName: { fontSize: "0.92rem", fontWeight: 700, color: "#1a2a3a", margin: 0 },
  courseBadge: { 
    alignSelf: "flex-start", 
    fontSize: "0.68rem", 
    fontWeight: 700, 
    padding: "3px 8px", 
    borderRadius: "6px", 
    textTransform: "uppercase" 
  },
  courseBadgeActive: { background: "rgba(25, 135, 84, 0.1)", color: "#198754" },
  courseBadgeInactive: { background: "#f1f3f5", color: "#6b7a87" },
  courseToggleIcon: { fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", minWidth: "32px", minHeight: "32px", borderRadius: "50%", transition: "all 0.2s", flexShrink: 0 },
  courseToggleIconActive: { background: "rgba(25, 135, 84, 0.1)", color: "#198754" },
  courseToggleIconInactive: { background: "#f8fafc", color: "#b0bec9", border: "1px dashed #ced4da" },
};

const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const IconSave = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
  </svg>
);

const Field = ({ label, children }) => (
  <div style={styles.fieldGroup}>
    <label style={styles.label}>{label}</label>
    {children}
  </div>
);

const StudentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [studentCourses, setStudentCourses] = useState([]);
  const [initialCourses, setInitialCourses] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const [togglingCourseId, setTogglingCourseId] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      Promise.all([
        api.get(`/students/${id}`),
        api.get("/courses")
      ])
        .then(([studentData, coursesData]) => {
          setFormData({
            nombre: studentData.nombre,
            apellido: studentData.apellido,
            email: studentData.email,
            password: "",
            confirmPassword: "",
          });
          setInitialData({
            nombre: studentData.nombre,
            apellido: studentData.apellido,
            email: studentData.email,
          });
          setStudentCourses(studentData.courses || []);
          setInitialCourses(studentData.courses || []);
          setAllCourses(coursesData || []);
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleToggleCourse = async (course) => {
    const isEnrolled = studentCourses.some(c => c.id === course.id);
    setTogglingCourseId(course.id);
    try {
      if (isEnrolled) {
        // Remove course
        await api.delete(`/students/${id}/courses/${course.id}`);
        setStudentCourses(prev => prev.filter(c => c.id !== course.id));
      } else {
        // Add course
        await api.post(`/students/${id}/courses/${course.id}`, {});
        setStudentCourses(prev => [...prev, course]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setTogglingCourseId(null);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      if (isEdit) {
        await api.put(`/students/${id}`, formData);
      } else {
        await api.post("/students", formData);
      }
      navigate("/students");
    } catch (err) {
      setError(err.message);
    }
  };

  const focusStyle = (e) => {
    e.target.style.borderColor = "#205078";
    e.target.style.boxShadow = "0 0 0 3px rgba(32,80,120,0.1)";
    e.target.style.background = "#fff";
  };
  const blurStyle = (e) => {
    e.target.style.borderColor = "#e8ecf0";
    e.target.style.boxShadow = "none";
    e.target.style.background = "#f8fafc";
  };

  const hasChanges = isEdit && (
    (initialData && (
      formData.nombre !== initialData.nombre ||
      formData.apellido !== initialData.apellido ||
      formData.email !== initialData.email ||
      formData.password !== ""
    )) ||
    (initialCourses && (
      studentCourses.length !== initialCourses.length ||
      !initialCourses.every(ic => studentCourses.some(sc => sc.id === ic.id))
    ))
  );

  if (loading) return <Loader text="Cargando datos del alumno..." />;

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div className="container">
        <div style={styles.heroCard}>
          <div style={styles.heroAccent} />
          <div style={styles.heroAccent2} />
          <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
            <button style={styles.backBtn} onClick={() => navigate("/students")}><BsArrowLeft /></button>
            <div style={styles.heroTag}><span style={{ marginRight: 4 }}><IconUser /></span>Administración</div>
          </div>
          <h1 style={styles.heroTitle}>{isEdit ? "Modificar usuario" : "Crear usuario"}</h1>
          <p style={styles.heroSubtitle}>{isEdit ? "Actualizá los datos del alumno." : "Completá el formulario para registrar un nuevo alumno."}</p>
        </div>

        <div style={styles.sectionTitle}><span style={styles.sectionDot} />{isEdit ? "Datos del alumno" : "Nuevo alumno"}</div>

        <div style={styles.formCard}>
          <div style={styles.formCardAccent} />
          <div style={styles.formBody}>
            <form onSubmit={handleSubmit}>
              {hasChanges && (
                <div style={{
                  background: "rgba(243, 156, 18, 0.08)",
                  border: "1.5px solid rgba(243, 156, 18, 0.3)",
                  borderRadius: "12px",
                  padding: "16px 20px",
                  fontSize: "0.92rem",
                  color: "#d35400",
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontWeight: 500,
                  boxShadow: "0 4px 15px rgba(243, 156, 18, 0.05)"
                }}>
                  <span style={{ fontSize: "1.3rem" }}>⚠️</span>
                  <span>
                    Ha realizado cambios en los datos del alumno. Para guardarlos, seleccione el botón <strong>"Guardar cambios"</strong> al final de esta página.
                  </span>
                </div>
              )}
              <div style={styles.sectionLabel}><span>Datos personales</span><div style={styles.sectionLabelLine} /></div>
              <div className="row g-3" style={{ marginBottom: "4px" }}>
                <div className="col-md-6">
                  <Field label="Nombre">
                    <input type="text" name="nombre" style={styles.input} value={formData.nombre} onChange={handleChange} onFocus={focusStyle} onBlur={blurStyle} placeholder="Ej: Juan" required />
                  </Field>
                </div>
                <div className="col-md-6">
                  <Field label="Apellido">
                    <input type="text" name="apellido" style={styles.input} value={formData.apellido} onChange={handleChange} onFocus={focusStyle} onBlur={blurStyle} placeholder="Ej: Pérez" required />
                  </Field>
                </div>
              </div>
              <Field label="Correo electrónico">
                <input type="email" name="email" style={styles.input} value={formData.email} onChange={handleChange} onFocus={focusStyle} onBlur={blurStyle} placeholder="alumno@ejemplo.com" required />
              </Field>

              <hr style={styles.divider} />
              <div style={styles.sectionLabel}><span>{isEdit ? "Cambiar contraseña (opcional)" : "Contraseña"}</span><div style={styles.sectionLabelLine} /></div>
              <div className="row g-3">
                <div className="col-md-6">
                  <Field label="Contraseña">
                    <div style={styles.inputGroup}>
                      <input type={showPassword ? "text" : "password"} name="password" style={styles.inputGroupField} value={formData.password} onChange={handleChange} onFocus={focusStyle} onBlur={blurStyle} placeholder="••••••••" required={!isEdit} />
                      <button type="button" style={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <BsEyeSlash size={16} /> : <BsEye size={16} />}</button>
                    </div>
                  </Field>
                </div>
                <div className="col-md-6">
                  <Field label="Confirmar contraseña">
                    <div style={styles.inputGroup}>
                      <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" style={styles.inputGroupField} value={formData.confirmPassword} onChange={handleChange} onFocus={focusStyle} onBlur={blurStyle} placeholder="••••••••" required={!!formData.password || !isEdit} />
                      <button type="button" style={styles.eyeBtn} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <BsEyeSlash size={16} /> : <BsEye size={16} />}</button>
                    </div>
                  </Field>
                </div>
              </div>

              {isEdit && (
                <>
                  <hr style={styles.divider} />
                  <div style={styles.sectionLabel}><span>Cursos asignados</span><div style={styles.sectionLabelLine} /></div>
                  <p style={{ color: "#6b7a87", fontSize: "0.88rem", marginTop: "-10px", marginBottom: "20px" }}>
                    Seleccioná los cursos a los que este alumno tiene permitido acceder. Hacé click sobre un curso para asignarlo o removerlo.
                  </p>
                  
                  {allCourses.length === 0 ? (
                    <div style={{ padding: "20px", textAlign: "center", color: "#6b7a87", fontStyle: "italic" }}>
                      No hay cursos cargados en el sistema.
                    </div>
                  ) : (
                    <div style={styles.courseCardGrid}>
                      {allCourses.map((course) => {
                        const isEnrolled = studentCourses.some(c => c.id === course.id);
                        return (
                          <div 
                            key={course.id} 
                            style={{
                              ...styles.courseCard,
                              ...(isEnrolled ? styles.courseCardActive : {})
                            }}
                            onClick={() => handleToggleCourse(course)}
                          >
                            <div style={styles.courseInfo}>
                              <h6 style={styles.courseName}>{course.nombre}</h6>
                              <span style={{
                                ...styles.courseBadge,
                                ...(isEnrolled ? styles.courseBadgeActive : styles.courseBadgeInactive)
                              }}>
                                {isEnrolled ? "Asignado" : "Sin asignar"}
                              </span>
                            </div>
                            <div style={{
                              ...styles.courseToggleIcon,
                              ...(isEnrolled ? styles.courseToggleIconActive : styles.courseToggleIconInactive)
                            }}>
                              {togglingCourseId === course.id ? (
                                <svg 
                                  width="14" 
                                  height="14" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  stroke={isEnrolled ? "#198754" : "#205078"} 
                                  strokeWidth="4" 
                                  strokeLinecap="round" 
                                  style={{ animation: "spin 0.8s linear infinite" }}
                                >
                                  <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.06)" />
                                  <path d="M12 2a10 10 0 0 1 10 10" />
                                </svg>
                              ) : (
                                isEnrolled ? "✓" : "+"
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {error && <div style={styles.errorBox}>{error}</div>}
              <hr style={styles.divider} />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" style={styles.submitBtn}><IconSave /> Guardar cambios</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
