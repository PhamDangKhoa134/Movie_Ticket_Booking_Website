import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import logo from '../../Image/logo.png'; // Đảm bảo đường dẫn đúng

function Navi() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom py-1">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img
            src={logo}
            alt="KCC Cinema"
            width="50"
            height="auto"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-3">
            <Nav.Link as={NavLink} to="/" exact>
              Trang chủ
            </Nav.Link>
            <Nav.Link as={NavLink} to="/showtimes">
              Lịch chiếu
            </Nav.Link>
            <Nav.Link as={NavLink} to="/ticketprice">
              Giá vé
            </Nav.Link>
          </Nav>

          <div className="d-flex gap-2">
            <Button variant="outline-light" as={NavLink} to="/register">
              Đăng ký
            </Button>
            <Button variant="light" as={NavLink} to="/login">
              Đăng nhập
            </Button>
            
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navi;
