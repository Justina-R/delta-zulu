import "./WelcomeImage.css";
import { Button } from "react-bootstrap";

const WelcomeImage = () => {
  return (

    <div className="position-relative text-white text-center overflow-hidden ">
      <img
        src="images/portada.jpg"
        alt="Portada"
        className="w-100 object-fit-cover"
        style={{
          height: "75vh",
          objectFit: "cover",
          filter: "brightness(40%)",
        }}
      />

      <div className="position-absolute top-50 start-50 translate-middle hero-text">
        <h1
          style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
          className="fw-bold"
        >
          Bienvenido a Delta Zulu
        </h1>
        <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}>
          Tu escuela de vuelo en Las Parejas, Santa Fe
        </p>
        <Button href="/cursos" className="moreInfoBtn fs-5">¡Quiero saber más!</Button>
      </div>
    </div>
  );
};

export default WelcomeImage;
