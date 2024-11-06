import React, { useEffect, useState } from "react";
import "./TicketPrice.css";

// Define color mapping based on seat name
const getSeatColor = (seatName) => {
    switch (seatName) {
        case "Ghế thường": return "#FFFFFF";
        case "Ghế VIP": return "#FF8413";
        case "Ghế đôi": return "#EF4444";
        default: return "#FFFFFF";
    }
};

const TicketPrice = () => {
    const [seatTypes, setSeatTypes] = useState([]);

    useEffect(() => {
        // Fetch seat types
        fetch("http://localhost:5122/get-all-type-seat")
            .then(response => response.json())
            .then(data => setSeatTypes(data))
            .catch(error => console.error("Error fetching seat types:", error));
    }, []);

    const timeSlots = [
        { label: "Trước 12h", increase: 0 },
        { label: "Từ 12:00 đến trước 17:00", increase: 10 },
        { label: "Từ 17:00 đến trước 23:00", increase: 20 },
        { label: "Từ 23:00", increase: 5 },
    ];

    return (
        <div className="ticket-container">
            <h2 className="text-h2">Giá vé xem phim</h2>
            <table className="ticket-price-table">
                <thead>
                    <tr>
                        <th>Thời gian</th>
                        <th colSpan="3">Từ thứ 2 đến thứ 5</th>
                        <th colSpan="3">Thứ 6, 7, CN và ngày Lễ</th>
                    </tr>
                    <tr>
                        <th></th>
                        {seatTypes.map(seat => (
                            <th key={`weekdays-${seat.id}`} style={{ color: getSeatColor(seat.name) }}>{seat.name}</th>
                        ))}
                        {seatTypes.map(seat => (
                            <th key={`weekends-${seat.id}`} style={{ color: getSeatColor(seat.name) }}>{seat.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map((slot, idx) => (
                        <tr key={`time-slot-${idx}`}>
                            <td>{slot.label}</td>
                            {seatTypes.map(seat => (
                                <td key={`weekdays-price-${seat.id}-${idx}`} style={{ color: getSeatColor(seat.name) }}>
                                    {seat.price + slot.increase}.000đ
                                </td>
                            ))}
                            {seatTypes.map(seat => (
                                <td key={`weekends-price-${seat.id}-${idx}`} style={{ color: getSeatColor(seat.name) }}>
                                    {seat.holidayPrice + slot.increase}.000đ
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="luu-y">
                    <h6 className="text-h6">* Giá vé đối với các đối tượng khán giả ưu tiên (khi trực tiếp sử dụng dịch vụ xem phim tại rạp chiếu phim):</h6>
                    <p>- Giảm 20% giá vé theo qui định đối với: Trẻ em (người dưới 16 tuổi), người cao tuổi (công dân Việt Nam từ đủ 60 tuổi trở lên), người có công với cách mạng, người có hoàn cảnh đặc biệt khó khăn.<br/>
                    - Giảm 50% giá vé theo qui định đối với: Người khuyết tật nặng.<br />
                    - Giảm giá vé 100% đối với: Người khuyết tật đặc biệt nặng, trẻ em dưới 0.7m đi kèm với người lớn.</p>

                    <h6 className="text-h6">Điều kiện:</h6>
                    <p>
                    - Chỉ áp dụng khi mua vé tại quầy (không áp dụng khi mua online).<br/>
                    - Các đối tượng khán giả trên phải xuất trình giấy tờ chứng minh khi mua vé xem phim và trước khi vào phòng chiếu. Cụ thể:<br/>
                    + Trẻ em (trường hợp trẻ em từ 14-16 tuổi), người cao tuổi: xuất trình "Căn cước công dân".<br/>
                    + Người có công với cách mạng: xuất trình giấy xác nhận theo quy định.<br/>
                    + Người có hoàn cảnh đặc biệt khó khăn: xuất trình "Giấy chứng nhận hộ nghèo".<br/>
                    + Người khuyết tật: xuất trình "Giấy xác nhận khuyết tật".
                    </p>

                    <h6 className="text-h6">* Ưu đãi cho học sinh, sinh viên từ 22 tuổi trở xuống: Đồng giá 55.000đ /vé 2D cho tất cả các suất chiếu phim từ Thứ 2 đến Thứ 6 (chỉ áp dụng cho hình thức mua vé trực tiếp tại quầy, không áp dụng với ghế đôi; Mỗi thẻ được mua 1 vé/ngày và vui lòng xuất trình thẻ U22 kèm thẻ HSSV khi mua vé).</h6>

                    <h6 className="text-h6">* Khán giả nghiêm túc thực hiện xem phim đúng độ tuổi theo phân loại phim: P, K, T13, T16, T18, C. (Trường hợp vi phạm sẽ xử phạt theo Quy định tại Nghị định 128/2022/NĐ-CP ngày 30/12/2022).</h6>

                    <h6 className="text-h6">* Không bán vé cho trẻ em dưới 13 tuổi đối với các suất chiếu phim kết thúc sau 22h00 và không bán vé cho trẻ em dưới 16 tuổi đối với các suất chiếu phim kết thúc sau 23h00.</h6>

                    <h6 className="text-h6">* Áp dụng giá vé ngày Lễ, Tết cho các ngày:</h6>
                    <p>- Các ngày nghỉ Lễ, Tết theo quy định của nhà nước: Tết Nguyên Đán, Tết Dương Lịch, ngày Giỗ Tổ Hùng Vương 10/3 AL, ngày 30/4, 1/5, 2/9.<br/>
                    - Các ngày: 14/2, 8/3, 24/12.<br/>
                    - Các ngày: Nghỉ bù do nghỉ Lễ, Tết trùng vào thứ 7, Chủ Nhật.
                    </p>

                    <h6 className="text-h6">* Không áp dụng các chế độ ưu đãi, các chương trình khuyến mại khác vào các ngày 20/10, 20/11, Halloween 31/10, các ngày Lễ, Tết, suất chiếu sớm và suất chiếu đặc biệt.</h6>
                    
                    <h6 className="text-h6">* Mua vé xem phim tập thẻ, hợp đồng khoán gọn: Phòng chiếu phim - (024) 35148647.</h6>

                    <h6 className="text-h6">* Thuê phòng tổ chức Hội nghị, làm văn phòng, quảng cáo và các dịch vụ khác: Phòng Dịch vụ - (024) 35142856</h6>

                    <p>ĐỀ NGHỊ QUÝ KHÁN GIẢ LƯU Ý KHI MUA VÉ XEM PHIM (ĐẶC BIỆT KHI MUA VÉ ONLINE). TTCPQG KHÔNG CHẤP NHẬN HOÀN TIỀN HOẶC ĐỔI VÉ ĐÃ THANH TOÁN THÀNH CÔNG KHI MUA VÉ ONLINE VÀ VÉ MUA SAI QUY ĐỊNH TẠI QUẦY VÉ.</p>

                    <p>
                    Rất mong Quý khán giả phối hợp thực hiện.<br/>
                    Xin trân trọng cảm ơn!
                    </p>
            </div>
        </div>
    );
}

export default TicketPrice;
