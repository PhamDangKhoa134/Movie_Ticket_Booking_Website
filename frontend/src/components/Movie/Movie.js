import './Movie.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Movie = () => {
    const { id } = useParams();
    const [movieData, setMovieData] = useState(null);
    const baseUrl = "http://localhost:5122";

    useEffect(() => {
        // Gọi API để lấy dữ liệu phim
        fetch(`${baseUrl}/get/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setMovieData(data);
            })
            .catch((error) => console.error('Error fetching movie data:', error));
    }, [id]);

    if (!movieData) {
        return <div>Loading...</div>; 
    }

    return (
        <div class="movie-details">
            <div class="background-overlay">
                <img src={`${baseUrl}${movieData.backgroundImage}`} alt="Background Image" class="background-image" />
            </div>
            <div class="content-wrapper">
                <div class="poster">
                    <img src={`${baseUrl}${movieData.movieImage}`} alt="Movie Poster" />
                </div>
                <div class="info">
                    <h1>{movieData.name}</h1>
                    <div class="details-inline">
                        <p><strong>Category:</strong> {movieData.category}</p>
                        <p><strong>Country:</strong> {movieData.country}</p>
                    </div>
                    <p><strong>Duration:</strong> {movieData.duration} minutes</p>
                    <p><strong>Director:</strong> {movieData.director}</p>
                    <p><strong>Actors:</strong> {movieData.actor}</p>
                    <p>{movieData.description}</p>
                    <p class="censor-info">Kiểm duyệt: T13; Phim được phổ biến đến khán giả từ đủ 13 tuổi trở lên;</p>
                </div>
            </div>
        </div>

    );
};

export default Movie;
