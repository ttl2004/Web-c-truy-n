import './MC_Third.css';
import React, { useState } from 'react';
import image from '../../Assets/image.png';

function MC_Third() {
    const css = {
        backgroundColor: '#FFFFFF',
        gridColumn: '2 / 3',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: '60px repeat(7, 1fr)',
        gap: '30px',
        marginBottom: '90px'
    };

    const allNovels = [
        { id: 1, title: 'One Piece', image: image, chapter: [{ chap: 100, time_up: '3 giờ trước' }, { chap: 99, time_up: '7 giờ trước' }, { chap: 98, time_up: '18 giờ trước' }], genre: 'Phiêu lưu' },
        { id: 2, title: 'Naruto', image: image, chapter: [{ chap: 100, time_up: '3 giờ trước' }, { chap: 99, time_up: '7 giờ trước' }, { chap: 98, time_up: '8 giờ trước' }], genre: 'Hành động' },
        { id: 3, title: 'Dragon Ball Super', image: image, chapter: [{ chap: 100, time_up: '3 giờ trước' }, { chap: 99, time_up: '7 giờ trước' }, { chap: 98, time_up: '8 giờ trước' }], genre: 'Võ thuật' },
        { id: 4, title: 'Kimetsu no Yaiba', image: image, chapter: [{ chap: 100, time_up: '3 giờ trước' }, { chap: 99, time_up: '7 giờ trước' }, { chap: 98, time_up: '8 giờ trước' }], genre: 'Kinh dị' },
        { id: 5, title: 'Jujutsu Kaisen', image: image, chapter: [{ chap: 100, time_up: '3 giờ trước' }, { chap: 99, time_up: '7 giờ trước' }, { chap: 98, time_up: '8 giờ trước' }], genre: 'Siêu nhiên' },
        { id: 6, title: 'Attack on Titan', image: image, chapter: [{ chap: 100, time_up: '3 giờ trước' }, { chap: 99, time_up: '7 giờ trước' }, { chap: 98, time_up: '8 giờ trước' }], genre: 'Giả tưởng' },
        { id: 7, title: 'My Hero Academia', image: image, chapter: [{ chap: 100, time_up: '3 giờ trước' }, { chap: 99, time_up: '7 giờ trước' }, { chap: 98, time_up: '8 giờ trước' }], genre: 'Anh hùng' },
        { id: 8, title: 'Black Clover', image: image, chapter: [{ chap: 100, time_up: '3 giờ trước' }, { chap: 99, time_up: '7 giờ trước' }, { chap: 98, time_up: '8 giờ trước' }], genre: 'Phép thuật' },
        { id: 9, title: 'Tokyo Revengers', image: image, chapter: [{ chap: 100, time_up: '3 giờ trước' }, { chap: 99, time_up: '7 giờ trước' }, { chap: 98, time_up: '8 giờ trước' }], genre: 'Hành động' },
        { id: 10, title: 'Spy x Family', image: image, chapter: [{ chap: 100, time_up: '3 giờ trước' }, { chap: 99, time_up: '7 giờ trước' }, { chap: 98, time_up: '8 giờ trước' }], genre: 'Hài hước' },
        { id: 11, title: 'Chainsaw Man', image: image, chapter: [{ chap: 100, time_up: '3 giờ trước' }, { chap: 99, time_up: '7 giờ trước' }, { chap: 98, time_up: '8 giờ trước' }], genre: 'Kinh dị' },
        { id: 12, title: 'Blue Lock', image: image, chapter: [{ chap: 100, time_up: '3 giờ trước' }, { chap: 99, time_up: '7 giờ trước' }, { chap: 98, time_up: '8 giờ trước' }], genre: 'Thể thao' },
        { id: 13, title: 'Haikyuu!!', image: image, chapter: [{ chap: 100, time_up: '3 giờ trước' }, { chap: 99, time_up: '7 giờ trước' }, { chap: 98, time_up: '8 giờ trước' }], genre: 'Thể thao' },
        { id: 14, title: 'Hunter x Hunter', image: image, chapter: [{ chap: 100, time_up: '3 giờ trước' }, { chap: 99, time_up: '7 giờ trước' }, { chap: 98, time_up: '8 giờ trước' }], genre: 'Phiêu lưu' },
        { id: 15, title: 'Bleach', image: image, chapter: [{ chap: 100, time_up: '3 giờ trước' }, { chap: 99, time_up: '7 giờ trước' }, { chap: 98, time_up: '8 giờ trước' }], genre: 'Siêu nhiên' },
        { id: 16, title: 'Dr. Stone', image: image, chapter: [{ chap: 100, time_up: '3 giờ trước' }, { chap: 99, time_up: '7 giờ trước' }, { chap: 98, time_up: '8 giờ trước' }], genre: 'Khoa học' }
    ];

    // Tất cả truyện chữ
    const [currentPage, setCurrentPage] = useState(1);
    const comicsPerPage = 8;

    // Lấy truyện chữ hiện tại
    const indexOfLastComic = currentPage * comicsPerPage;
    const indexOfFirstComic = indexOfLastComic - comicsPerPage;
    const currentComics = allNovels.slice(indexOfFirstComic, indexOfLastComic);

    // Tính tổng số trang
    const totalPages = Math.ceil(allNovels.length / comicsPerPage);
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
                <div className="div-5">
                    <h3>Top Truyện - Truyện chữ online »</h3>
                </div>

                {/* Tất cả chữ */}
                <div className="div-6">
                    <div className="novels-grid">
                        {currentComics.map(novel => (
                            <div className="novel-card" key={novel.id}>
                                <div className="novel-thumbnail">
                                    <img src={novel.image} alt={novel.title} />
                                </div>

                                <div className="novel-info-2">
                                    <h4 className="novel-title">{novel.title}</h4>
                                    <div className="novel-chapters-list">
                                        {novel.chapter.slice(0, 3).map((chapterItem, index) => (
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

export default MC_Third;