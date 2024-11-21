import './Register.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Register(props) {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu và xác nhận mật khẩu không khớp');
      return;
    }

    try {
      const url = `http://localhost:5122/create-user?LastName=${encodeURIComponent(lastName)}&FistName=${encodeURIComponent(firstName)}&Phone=${encodeURIComponent(phone)}&Email=${encodeURIComponent(email)}&Password=${encodeURIComponent(password)}&Address=${encodeURIComponent(address)}&RoleId=2`;

      const response = await fetch(url, { method: 'POST' });

      if (response.ok) {
        alert('Đăng ký thành công');
        props.handleClose();
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Đăng ký thất bại');
      }
    } catch (error) {
      setErrorMessage('Có lỗi xảy ra khi kết nối với server');
    }
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} className="register-modal">
        <Modal.Header closeButton>
          <Modal.Title>Đăng ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formLastName">
                  <Form.Label>Họ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Họ"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    autoFocus
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formFirstName">
                  <Form.Label>Tên</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tên"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="0123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Xác nhận mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleRegister} className="register-button">
            Đăng ký
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Register;
