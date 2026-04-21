import "./WelcomeImage.css";

const WelcomeImage = () => {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Cover image — untouched */}
      <img
        src="images/portada.jpg"
        alt="Portada"
        style={{
          width: "100%",
          height: "75vh",
          objectFit: "cover",
          display: "block",
          filter: "brightness(40%)",
        }}
      />

      {/* Gradient overlay for depth */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(10,20,35,0.6) 0%, rgba(10,20,35,0.1) 60%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Hero text */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        color: "#fff",
        width: "100%",
        padding: "0 24px",
      }}>
        {/* Tag pill */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "20px",
          padding: "5px 16px",
          fontSize: "0.78rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "20px",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L11 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
          </svg>
          Escuela de Vuelo — Las Parejas, Santa Fe
        </div>

        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 800,
          margin: "0 0 14px",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          textShadow: "0 2px 20px rgba(0,0,0,0.3)",
        }}>
          Bienvenido a Delta Zulu
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
          color: "rgba(255,255,255,0.8)",
          margin: "0 0 32px",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          fontWeight: 400,
        }}>
          Tu escuela de vuelo en Las Parejas, Santa Fe
        </p>

        <a
          href="/cursos"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#205078",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "14px 32px",
            fontSize: "1rem",
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "0.01em",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            boxShadow: "0 8px 32px rgba(32,80,120,0.45)",
            transition: "background 0.2s, transform 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#1a3f60"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#205078"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          ¡Quiero saber más!
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>

      {/* Bottom fade into page background */}
      
    </div>
  );
};

export default WelcomeImage;