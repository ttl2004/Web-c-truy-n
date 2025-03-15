import logo from '../Assets/logo.png';
import './Center.css';
import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../Assets/anhdaidien.png';

function Center(){
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const css = {
        backgroundColor: '#F43F5E',
        width: '100%',
        maxWidth: '930px',
        gridColumn: '2 / 3',
        display: 'grid',
        gridTemplateColumns: '3fr 2fr 1fr',
        justifyContent: 'space-between',
        alignItems: 'center',
        position : 'relative',
    };

    const dropdownStyle = {
        position: 'absolute',
        top: '100%',
        right: 30,
        backgroundColor: 'white',
        border: '2px solid #F43F5E',
        borderRadius: '7px 0px 7px 14px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: 10,
        width: '140px',  // Tăng độ rộng để có đủ chỗ cho mục truyện theo dõi
        display: isDropdownOpen ? 'block' : 'none',
    };

    const dropdownItemStyle = {
        padding: '10px 15px',
        cursor: 'pointer',
        borderBottom: '1px solid #ffffff',
        borderRadius: '0px 0px 7px 14px',
    };

    // Kiểm tra người dùng đã đăng nhập từ sessionStorage
    useEffect(() => {
        // Hàm kiểm tra đăng nhập - có thể gọi lại khi cần
        const checkLoginStatus = () => {
            const userDataString = sessionStorage.getItem('currentUser');
            if (userDataString) {
                try {
                    const userData = JSON.parse(userDataString);
                    setCurrentUser(userData);
                } catch (error) {
                    console.error('Lỗi khi đọc dữ liệu đăng nhập:', error);
                    setCurrentUser(null);
                }
            } else {
                setCurrentUser(null);
            }
        };
        
        // Kiểm tra khi component được tạo
        checkLoginStatus();
        
        // Đăng ký sự kiện lắng nghe thay đổi sessionStorage
        const handleStorageChange = (e) => {
            if (e.key === 'currentUser') {
                checkLoginStatus();
            }
        };
        
        // Lắng nghe sự kiện storage
        window.addEventListener('storage', handleStorageChange);
        
        // Lắng nghe sự kiện tùy chỉnh để cập nhật trạng thái đăng nhập
        const handleLoginEvent = () => {
            checkLoginStatus();
        };
        
        window.addEventListener('login-status-changed', handleLoginEvent);
        
        // Cleanup khi unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('login-status-changed', handleLoginEvent);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Xử lý đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest('.user')) {
                setIsDropdownOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    // Xử lý đăng xuất
    const handleLogout = () => {
        // Xóa dữ liệu người dùng từ sessionStorage
        sessionStorage.removeItem('currentUser');
        
        // Cập nhật state
        setCurrentUser(null);
        setIsDropdownOpen(false);
        
        // Phát sự kiện để các component khác biết trạng thái đăng nhập đã thay đổi
        window.dispatchEvent(new CustomEvent('login-status-changed'));
        
        // Điều hướng về trang chủ
        navigate('/');
    };

    return(
        <>
            <div style={css}>
                <div className="logo">
                    <img src={logo} alt="logo" />
                    <span>TopTruyen</span>
                </div>
                <div className='icons'>
                    <i className="fa-regular fa-moon"></i>
                    <i className="fa-regular fa-bell"></i>
                </div>
                <div className='user' onClick={toggleDropdown}>
                    {currentUser ? (
                        // Hiển thị khi đã đăng nhập
                        <>
                            <span>{currentUser.username}</span>
                            <img src={avatar} alt="avatar" />
                        </>
                    ) : (
                        // Hiển thị khi chưa đăng nhập
                        <>
                            <span>Tài khoản</span>
                            <i className="fa-regular fa-circle-user"></i>
                        </>
                    )}

                    <div style={dropdownStyle}>
                        {currentUser ? (
                            // Menu dropdown cho người dùng đã đăng nhập
                            <>
                                <div style={dropdownItemStyle} className='dropdownUser'>
                                    <i className="fa-light fa-user"></i>
                                    <Link to="/profile" style={{textDecoration: 'none'}}><span>Thông tin cá nhân</span></Link>
                                </div>
                                
                                {/* Thêm tùy chọn truyện theo dõi */}
                                <div style={dropdownItemStyle} className='dropdownUser'>
                                    <i className="fa-light fa-bookmark"></i>
                                    <Link to="/follow" style={{textDecoration: 'none'}}><span>Truyện theo dõi</span></Link>
                                </div>   
                                <div 
                                    style={dropdownItemStyle} 
                                    className='dropdownUser'
                                    onClick={handleLogout}
                                >
                                    <i className="fa-light fa-arrow-right-from-bracket"></i>
                                    <span>Đăng xuất</span>
                                </div>
                            </>
                        ) : (
                            // Menu dropdown cho người dùng chưa đăng nhập
                            <>
                                <div style={dropdownItemStyle} className='dropdownUser'>
                                    <i className="fa-light fa-user"></i>
                                    <Link to="/login" style={{textDecoration: 'none'}}><span>Đăng nhập</span></Link>
                                </div>
                                <div style={dropdownItemStyle} className='dropdownUser'>
                                    <i className="fa-light fa-user-plus"></i>
                                    <Link to="/register" style={{textDecoration: 'none'}}><span>Đăng ký</span></Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Center;