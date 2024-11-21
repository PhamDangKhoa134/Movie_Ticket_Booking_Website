import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Bạn cần đăng nhập để truy cập trang này.');
        return <Navigate to="/" replace />;
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;