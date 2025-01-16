import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "./Payment.css"
import QR from "../../Image/QR.png"
import Table from 'react-bootstrap/Table';
import { jwtDecode } from "jwt-decode";

const Payment = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const cinemaId = queryParams.get('cinemaId');
    const showId = queryParams.get('showId');
    const price = queryParams.get('price') * 1000;
    const seats = queryParams.get('seats')?.split(',');

    const [showDetails, setShowDetails] = useState({});
    const [movieName, setMovieName] = useState('');
    const [seatLocations, setSeatLocations] = useState([]);
    const [userId, setUserId] = useState(null);

    const convertRowToLetter = (rowNumber) => String.fromCharCode(64 + rowNumber);

    const [formUserData, setFormUserData] = useState({
        LastName: "",
        FirstName: "",
        Email: "",
      });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const decodedToken = jwtDecode(token); // Sử dụng jwtDecode thay vì jwt_decode
            setUserId(decodedToken.Id)
          } catch (error) {
            console.error("Token không hợp lệ", error);
            localStorage.removeItem('token'); // Xóa token nếu không hợp lệ
          }
        }
      }, []);

      useEffect(() => {
        if (userId) {
          axios
            .get(`http://localhost:5122/get-user/${userId}`)
            .then((response) => {
              const data = response.data;
              setFormUserData({
                LastName: data.lastName,
                FirstName: data.firstName,
                Email: data.email,
              });
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
        }
      }, [userId]);

    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5122/get-show/${showId}`);
                setShowDetails(response.data);

                const movieResponse = await axios.get(`http://localhost:5122/get/${response.data.movieId}`);
                setMovieName(movieResponse.data.name);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin show hoặc phim:', error);
            }
        };

        fetchShowDetails();
    }, [showId]);

    useEffect(() => {
        const fetchSeatsDetails = async () => {
            try {
                const seatDataPromises = seats.map(seatId =>
                    axios.get(`http://localhost:5122/get-seat/${seatId}`)
                );
                const seatResponses = await Promise.all(seatDataPromises);

                const formattedSeats = seatResponses.map(res => {
                    const rowLetter = convertRowToLetter(res.data.seatRow);
                    return `${rowLetter}${res.data.seatColumn}`;
                });

                setSeatLocations(formattedSeats);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin ghế:', error);
            }
        };

        if (seats && seats.length > 0) {
            fetchSeatsDetails();
        }
    }, [seats]);

    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    const handleCancel = async () => {
        const confirmCancel = window.confirm("Bạn có chắc chắn muốn hủy đặt vé?");
        if (!confirmCancel) return;
        try {
            // Lặp qua từng ghế và gửi yêu cầu cập nhật trạng thái
            for (const seat of seats) {
                const response = await fetch(
                    `http://localhost:5122/update-show-cinema?CinemaHSId=${seat}&BookingId=1`,
                    {
                        method: 'PUT',
                    }
                );
    
                if (!response.ok) {
                    throw new Error(`Failed to update seat ${seat}`);
                }
            }
    
            // Nếu thành công, quay lại trang trước
            window.history.back();
            alert('Đặt vé đã bị hủy.');
        } catch (error) {
            console.error('Lỗi khi hủy đặt vé:', error);
            alert(`Lỗi khi hủy đặt vé: ${error.message}`);
        }
        
    };

    const handlePayment = async () => {
        if (!userId) {
            alert('Vui lòng đăng nhập để tiếp tục.');
            return;
        }
    
        try {
            // 1. Gửi yêu cầu tạo booking
            const createBookingResponse = await axios.post('http://localhost:5122/create-booking', {
                createOn: new Date().toISOString(), // Ngày giờ hiện tại
                userId: userId, // ID người dùng
                totalPrice: price, // Tổng tiền
            });
    
            // Kiểm tra phản hồi từ API
            const bookingData = createBookingResponse.data?.data;
            if (!bookingData?.id) {
                throw new Error('Không thể tạo booking, vui lòng thử lại.');
            }
    
            const bookingId = bookingData.id; // Lấy ID của booking vừa tạo
    
            // 2. Cập nhật từng ghế với bookingId
            for (const seat of seats) {
                const updateSeatResponse = await axios.put(
                    `http://localhost:5122/update-show-cinema?CinemaHSId=${seat}&BookingId=${bookingId}`
                );
    
                if (!updateSeatResponse?.status === 200) {
                    throw new Error(`Không thể cập nhật trạng thái ghế: ${seat}`);
                }
            }

            const createSendResponse = await axios.post('http://localhost:5122/send', {
                toEmail: formUserData.Email,
                subject: "ĐẶT VÉ THÀNH CÔNG",
                body: `Xin chào, ${formUserData.LastName} ${formUserData.FirstName},
            
            Quý khách đã đặt vé thành công. Chi tiết đặt vé:
            - Phim: ${movieName}
            - Ghế: ${seatLocations.join(', ')}
            - Ngày chiếu: ${new Date(showDetails.startTime).toLocaleDateString()}
            - Giờ chiếu: ${formatTime(showDetails.startTime)}
            - Tổng tiền: ${price}đ
            
            Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi.`,
            });

            const sendData = createSendResponse.data?.data;
            if (sendData?.id) {
                throw new Error('Không thể gửi, vui lòng thử lại.');
            }
    
            // // 3. Hiển thị thông báo thành công
            // alert('Thanh toán thành công! Vé đã được đặt. Email xác nhận đã được gửi.');
            // window.location.href = '/'; // Chuyển hướng về trang chủ

            const response = await fetch("http://localhost:5122/api/Payment/create-payment-url", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  OrderId: bookingId, // Đổi thành giá trị thực tế
                  Amount: price, // Số tiền
                  OrderDesc: formUserData.Email, // Email
                  OrderType: "vnpay", // Loại đơn hàng
                //   Email: formUserData.Email,
                //   Seat: seatLocations.join(', '),
                }),
              });
              if (!response.ok) {
                throw new Error("Không thể tạo URL thanh toán");
              }
        
              const data = await response.json();
        
              // Kiểm tra nếu có `paymentUrl`
              if (data.paymentUrl) {
                window.location.href = data.paymentUrl; // Điều hướng đến URL trả về
              } else {
                throw new Error("URL thanh toán không tồn tại");
              }
        } catch (error) {
            console.error('Lỗi khi thanh toán:', error.response?.data || error.message);
            alert(`Lỗi khi thanh toán: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="payment-page">
            <div className="info-section">
                <div className="movie-info">
                    <h2>Thông tin phim</h2>
                    <Table variant = "dark" className='table-custom'>
                        <tbody>
                            <tr>
                            <td>Phim<br/> <strong>{movieName}</strong> </td>
                            <td></td>
                            </tr>
                            <tr>
                                <td>Ngày giờ chiếu <br/> <strong><span>{formatTime(showDetails.startTime)}</span> - {new Date(showDetails.startTime).toLocaleDateString()}</strong> </td>
                                <td>Ghế <br/><strong>{seatLocations.join(', ')}</strong> </td>
                            </tr>
                            <tr>
                                <td>Định dạng <br/><strong>2D</strong></td>
                                <td>Phòng chiếu <br/><strong>{cinemaId} </strong></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="payment-info">
                    <h2>Thông tin thanh toán</h2>
                    <Table className="table-custom" variant = "dark">
                        <thead>
                            <tr>
                            <th>Danh mục</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Ghế ({seatLocations.join(', ')})</td>
                            <td>{seats?.length || 0}</td>
                            <td>{price}đ</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
            <div className="qr-section">
                <h2>Quét mã thanh toán VietQR</h2>
                <div className="qr-code">
                    <img src={QR} alt="QR Code" />
                </div>
                <div className="order-info">
                    <Table className="table-custom1" variant = "dark">
                        <tbody>
                            <tr>
                                <td><strong>Số tiền thanh toán:</strong></td>
                                <td>{price}.000đ</td>
                            </tr>
                            <tr>
                                <td><strong>Tên tài khoản:</strong></td>
                                <td>TRUNG TÂM CHIẾU PHIM KCC</td>
                            </tr>
                            <tr>
                                <td><strong>Ngân hàng:</strong></td>
                                <td>TMCP Quân Đội</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className='row'>
                    <button onClick={()=>handleCancel()} style={{ marginRight: '10px', color: 'white', backgroundColor: 'black', borderRadius: '40px', padding: '8px 32px' }}>Cancel</button>
                        <button
                            onClick={()=>{handlePayment()}}
                            style={{
                                marginTop: "10px",
                                color: 'white',
                                backgroundColor: '#ec2a31',
                                borderRadius: '40px',
                                padding: '8px 32px',
                                cursor: 'pointer',
                            }}
                        >
                            Thanh toán
                        </button>
                </div>
                    
            </div>
        </div>
    );
};

export default Payment;
