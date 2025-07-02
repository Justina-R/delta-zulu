import { useState } from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'

const Header = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Navbar
      bg="white"
      expand="md"
      fixed="top"
      className="shadow-sm"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        {/* Logo a la derecha */}
        <Navbar.Brand href="/" className="ms-auto">
          <img
            src="images/delta_zulu.png"
            alt="Delta Zulu Logo"
            height="100"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        {/* Nav links */}
        <Nav className="me-auto">
          <Nav.Link href="#escuela">Escuela de aviación</Nav.Link>
          <Nav.Link href="#cursos">Cursos</Nav.Link>
          <Nav.Link href="#faq">Preguntas frecuentes</Nav.Link>
          <Button href="#contacto">Contacto</Button>
        </Nav>

        {/* Toggler (hamburguesa) */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" />
      </Container>
    </Navbar>
  )
}

export default Header
