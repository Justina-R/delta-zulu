import { Container, Row, Col } from "react-bootstrap";
import { FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";

const styles = {
  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    position: "relative",
    background: "linear-gradient(135deg, #205078 0%, #1a3f60 60%, #122d46 100%)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "320px",
    paddingTop: "3rem",
    paddingBottom: "64px",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  heroAccent1: {
    position: "absolute",
    top: "-80px",
    right: "-80px",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.04)",
    pointerEvents: "none",
  },
  heroAccent2: {
    position: "absolute",
    bottom: "-100px",
    left: "60px",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.03)",
    pointerEvents: "none",
  },
  heroInner: {
    textAlign: "center",
    color: "#fff",
    position: "relative",
    zIndex: 1,
  },
  heroTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "#fff",
    borderRadius: "20px",
    padding: "4px 16px",
    fontSize: "0.74rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "18px",
  },
  heroTitle: {
    fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
    fontWeight: 800,
    margin: "0 0 12px",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    color: "#fff",
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.72)",
    fontSize: "1rem",
    margin: 0,
    maxWidth: "460px",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.6,
  },

  // ── Contact section ───────────────────────────────────────────────────────
  contactSection: {
    background: "#ffffff",
    padding: "72px 0",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "48px",
  },
  sectionTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(32,80,120,0.08)",
    border: "1px solid rgba(32,80,120,0.15)",
    color: "#205078",
    borderRadius: "20px",
    padding: "4px 14px",
    fontSize: "0.73rem",
    fontWeight: 700,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    marginBottom: "14px",
  },
  sectionTitle: {
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 800,
    color: "#1a2a3a",
    margin: "0 0 10px",
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
  },
  sectionSubtitle: {
    fontSize: "0.97rem",
    color: "#6b7a87",
    margin: 0,
    lineHeight: 1.6,
  },

  // ── Contact card ──────────────────────────────────────────────────────────
  contactCard: {
    background: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e8ecf0",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    padding: "32px 24px",
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "box-shadow 0.2s, transform 0.2s",
    overflow: "hidden",
    position: "relative",
  },
  contactCardAccent: {
    height: "4px",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  iconWrap: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
    marginTop: "8px",
    transition: "transform 0.2s",
  },
  contactTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#1a2a3a",
    margin: "0 0 6px",
  },
  contactValue: {
    fontSize: "0.9rem",
    color: "#5a6a78",
    margin: 0,
    lineHeight: 1.5,
  },

  // ── Map section ───────────────────────────────────────────────────────────
  mapSection: {
    background: "#f4f6f9",
    padding: "72px 0 80px",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  mapWrapper: {
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(32,80,120,0.1)",
    border: "1px solid #e8ecf0",
  },
  mapTextTitle: {
    fontSize: "clamp(1.3rem, 2.5vw, 1.6rem)",
    fontWeight: 800,
    color: "#1a2a3a",
    margin: "0 0 14px",
    letterSpacing: "-0.02em",
  },
  mapText: {
    fontSize: "0.95rem",
    color: "#5a6a78",
    lineHeight: 1.75,
    margin: "0 0 20px",
  },
  locationList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  locationItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "0.9rem",
    color: "#3a4a58",
  },
  locationDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#205078",
    flexShrink: 0,
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconChat = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const contactItems = [
  {
    icon: <FaWhatsapp size={24} />,
    label: "WhatsApp",
    value: "+54 9 3471 676535",
    color: "#25D366",
    accent: "linear-gradient(90deg, #25D366, #128C7E)",
  },
  {
    icon: <FaEnvelope size={24} />,
    label: "Email",
    value: "info@deltazulu.com.ar",
    color: "#205078",
    accent: "linear-gradient(90deg, #205078, #2e7ab0)",
  },
  {
    icon: <FaPhone size={24} />,
    label: "Teléfono",
    value: "+54 3471 676535",
    color: "#198754",
    accent: "linear-gradient(90deg, #198754, #2da86a)",
  },
];

const Contact = () => {
  return (
    <div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={styles.hero}>
        <div style={styles.heroAccent1} />
        <div style={styles.heroAccent2} />
        <div style={styles.heroInner}>
          <div style={styles.heroTag}>
            <IconChat /> Delta Zulu
          </div>
          <h1 style={styles.heroTitle}>Contacto</h1>
          <p style={styles.heroSubtitle}>
            Estamos disponibles para resolver tus dudas y asesorarte en tu camino como piloto.
          </p>
        </div>
      </div>

      {/* ── CONTACT CARDS ─────────────────────────────────────────────────── */}
      <section style={styles.contactSection}>
        <Container>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTag}>
              <IconChat /> Comunicación
            </div>
            <h2 style={styles.sectionTitle}>¿Querés comunicarte con nosotros?</h2>
            <p style={styles.sectionSubtitle}>
              Estamos disponibles para resolver tus dudas y asesorarte.
            </p>
          </div>

          <Row className="g-4 justify-content-center">
            {contactItems.map(({ icon, label, value, color, accent }) => (
              <Col key={label} xs={12} md={4}>
                <div
                  style={styles.contactCard}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = "0 8px 28px rgba(32,80,120,0.13)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ ...styles.contactCardAccent, background: accent }} />
                  <div style={{
                    ...styles.iconWrap,
                    background: `${color}18`,
                    color,
                  }}>
                    {icon}
                  </div>
                  <h5 style={styles.contactTitle}>{label}</h5>
                  <p style={styles.contactValue}>{value}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── MAP SECTION ───────────────────────────────────────────────────── */}
      <section style={styles.mapSection}>
        <Container>
          <div style={{ marginBottom: "36px" }}>
            <div style={styles.sectionTag}>
              <IconPin /> Ubicación
            </div>
            <h2 style={styles.sectionTitle}>¿Cómo llegar?</h2>
          </div>

          <Row className="g-4 align-items-center">
            <Col md={6}>
              <div style={styles.mapWrapper}>
                <iframe
                  title="Mapa Delta Zulu"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3360.323641984416!2d-61.547501024993174!3d-32.62420375567478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95c9f16ac87549b1%3A0x992206ffdbcd7af2!2sZarantonello%20Serv.%20A%C3%A9reos.%20-%20Delta%20Zulu%20Escuela%20de%20Vuelo!5e0!3m2!1ses!2sar!4v1752512253609!5m2!1ses!2sar"
                  width="100%"
                  height="320"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Col>

            <Col md={6}>
              <h3 style={styles.mapTextTitle}>Ruta Nacional 178 Km 18</h3>
              <p style={styles.mapText}>
                Nuestra escuela está ubicada sobre la Ruta Nacional 178 Km 18,
                en Las Parejas, Santa Fe. Contamos con instalaciones modernas,
                cómodas y de fácil acceso tanto en vehículo particular como en
                transporte público.
              </p>
              <ul style={styles.locationList}>
                {[
                  "Estacionamiento gratuito dentro del predio.",
                  "Acceso señalizado desde la ruta principal.",
                  "A 10 minutos del centro de Las Parejas.",
                ].map((item, i) => (
                  <li key={i} style={styles.locationItem}>
                    <span style={styles.locationDot} />
                    {item}
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
};

export default Contact;