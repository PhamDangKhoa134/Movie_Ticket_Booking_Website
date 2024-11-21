import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ModalUpdateUser(props) {
  const [formDefaultData, setFormDefaultData] = useState({
    LastName: "",
    FirstName: "",
    Phone: "",
    Email: "",
    Address: "",
  });

  const [formData, setFormData] = useState({ ...formDefaultData });
  const [message, setMessage] = useState(""); // Để hiển thị thông báo phản hồi
  const [errorMessage, setErrorMessage] = useState(""); // Hiển thị lỗi nếu có

  useEffect(() => {
    // Chỉ gọi API khi props.id tồn tại
    if (props.id) {
      axios
        .get(`http://localhost:5122/get-user/${props.id}`)
        .then((response) => {
          const data = response.data;
          setFormData({
            LastName: data.lastName,
            FirstName: data.firstName,
            Phone: data.phone,
            Email: data.email,
            Address: data.address,
          });
        })
        .catch((error) => {
          setErrorMessage("Không thể tải dữ liệu người dùng.");
          console.error("Error fetching user data:", error);
        });
    }
  }, [props.id]);

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
    // Xây dựng dữ liệu gửi đi
    const params = new URLSearchParams({
        Id: props.id,
        LastName: formData.LastName,
        FistName: formData.FirstName,
        Address: formData.Address,
      }).toString();
    
      const url = `http://localhost:5122/update-user?${params}`;
    
      try {
        const response = await axios.put(url);
        setMessage("Thêm thành công!");
        console.log("Response:", response.data);
        console.log(params);
        resetFormData();
        props.handleClose();
        props.onUpdateSuccess();
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
          <Modal.Title>Cập nhật người dùng</Modal.Title>
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
                    disabled
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
                    disabled
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

export default ModalUpdateUser;
