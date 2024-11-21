import * as React from 'react';
import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const baseUrl = "http://localhost:5122";

    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:5122/get-all')
            .then((response) => response.json())
            .then((data) => {
                // Map API data to the structure expected in the component
                const formattedData = data.map((movie) => ({
                    id: movie.id,
                    title: movie.name,
                    mImage: movie.movieImage,
                    bImage: movie.backgroundImage,
                }));
                setData(formattedData);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleMovie = (id) => {
        navigate(`/movie/${id}`);
        window.location.reload();
    };

    return (
        <>
            <div className='containerdiv'>
                <Carousel>
                    {data.slice(0, 8).map((movie, index) => (
                        <Carousel.Item key={index}>
                            <img
                                className="d-block w-100"
                                src={`${baseUrl}${movie.bImage}`}
                                alt={`Slide ${index + 1}`}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>

                <div className="container my-5 bg-black">
                    <div className="text-center mb-4">
                        <h1>PHIM ĐANG CHIẾU</h1>
                    </div>
                    <div className="row justify-content-center">
                        {data.map((item) => (
                            <div
                                className="col-6 col-md-4 col-lg-2"
                                key={item.id}
                                onClick={() => handleMovie(item.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="card mb-4">
                                    <img
                                        src={`${baseUrl}${item.mImage}`}
                                        className="card-img-top"
                                        alt={item.title}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
