import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Showtimes.css";
import Detail from "./Detail"

const Showtimes = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  // Hàm gọi API
  const fetchShowtimes = async () => {
    try {
      const response = await axios.get("http://localhost:5122/get-all-show");
      const data = response.data;
  
      // Trích xuất ngày tháng năm từ startTime
      const extractedDates = Array.from(
        new Set(
          data.map((show) => {
            const date = new Date(show.startTime);
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
          })
        )
      );
  
      // Sắp xếp theo thứ tự từ nhỏ đến lớn
      extractedDates.sort((a, b) => {
        const [dayA, monthA, yearA] = a.split("-").map(Number);
        const [dayB, monthB, yearB] = b.split("-").map(Number);
        return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
      });
  
      setShowtimes(extractedDates);
  
      // Set ngày đầu tiên làm mặc định nếu danh sách tồn tại
      if (extractedDates.length > 0) {
        setSelectedDate(extractedDates[0]);
        console.log(extractedDates[0]);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  useEffect(() => {
    fetchShowtimes();
  }, []);

  return (
    <div className="containerdiv">
      <h3 className="title">🎬 Phim đang chiếu</h3>
      <div className="button-container">
        {showtimes.map((date, index) => (
          <button
            key={index}
            onClick={() => setSelectedDate(date)}
            className={`button ${ selectedDate === date ? "active" : ""}`}
          >
            {date}
          </button>
        ))}
      </div>
      <p className="note">
        Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và
        khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
      </p>
      <Detail
        date = {selectedDate}
      />
    </div>
  );
};

export default Showtimes;
