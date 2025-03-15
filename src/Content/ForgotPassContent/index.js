import React, { useState } from 'react';
import './ForgotPassContent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ForgotPassContent = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Xác thực email đơn giản
        if (!email) {
            setError('Vui lòng nhập địa chỉ email của bạn');
            return;
        }
        
        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Địa chỉ email không hợp lệ');
            return;
        }
        
        setIsSubmitting(true);
        setError('');
        
        // Giả lập gửi yêu cầu đặt lại mật khẩu
        setTimeout(() => {
            setIsSubmitting(false);
            setMessage('Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư đến.');
            
            // Xóa thông báo và chuyển về trang đăng nhập sau 5 giây
            setTimeout(() => {
                navigate('/login');
            }, 5000);
        }, 2000);
    };

    const handleBackToLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <>
            <div className="forgot-container">
                <div className="forgot-form-container">
                    <div className="form-header-3">
                        <h2>Quên mật khẩu</h2>
                    </div>
                    
                    {message && (
                        <div className="success-message">
                            <p>{message}</p>
                            <p className="redirect-message">Bạn sẽ được chuyển hướng về trang đăng nhập trong vài giây...</p>
                        </div>
                    )}
                    
                    {!message && (
                        <form onSubmit={handleSubmit}>
                            <div className='input-group'>
                                <h5>Email</h5>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Nhập email của bạn"
                                    value={email}
                                    onChange={handleChange}
                                    className={error ? 'invalid' : ''}
                                    required
                                />
                                {error && <div className="error-message">{error}</div>}
                            </div>
                            
                            <div className="form-actions">
                                <button
                                    type="submit"
                                    className="reset-button"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Đang xử lý...' : 'Gửi yêu cầu'}
                                </button>
                                
                                <button 
                                    className="back-button"
                                    onClick={handleBackToLogin}
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} /> Quay lại đăng nhập
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default ForgotPassContent;