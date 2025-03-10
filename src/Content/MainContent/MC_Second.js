import './MC_Second.css';
import React, {useState} from 'react';
import image from '../../Assets/image.png';
function MC_Second() {
  const css = {
    backgroundColor: '#FFFFFF',
    gridColumn: '2 / 3',
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridTemplateRows: 'repeat(7, 1fr) 50px',
    gap: '30px',
  };

  // Danh sách truyện top
  const comicData = {
    month: [
      { 
      id: 1, 
      title: 'Ta Có 90 Tỷ Tiên Liêm Câu!', 
      chapter: 506, 
      views: 138,
      image: image // Hình ảnh giữ chỗ
      },
      { 
      id: 2, 
      title: 'Ta Có Một Sơn Trại', 
      chapter: 1087, 
      views: 130,
      image: image
      },
      { 
      id: 3, 
      title: 'Vạn Cổ Chí Tôn', 
      chapter: 396, 
      views: 87,
      image: image
      },
      { 
      id: 4, 
      title: 'Võ Luyến Đình Phong', 
      chapter: 3820, 
      views: 100,
      image: image
      },
      { 
      id: 5, 
      title: 'Cao Võ: Hạ Cánh Đến Một Vạn năm sau', 
      chapter: 194, 
      views: 27,
      image: image
      },
      { 
      id: 6, 
      title: 'Toàn Cầu Bằng Phong: Ta...', 
      chapter: 598, 
      views: 45,
      image: image
      }
    ],
    week: [
      { 
        id: 1, 
        title: 'Ta Có 90 Tỷ Tiên Liêm Câu!', 
        chapter: 506, 
        views: 138,
        image: image // Hình ảnh giữ chỗ
        },
        { 
        id: 2, 
        title: 'Ta Có Một Sơn Trại', 
        chapter: 1087, 
        views: 130,
        image: image
        },
        { 
        id: 3, 
        title: 'Vạn Cổ Chí Tôn', 
        chapter: 396, 
        views: 87,
        image: image
        },
        { 
        id: 4, 
        title: 'Võ Luyến Đình Phong', 
        chapter: 3820, 
        views: 100,
        image: image
        },
    ],
    day: [
      { 
        id: 1, 
        title: 'Ta Có 90 Tỷ Tiên Liêm Câu!', 
        chapter: 506, 
        views: 138,
        image: image // Hình ảnh giữ chỗ
        },
        { 
        id: 2, 
        title: 'Ta Có Một Sơn Trại', 
        chapter: 1087, 
        views: 130,
        image: image
        },
        { 
        id: 3, 
        title: 'Vạn Cổ Chí Tôn', 
        chapter: 396, 
        views: 87,
        image: image
        },
    ]
  };
  const novelData = {
    month: [
    { 
      id: 1, 
      title: 'Võ Luyện Đỉnh Phong', 
      chapter: 2506, 
      views: 238,
      image: image
    },
    { 
      id: 2, 
      title: 'Đấu Phá Thương Khung', 
      chapter: 1287, 
      views: 198,
      image: image
    },
    // Thêm sách văn bản khác ở đây
    ],
    week: [
      // Dữ liệu tuần cho sách văn bản
    ],
    day: [
      // Dữ liệu ngày cho sách văn bản
    ]
  };
  // Tất cả truyện tranh
  const allComics = [
    { id: 1, title: 'One Piece', image: image, chapter: [{chap: 100, time_up: '3 giờ trước'}, {chap: 99, time_up: '7 giờ trước'},{chap: 98, time_up: '18 giờ trước'}], genre: 'Phiêu lưu' },
    { id: 2, title: 'Naruto', image: image, chapter: [{chap: 100, time_up: '3 giờ trước'}, {chap: 99, time_up: '7 giờ trước'},{chap: 98, time_up: '8 giờ trước'}], genre: 'Hành động' },
    { id: 3, title: 'Dragon Ball Super', image: image, chapter: [{chap: 100, time_up: '3 giờ trước'}, {chap: 99, time_up: '7 giờ trước'},{chap: 98, time_up: '8 giờ trước'}], genre: 'Võ thuật' },
    { id: 4, title: 'Kimetsu no Yaiba', image: image, chapter: [{chap: 100, time_up: '3 giờ trước'}, {chap: 99, time_up: '7 giờ trước'},{chap: 98, time_up: '8 giờ trước'}], genre: 'Kinh dị' },
    { id: 5, title: 'Jujutsu Kaisen', image: image, chapter: [{chap: 100, time_up: '3 giờ trước'}, {chap: 99, time_up: '7 giờ trước'},{chap: 98, time_up: '8 giờ trước'}], genre: 'Siêu nhiên' },
    { id: 6, title: 'Attack on Titan', image: image, chapter: [{chap: 100, time_up: '3 giờ trước'}, {chap: 99, time_up: '7 giờ trước'},{chap: 98, time_up: '8 giờ trước'}], genre: 'Giả tưởng' },
    { id: 7, title: 'My Hero Academia', image: image, chapter: [{chap: 100, time_up: '3 giờ trước'}, {chap: 99, time_up: '7 giờ trước'},{chap: 98, time_up: '8 giờ trước'}], genre: 'Anh hùng' },
    { id: 8, title: 'Black Clover', image: image, chapter: [{chap: 100, time_up: '3 giờ trước'}, {chap: 99, time_up: '7 giờ trước'},{chap: 98, time_up: '8 giờ trước'}], genre: 'Phép thuật' },
    { id: 9, title: 'Tokyo Revengers', image: image, chapter: [{chap: 100, time_up: '3 giờ trước'}, {chap: 99, time_up: '7 giờ trước'},{chap: 98, time_up: '8 giờ trước'}], genre: 'Hành động' },
    { id: 10, title: 'Spy x Family', image: image, chapter: [{chap: 100, time_up: '3 giờ trước'}, {chap: 99, time_up: '7 giờ trước'},{chap: 98, time_up: '8 giờ trước'}], genre: 'Hài hước' },
    { id: 11, title: 'Chainsaw Man', image: image, chapter: [{chap: 100, time_up: '3 giờ trước'}, {chap: 99, time_up: '7 giờ trước'},{chap: 98, time_up: '8 giờ trước'}], genre: 'Kinh dị' },
    { id: 12, title: 'Blue Lock', image: image, chapter: [{chap: 100, time_up: '3 giờ trước'}, {chap: 99, time_up: '7 giờ trước'},{chap: 98, time_up: '8 giờ trước'}], genre: 'Thể thao' },
    { id: 13, title: 'Haikyuu!!', image: image, chapter: [{chap: 100, time_up: '3 giờ trước'}, {chap: 99, time_up: '7 giờ trước'},{chap: 98, time_up: '8 giờ trước'}], genre: 'Thể thao' },
    { id: 14, title: 'Hunter x Hunter', image: image, chapter: [{chap: 100, time_up: '3 giờ trước'}, {chap: 99, time_up: '7 giờ trước'},{chap: 98, time_up: '8 giờ trước'}], genre: 'Phiêu lưu' },
    { id: 15, title: 'Bleach', image: image, chapter: [{chap: 100, time_up: '3 giờ trước'}, {chap: 99, time_up: '7 giờ trước'},{chap: 98, time_up: '8 giờ trước'}], genre: 'Siêu nhiên' },
    { id: 16, title: 'Dr. Stone', image: image, chapter: [{chap: 100, time_up: '3 giờ trước'}, {chap: 99, time_up: '7 giờ trước'},{chap: 98, time_up: '8 giờ trước'}], genre: 'Khoa học' }
  ];

  
  const [activeTab, setActiveTab] = useState('month');
  const [comicType, setComicType] = useState('comic'); // 'comic' hoặc 'text'

  // Lấy dữ liệu phù hợp dựa trên loại truyện
  const rankingData = comicType === 'comic' ? comicData : novelData;

  // Đối tượng kiểu nút
  const activeButtonStyle = {
    backgroundColor: '#d33',
    color: 'white',
    fontWeight: 'bold'
  };
  
  const inactiveButtonStyle = {
    backgroundColor: '#f8f8f8',
    color: '#d33',
    fontWeight: 'normal'
  };
  const rankingListStyle = {
    height: '490px', // Đặt chiều cao cố định phù hợp với 6 mục
    // overflow: 'auto' // Cho phép cuộn nếu nội dung vượt quá chiều cao
  };

  // Tất cả truyện tranh
  const [currentPage, setCurrentPage] = useState(1);
  const comicsPerPage = 8;
  
  // Lấy truyện tranh hiện tại
  const indexOfLastComic = currentPage * comicsPerPage;
  const indexOfFirstComic = indexOfLastComic - comicsPerPage;
  const currentComics = allComics.slice(indexOfFirstComic, indexOfLastComic);
  
  // Tính tổng số trang
  const totalPages = Math.ceil(allComics.length / comicsPerPage);
  // Thay đổi trang
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Tạo số trang
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div style={css}>
        <div className="div-1">
          <h3>Top Truyện - Truyện tranh online »</h3>
        </div>

        {/* nút chuyển loại truyện trong ranking */}
        <div className="div-2">
          <button 
            style={comicType === 'comic' ? activeButtonStyle : inactiveButtonStyle}
            onClick={() => setComicType('comic')}
          >
            Truyện tranh
          </button>
          <button 
            style={comicType === 'text' ? activeButtonStyle : inactiveButtonStyle}
            onClick={() => setComicType('text')}
          >
            Truyện chữ
          </button>
        </div>
        
        {/* Ranking */}
        <div className="div-3">
          <div className="ranking-tabs">
            <button 
              className={activeTab === 'month' ? 'active' : ''} 
              onClick={() => setActiveTab('month')}
            >
              Top tháng
            </button>
            <button 
              className={activeTab === 'week' ? 'active' : ''} 
              onClick={() => setActiveTab('week')}
            >
              Top tuần
            </button>
            <button 
              className={activeTab === 'day' ? 'active' : ''} 
              onClick={() => setActiveTab('day')}
            >
              Top ngày
            </button>
          </div>
          <div className="ranking-list" style={rankingListStyle}>
            {rankingData[activeTab].map((item) => (
              <div className="ranking-item" key={item.id}>
                <div className="rank-number">{String(item.id).padStart(2, '0')}</div>
                <div className="manga-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="manga-details">
                  <h4>{item.title}</h4>
                  <p>Chapter {item.chapter}</p>
                  <div className="view-count">
                    <span>{item.views}K</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tất cả truyện tranh */}  
        <div class="div-4">
          <div className="comics-grid">
            {currentComics.map(comic => (
              <div className="comic-card" key={comic.id}>
                <div className="comic-thumbnail">
                  <img src={comic.image} alt={comic.title} />
                </div>
                
                <div className="comic-info-2">
                  <h4 className="comic-title">{comic.title}</h4>
                  <div className="comic-chapters-list">
                    {comic.chapter.slice(0, 3).map((chapterItem, index) => (
                      <div key={index} className="chapter-item">
                        <span className="chapter-number">Chapter {chapterItem.chap}</span>
                        <span className="chapter-time">{chapterItem.time_up}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination-controls">
            <button 
              className="pagination-arrow" 
              onClick={prevPage} 
              disabled={currentPage === 1}
            >
              &larr;
            </button>
            
            {pageNumbers.map(number => (
              <button 
                key={number}
                className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                onClick={() => goToPage(number)}
              >
                {number}
              </button>
            ))}
            
            <button 
              className="pagination-arrow" 
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MC_Second;