import * as React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import home_1 from '../../Image/TrangChu/0017896.jpg';
import home_2 from '../../Image/TrangChu/0017898.jpg';
import home_3 from '../../Image/TrangChu/0017900.jpg';
import home_4 from '../../Image/TrangChu/0017902.jpg';
import movie_1 from '../../Image/AnhPhim/0017667_0.jpg';
import movie_2 from '../../Image/AnhPhim/0017787_0.jpg';
import movie_3 from '../../Image/AnhPhim/0017860_0.jpg';
import movie_4 from '../../Image/AnhPhim/0017920_0.jpg';
import movie_5 from '../../Image/AnhPhim/0017939_0.jpg';
import './Home.css'; 

const Home = () => {
    const navigate = useNavigate();

    const handleCourse = (id) => {
        navigate(`/course/${id}`);  // Chuyển hướng đến trang chi tiết với ID khóa học
    };

    const data = [
        { id: 1, title: 'VENOM: THE LAST DANCE-T13', image: movie_1 },
        { id: 2, title: 'NGÀY XƯA CÓ MỘT CHUYỆN TÌNH - T16', image: movie_2 },
        { id: 3, title: 'CÔ DÂU HÀO MÔN- T18', image: movie_3 },
        { id: 4, title: 'TEE YOD: QUỶ ĂN TẠNG PHẦN 2-T18', image: movie_4 },
        { id: 5, title: 'AN LẠC-K', image: movie_5 },
        { id: 6, title: 'VENOM: THE LAST DANCE-T13', image: movie_1 },
        { id: 7, title: 'VENOM: THE LAST DANCE-T13', image: movie_1 },
        { id: 8, title: 'VENOM: THE LAST DANCE-T13', image: movie_1 },
        { id: 9, title: 'VENOM: THE LAST DANCE-T13', image: movie_1 },
        { id: 10, title: 'VENOM: THE LAST DANCE-T13', image: movie_1 },

    ];

    return (
        <>
            <div className='containerdiv'>
                <Carousel>
                    <Carousel.Item>
                        <img className="d-block w-100" src={home_1} alt="First slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={home_2} alt="First slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={home_3} alt="First slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={home_4} alt="First slide" />
                    </Carousel.Item>
                </Carousel>

                <div className="container my-5">
                    <div className="text-center mb-4">
                        <h1>PHIM ĐANG CHIẾU</h1>
                    </div>
                    <div className="row justify-content-center">
                        {data.map((item) => (
                            <div 
                                className="col-6 col-md-4 col-lg-2" 
                                key={item.id}
                                onClick={() => handleCourse(item.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="card mb-4">
                                    <img src={item.image} className="card-img-top" alt={item.title} />
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