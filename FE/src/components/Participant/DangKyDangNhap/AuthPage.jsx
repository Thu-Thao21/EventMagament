import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

const AuthPage = ({ 
  showAuthModal, 
  setShowAuthModal, 
  isLogin, 
  setIsLogin, 
  formData, 
  setFormData, 
  handleSubmit 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!showAuthModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12">
          <div className="text-center mb-8">
            <svg width="60" height="60" viewBox="0 0 512 512" className="w-16 h-16 mx-auto mb-4">
              <defs>
                <linearGradient id="goldGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#d4af37', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#aa8c2c', stopOpacity: 1}} />
                </linearGradient>
              </defs>
              <path fill="#0a2540" d="M256,450 L150,450 L150,280 L100,280 L100,150 L150,150 L150,62 L362,62 L362,150 L412,150 L412,280 L362,280 L362,450 L256,450 Z M200,150 L200,400 L312,400 L312,150 L200,150 Z"/>
              <path fill="url(#goldGradient2)" d="M220,120 L220,380 L292,380 L292,280 L350,280 L350,200 L292,200 L292,120 L220,120 Z M250,150 L262,150 L262,230 L320,230 L320,250 L262,250 L262,350 L250,350 L250,150 Z"/>
            </svg>
            <h2 className="text-3xl font-bold mb-2">
              Chào mừng bạn đến với TH Media & Event
            </h2>
            <p className="text-gray-600">
              Tìm những ý tưởng mới để thử
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Mật khẩu</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
                  placeholder={isLogin ? "Mật khẩu" : "Tạo mật khẩu"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-gray-500 mt-2">Sử dụng ít nhất 8 chữ cái, số và ký hiệu</p>
              )}
            </div>

            {isLogin && (
              <div className="text-right">
                <button className="text-sm text-blue-600 hover:underline">Quên mật khẩu?</button>
              </div>
            )}

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Mẹo về mật khẩu <span className="text-gray-400">ⓘ</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Ngày sinh <span className="text-gray-400">ⓘ</span>
                  </label>
                  <input
                    type="date"
                    value={formData.birthday}
                    onChange={(e) => setFormData({...formData, birthday: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
                    placeholder="dd/mm/yyyy"
                  />
                </div>
              </>
            )}

            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-red-600 text-white rounded-full font-semibold text-lg hover:bg-red-700 transition"
            >
              {isLogin ? 'Đăng nhập' : 'Tiếp tục'}
            </button>

            <div className="text-center">
              <span className="text-gray-600">HOẶC</span>
            </div>

            <button
              type="button"
              onClick={() => console.log('Google login')}
              className="w-full py-3 border-2 border-gray-300 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Tiếp tục sử dụng dịch vụ bằng Google
            </button>

            {isLogin && (
              <button
                onClick={() => console.log('Email link login')}
                className="w-full py-3 border-2 border-gray-300 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Gửi email liên kết đăng nhập
              </button>
            )}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-600 hover:text-black"
            >
              {isLogin ? 'Chưa tham gia TH Event? ' : 'Bạn đã là thành viên? '}
              <span className="font-semibold">{isLogin ? 'Đăng ký' : 'Đăng nhập'}</span>
            </button>
          </div>

          {!isLogin && (
            <p className="text-xs text-center text-gray-500 mt-4">
              Bằng cách tiếp tục, bạn đồng ý với <span className="font-semibold underline cursor-pointer">Điều khoản dịch vụ của TH Event</span> và xác nhận bạn đã đọc <span className="font-semibold underline cursor-pointer">Chính sách quyền riêng tư</span> của chúng tôi.
            </p>
          )}

          {isLogin && (
            <div className="text-center mt-4 space-y-2">
              <p className="text-xs text-gray-500">
                Chức năng đăng nhập bằng Facebook không còn hoạt động nữa
              </p>
              <button className="text-sm font-semibold hover:underline">
                Cập nhật phương thức đăng nhập
              </button>
              <p className="text-xs text-gray-500">
                Bạn là doanh nghiệp? <span className="font-semibold underline cursor-pointer">Hãy bắt đầu tại đây!</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
