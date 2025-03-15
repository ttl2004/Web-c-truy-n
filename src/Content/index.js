import './Content.css';
import MainContent from './MainContent';
import LoginContent from './LoginContent';
import RegisterContent from './RegisterContent';
import ForgotPassContent from './ForgotPassContent';
import {Routes, Route } from 'react-router-dom';

function Content() {
  return (
    <>
        <div className='content'>
            <Routes>
                <Route path='/' element={<MainContent />} />
                <Route path='/login' element={<LoginContent />} />
                <Route path='/register' element={<RegisterContent />} />
                <Route path='/forgotPass' element={<ForgotPassContent />} />
            </Routes>
        </div>
    </>
  );
}

export default Content;