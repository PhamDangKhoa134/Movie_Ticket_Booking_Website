import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ReturnPayment() {
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy query params từ URL
    const searchParams = new URLSearchParams(window.location.search);
    const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
    // const email = searchParams.get("email");
    // const seat = searchParams.get("seat");

    if (vnp_ResponseCode === "00") {
      // Thông báo thành công và chuyển hướng về trang /home
      alert("Thanh toán thành công!");
      navigate("/");
    } else {
      // Thông báo thất bại
      alert("Thanh toán thất bại! Vui lòng thử lại.");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <p>Đang xử lý thanh toán...</p>
    </div>
  );
}

export default ReturnPayment;

