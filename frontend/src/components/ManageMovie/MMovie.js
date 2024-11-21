import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MMovie.css"
import Button from 'react-bootstrap/Button';
import ModalDeleteMovie from "./Modal/ModalDeleteMovie"
import ModalCreateMovie from "./Modal/ModalCreateMovie";
import ModalUpdateMovie from "./Modal/ModalUpdateMovie";


const MMovie = () => {
  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 7;
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalCreate, setIsShowModalCreate] = useState(false);
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const [idMovie, setIdMovie] = useState(null)

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5122/get-all-movie-page?pageSize=${pageSize}&pageIndex=${pageIndex}`
      );
      setMovies(response.data.movies);
      setTotalMovies(response.data.totalMovie);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [pageIndex]);

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const totalPages = Math.ceil(totalMovies / pageSize);

  const handleCloseDelete = () => {
    setIdMovie(null)
    setIsShowModalDelete(false)
  }

  const handleShowDelete = (id) => {
    setIdMovie(id)
    setIsShowModalDelete(true)
  }

  const handleCloseUpdate = () => {
    setIdMovie(null)
    setIsShowModalUpdate(false)
  }

  const handleShowUpdate = (id) => {
    setIdMovie(id)
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
      <h1 className="my-4 mt-5">Danh sách phim</h1>
      <table className="table-cus" variant = "dark">
        <thead>
          <tr>
            <th>Tên phim</th>
            <th>Thể loại</th>
            <th>Đạo diễn</th>
            <th><Button style={{margin: "0px 18%"}} onClick={()=>{handleShowCreate()}} variant="primary">Thêm mới</Button></th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
                <td>{movie.name}</td>
                <td>{movie.category}</td>
                <td>{movie.director}</td>
                <td>
                    <Button 
                        onClick={()=>{handleShowUpdate(movie.id)}} 
                        variant="warning"
                        style={{margin: "0px 10%"}}    
                    >Sửa</Button>
                    <Button 
                        onClick={()=>{handleShowDelete(movie.id)}} 
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
          <ModalDeleteMovie
                show={isShowModalDelete}
                handleClose={handleCloseDelete}
                id={idMovie}
                onDeleteSuccess={fetchMovies}
          />
          <ModalUpdateMovie
                show={isShowModalUpdate}
                handleClose={handleCloseUpdate}
                id={idMovie}
                onUpdateSuccess={fetchMovies}
          />
          <ModalCreateMovie
                show={isShowModalCreate}
                handleClose={handleCloseCreate}
                onCreateSuccess={fetchMovies}
          />


    </div>
  );
};

export default MMovie;
