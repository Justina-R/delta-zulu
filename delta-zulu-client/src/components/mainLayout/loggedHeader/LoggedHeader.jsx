import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LoggedHeader.css";

const LoggedHeader = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload(); // Force reload to update Layout state
  };

  return (
    <Navbar
      expand="md"
      fixed="top"
      className="shadow-sm py-3"
      style={{ backgroundColor: '#dcdbdb' }}
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>
          <img src="/images/delta_zulu.png" alt="Delta Zulu" height="120" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="logged-navbar-nav" />

        <Navbar.Collapse id="logged-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3 py-3 py-md-0">
            {user.role === "ADMIN" && (
              <Nav.Link as={Link} to="/dashboard" className="fs-5" onClick={() => setExpanded(false)}>
                Dashboard
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/myCourses" className="fs-5" onClick={() => setExpanded(false)}>
              Mis cursos
            </Nav.Link>

            <Nav.Link
              onClick={handleLogout}
              className="fs-5 fw-bold ms-md-3"
            >
              Cerrar sesión
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LoggedHeader;
