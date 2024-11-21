import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function ModalDeleteMovie(props) {
  const handleDelete = async () => {
    try {
      // Gọi API xóa
      await axios.delete(`http://localhost:5122/delete/${props.id}`);
      alert('Xóa phim thành công!');
      
      // Đóng modal và thực hiện hành động khác (nếu cần)
      props.handleClose();

      // Gọi lại dữ liệu nếu cần cập nhật danh sách phim
      if (props.onDeleteSuccess) {
        props.onDeleteSuccess();
      }
    } catch (error) {
      console.error('Lỗi khi xóa phim:', error);
      alert('Xóa phim thất bại!');
    }
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Xóa phim</Modal.Title>
      </Modal.Header>
      <Modal.Body>Bạn có chắc chắn muốn xóa phim này?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeleteMovie;
