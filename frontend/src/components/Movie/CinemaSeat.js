import React, { useState, useEffect } from 'react';

const CinemaSeat = (props) => {
    const [seats, setSeats] = useState([]);
    const [showDetails, setShowDetails] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // Fetch ghế
    useEffect(() => {
        const fetchSeats = async () => {
            const response = await fetch(`http://localhost:5122/get-all-seat-by-cinema/${props.cinemaId}`);
            const data = await response.json();
            setSeats(data);
        };

        fetchSeats();
    }, [props.cinemaId]);

    // Fetch thông tin suất chiếu
    useEffect(() => {
        const fetchShowDetails = async () => {
            const response = await fetch(`http://localhost:5122/get-all-show-cinema/${props.id}`);
            const data = await response.json();
            setShowDetails(data);
        };

        fetchShowDetails();
    }, [props.id]);

    // Tạo số ghế theo định dạng: A1, B2, C3,...
    const getSeatNumber = (row, column) => {
        const rowChar = String.fromCharCode(64 + row); // 65 là mã ASCII của 'A'
        return `${rowChar}${column}`;
    };

    // Kiểm tra trạng thái ghế có bị khóa hay không
    const isSeatAvailable = (cinemaHSId) => {
        const showDetail = showDetails.find(item => item.cinemaHSId === cinemaHSId);
        return showDetail ? showDetail.bookingId === 1 : true;
    };

    // Hàm để xử lý khi ghế được chọn
    const handleSeatClick = (seat) => {
        const showDetail = showDetails.find(item => item.cinemaHSId === seat.id);
        if (!isSeatAvailable(seat.id)) return; // Nếu ghế không có sẵn thì không thay đổi
    
        const isSelected = selectedSeats.includes(seat.id);
    
        // Nếu ghế là loại đôi (typeID = 3)
        let pairedSeat = null;
        if (seat.typeID === 3) {
            const pairedColumn = seat.seatColumn % 2 !== 0 ? seat.seatColumn + 1 : seat.seatColumn - 1;
            pairedSeat = seats.find(s => s.seatRow === seat.seatRow && s.seatColumn === pairedColumn);
            if (pairedSeat && !isSeatAvailable(pairedSeat.id)) {
                // Nếu ghế đôi liền kề không khả dụng thì không cho phép chọn
                alert("Ghế đôi liền kề không khả dụng.");
                return;
            }
        }
    
        if (isSelected) {
            // Nếu ghế đã được chọn, bỏ chọn ghế hiện tại và ghế đôi (nếu có)
            const newSelectedSeats = selectedSeats.filter(
                id => id !== seat.id && id !== (pairedSeat ? pairedSeat.id : null)
            );
            setSelectedSeats(newSelectedSeats);
            setTotalPrice(totalPrice - showDetail.price * (pairedSeat ? 2 : 1));
        } else {
            // Nếu ghế chưa được chọn, chọn ghế hiện tại và ghế đôi (nếu có)
            const newSelectedSeats = [
                ...selectedSeats,
                seat.id,
                ...(pairedSeat ? [pairedSeat.id] : [])
            ];
            setSelectedSeats(newSelectedSeats);
            setTotalPrice(totalPrice + showDetail.price * (pairedSeat ? 2 : 1));
        }
    };
    

    // Hàm để xác định màu sắc của ghế (giữ nguyên màu ghế thường, VIP, đôi, hoặc xanh khi được chọn)
    const getSeatColor = (seat) => {
        if (!isSeatAvailable(seat.id)) {
            return 'gray'; // Ghế bị khóa (gray)
        }

        // Nếu ghế được chọn thì chuyển sang màu xanh dương
        const isSelected = selectedSeats.includes(seat.id);
        if (isSelected) {
            return '#3b82f6'; // Màu xanh dương khi chọn
        }

        // Các màu sắc cho các loại ghế
        switch (seat.typeID) {
            case 1: return '#252a31';  // Ghế thường
            case 2: return 'orange';  // Ghế VIP
            case 3: return 'red';  // Ghế đôi
            default: return 'white'; // Mặc định cho các ghế khác
        }
    };

    // Tạo sơ đồ ghế
    const renderSeats = () => {
        let seatMap = [];
        seats.forEach(seat => {
            const { seatRow, seatColumn, typeID, id, cinemaHSId, price } = seat;
            if (!seatMap[seatRow]) seatMap[seatRow] = [];
            seatMap[seatRow][seatColumn] = { typeID, id, seatRow, seatColumn, cinemaHSId, price };
        });

        return seatMap.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex' }}>
                {row.map((seat, columnIndex) => (
                    <div
                        key={columnIndex}
                        style={{
                            width: 40,
                            height: 40,
                            margin: 3,
                            backgroundColor: getSeatColor(seat),
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            borderRadius: '5px',
                            fontSize: '14px',
                            cursor: isSeatAvailable(seat.id) ? 'pointer' : 'not-allowed',
                        }}
                        onClick={() => handleSeatClick(seat)}
                    >
                        {isSeatAvailable(seat.id) ? getSeatNumber(rowIndex, columnIndex) : 'X'}
                    </div>
                ))}
            </div>
        ));
    };

    const handlePayment = async  () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Vui lòng đăng nhập để thanh toán.');
            return;
        }

        for (const seat of selectedSeats) {
            const response = await fetch(
                `http://localhost:5122/update-show-cinema?CinemaHSId=${seat}&BookingId=2`,
                {
                    method: 'PUT'
                    // headers: {
                    //     'Content-Type': 'application/json',
                    //     Authorization: `Bearer ${token}`, // Nếu cần JWT
                    // },
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to update seat ${seat}`);
            }
        }

        // Chuyển hướng sang trang /payment với các tham số
        const url = `/payment?cinemaId=${props.cinemaId}&showId=${props.id}&price=${totalPrice}&seats=${selectedSeats.join(',')}`;
        window.location.href = url;
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Phòng chiếu số {props.cinemaId}</h2>
            <p>Suất chiếu: {props.time}</p>
            
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {renderSeats()}
            </div>

            {/* Chú thích các màu ghế */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <p><span style={{ backgroundColor: '#252a31', color: 'white', borderRadius: '5px', padding: "10px 20px" }}></span>- Ghế thường</p>
                <p><span style={{ backgroundColor: 'orange', color: 'white', borderRadius: '5px', padding: "10px 20px" }}></span>- Ghế VIP</p>
                <p><span style={{ backgroundColor: 'red', color: 'white', borderRadius: '5px', padding: "10px 20px" }}></span>- Ghế đôi</p>
                <p><span style={{ backgroundColor: '#3b82f6', color: 'white', borderRadius: '5px', padding: "10px 20px" }}></span>- Ghế đã chọn</p>
                <p><span style={{ backgroundColor: 'gray', color: 'white', borderRadius: '5px', padding: "10px 20px" }}></span>- Ghế bị khóa</p>
            </div>
            
            <div style={{ margin: '10px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ marginRight: '500px' }}>
                    <p>Tổng tiền: {totalPrice.toFixed(3)} VND</p>
                </div>
                <div>
                    <button onClick={props.onCancel} style={{ marginRight: '10px', color: 'white', backgroundColor: 'black', borderRadius: '10px', borderColor: 'white', padding: '8px 32px' }}>Cancel</button>
                    <button
                        onClick={handlePayment}
                        style={{
                            marginRight: '10px',
                            color: 'white',
                            backgroundColor: selectedSeats.length > 0 ? '#ec2a31' : 'gray',
                            borderRadius: '10px',
                            borderColor: 'white',
                            padding: '8px 32px',
                            cursor: selectedSeats.length > 0 ? 'pointer' : 'not-allowed',
                        }}
                        disabled={selectedSeats.length === 0}
                    >
                        Thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CinemaSeat;
