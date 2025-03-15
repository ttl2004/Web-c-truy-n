import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterContent.css';

const RegisterContent = () => {
  // Khai báo trạng thái lưu trữ dữ liệu từ form nhập (tên, email, tên tài khoản, mật khẩu)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });

  // Khai báo trạng thái để lưu trữ các lỗi nhập liệu
  const [errors, setErrors] = useState({});

  // Khai báo trạng thái để theo dõi xem form đang được gửi đi hay không
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hook điều hướng để chuyển trang khi cần thiết
  const navigate = useNavigate();

  // Hàm xử lý khi người dùng nhập dữ liệu vào các ô input
  const handleChange = (e) => {
    const { name, value } = e.target; // Lấy tên và giá trị của ô input hiện tại
    
    // Cập nhật trạng thái formData với giá trị mới nhập
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Xóa lỗi tương ứng khi người dùng bắt đầu nhập lại dữ liệu vào ô đó
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Hàm kiểm tra tính hợp lệ của dữ liệu trong form
  const validateForm = () => {
    const newErrors = {};
    
    // Kiểm tra tên - phải có ít nhất 4 ký tự
    if (!formData.name) {
      newErrors.name = "Vui lòng nhập tên";
    } else if (formData.name.length < 4) {
      newErrors.name = "Tên phải có ít nhất 4 ký tự";
    }
    
    // Kiểm tra email - phải có định dạng hợp lệ
    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) { // Kiểm tra định dạng email theo chuẩn
      newErrors.email = "Email không hợp lệ";
    }
    
    // Kiểm tra tên tài khoản - phải có ít nhất 8 ký tự
    if (!formData.username) {
      newErrors.username = "Vui lòng nhập tên tài khoản";
    } else if (formData.username.length < 8) {
      newErrors.username = "Tên tài khoản phải có ít nhất 8 ký tự";
    }
    
    // Kiểm tra mật khẩu - phải có ít nhất 8 ký tự
    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }
    
    return newErrors; // Trả về các lỗi đã phát hiện (nếu có)
  };

  // Hàm xử lý khi người dùng nhấn nút "Đăng ký"
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn trình duyệt tự động tải lại trang khi submit
    
    const validationErrors = validateForm(); // Gọi hàm kiểm tra form
    
    // Nếu phát hiện lỗi, cập nhật trạng thái lỗi và không gửi dữ liệu
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true); // Đánh dấu rằng form đang được gửi
    
    // Giả lập gọi API để đăng ký
    setTimeout(() => {
      alert("Đăng ký thành công!"); // Hiển thị thông báo đăng ký thành công
      setIsSubmitting(false); // Đặt lại trạng thái đang gửi dữ liệu
      navigate('/login'); // Chuyển hướng tới trang đăng nhập
    }, 1000);
  };

  // Hàm xử lý khi người dùng nhấn nút "Đăng nhập"
  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/login'); // Chuyển hướng tới trang đăng nhập
  };


  return (
    <div className="register-container">
      <div className="register-form-container">
        <div className="form-header-2">
            <h2>Đăng ký</h2>
        </div>
        <form onSubmit={handleSubmit}>
            <div className='input-group'>
                <h5>Name</h5> 
                <input 
                  type='text' 
                  id='name' 
                  name='name' 
                  placeholder='Name' 
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'invalid' : ''}
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
            </div>
            <div className='input-group'>
                <h5>Email</h5>
                
                <input 
                  type='email' 
                  id='email' 
                  name='email' 
                  placeholder='Email' 
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'invalid' : ''}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            <div className='input-group'>
                <h5>Tên tài khoản</h5>
                
                <input 
                  type='text' 
                  id='username' 
                  name='username' 
                  placeholder='Tên đăng nhập' 
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? 'invalid' : ''}
                />
                {errors.username && <div className="error-message">{errors.username}</div>}
            </div>
            <div className='input-group'>
                <h5>Password</h5>
                
                <input 
                  type='password' 
                  id='password' 
                  name='password' 
                  placeholder='Password' 
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'invalid' : ''}
                />
                {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <div className="other-options">
                <a href="#" onClick={handleLogin}>Đăng nhập</a>
            </div>

            <div style={{display: 'flex',justifyContent: 'center', alignContent: 'center' }}>
                <button 
                  type='submit' 
                  className="register-button" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterContent;
