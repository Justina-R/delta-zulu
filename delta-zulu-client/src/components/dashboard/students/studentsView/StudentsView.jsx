import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdEdit } from "react-icons/md";
import { BsFillTrash3Fill, BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../ui/confirmModal";
import { api } from "../../../../api/client";
import Loader from "../../../ui/Loader";

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
  backBtn: { background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: "8px", padding: "6px 14px", fontSize: "1.1rem", cursor: "pointer", display: "inline-flex", alignItems: "center", transition: "background 0.2s", marginRight: "14px", flexShrink: 0 },
  sectionTitle: { fontSize: "1.1rem", fontWeight: 700, color: "#205078", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" },
  sectionDot: { width: "8px", height: "8px", borderRadius: "50%", background: "#205078", flexShrink: 0, display: "inline-block" },
  addBtn: { background: "#205078", border: "none", color: "#fff", borderRadius: "8px", padding: "9px 20px", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "7px", transition: "background 0.18s", whiteSpace: "nowrap" },
  tableWrapper: { background: "#ffffff", borderRadius: "14px", border: "1px solid #e8ecf0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse", margin: 0 },
  thead: { background: "#205078" },
  th: { padding: "14px 10px", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "rgba(255,255,255,0.85)", borderBottom: "none", whiteSpace: "nowrap" },
  thCenter: { padding: "14px 10px", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "rgba(255,255,255,0.85)", borderBottom: "none", textAlign: "center" },
  td: { padding: "14px 10px", fontSize: "0.9rem", color: "#2d3a45", borderBottom: "1px solid #f0f3f6", verticalAlign: "middle" },
  tdCenter: { padding: "14px 10px", fontSize: "0.9rem", color: "#2d3a45", borderBottom: "1px solid #f0f3f6", verticalAlign: "middle", textAlign: "center" },
  tdEmpty: { padding: "48px 20px", fontSize: "0.92rem", color: "#8a97a5", textAlign: "center", borderBottom: "none" },
  namePill: { fontWeight: 600, color: "#1a2a3a" },
  emailText: { color: "#5a6a78", fontSize: "0.87rem", wordBreak: "break-all" },
  dateBadge: { background: "rgba(32,80,120,0.07)", color: "#205078", borderRadius: "6px", padding: "3px 10px", fontSize: "0.8rem", fontWeight: 600, display: "inline-block" },
  iconBtn: { background: "transparent", border: "1.5px solid #e8ecf0", borderRadius: "8px", width: "32px", height: "32px", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s", margin: "0 2px" },
};

const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const IconGraduate = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const StudentsView = () => {
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  const fetchStudents = async () => {
    try {
      const data = await api.get("/students");
      setAlumnos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const onAgregar = () => navigate("/studentForm");
  const onEditar = (id) => navigate(`/studentForm/${id}`);

  const handleEliminarClick = (alumno) => {
    setAlumnoSeleccionado(alumno);
    setShowModal(true);
  };

  const handleConfirmEliminar = async () => {
    try {
      await api.delete(`/students/${alumnoSeleccionado.id}`);
      setAlumnos((prev) => prev.filter((a) => a.id !== alumnoSeleccionado.id));
      setShowModal(false);
      setAlumnoSeleccionado(null);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <Loader text="Cargando alumnos..." />;

  return (
    <div style={styles.page}>
      <div className="container">
        <div style={styles.heroCard}>
          <div style={styles.heroAccent} />
          <div style={styles.heroAccent2} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                <button style={styles.backBtn} onClick={() => navigate("/dashboard")}><BsArrowLeft /></button>
                <div style={styles.heroTag}><span style={{ marginRight: 4 }}><IconGraduate /></span>Administración</div>
              </div>
              <h1 style={styles.heroTitle}>Lista de alumnos</h1>
              <p style={styles.heroSubtitle}>Consultá, editá y gestioná los alumnos inscriptos.</p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={styles.statBox}>
                <div style={styles.statNum}>{alumnos.length}</div>
                <div style={styles.statLabel}>Inscriptos</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div style={styles.sectionTitle}><span style={styles.sectionDot} />Alumnos registrados</div>
          <button style={styles.addBtn} onClick={onAgregar}><IconPlus /> Agregar alumno</button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div style={styles.tableWrapper}>
          <div className="table-responsive">
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  <th style={{ ...styles.th, width: "20%" }}>Nombre</th>
                  <th style={{ ...styles.th, width: "55%" }}>Email</th>
                  <th style={{ ...styles.th, width: "15%" }}>
                    <span className="d-none d-md-inline">Fecha de registro</span>
                    <span className="d-inline d-md-none">Fecha</span>
                  </th>
                  <th style={{ ...styles.thCenter, width: "10%" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.length > 0 ? (
                  alumnos.map((alumno) => (
                    <tr key={alumno.id}>
                      <td style={styles.td}><span style={styles.namePill}>{alumno.nombre} {alumno.apellido}</span></td>
                      <td style={styles.td}><span style={styles.emailText}>{alumno.email}</span></td>
                      <td style={styles.td}>
                        <span style={{ ...styles.dateBadge, fontSize: "0.75rem", padding: "2px 8px" }}>
                          {new Date(alumno.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td style={styles.tdCenter}>
                        <button style={styles.iconBtn} onClick={() => onEditar(alumno.id)}><MdEdit size={15} /></button>
                        <button style={styles.iconBtn} onClick={() => handleEliminarClick(alumno)}><BsFillTrash3Fill size={13} /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" style={styles.tdEmpty}>No hay alumnos registrados</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleConfirmEliminar}
        title="Confirmar eliminación"
        message={alumnoSeleccionado ? `¿Seguro que deseas eliminar a ${alumnoSeleccionado.nombre}?` : ""}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default StudentsView;