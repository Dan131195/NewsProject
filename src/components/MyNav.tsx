import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNav = () => {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            alt="SpaceFlight Logo"
            src="https://img.freepik.com/premium-vector/space-logo-vector_848918-9672.jpg"
            width="40"
            height="40"
            className="d-inline-block align-top rounded-1 me-2"
          />{" "}
          SpaceFlight
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/"}>
              <Nav.Link href="#home">Home</Nav.Link>
            </Link>
            <Link to={"/details"}>
              <Nav.Link href="#link">Details</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
