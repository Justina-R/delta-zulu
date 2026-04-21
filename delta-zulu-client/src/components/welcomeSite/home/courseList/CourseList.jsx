import { FaPlane } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { PiPlantFill } from "react-icons/pi";
import { FaPersonChalkboard } from "react-icons/fa6";
import { RiComputerFill } from "react-icons/ri";
import { AiFillDashboard } from "react-icons/ai";
import { GoChecklist } from "react-icons/go";
import { Container, Row, Col } from "react-bootstrap";

const styles = {
  section: {
    background: "#f4f6f9",
    padding: "72px 0 80px",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "52px",
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
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "14px",
  },
  sectionTitle: {
    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
    fontWeight: 800,
    color: "#1a2a3a",
    margin: "0 0 10px",
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
  },
  sectionSubtitle: {
    fontSize: "1rem",
    color: "#6b7a87",
    margin: 0,
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 1.6,
  },
  card: {
    background: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e8ecf0",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    transition: "box-shadow 0.2s, transform 0.2s",
  },
  cardAccent: {
    height: "4px",
    background: "linear-gradient(90deg, #205078, #2e7ab0)",
  },
  cardBody: {
    padding: "28px 24px 24px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  iconWrap: {
    width: "56px",
    height: "56px",
    borderRadius: "14px",
    background: "rgba(32,80,120,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
    color: "#205078",
    transition: "background 0.2s",
  },
  cardTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#1a2a3a",
    margin: "0 0 10px",
    lineHeight: 1.3,
  },
  cardText: {
    fontSize: "0.87rem",
    color: "#5a6a78",
    lineHeight: 1.65,
    margin: "0 0 20px",
    flex: 1,
  },
  cardLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    color: "#205078",
    fontSize: "0.85rem",
    fontWeight: 700,
    textDecoration: "none",
    transition: "gap 0.15s, color 0.15s",
    marginTop: "auto",
  },
};

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const PlaneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L11 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
  </svg>
);

const CourseCard = ({ icon, title, text, href }) => (
  <div
    style={styles.card}
    onMouseEnter={e => {
      e.currentTarget.style.boxShadow = "0 8px 28px rgba(32,80,120,0.13)";
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.querySelector(".icon-wrap").style.background = "rgba(32,80,120,0.14)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.querySelector(".icon-wrap").style.background = "rgba(32,80,120,0.08)";
    }}
  >
    <div style={styles.cardAccent} />
    <div style={styles.cardBody}>
      <div className="icon-wrap" style={styles.iconWrap}>{icon}</div>
      <h5 style={styles.cardTitle}>{title}</h5>
      <p style={styles.cardText}>{text}</p>
      <a
        href={href}
        style={styles.cardLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={e => { e.currentTarget.style.gap = "10px"; e.currentTarget.style.color = "#1a3f60"; }}
        onMouseLeave={e => { e.currentTarget.style.gap = "6px"; e.currentTarget.style.color = "#205078"; }}
      >
        Más info <ArrowIcon />
      </a>
    </div>
  </div>
);

const courses = [
  {
    icon: <FaPlane size={22} />,
    title: "Curso de Piloto Privado",
    text: "Aprendé a volar desde cero con instructores certificados y materiales actualizados.",
    href: "https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Piloto%20Privado%20de%20Avión.",
  },
  {
    icon: <GrMoney size={22} />,
    title: "Curso de Piloto Comercial",
    text: "Perfeccioná tus habilidades como piloto profesional y accedé a oportunidades laborales en aerolíneas y empresas privadas.",
    href: "https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Piloto%20Comercial%20de%20Avión.",
  },
  {
    icon: <PiPlantFill size={22} />,
    title: "Curso de Piloto Aeroaplicador",
    text: "Capacitate en operaciones agrícolas aéreas, con énfasis en seguridad, precisión y normativas vigentes.",
    href: "https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Piloto%20Aeroaplicador.",
  },
  {
    icon: <FaPersonChalkboard size={22} />,
    title: "Curso de Instructor de Vuelo",
    text: "Formate como instructor certificado y transmití tus conocimientos a nuevos aspirantes a piloto.",
    href: "https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Piloto%Instructor%20de%20Vuelo.",
  },
  {
    icon: <RiComputerFill size={22} />,
    title: "Curso de Piloto Instructor ETVI",
    text: "Convertite en guía especializado en instrucción con simuladores terrestres certificados para vuelo instrumental.",
    href: "https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Piloto%20Instructor%20de%20ETVI.",
  },
  {
    icon: <AiFillDashboard size={22} />,
    title: "Habilitación de Vuelo por Instrumento",
    text: "Aprendé a volar con precisión en condiciones de baja visibilidad utilizando exclusivamente instrumentos de vuelo.",
    href: "https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Habilitación%20de%20Vuelo%20Por%20Instrumento.",
  },
  {
    icon: <GoChecklist size={22} />,
    title: "Habilitación VFR Controlado",
    text: "Obtené la habilitación para operar en espacios aéreos controlados respetando procedimientos y comunicación ATC.",
    href: "https://wa.me/3471676535?text=Hola%2C%20quiero%20saber%20más%20sobre%20el%20curso%20de%20Habilitación%20VFR%20Controlado.",
  },
];

const CourseList = () => {
  return (
    <section style={styles.section}>
      <Container>
        {/* Section header */}
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTag}>
            <PlaneIcon /> Formación aeronáutica
          </div>
          <h2 style={styles.sectionTitle}>Nuestros Cursos</h2>
          <p style={styles.sectionSubtitle}>
            Desde el primer vuelo hasta la habilitación profesional, tenemos el programa ideal para vos.
          </p>
        </div>

        {/* Cards grid */}
        <Row className="g-4">
          {courses.map((course, i) => (
            <Col key={i} xs={12} md={6} lg={3}>
              <CourseCard {...course} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default CourseList;