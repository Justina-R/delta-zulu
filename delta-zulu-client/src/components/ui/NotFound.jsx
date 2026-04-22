import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsAirplaneEngines } from "react-icons/bs";

const styles = {
  page: {
    background: "#f4f6f9",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    textAlign: "center",
    padding: "20px"
  },
  card: {
    background: "#fff",
    borderRadius: "24px",
    padding: "60px 40px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
    maxWidth: "500px",
    width: "100%",
    border: "1px solid #e8ecf0"
  },
  iconWrapper: {
    background: "rgba(32, 80, 120, 0.08)",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 30px",
    color: "#205078"
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: 700,
    color: "#1a2a3a",
    marginBottom: "16px"
  },
  text: {
    fontSize: "1.05rem",
    color: "#5a6a78",
    marginBottom: "32px",
    lineHeight: 1.6
  },
  btn: {
    background: "#205078",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "14px 32px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 8px 20px rgba(32, 80, 120, 0.3)"
  }
};

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <Container className="d-flex justify-content-center">
        <div style={styles.card}>
          <div style={styles.iconWrapper}>
            <BsAirplaneEngines size={50} style={{ transform: "rotate(-45deg)" }} />
          </div>
          <h1 style={styles.title}>¡Oops! Te desviaste de la ruta</h1>
          <p style={styles.text}>
            La página que estás buscando no parece estar en nuestro plan de vuelo. 
            Tal vez se movió de lugar o el enlace es incorrecto.
          </p>
          <button 
            style={styles.btn} 
            onClick={() => navigate("/")}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1a3f60";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#205078";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Volver a la base
          </button>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
