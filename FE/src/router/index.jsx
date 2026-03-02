import Home from '../pages/Home';
import TrangChu from '../components/Participant/TrangChu/TrangChu';
import { Routes, Route, Navigate } from 'react-router-dom';

const AppRouter = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Routes>
      {/* Nếu chưa đăng nhập thì vào Home, nếu rồi thì tự nhảy sang Trang Chủ */}
      <Route path="/" element={isLoggedIn ? <Navigate to="/trang-chu" /> : <Home />} />
      
      {/* Đường dẫn trang chủ sau khi đăng nhập */}
      <Route path="/trang-chu" element={<TrangChu />} />
      
      {/* Các route khác... */}
    </Routes>
  );
};
export default AppRouter;