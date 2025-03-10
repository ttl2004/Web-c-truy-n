import logo from '../Assets/logo.png';
import './Center.css';

function Center(){
    const css = {
        backgroundColor: '#F43F5E',
        width: '100%',
        maxWidth: '930px',
        gridColumn: '2 / 3',
        display: 'grid',
        gridTemplateColumns: '3fr 2fr 1fr',
        justifyContent: 'space-between',
        alignItems: 'center',
    };
    return(
        <>
            <div style={css}>
                <div className="logo">
                    <img src={logo} alt="logo" />
                    <span>TopTruyen</span>
                </div>
                <div className='icons'>
                    <i class="fa-regular fa-moon"></i>
                    <i class="fa-regular fa-bell"></i>
                </div>
                <div className='user'>
                    <span>Tài khoản</span>
                    <i class="fa-regular fa-circle-user"></i>
                </div>
            </div>
        </>
    );
}

export default Center;