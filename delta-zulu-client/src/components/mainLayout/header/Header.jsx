import { useState } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Navbar
      style={{ backgroundColor: '#f1f1f1'}}
      expand="md"
      fixed="top"
      className="shadow-sm"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container className="d-flex align-items-center justify-content-between">
        
        <Navbar.Brand
          href="/"
          className="order-1"
        >
          <img
            src="images/delta_zulu.png"
            alt="Delta Zulu Logo"
            height="120"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="order-2"
        />

        {/* LINKS */}
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="order-3"
        >
          <Nav className="ms-auto gap-md-4 text-center text-md-start">
            <Nav.Link href="#escuela" className="fs-5">Escuela de aviación</Nav.Link>
            <Nav.Link href="#cursos" className="fs-5">Cursos</Nav.Link>
            <Nav.Link href="#faq" className="fs-5">Preguntas frecuentes</Nav.Link>
            <Nav.Link href="#contacto" className="fs-5">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
