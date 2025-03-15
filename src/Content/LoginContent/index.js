import './LoginContent.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function LoginContent() {
    // State để chuyển đổi hiển thị mật khẩu
    const [showPassword, setShowPassword] = useState(false);
    
    // State để quản lý dữ liệu form
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    // State để hiển thị thông báo lỗi
    const [error, setError] = useState('');
    
    // State để hiển thị trạng thái đang xử lý
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Hook để điều hướng chương trình
    const navigate = useNavigate();
    
    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Xóa thông báo lỗi khi người dùng thay đổi nội dung
        setError('');
    };
    
    // Danh sách tài khoản có sẵn
    const predefinedAccounts = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'user', password: 'user123', role: 'user' }
    ];
    
    // Xử lý submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        
        const { username, password } = formData;
        
        // Kiểm tra nếu trường rỗng
        if (!username || !password) {
            setError('Vui lòng nhập đầy đủ thông tin');
            setIsSubmitting(false);
            return;
        }
        
        // Kiểm tra thông tin đăng nhập
        setTimeout(() => {
            const account = predefinedAccounts.find(acc => 
                acc.username === username && acc.password === password
            );
            
            if (account) {
                // Lưu thông tin người dùng vào sessionStorage
                sessionStorage.setItem('currentUser', JSON.stringify({
                    username: account.username,
                    role: account.role
                }));
                
                // Phát sự kiện để thông báo thay đổi trạng thái đăng nhập
                window.dispatchEvent(new CustomEvent('login-status-changed'));
                
                // Chuyển hướng dựa trên vai trò
                if (account.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            } else {
                setError('Tên đăng nhập hoặc mật khẩu không chính xác');
                setIsSubmitting(false);
            }
        }, 1000); // Giả lập thời gian xử lý đăng nhập
    };
    
    // Chuyển đổi hiển thị mật khẩu
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Xử lý điều hướng đến trang đăng ký
    const handleRegister = (e) => {
        e.preventDefault();
        navigate('/register');
    };

    // Xử lý điều hướng đến trang quên mật khẩu
    const handleForgotPass = (e) => {
        e.preventDefault();
        navigate('/forgotPass');
    };

    return (
        <>
            <div className='login-content'>
                <div className='login-form'>
                    <div className="form-header">
                        <h1>Đăng nhập</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {error && <div className="error-alert">{error}</div>}
                        
                        <div className="input-group">
                            <h5>Tên tài khoản</h5>
                            
                            <input 
                                type='text' 
                                id='username' 
                                name='username' 
                                placeholder='Tên đăng nhập'
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="input-group">
                            <h5>Mật khẩu</h5>
                            
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                id='password' 
                                name='password' 
                                placeholder='Mật khẩu'
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <div 
                                className="password-toggle" 
                                onClick={togglePasswordVisibility}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </div>
                        </div>
                        
                        <div className="login-info">
                            <div className="test-accounts">
                                <p>Tài khoản thử nghiệm:</p>
                                <p>- Admin: admin / admin123</p>
                                <p>- User: user / user123</p>
                            </div>
                        </div>
                        
                        <div className="other-options">
                            <a href="#" onClick={handleForgotPass}>Quên mật khẩu?</a>
                            <a href="#" onClick={handleRegister}>Đăng ký</a>
                        </div>

                        <div style={{display: 'flex',justifyContent: 'center', alignContent: 'center' }}>
                            <button 
                                type='submit' 
                                className="login-button" 
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginContent;