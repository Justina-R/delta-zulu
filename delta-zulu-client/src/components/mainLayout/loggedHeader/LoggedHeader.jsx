import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LoggedHeader.css";

const LoggedHeader = ({ userInitial = "J" }) => {
  return (
    <Navbar expand="md" fixed="top" className="shadow-sm py-3" style={{ backgroundColor: '#dcdbdb'}}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="/images/delta_zulu.png" alt="Delta Zulu" height="120" />
        </Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          <Nav.Link as={Link} to="/myCourses" className="fs-5 me-3">
            Mis cursos
          </Nav.Link>
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="light"
              className="user-circle d-flex justify-content-center align-items-center"
            >
              {userInitial}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/mi-perfil">
                Mi perfil
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/logout">Cerrar sesión</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default LoggedHeader;
