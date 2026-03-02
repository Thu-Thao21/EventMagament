import React, { useState, useRef, useEffect } from 'react';
// Import thêm hàng loạt icon cho Menu
import { Search, Menu, X, User, Settings, LogOut, Ticket, Heart, Sparkles, CalendarPlus, BarChart3, HelpCircle } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import MenuPanel from "./Menu";

import logoImg from "../../../assets/images/logo-ht.jpg";

const TopClient = ({ searchQuery, setSearchQuery, scrollToTop, setIsLogin, setShowAuthModal }) => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // quản lý menu trong avatar
  const dropdownRef = useRef(null); //  nhận biết click ra ngoài

  const token = localStorage.getItem('token');
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!token; 

  // Hàm xử lý click ra ngoài để đóng menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <>
      <header className="h-[90px] sticky top-0 bg-white shadow-sm flex items-center px-10 z-50">
        <div className="max-w-[1440px] mx-auto w-full flex justify-between items-center gap-5">

          {/* LEFT: Logo & Search (Giữ nguyên của bạn) */}
          <div className="flex items-center gap-3 flex-1">
            <button onClick={() => setOpenMenu(!openMenu)} className="p-2 rounded-lg hover:bg-gray-100 transition">
              <Menu className="w-7 h-7 text-gray-700" />
            </button>

            <button onClick={scrollToTop} className="flex items-center hover:bg-gray-100 rounded-lg p-2 transition">
              <svg viewBox="0 0 512 512" className="w-12 h-12">
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#d4af37'}} />
                    <stop offset="100%" style={{stopColor: '#aa8c2c'}} />
                  </linearGradient>
                </defs>
                <path fill="#0a2540" d="M256,450 L150,450 L150,280 L100,280 L100,150 L150,150 L150,62 L362,62 L362,150 L412,150 L412,280 L362,280 L362,450 L256,450 Z M200,150 L200,400 L312,400 L312,150 L200,150 Z"/>
                <path fill="url(#goldGradient)" d="M220,120 L220,380 L292,380 L292,280 L350,280 L350,200 L292,200 L292,120 L220,120 Z"/>
              </svg>
            </button>

            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sự kiện, địa điểm, dịch vụ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-[50px] w-full rounded-full bg-gray-100 pl-12 pr-6 focus:ring-2 focus:ring-red-600 outline-none"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Nút Auth hoặc Avatar có Dropdown */}
          <div className="flex gap-3 items-center">
            {isLoggedIn ? (
              // Bọc phần avatar vào thẻ div có ref để bắt sự kiện click outside
              <div className="relative" ref={dropdownRef}> 
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                  className="w-[44px] h-[44px] flex-shrink-0 rounded-full border border-gray-200 overflow-hidden flex items-center justify-center bg-gray-100 hover:ring-2 hover:ring-red-500 transition-all p-0"
                  style={{ borderRadius: '50%'}} //ép khung avt bo tròn
                  title={userData.name || "Tài khoản"}
                > 
                  {userData.avatar ? (
                    <img 
                      src={userData.avatar} 
                      alt="Avatar" 
                      className="w-full h-full object-cover rounded-full" 
                      style={{ borderRadius: '50%'}} //ép ảnh trong khung bo tròn
                    />
                  ) : (
                    <User className="w-6 h-6 text-gray-600" />
                  )}
                </button>

                {/* DROPDOWN MENU */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    
                    {/* Header Menu (Tên user) */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{userData.name || "Người dùng"}</p>
                      <p className="text-xs text-gray-500 truncate">{userData.email || "Chưa cập nhật email"}</p>
                    </div>

                    {/* Nhóm 1: Quản lý sự kiện cá nhân */}
                    <div className="py-1">
                      <button onClick={() => {navigate('/profile'); setIsDropdownOpen(false)}} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <User className="w-4 h-4 text-gray-500" /> Hồ sơ cá nhân
                      </button>
                      <button onClick={() => {navigate('/my-tickets'); setIsDropdownOpen(false)}} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <Ticket className="w-4 h-4 text-gray-500" /> Vé sự kiện của tôi
                      </button>
                      <button onClick={() => {navigate('/saved'); setIsDropdownOpen(false)}} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <Heart className="w-4 h-4 text-gray-500" /> Sự kiện đã lưu
                      </button>
                      <button onClick={() => {navigate('/suggestions'); setIsDropdownOpen(false)}} className="w-full px-4 py-2 text-left text-sm text-purple-600 hover:bg-purple-50 flex items-center gap-3 font-medium">
                        <Sparkles className="w-4 h-4 text-purple-500" /> Gợi ý sự kiện thông minh
                      </button>
                    </div>

                    <div className="border-t border-gray-100 my-1"></div>

                    {/* Nhóm 2: Dành cho Ban tổ chức */}
                    <div className="py-1">
                      <button onClick={() => {navigate('/create-event'); setIsDropdownOpen(false)}} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <CalendarPlus className="w-4 h-4 text-gray-500" /> Tạo sự kiện mới
                      </button>
                      <button onClick={() => {navigate('/dashboard'); setIsDropdownOpen(false)}} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <BarChart3 className="w-4 h-4 text-gray-500" /> Thống kê & Quản lý
                      </button>
                    </div>

                    <div className="border-t border-gray-100 my-1"></div>

                    {/* Nhóm 3: Cài đặt & Đăng xuất */}
                    <div className="py-1">
                      <button onClick={() => {navigate('/settings'); setIsDropdownOpen(false)}} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <Settings className="w-4 h-4 text-gray-500" /> Cài đặt hệ thống
                      </button>
                      <button onClick={() => {navigate('/help'); setIsDropdownOpen(false)}} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <HelpCircle className="w-4 h-4 text-gray-500" /> Trung tâm hỗ trợ
                      </button>
                      <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 font-medium mt-1">
                        <LogOut className="w-4 h-4 text-red-500" /> Đăng xuất
                      </button>
                    </div>

                  </div>
                )}
              </div>
            ) : (
              /* CHƯA ĐĂNG NHẬP */
              <>
                <button onClick={() => { setIsLogin(true); setShowAuthModal(true); }} className="px-6 h-[44px] border border-gray-300 rounded-full font-semibold text-sm flex items-center justify-center hover:bg-gray-100 transition">
                  Đăng nhập
                </button>
                <button onClick={() => { setIsLogin(false); setShowAuthModal(true); }} className="bg-red-600 text-white px-7 h-[44px] rounded-full font-semibold flex items-center justify-center shadow-md hover:bg-red-700 transition">
                  Đăng ký
                </button>
              </>
            )}
          </div>
        </div> 
      </header> 

      <MenuPanel openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </>
  );
};

export default TopClient;