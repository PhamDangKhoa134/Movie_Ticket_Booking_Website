import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Row, Col } from 'react-bootstrap';

const User = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [user, setUser] = useState({
    lastName: "",
    firstName: "",
    phone: "",
    email: "",
    address: "",
  });

  // Gọi API để lấy dữ liệu người dùng
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5122/get-user/${id}`);
        const data = response.data;
        setUser({
          lastName: data.lastName,
          firstName: data.firstName,
          phone: data.phone,
          email: data.email,
          address: data.address,
        });
      } catch (error) {
        console.error("Có lỗi khi lấy dữ liệu người dùng:", error);
      }
    };

    fetchUserData();
  }, [id]);

  // Xử lý khi nhấn nút cập nhật
  const handleUpdate = async (e) => {
    e.preventDefault(); // Ngăn form gửi request mặc định
    try {
      const response = await axios.put(`http://localhost:5122/update-user`, null, {
        params: {
          Id: id,
          LastName: user.lastName,
          FistName: user.firstName,
          Address: user.address,
        },
      });

      if (response.data.message === "Cập nhật thành công") {
        alert("Cập nhật thông tin thành công!");
        window.location.reload(); // Làm mới trang
      }
    } catch (error) {
      console.error("Cập nhật không thành công:", error);
      alert("Đã xảy ra lỗi khi cập nhật thông tin.");
    }
  };

  return (
    <div className="d-flex justify-content-center" style={{ width: '100%', height: '50vh', marginTop: "100px" }}>
      <div style={{ width: '60%' }}>
        <h2 className="text-center mb-4">Thông tin cá nhân</h2>
        <form onSubmit={handleUpdate}>
          <Row className="mb-3">
            <Col md={6}>
              <label htmlFor="lastName" className="form-label">Họ</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </Col>
            <Col md={6}>
              <label htmlFor="firstName" className="form-label">Tên</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={user.firstName}
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <label htmlFor="phone" className="form-label">Số điện thoại</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={user.phone}
                disabled
              />
            </Col>
            <Col md={6}>
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={user.email}
                disabled
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <label htmlFor="address" className="form-label">Địa chỉ</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            </Col>
            <Col md={6}>
              <Button type="submit" style={{ marginTop: "32px" }} variant="primary" className="w-100">
                Cập nhật
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
};

export default User;
