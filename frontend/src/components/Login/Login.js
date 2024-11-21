import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Login.css'; // Import CSS file

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const url = `http://localhost:5122/login-auth?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok && data.data) {
        localStorage.setItem('token', data.data);
        alert('Đăng nhập thành công');
        window.location.reload();
      } else {
        setErrorMessage(data.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      setErrorMessage('Có lỗi xảy ra khi kết nối với server');
    }
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="login-button" onClick={handleLogin}>
            Đăng nhập
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
