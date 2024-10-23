// components/Bottom/Bottom.js
import React from 'react';
import './Bottom.css';
import { FaFacebook, FaYoutube } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';

const Bottom = () => {
    return (
        <div className="bottom-container">
            <div className="icon-container">
                <a 
                    href="https://www.facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer" // Prevent security issues
                >
                    <FaFacebook className="social-icon" />
                </a>
                <a 
                    href="https://zalo.me" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <SiZalo className="social-icon" />
                </a>
                <a 
                    href="https://www.youtube.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <FaYoutube className="social-icon" />
                </a>
            </div>
            <div className="footer-text">
                <p>Cơ quan chủ quản: BỘ VĂN HÓA, THỂ THAO VÀ DU LỊCH</p>
                <p>Bản quyền thuộc Trung tâm Chiếu phim KCC.</p>
                <p>
                    Giấy phép số: 224/GP- TTĐT ngày 31/8/2010 - Chịu trách nhiệm:
                    Phạm Đăng Khoa – Giám đốc.
                </p>
                <p>Địa chỉ: 87 Láng Hạ, Quận Ba Đình, Tp. Hà Nội - Điện thoại: 024.35141791</p>
            </div>
        </div>
    );
};

export default Bottom;
