import HeaderAdmin from "./HeaderAdmin";
import NavAdmin from "./NavAdmin";
import MainAdminContent from "./ContentAdmin/MainAdminContent";
import './admin.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import adminAvatar from '../Assets/admin.jpg'; // Import ảnh admin

function Admin() {
    // State để lưu trữ tiêu đề trang hiện tại
    const [currentSection, setCurrentSection] = useState('Tổng quan');
    // State để lưu thông tin người dùng admin
    const [adminUser, setAdminUser] = useState(null);

    // Lấy thông tin người dùng từ sessionStorage khi component được render
    useEffect(() => {
        const userDataString = sessionStorage.getItem('currentUser');
        if (userDataString) {
            try {
                const userData = JSON.parse(userDataString);
                setAdminUser(userData);
            } catch (error) {
                console.error("Lỗi khi đọc thông tin người dùng:", error);
            }
        }
    }, []);

    // Hàm xử lý khi menu thay đổi
    const handleMenuChange = (menuName) => {
        // Đặt tiêu đề trang dựa trên menu được chọn
        switch(menuName) {
            case 'dashboard':
                setCurrentSection('Tổng quan');
                break;
            case 'stories':
                setCurrentSection('Truyện');
                break;
            case 'categories':
                setCurrentSection('Thể loại');
                break;
            case 'users':
                setCurrentSection('Người dùng');
                break;
            case 'comments':
                setCurrentSection('Bình luận');
                break;
            default:
                setCurrentSection('Tổng quan');
        }
    };

    return (
        <div className="Admin">
            <div className='admin-header'>
                <HeaderAdmin />
                <NavAdmin onMenuChange={handleMenuChange} />
            </div>
            <div className='admin-content'>
                <div className="header-content">
                    <div className="HC-container">
                        <h2>{currentSection}</h2>
                        <div className="HC-user">
                            <span>{adminUser?.username || 'Admin'}</span>
                            <img 
                                src={adminAvatar} 
                                alt="Admin Avatar" 
                                className="admin-avatar"
                            />
                        </div>
                    </div>
                </div>
                <Routes>
                    <Route path='/admin' element={<MainAdminContent currentSection={currentSection} />} />
                </Routes>
            </div>
        </div>
    );
}

export default Admin;