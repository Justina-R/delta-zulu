import { Accordion, Container } from "react-bootstrap";
import "./Faq.css";

const Faq = () => {
  return (
    <div className="bg-white">
      <div className="hero-image-escuela d-flex align-items-center justify-content-center">
        <h1 className="hero-title-escuela text-center w-100">
          Preguntas Frecuentes
        </h1>
      </div>
      <Container>
        <h4 className="fs-2 mt-5 mb-3">Sobre el Curso de Piloto Privado (PPA)</h4>
        <Accordion
          style={{
            border: "2px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Si soy argentino, ¿cuáles son los requisitos de inscripción para
              el curso de Piloto Privado?
            </Accordion.Header>
            <Accordion.Body>
              • Ser mayor de 16 años y 9 meses. Los menores de 18 deben
              presentar autorización de los padres certificada.
              <br />
              • Certificado de estudios primarios escolares.
              <br />
              • Certificado médico aeronáutico de Argentina.
              <br />• Foto 4x4 cm con fondo azul.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              ¿Cómo iniciar los trámites para el estudio psicofísico (CMA) del
              curso de Piloto Privado?
            </Accordion.Header>
            <Accordion.Body>
              1. Solicitar CLAVE FISCAL NIVEL 3 de AFIP.
              <br />
              2. Registrarse en el CAD: https://cad.anac.gov.ar
              <br />
              3. Confirmar el registro desde el email.
              <br />
              4. Esperar correo de confirmación (1 a 3 días hábiles).
              <br />
              5. Ingresar al CAD, ir a CMA, seleccionar CMA inicial.
              <br />
              6. Completar los 3 pasos del formulario.
              <br />
              7. Confirmar y guardar el número de trámite.
              <br />
              8. Solicitar turno en un centro médico habilitado.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              ¿Cuál es la edad mínima requerida para iniciar el curso de Piloto
              Privado?
            </Accordion.Header>
            <Accordion.Body>16 años y 9 meses.</Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>
              ¿Cuál es la edad máxima requerida para iniciar el curso de Piloto
              Privado?
            </Accordion.Header>
            <Accordion.Body>No hay límite de edad.</Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>
              ¿Cuándo es la fecha de inicio del curso de Piloto Privado?
            </Accordion.Header>
            <Accordion.Body>
              El curso inicia cuando el alumno lo desee. Las clases se programan
              por teléfono o en persona.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>
              ¿Con qué avión se realiza el curso de Piloto Privado de Avión?
            </Accordion.Header>
            <Accordion.Body>
              Con aviones de instrucción Cessna 150.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="6">
            <Accordion.Header>
              ¿El precio de la hora de vuelo incluye el instructor?
            </Accordion.Header>
            <Accordion.Body>Sí.</Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="7">
            <Accordion.Header>
              ¿El precio de la hora de vuelo incluye el combustible?
            </Accordion.Header>
            <Accordion.Body>Sí.</Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="8">
            <Accordion.Header>
              ¿A partir de qué momento se empieza a contar la hora de vuelo?
            </Accordion.Header>
            <Accordion.Body>
              Desde que se pone en marcha el avión hasta que se detiene.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="9">
            <Accordion.Header>
              ¿En qué consiste el examen de Piloto Privado?
            </Accordion.Header>
            <Accordion.Body>
              Consiste en un examen teórico de opción múltiple y un vuelo
              práctico con inspector de ANAC.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="10">
            <Accordion.Header>
              ¿Con qué métodos de pago puedo pagar el curso?
            </Accordion.Header>
            <Accordion.Body>
              En efectivo, transferencia o depósito bancario.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="11">
            <Accordion.Header>
              ¿Debo abonar el curso antes de su inicio?
            </Accordion.Header>
            <Accordion.Body>
              No. El curso se puede pagar clase por clase.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="12">
            <Accordion.Header>¿Qué duración tiene el curso?</Accordion.Header>
            <Accordion.Body>
              Entre 2 meses y 2 años, según ritmo del alumno y frecuencia de
              vuelo.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="13">
            <Accordion.Header>
              ¿Qué aviones puedo volar con la licencia de Piloto Privado?
            </Accordion.Header>
            <Accordion.Body>
              Aviones monomotores de hasta 5.700 kg.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="14">
            <Accordion.Header>
              ¿Con la licencia de Piloto Privado puedo realizar vuelos
              comerciales?
            </Accordion.Header>
            <Accordion.Body>
              No. Para eso se requiere el curso de Piloto Comercial c/HVI.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="15">
            <Accordion.Header>
              ¿Cuántas horas de vuelo son requeridas para obtener la licencia?
            </Accordion.Header>
            <Accordion.Body>Mínimo, 40 horas.</Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <h4 className="fs-2 mt-5 mb-3">Sobre el Curso de Piloto Comercial</h4>
        <Accordion className="mb-4"
          style={{
            border: "2px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <Accordion.Item eventKey="16">
            <Accordion.Header>
              Si soy argentino, ¿cuáles son los requisitos de inscripción para
              el curso de Piloto Comercial?
            </Accordion.Header>
            <Accordion.Body>
              • Tener licencia de Piloto Privado de Avión.
              <br />
              • Certificado de estudios secundarios.
              <br />• Certificado médico aeronáutico Clase I.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="17">
            <Accordion.Header>
              ¿Cuándo es la fecha de inicio del curso de Piloto Comercial?
            </Accordion.Header>
            <Accordion.Body>
              Primera semana de marzo y de agosto (teórico). El práctico inicia
              cuando el alumno lo desee.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="18">
            <Accordion.Header>
              ¿Puedo realizar tanto el curso práctico como el teórico en Delta
              Zulu?
            </Accordion.Header>
            <Accordion.Body>
              Sí, Delta Zulu está habilitada para ofrecer ambos cursos.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="19">
            <Accordion.Header>
              ¿Es necesario hacer el curso teórico y el práctico al mismo
              tiempo?
            </Accordion.Header>
            <Accordion.Body>
              No. Son cursos independientes pero ambos son obligatorios para
              solicitar examen.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="20">
            <Accordion.Header>
              ¿Qué duración tiene el curso de Piloto Comercial?
            </Accordion.Header>
            <Accordion.Body>
              El teórico dura 5 meses. El práctico depende de la constancia del
              alumno.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="21">
            <Accordion.Header>
              ¿Con qué avión se realiza el curso?
            </Accordion.Header>
            <Accordion.Body>En aviones Cessna 150.</Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="22">
            <Accordion.Header>
              ¿Con la licencia de Piloto Comercial puedo cobrar por mis
              servicios?
            </Accordion.Header>
            <Accordion.Body>Sí.</Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="23">
            <Accordion.Header>
              ¿Qué aviones puedo volar con esta licencia?
            </Accordion.Header>
            <Accordion.Body>
              Aviones monomotores de hasta 5.700 kg.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="24">
            <Accordion.Header>
              ¿Cuántas horas de vuelo son requeridas?
            </Accordion.Header>
            <Accordion.Body>Mínimo, 200 horas.</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </div>
  );
};

export default Faq;
