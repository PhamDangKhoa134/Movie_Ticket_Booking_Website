import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Detail = ({ date }) => {
  const navigate = useNavigate();
  const [showsByMovie, setShowsByMovie] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});

  // Hàm gọi API để lấy danh sách suất chiếu theo ngày
  const fetchShowsByDate = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5122/get-all-show");
      const data = response.data;

      // Lọc các suất chiếu theo ngày được chọn
      const filteredShows = data.filter((show) => {
        const showDate = new Date(show.startTime);
        const day = String(showDate.getDate()).padStart(2, "0");
        const month = String(showDate.getMonth() + 1).padStart(2, "0");
        const year = showDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate === date;
      });

      // Nhóm các suất chiếu theo ID phim và sắp xếp theo thứ tự tăng dần
      const groupedShows = filteredShows.reduce((acc, show) => {
        const startTime = new Date(show.startTime);
        const hours = String(startTime.getHours()).padStart(2, "0");
        const minutes = String(startTime.getMinutes()).padStart(2, "0");
        const time = `${hours}:${minutes}`;

        if (!acc[show.movieId]) {
          acc[show.movieId] = [];
        }
        acc[show.movieId].push(time);
        return acc;
      }, {});

      // Chuyển đổi đối tượng thành mảng và sắp xếp theo ID phim
      const sortedGroupedShows = Object.keys(groupedShows)
        .sort((a, b) => a - b)
        .map((movieId) => ({
          movieId,
          times: groupedShows[movieId],
        }));

      setShowsByMovie(sortedGroupedShows);
    } catch (error) {
      console.error("Lỗi khi gọi API danh sách suất chiếu:", error);
    }
  }, [date]); // Đảm bảo hàm phụ thuộc vào `date`

  // Hàm gọi API để lấy thông tin phim theo ID
  const fetchMovieDetails = useCallback(async (movieId) => {
    try {
      const response = await axios.get(`http://localhost:5122/get/${movieId}`);
      setMovieDetails((prevDetails) => ({
        ...prevDetails,
        [movieId]: response.data,
      }));
    } catch (error) {
      console.error(`Lỗi khi gọi API thông tin phim ID ${movieId}:`, error);
    }
  }, []);

  // Gọi API khi `date` thay đổi
  useEffect(() => {
    if (date) {
      fetchShowsByDate();
    }
  }, [date, fetchShowsByDate]);

  // Gọi API thông tin phim khi danh sách suất chiếu thay đổi
  useEffect(() => {
    showsByMovie.forEach((movie) => {
      if (!movieDetails[movie.movieId]) {
        fetchMovieDetails(movie.movieId);
      }
    });
  }, [showsByMovie, movieDetails, fetchMovieDetails]);
  
  const handleMovie = (id) => {
    navigate(`/movie/${id}`);
    window.location.reload();
  };
  return (
    <div style={{ marginTop: "20px", color: "#fff" }}>
      {showsByMovie.length > 0 ? (
        <div className="row justify-content-center">
          {showsByMovie.map((movie) => (
            <div
            key={movie.movieId}
            style={{ width: "40%", margin: "20px 20px" }}
            onClick={() => handleMovie(movie.movieId)}
            >
            {movieDetails[movie.movieId] && (
                <div
                className="row"
                style={{
                    marginBottom: "10px",
                    borderColor: "white",
                    borderRadius: "20px",
                    borderStyle: "solid",
                    borderWidth: "2px", // Viền trắng cho thông tin phim
                }}
                >
                <img
                    src={`http://localhost:5122${movieDetails[movie.movieId].movieImage}`}
                    alt={movieDetails[movie.movieId].name}
                    style={{
                    width: "40%",
                    borderRadius: "20px",
                    padding: "0px 0px"
                    }}
                />
                <div style={{ width: "55%", margin: "10px 10px", textAlign: "left" }}>
                    <h5 style={{ color: "#ffcc00" }}>
                    {movieDetails[movie.movieId]?.name || `Phim ID: ${movie.movieId}`}
                    </h5>
                    <p style={{margin: "2px 0px"}}>
                    <strong>Quốc gia:</strong> {movieDetails[movie.movieId].country}
                    </p>
                    <p style={{margin: "2px 0px"}}>
                    <strong>Thể loại:</strong> {movieDetails[movie.movieId].category}
                    </p>
                    <p style={{margin: "2px 0px"}}>
                    <strong>Thời lượng:</strong> {movieDetails[movie.movieId].duration}{" "}
                    phút
                    </p>
                    <p style={{margin: "2px 0px"}}>
                    <strong>Đạo diễn:</strong> {movieDetails[movie.movieId].director}
                    </p>
                    <p style={{margin: "2px 0px"}}>
                    <strong>Diễn viên:</strong> {movieDetails[movie.movieId].actor}
                    </p>
                    <strong>Giờ chiếu:</strong>
                    <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "5px",
                        marginTop: "5px",
                    }}
                    >
                    {/* Sắp xếp giờ chiếu từ nhỏ đến lớn */}
                    {movie.times
                        .sort((a, b) => {
                        // So sánh giờ theo định dạng "HH:mm"
                        const [aHour, aMinute] = a.split(":").map(Number);
                        const [bHour, bMinute] = b.split(":").map(Number);

                        if (aHour !== bHour) {
                            return aHour - bHour; // Sắp xếp theo giờ
                        }
                        return aMinute - bMinute; // Sắp xếp theo phút
                        })
                        .map((time, index) => (
                        <span
                            key={index}
                            style={{
                            border: "1px solid white", // Viền trắng cho giờ chiếu
                            borderRadius: "5px",
                            padding: "2px 8px",
                            color: "#fff",
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            }}
                        >
                            {time}
                        </span>
                        ))}
                    </div>
                </div>
                </div>
            )}
            </div>

          ))}
        </div>
      ) : (
        <p>Không có suất chiếu nào trong ngày này.</p>
      )}
    </div>
  );
};

export default Detail;
