import './Movie.css';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import CinemaSeat from './CinemaSeat';

const Movie = () => {
    const { id } = useParams();
    const [movieData, setMovieData] = useState(null);
    const baseUrl = "http://localhost:5122";
    const [showtimes, setShowtimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [showId, setShowId] = useState(null); 
    const [cinemaId, setCinemaId] = useState(null); 
    const [time, setTime] = useState(""); 
    const [censorData, setCensorData] = useState(null);

    // Gọi API để lấy dữ liệu phim
    useEffect(() => {
        fetch(`${baseUrl}/get/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setMovieData(data);
            })
            .catch((error) => console.error('Error fetching movie data:', error));
    }, [id]);

    useEffect(() => {
        if (movieData && movieData.censorId) { // Kiểm tra nếu movieData không null
            fetch(`${baseUrl}/get-censor/${movieData.censorId}`)
                .then((response) => response.json())
                .then((data) => {
                    setCensorData(data);
                })
                .catch((error) => console.error('Error fetching censor data:', error));
        }
    }, [movieData]);
    // Hàm gọi API showtimes
    const fetchShowtimes = async () => {
        try {
            const response = await axios.get(`http://localhost:5122/get-all-show-by-movieId/${id}`);
            const data = response.data;

            const groupedShowtimes = data.reduce((acc, show) => {
                const date = new Date(show.startTime);
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const hour = String(date.getHours()).padStart(2, "0");
                const minute = String(date.getMinutes()).padStart(2, "0");

                const dateKey = `${day}-${month}`; // Chỉ lấy ngày-tháng
                const time = `${hour}:${minute}`; // Giờ và phút

                if (!acc[dateKey]) {
                    acc[dateKey] = [];
                }
                acc[dateKey].push({ time, id: show.id, cinema:show.cinemaId }); 
                return acc;
            }, {});

            Object.keys(groupedShowtimes).forEach((dateKey) => {
                groupedShowtimes[dateKey].sort((a, b) => {
                    const [hourA, minuteA] = a.time.split(":").map(Number);
                    const [hourB, minuteB] = b.time.split(":").map(Number);
                    return hourA - hourB || minuteA - minuteB;
                });
            });

            const extractedDates = Object.keys(groupedShowtimes).sort((a, b) => {
                const [dayA, monthA] = a.split("-").map(Number);
                const [dayB, monthB] = b.split("-").map(Number);
                return new Date(2024, monthA - 1, dayA) - new Date(2024, monthB - 1, dayB);
            });

            setShowtimes({ dates: extractedDates, times: groupedShowtimes });

            if (extractedDates.length > 0) {
                setSelectedDate(extractedDates[0]);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    };

    useEffect(() => {
        fetchShowtimes();
    }, [id]);

    if (!movieData) {
        return <div>Loading...</div>;
    }

    const getWeekdayFromDate = (dateString) => {
        const [day, month, year] = dateString.split("-").map(Number);
        const date = new Date(year, month - 1, day);

        const weekdays = [
            "Chủ nhật",
            "Thứ hai",
            "Thứ ba",
            "Thứ tư",
            "Thứ năm",
            "Thứ sáu",
            "Thứ bảy"
        ];
        return weekdays[date.getDay()];
    }

    const handleShowtimeClick = (showtimeId, cinemaId, time) => {
        setShowId(showtimeId);
        setCinemaId(cinemaId);
        setTime(time)
    }

    const handleCancel = () => {
        setShowId(null);
        setCinemaId(null)
        setTime("")
    }

    return (
        <div>
            <div className="movie-details">
                <div className="background-overlay">
                    <img src={`${baseUrl}${movieData.backgroundImage}`} alt="Background Image" className="background-image" />
                </div>
                <div className="content-wrapper">
                    <div className="poster">
                        <img src={`${baseUrl}${movieData.movieImage}`} alt="Movie Poster" />
                    </div>
                    <div className="info">
                        <h1>{movieData.name}</h1>
                        <div className="details-inline">
                            <p><strong>Category:</strong> {movieData.category}</p>
                            <p><strong>Country:</strong> {movieData.country}</p>
                        </div>
                        <p><strong>Duration:</strong> {movieData.duration} minutes</p>
                        <p><strong>Director:</strong> {movieData.director}</p>
                        <p><strong>Actors:</strong> {movieData.actor}</p>
                        <p>{movieData.description}</p>
                        <p className="censor-info">
                            Kiểm duyệt: {censorData ? `${censorData.name}; ${censorData.description}` : "Đang tải..."}
                        </p>
                    </div>
                </div>
            </div>
            <div className="button-container">
                {showtimes.dates && showtimes.dates.length > 0 ? (
                    showtimes.dates.map((dateString, index) => {
                        const [day, month] = dateString.split("-"); // Tách ngày và tháng
                        return (
                            <button
                                key={index}
                                onClick={() => setSelectedDate(dateString)}
                                className={`button ${selectedDate === dateString ? "active" : ""}`}
                            >
                                <div>Th.{month}</div>
                                <h3><strong>{day}</strong></h3>
                                <div>
                                    {getWeekdayFromDate(`${day}-${month}-2024`)}
                                </div>
                            </button>
                        );
                    })
                ) : (
                    <p>Không có dữ liệu suất chiếu.</p>
                )}
            </div>

            {/* Hiển thị CinemaSeat nếu showId có giá trị */}
            {showId ? (
                <CinemaSeat id={showId} onCancel={handleCancel} cinemaId = {cinemaId} time = {time} /> // Thêm onCancel
            ) : (
                <div className="showtimes-container">
                    <div className="showtimesdiv">
                        {showtimes.times[selectedDate]?.map((showtime, index) => (
                            <span
                                key={index}
                                className="showtime"
                                onClick={() => handleShowtimeClick(showtime.id, showtime.cinema, showtime.time)} 
                            >
                                {showtime.time}
                            </span>
                        )) || <p>Không có suất chiếu.</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Movie;
