import './MC_First.css';
import { useState, useEffect, useRef} from 'react';
import image from '../../Assets/image.png';
function MC_First() {
    const css ={
        backgroundColor: '#FFFFFF',
        gridColumn: '2 / 3',
        gridRow: '1 / 2',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        
    };

    const topComics = [
    { id: 1, title: 'Duyên ba kiếp giới', image: image, chapter: 145, time: '1 ngày trước' },
    { id: 2, title: 'Đại phong độ của trẫm', image: image, chapter: 139, time: '2 ngày trước' },
    { id: 3, title: 'Yêu tinh gàu', image: image, chapter: 115, time: '3 ngày trước' },
    { id: 4, title: 'Ngọn đồi của thần chết', image: image, chapter: 220, time: '4 ngày trước' },
    { id: 5, title: 'One Piece', image: image, chapter: 1106, time: '5 ngày trước' },
    { id: 6, title: 'Cầu thủ xuất chúng', image: image, chapter: 180, time: '6 ngày trước' },
    { id: 7, title: 'Thiên tài lang băm', image: image, chapter: 215, time: '7 ngày trước' },
    { id: 8, title: 'Phong Khởi Thiên Đường', image: image, chapter: 189, time: '8 ngày trước'}
    ];
      

    const [currentTopIndex, setCurrentTopIndex] = useState(0);
    const [autoSlide, setAutoSlide] = useState(true);
    const timerRef = useRef(null);


    // Xử lý autoSlide cho truyện đề cử
    useEffect(() => {
        if (autoSlide) {
            timerRef.current = setInterval(() => {
                setCurrentTopIndex((prevIndex) => (prevIndex + 1) % (topComics.length - 3));
            }, 4000);
        }
        
        return () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        };
    }, [autoSlide, topComics.length]);

    // Xử lý khi nhấn nút trước/sau cho truyện đề cử
    const handleTopPrev = () => {
        setAutoSlide(false);
        setCurrentTopIndex((prevIndex) => (prevIndex === 0 ? topComics.length - 4 : prevIndex - 1));
    };

    const handleTopNext = () => {
        setAutoSlide(false);
        setCurrentTopIndex((prevIndex) => (prevIndex + 1) % (topComics.length - 3));
    };

    // Hiển thị 4 truyện đề cử dựa trên currentTopIndex
    const displayTopComics = topComics.slice(currentTopIndex, currentTopIndex + 4);
    
    return (
        <>
            <div style={css}>
                <h1>Top Truyện đề cử »</h1>
                <div className="top-comics-slider">
                    <button className="slider-button prev" onClick={handleTopPrev}>
                        {/* &larr; */}
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <div className="top-comics-container">
                        {displayTopComics.map((comic) => (
                        <div className="comic-card-featured" key={comic.id}>
                            <div className="comic-image">
                                <img src={comic.image} alt={comic.title} />
                            </div>
                            <div className="comic-info">
                                <h3>{comic.title}</h3>
                                <div className="comic-chapter">
                                    <p>Chapter {comic.chapter}</p>
                                    <p>{comic.time}</p>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    <button className="slider-button next" onClick={handleTopNext}>
                        {/* &rarr; */}
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </>
    );
}
export default MC_First;