import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthPage from '../components/Participant/DangKyDangNhap/AuthPage'; 
import { toast } from 'react-toastify'; // Import thư viện thông báo

const Home = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    birthday: ''
  });

  // LOGIC XỬ LÝ ĐĂNG NHẬP/ĐĂNG KÝ (Đã thay alert bằng toast)
  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');

    if (!isLogin) {
      // === XỬ LÝ ĐĂNG KÝ ===
      if (allUsers.find(u => u.email === formData.email)) {
        toast.error("📧 Email này đã tồn tại trong hệ thống!"); 
        return;
      }
      const newUser = { ...formData, name: formData.email.split('@')[0], avatar: "" };
      localStorage.setItem('all_users', JSON.stringify([...allUsers, newUser]));
      
      toast.success("🎉 Đăng ký thành công! Mời bạn đăng nhập."); 
      setIsLogin(true); // Chuyển sang chế độ đăng nhập
    } else {
      // === XỬ LÝ ĐĂNG NHẬP ===
      const user = allUsers.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        localStorage.setItem('token', 'fake-token-th');
        localStorage.setItem('user', JSON.stringify(user));
        
        toast.success("🚀 Đăng nhập thành công! Đang chuyển hướng..."); 
        
        // Đợi 1.2 giây để người dùng nhìn thấy thông báo rồi mới nhảy trang
        setTimeout(() => {
          navigate('/trang-chu'); 
        }, 1200);
      } else {
        toast.error("❌ Email hoặc mật khẩu không chính xác!"); 
      }
    }
  };

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="pt-20 min-h-screen flex items-center" style={{ backgroundColor: '#fef7e6' }}>
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl font-bold mb-6" style={{ color: '#1a1a2e' }}>
              Bạn muốn tổ chức sự kiện như thế nào?
            </h1>
            <p className="text-2xl mb-8" style={{ color: '#333' }}>
              Khám phá hàng ngàn ý tưởng cho sự kiện hoàn hảo của bạn - từ tiệc cưới đến hội nghị, từ sinh nhật đến sự kiện doanh nghiệp.
            </p>
            <button 
              onClick={() => { setIsLogin(true); setShowAuthModal(true); }}
              className="inline-block px-6 py-3 bg-red-600 text-white rounded-full font-semibold text-lg hover:bg-red-700 transition"
            >
              Khám phá ngay
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-4">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622" alt="Wedding" className="w-full h-48 object-cover" /></div>
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1519167758481-83f29da8c2b7" alt="Birthday" className="w-full h-56 object-cover" /></div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87" alt="Conference" className="w-full h-44 object-cover" /></div>
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3" alt="Concert" className="w-full h-52 object-cover" /></div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30" alt="Corporate" className="w-full h-48 object-cover" /></div>
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1505236858219-8359eb29e329" alt="Outdoor" className="w-full h-56 object-cover" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VENUE SECTION */}
      <section className="min-h-screen flex items-center" style={{ backgroundColor: '#e8f4f8' }}>
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-4">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full mb-4 flex items-center justify-center"><span className="text-3xl">📍</span></div>
                <h3 className="font-bold text-lg mb-2">Địa điểm sang trọng</h3>
              </div>
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1519167758481-83f29da8c2b7" alt="Venue" className="w-full h-56 object-cover" /></div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1478147427282-58a87a120781" alt="Hotel" className="w-full h-44 object-cover" /></div>
              <div className="bg-white rounded-3xl shadow-lg p-6"><h3 className="font-bold text-lg mb-2">Khách sạn 5 sao</h3></div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04" alt="Garden" className="w-full h-48 object-cover" /></div>
              <div className="bg-white rounded-3xl shadow-lg p-6"><h3 className="font-bold text-lg mb-2">Sân vườn</h3></div>
            </div>
          </div>
          <div>
            <h2 className="text-5xl font-bold mb-6" style={{ color: '#c32a00' }}>Địa điểm bạn muốn tổ chức ở đâu?</h2>
            <p className="text-xl mb-4" style={{ color: '#333' }}>Từ khách sạn 5 sao đến không gian sân vườn thơ mộng, tìm địa điểm hoàn hảo.</p>
            <button onClick={() => { setIsLogin(true); setShowAuthModal(true); }} className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold">Xem địa điểm</button>
          </div>
        </div>
      </section>

      {/* 3. EVENT TICKETS SECTION */}
      <section className="min-h-screen flex items-center" style={{ backgroundColor: '#fff0f5' }}>
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-6" style={{ color: '#6a1b4d' }}>Bạn đang tìm kiếm vé sự kiện?</h2>
            <p className="text-xl mb-4" style={{ color: '#333' }}>Đặt vé ngay cho các sự kiện âm nhạc, hội thảo, triển lãm.</p>
            <button onClick={() => { setIsLogin(true); setShowAuthModal(true); }} className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold">Tìm vé ngay</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea" alt="Music" className="w-full h-64 object-cover" />
              <div className="p-4"><p className="font-semibold">Concert & Festival</p></div>
            </div>
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg mt-8">
              <img src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2" alt="Conf" className="w-full h-64 object-cover" />
              <div className="p-4"><p className="font-semibold">Hội thảo & Triển lãm</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AUTH SECTION (CẬP NHẬT FORM) */}
      <section id="auth-section" className="min-h-screen flex items-center justify-center py-20" style={{ backgroundColor: '#f9f9f9' }}>
        <div className="max-w-md w-full mx-4 bg-white p-10 rounded-3xl shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-red-600 rounded-full mb-4">
              <svg width="40" height="40" viewBox="0 0 512 512"><path fill="white" d="M256,450 L150,450 L150,280 L100,280 L100,150 L150,150 L150,62 L362,62 L362,150 L412,150 L412,280 L362,280 L362,450 L256,450 Z M200,150 L200,400 L312,400 L312,150 L200,150 Z"/></svg>
            </div>
            <h2 className="text-3xl font-bold mb-2">TH Media & Event</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl outline-none focus:border-red-500"
              placeholder="Email"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <input
              type="password"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl outline-none focus:border-red-500"
              placeholder="Mật khẩu"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            {!isLogin && (
              <input
                type="date"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl outline-none focus:border-red-500"
                onChange={(e) => setFormData({...formData, birthday: e.target.value})}
              />
            )}
            <button
              type="submit"
              className="w-full py-3 bg-red-600 text-white rounded-full font-semibold text-lg hover:bg-red-700 transition shadow-lg"
            >
              {isLogin ? 'Đăng nhập ngay' : 'Tạo tài khoản'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              {isLogin ? 'Chưa tham gia?' : 'Đã có tài khoản? '} 
              <span 
                className="font-bold cursor-pointer hover:underline text-red-600"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Đăng ký' : 'Đăng nhập'}
              </span>
            </p>
          </div>
        </div>
      </section>

      <AuthPage 
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Home;