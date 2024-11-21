import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ModalCreateMovie(props) {
    const [formDefaultData, setFormDefaultData] = useState({
        CensorId: "",
        Name: "",
        Director: "",
        Duration: "",
        Actor: "",
        Country: "",
        Description: "",
        Category: "",
        MovieImg: null,
        BackgroundImg: null,
      });
  const [formData, setFormData] = useState({
    CensorId: "",
    Name: "",
    Director: "",
    Duration: "",
    Actor: "",
    Country: "",
    Description: "",
    Category: "",
    MovieImg: null,
    BackgroundImg: null,
  });

  const resetFormData = () => {
    setFormData({ ...formDefaultData });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post("http://localhost:5122/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", response.data);
      resetFormData();
      props.handleClose();
      props.onCreateSuccess();
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  return (
    <>
      <Modal size="lg" show={props.show}  
      onHide={() => {
        resetFormData(); 
        props.handleClose();  
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm phim mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên phim</Form.Label>
                        <Form.Control
                            type="text"
                            name="Name"
                            placeholder="Nhập tên phim"
                            value={formData.Name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Thời lượng (phút)</Form.Label>
                        <Form.Control
                            type="number"
                            name="Duration"
                            placeholder="Nhập thời lượng"
                            value={formData.Duration}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Đạo diễn</Form.Label>
                        <Form.Control
                            type="text"
                            name="Director"
                            placeholder="Nhập tên đạo diễn"
                            value={formData.Director}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Diễn viên</Form.Label>
                        <Form.Control
                            type="text"
                            name="Actor"
                            placeholder="Nhập tên diễn viên"
                            value={formData.Actor}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Quốc gia</Form.Label>
                        <Form.Control
                            type="text"
                            name="Country"
                            placeholder="Nhập quốc gia"
                            value={formData.Country}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Thể loại</Form.Label>
                        <Form.Control
                            type="text"
                            name="Category"
                            placeholder="Nhập thể loại"
                            value={formData.Category}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Kiểm duyệt</Form.Label>
              <Form.Select 
                name="CensorId"
                onChange={handleChange} 
                value={formData.CensorId}
                aria-label="Default select example"
              >
                <option>Chọn kiểm duyệt</option>
                <option value="2">T13 - Phim được phổ biến đến khán giả từ đủ 13 tuổi trở lên</option>
                <option value="3">T16 - Phim được phổ biến đến khán giả từ đủ 16 tuổi trở lên</option>
                <option value="4">T18 - Phim được phổ biến đến khán giả từ đủ 18 tuổi trở lên(18+)</option>
                <option value="5">K - Phim được phổ biến đến khán giả dưới 13 tuổi với điều kiện xem cùng cha, mẹ hoặc người giám hộ</option>
                <option value="6">P - Phim được phổ biến đến khán giả ở mọi độ tuổi</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="Description"
                placeholder="Nhập mô tả"
                value={formData.Description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ảnh phim</Form.Label>
              <Form.Control
                type="file"
                name="MovieImg"
                accept="image/*"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ảnh nền</Form.Label>
              <Form.Control
                type="file"
                name="BackgroundImg"
                accept="image/*"
                onChange={handleChange}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" 
             onHide={() => {
                resetFormData(); 
                props.handleClose();
              }}>
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

export default ModalCreateMovie;
