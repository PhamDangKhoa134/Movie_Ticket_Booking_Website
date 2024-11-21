import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ModalUpdateMovie(props) {
  const [formDefaultData, setFormDefaultData] = useState({
    Id: String(props.id || ""),
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

  const [formData, setFormData] = useState({ ...formDefaultData });

  // Hàm reset form về dữ liệu mặc định
  const resetFormData = () => {
    setFormData({ ...formDefaultData });
  };

  // Hàm gọi API để lấy dữ liệu phim
  const fetchMovie = async () => {
    if (!props.id) return; // Không làm gì nếu không có ID

    try {
      const response = await axios.get(`http://localhost:5122/get/${props.id}`);
      const data = response.data;

      // Cập nhật dữ liệu mặc định và dữ liệu form
      const updatedData = {
        Id: String(data.id || ""),
        CensorId: String(data.censorId || ""),
        Name: data.name || "",
        Director: data.director || "",
        Duration: String(data.duration || ""),
        Actor: data.actor || "",
        Country: data.country || "",
        Description: data.description || "",
        Category: data.category || "",
        MovieImg: data.movieImage || null,
        BackgroundImg: data.backgroundImage || null,
      };

      setFormDefaultData(updatedData);
      setFormData(updatedData);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  // Gọi hàm fetchMovie khi component mount hoặc props.id thay đổi
  useEffect(() => {
    fetchMovie();
  }, [props.id]);

  // Xử lý thay đổi dữ liệu form
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Xử lý submit form
  const handleSubmit = async () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.put("http://localhost:5122/update", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", response.data);
      resetFormData();
      props.handleClose();
      props.onUpdateSuccess();
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <Modal
      size="lg"
      show={props.show}
      onHide={() => {
        resetFormData();
        props.handleClose();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Sửa thông tin phim</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Các ô nhập liệu */}
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
                <div>
                    {formData.MovieImg ? (
                        typeof formData.MovieImg === "string" ? (
                        <img
                            src={`http://localhost:5122/${formData.MovieImg}`}
                            alt="Movie"
                            style={{ width: "100px", height: "auto" }}
                        />
                        ) : formData.MovieImg instanceof File ? (
                        <img
                            src={`http://localhost:5122/MovieImages/${formData.MovieImg.name}`}
                            alt="Movie"
                            style={{ width: "100px", height: "auto" }}
                        />
                        ) : (
                        <span>Chưa có ảnh phim</span>
                        )
                    ) : (
                        <span>Chưa có ảnh phim</span>
                    )}
                </div>
              <Form.Control
                type="file"
                name="MovieImg"
                accept="image/*"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ảnh nền</Form.Label>
              <div>
                    {formData.BackgroundImg ? (
                        typeof formData.BackgroundImg === "string" ? (
                        <img
                            src={`http://localhost:5122/${formData.BackgroundImg}`}
                            alt="Movie"
                            style={{ width: "100px", height: "auto" }}
                        />
                        ) : formData.BackgroundImg instanceof File ? (
                        <img
                            src={`http://localhost:5122/BackgroundImages/${formData.BackgroundImg.name}`}
                            alt="Movie"
                            style={{ width: "100px", height: "auto" }}
                        />
                        ) : (
                        <span>Chưa có ảnh phim</span>
                        )
                    ) : (
                        <span>Chưa có ảnh phim</span>
                    )}
                </div>
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
  );
}

export default ModalUpdateMovie;
