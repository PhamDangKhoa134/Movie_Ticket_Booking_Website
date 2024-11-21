import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const ProtectedRouteAuth = ({ element: Component, ...rest }) => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true); // Thêm trạng thái loading

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setRole(decodedToken.Roles);
            } catch (error) {
                console.error("Token không hợp lệ", error);
                localStorage.removeItem('token');
            }
        }
        setLoading(false); // Dừng trạng thái loading sau khi hoàn tất
    }, []);

    if (loading) {
        return <div>Đang kiểm tra quyền truy cập...</div>; // Hiển thị trạng thái chờ
    }

    if (role !== "admin") {
        alert('Bạn không có quyền để truy cập trang này.');
        return <Navigate to="/" replace />;
    }

    return <Component {...rest} />;
};

export default ProtectedRouteAuth;
