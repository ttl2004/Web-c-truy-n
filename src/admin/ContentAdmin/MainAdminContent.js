import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MainAdminContent.css';

function MainAdminContent() {
    // Dữ liệu truyện mẫu
    const allStories = [
        {
            id: 1,
            title: "Thần Điêu Đại Hiệp",
            author: "Kim Dung",
            category: "Kiếm hiệp, Võ thuật",
            date: "15/03/2025",
            status: "published",
            statusLabel: "Đã xuất bản"
        },
        {
            id: 2,
            title: "Đấu La Đại Lục",
            author: "Đường Gia Tam Thiếu",
            category: "Huyền Huyễn, Tu Tiên",
            date: "10/03/2025",
            status: "draft",
            statusLabel: "Bản nháp"
        },
        {
            id: 3,
            title: "Tiếu Ngạo Giang Hồ",
            author: "Kim Dung",
            category: "Kiếm hiệp, Cổ đại",
            date: "08/03/2025",
            status: "review",
            statusLabel: "Đang duyệt"
        },
        {
            id: 4,
            title: "Tru Tiên",
            author: "Tiêu Đỉnh",
            category: "Tiên Hiệp, Huyền Ảo",
            date: "05/03/2025",
            status: "published",
            statusLabel: "Đã xuất bản"
        },
        {
            id: 5,
            title: "Đấu Phá Thương Khung",
            author: "Thiên Tàm Thổ Đậu",
            category: "Huyền Huyễn, Võ Hiệp",
            date: "01/03/2025",
            status: "published",
            statusLabel: "Đã xuất bản"
        },
        {
            id: 6,
            title: "Nguyên Tôn",
            author: "Thiên Tàm Thổ Đậu",
            category: "Tu Tiên, Huyền Ảo",
            date: "28/02/2025",
            status: "draft",
            statusLabel: "Bản nháp"
        },
        {
            id: 7,
            title: "Vũ Động Càn Khôn",
            author: "Thiên Tàm Thổ Đậu",
            category: "Huyền Huyễn, Tu Tiên",
            date: "25/02/2025",
            status: "review",
            statusLabel: "Đang duyệt"
        },
    ];

    // State cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const storiesPerPage = 4;

    // Tính toán các truyện hiển thị trên trang hiện tại
    const indexOfLastStory = currentPage * storiesPerPage;
    const indexOfFirstStory = indexOfLastStory - storiesPerPage;
    const currentStories = allStories.slice(indexOfFirstStory, indexOfLastStory);

    // Tổng số trang
    const totalPages = Math.ceil(allStories.length / storiesPerPage);

    // Hàm xử lý chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => prev < totalPages ? prev + 1 : prev);
    const prevPage = () => setCurrentPage(prev => prev > 1 ? prev - 1 : prev);

    // Generate mảng số trang
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <div className="main-admin-content">
                <div className='statistics'>
                    <div className="stat-card">
                     
                        <div className="stat-info">
                            <h3>Tổng số truyện</h3>
                            <div className="stat-number">90</div>
                            <div className="stat-trend positive">
                                <i className="fas fa-arrow-up"></i> 12% so với tháng trước
                            </div>
                        </div>
                    </div>

                    <div className="stat-card">
                        
                        <div className="stat-info">
                            <h3>Tổng lượt đọc</h3>
                            <div className="stat-number">12K</div>
                            <div className="stat-trend positive">
                                <i className="fas fa-arrow-up"></i> 5% so với tháng trước
                            </div>
                        </div>
                    </div>

                    <div className="stat-card">
                        
                        <div className="stat-info">
                            <h3>Tổng người dùng</h3>
                            <div className="stat-number">320</div>
                            <div className="stat-trend positive">
                                <i className="fas fa-arrow-up"></i> 3% so với tháng trước
                            </div>
                        </div>
                    </div>

                    <div className="stat-card">
                        
                        <div className="stat-info">
                            <h3>Bình luận mới</h3>
                            <div className="stat-number">3.2K</div>
                            <div className="stat-trend negative">
                                <i className="fas fa-arrow-down"></i> 4% so với tháng trước
                            </div>
                        </div>
                    </div>
                </div>
                 
                <div className='recent-stories-section'>
                    <div className="section-card">
                        <div className="section-header">
                            <Link to="/admin/stories" className="header-link">
                                <h3>Truyện mới thêm gần đây</h3>
                            </Link>
                            <div className="view-all-link">
                                <Link to="/admin/stories">
                                    Xem tất cả <i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                        
                        <div className="section-content">
                            <table className="stories-table">
                                <thead>
                                    <tr>
                                        <th>Tên truyện</th>
                                        <th>Tác giả</th>
                                        <th>Thể loại</th>
                                        <th>Ngày thêm</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentStories.map(story => (
                                        <tr key={story.id}>
                                            <td>
                                                <div className="story-info">
                                                    <span className="story-title">{story.title}</span>
                                                </div>
                                            </td>
                                            <td>{story.author}</td>
                                            <td>{story.category}</td>
                                            <td>{story.date}</td>
                                            <td>
                                                <span className={`status ${story.status}`}>
                                                    {story.statusLabel}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                            <div className="pagination">
                                
                                <div className="pagination-controls">
                                    <button 
                                        className="pagination-btn prev" 
                                        onClick={prevPage}
                                        disabled={currentPage === 1}
                                    >
                                        <i className="fas fa-chevron-left"></i>
                                    </button>
                                    
                                    {pageNumbers.map(number => (
                                        <button 
                                            key={number}
                                            onClick={() => paginate(number)}
                                            className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                    
                                    <button 
                                        className="pagination-btn next" 
                                        onClick={nextPage}
                                        disabled={currentPage === totalPages}
                                    >
                                        <i className="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainAdminContent;