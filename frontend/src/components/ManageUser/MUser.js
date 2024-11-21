import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MUser.css"
import Button from 'react-bootstrap/Button';
import ModalCreateUser from "./Modal/ModalCreateUser";
import ModalDeleteUser from "./Modal/ModalDeleteUser";
import ModalUpdateUser from "./Modal/ModalUpdateUser";


const MUser = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 7;
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalCreate, setIsShowModalCreate] = useState(false);
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const [idUser, setIdUser] = useState(null)

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5122/get-all-user-page?pageSize=${pageSize}&pageIndex=${pageIndex}`
      );
      setUsers(response.data.auths);
      setTotalUsers(response.data.totalAuth);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pageIndex]);

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const totalPages = Math.ceil(totalUsers / pageSize);

  const handleCloseDelete = () => {
    setIdUser(null)
    setIsShowModalDelete(false)
  }

  const handleShowDelete = (id) => {
    setIdUser(id)
    setIsShowModalDelete(true)
  }

  const handleCloseUpdate = () => {
    setIdUser(null)
    setIsShowModalUpdate(false)
  }

  const handleShowUpdate = (id) => {
    setIdUser(id)
    setIsShowModalUpdate(true)
  }

  const handleCloseCreate = () => {
    setIsShowModalCreate(false)
  }

  const handleShowCreate = () => {
    setIsShowModalCreate(true)
  }

  return (
    <div className="containerr mt-5">
      <h1 className="my-4 mt-5">Danh sách người dùng</h1>
      <table className="table-cus" variant = "dark">
        <thead>
          <tr>
            <th>Họ và tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th><Button style={{margin: "0px 18%"}} onClick={()=>{handleShowCreate()}} variant="primary">Thêm mới</Button></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
                <td>{user.lastName} {user.firstName}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                    <Button 
                        onClick={()=>{handleShowUpdate(user.id)}} 
                        variant="warning"
                        style={{margin: "0px 10%"}}    
                    >Sửa</Button>
                    <Button 
                        onClick={()=>{handleShowDelete(user.id)}} 
                        variant="danger">Xóa</Button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
            key={index + 1}
            className={`page-item ${pageIndex === index + 1 ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
          ))}
        </ul>
      </nav>
          <ModalDeleteUser
                show={isShowModalDelete}
                handleClose={handleCloseDelete}
                id={idUser}
                onDeleteSuccess={fetchUsers}
          />
          <ModalUpdateUser
                show={isShowModalUpdate}
                handleClose={handleCloseUpdate}
                id={idUser}
                onUpdateSuccess={fetchUsers}
          />
          <ModalCreateUser
                show={isShowModalCreate}
                handleClose={handleCloseCreate}
                onCreateSuccess={fetchUsers}
          />


    </div>
  );
};

export default MUser;
