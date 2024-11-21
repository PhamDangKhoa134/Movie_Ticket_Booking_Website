import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import logo from '../../Image/logo.png';
import Login from '../Login/Login';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Register from "../Register/Register";

function Navi() {
  const navigate = useNavigate();
  const [isShowModalLogin, setIsShowModalLogin] = useState(false);
  const [userName, setUserName] = useState(null);
  const [isShowModalRegister, setIsShowModalRegister] = useState(false);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);

  const handleCloseLogin = () => {
    setIsShowModalLogin(false);
  };

  const handleLoginUser = () => {
    setIsShowModalLogin(true);
  };

  const handleCloseRegister = () => {
    setIsShowModalRegister(false);
  };

  const handleRegisterUser = () => {
    setIsShowModalRegister(true);
  };

  // Kiểm tra token khi component được mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Sử dụng jwtDecode thay vì jwt_decode
        setUserName(decodedToken.name); 
        setUserId(decodedToken.Id);
        setRole(decodedToken.Roles);
      } catch (error) {
        console.error("Token không hợp lệ", error);
        localStorage.removeItem('token'); // Xóa token nếu không hợp lệ
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserName(null);
    setUserId(null);
    setRole(null);
    window.location.reload();
    alert('Đăng xuất thành công');
    navigate("/");
  };

  return (
    <>
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
              {role === "admin" && ( 
                <Nav.Link as={NavLink} to="/manageMovie">
                  Quản lý phim
                </Nav.Link>
              )}
              {role === "admin" && ( 
                <Nav.Link as={NavLink} to="/manageUser">
                  Quản lý khách hàng
                </Nav.Link>
              )}
            </Nav>

            <div className="d-flex gap-2">
              {userName ? (
                <>
                  <DropdownButton as={ButtonGroup} title={<><FaUser /> Xin chào, {userName}</>} id="bg-nested-dropdown" variant="outline-light">
                  <Dropdown.Item eventKey="1" as={NavLink} to={`/user/${userId}`}>Thông tin cá nhân</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                  </DropdownButton>
                </>
              ) : (
                <>
                  <Button variant="outline-light" onClick={handleRegisterUser}>
                    Đăng ký
                  </Button>
                  <Button variant="light" onClick={handleLoginUser}>
                    Đăng nhập
                  </Button>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Login
        show={isShowModalLogin}
        handleClose={handleCloseLogin}
      />
      <Register
        show={isShowModalRegister}
        handleClose={handleCloseRegister}
      />
    </>
  );
}

export default Navi;
