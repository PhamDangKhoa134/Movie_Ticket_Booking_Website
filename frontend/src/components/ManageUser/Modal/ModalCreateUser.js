import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ModalCreateUser(props) {
  const [formDefaultData, setFormDefaultData] = useState({
    LastName: "",
    FirstName: "",
    Phone: "",
    Email: "",
    Address: "",
    Password: "",
    ConfirmPassword: "",
    RoleId: 2, // Mặc định là vai trò 2
  });

  const [formData, setFormData] = useState({ ...formDefaultData });
  const [message, setMessage] = useState(""); // Để hiển thị thông báo phản hồi
  const [errorMessage, setErrorMessage] = useState(""); // Hiển thị lỗi nếu có

  const resetFormData = () => {
    setFormData({ ...formDefaultData });
    setMessage("");
    setErrorMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (formData.Password !== formData.ConfirmPassword) {
      setErrorMessage("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }
  
    // Xây dựng URL query parameters
    const params = new URLSearchParams({
      LastName: formData.LastName,
      FistName: formData.FirstName,
      Phone: formData.Phone,
      Email: formData.Email,
      Password: formData.Password,
      Address: formData.Address,
      RoleId: formData.RoleId || 2, // Mặc định RoleId = 2 nếu không nhập
    }).toString();
  
    const url = `http://localhost:5122/create-user?${params}`;
  
    try {
      const response = await axios.post(url);
      setMessage("Thêm thành công!");
      console.log("Response:", response.data);
      resetFormData();
      props.handleClose();
      props.onCreateSuccess();
    } catch (error) {
      setErrorMessage("Có lỗi xảy ra. Vui lòng thử lại!");
      console.error("Error creating user:", error);
    }
  };
  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        onHide={() => {
          resetFormData();
          props.handleClose();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm người dùng mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && <p className="text-success">{message}</p>} {/* Thông báo thành công */}
          {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* Thông báo lỗi */}
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Họ</Form.Label>
                  <Form.Control
                    type="text"
                    name="LastName"
                    placeholder="Nhập họ"
                    value={formData.LastName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="FirstName"
                    placeholder="Nhập tên"
                    value={formData.FirstName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    name="Phone"
                    placeholder="Nhập số điện thoại"
                    value={formData.Phone}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    placeholder="Nhập email"
                    value={formData.Email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    name="Address"
                    placeholder="Nhập địa chỉ"
                    value={formData.Address}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Vai trò</Form.Label>
                  <Form.Control
                    as="select"
                    name="RoleId"
                    value={formData.RoleId}
                    onChange={handleChange}
                  >
                    <option value={1}>Quản trị viên</option>
                    <option value={2}>Người dùng</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    name="Password"
                    placeholder="Nhập mật khẩu"
                    value={formData.Password}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Xác nhận mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    name="ConfirmPassword"
                    placeholder="Xác nhận mật khẩu"
                    value={formData.ConfirmPassword}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              resetFormData();
              props.handleClose();
            }}
          >
            Đóng
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateUser;
