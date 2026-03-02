 import { useState, useEffect } from "react"; // Gộp import lại cho gọn và đúng cú pháp
import TopClient from '../../../layout/components/Participant/TopClient';
import BotClient from '../../../layout/components/Participant/BotClient';
import img1 from "../../../assets/images/sankhau1.jpg";
import img2 from "../../../assets/images/anhdamcuoi2.jpg";
import img3 from "../../../assets/images/hoithao1.jpg";
import { useNavigate } from "react-router-dom";
import AuthPage from '../DangKyDangNhap/AuthPage';

// Đã import component FAQ ở đây
import FAQAccordion from './FAQ';

export default function TrangChu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

// Thêm state để quản lý dữ liệu form
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    birthday: ''
  });

  // Hàm xử lý Đăng ký / Đăng nhập
  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');

    if (!isLogin) {
      // LOGIC ĐĂNG KÝ
      if (allUsers.find(u => u.email === formData.email)) {
        alert("Email này đã tồn tại!");
        return;
      }
      const newUser = { ...formData, name: formData.email.split('@')[0], avatar: "" };
      localStorage.setItem('all_users', JSON.stringify([...allUsers, newUser]));
      alert("Đăng ký thành công! Hãy đăng nhập.");
      setIsLogin(true); 
    } else {
      // LOGIC ĐĂNG NHẬP
      const user = allUsers.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        localStorage.setItem('token', 'fake-token-th');
        localStorage.setItem('user', JSON.stringify(user));
        alert("Đăng nhập thành công!");
        setShowAuthModal(false);
        window.location.reload(); // Reload để TopClient cập nhật giao diện
      } else {
        alert("Sai email hoặc mật khẩu!");
      }
    }
  };

  const navigate = useNavigate();

  // === BẮT ĐẦU: CODE CHO SLIDESHOW GIỚI THIỆU ===
  const aboutImages = [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30", // Ảnh 1 (gốc)
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87", // Ảnh 2 (sự kiện)
    "https://images.unsplash.com/photo-1511578314322-379afb476865"  // Ảnh 3 (đám đông)
  ];

  const [currentAboutImg, setCurrentAboutImg] = useState(0);

  useEffect(() => {
    // Cài đặt hẹn giờ: cứ 5000ms (5 giây) sẽ tự động nhảy sang ảnh tiếp theo
    const timer = setInterval(() => {
      setCurrentAboutImg((prev) => (prev + 1) % aboutImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 1. Thêm State để lưu gói đang được chọn (Mặc định chọn 'Pro')
  const [selectedPlan, setSelectedPlan] = useState('Pro');

  // 2. Tạo mảng dữ liệu cho 3 gói để code ngắn gọn hơn
  const pricingPlans = [
    {
      id: 'Basic',
      name: 'Basic',
      price: 'Miễn phí',
      desc: 'Phù hợp cho cá nhân, thử nghiệm hệ thống',
      features: ['✔ Tạo tối đa 3 sự kiện', '✔ Quản lý khách mời cơ bản', '✔ Thống kê đơn giản']
    },
    {
      id: 'Pro',
      name: 'Pro',
      price: '199k/tháng',
      desc: 'Dành cho tổ chức sự kiện thường xuyên',
      features: ['✔ Tạo sự kiện không giới hạn', '✔ Check-in QR Code', '✔ Báo cáo chi tiết', '✔ Hỗ trợ ưu tiên']
    },
    {
      id: 'Premium',
      name: 'Premium',
      price: '499k/tháng',
      desc: 'Giải pháp đầy đủ cho doanh nghiệp lớn',
      features: ['✔ Tất cả tính năng Pro', '✔ Quản lý nhiều tổ chức', '✔ API tích hợp', '✔ Báo cáo nâng cao']
    }
  ];
  // ===SlideShow giới thiệu ===
  const [list_slide] = useState([
    {
      hinh_anh: img1,
      title: "Nền tảng Tổ Chức Sự kiện Chuyên nghiệp",
      desc: "Giải pháp toàn diện để tổ chức, vận hành và phát triển sự kiện của bạn một cách dễ dàng."
    },
    {
      hinh_anh: img2,
      title: "Tạo nên những khoảnh khắc đáng nhớ",
      desc: "Từ hội nghị quy mô lớn đến các buổi workshop thân mật, chúng tôi đồng hành cùng thành công của bạn."
    },
    {
      hinh_anh: img3,
      title: "Kết nối cộng đồng đam mê",
      desc: "Khám phá hàng ngàn sự kiện hấp dẫn và mở rộng mạng lưới quan hệ ngay hôm nay."
    },
  ]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* ===== TOP CLIENT ===== */}
      <TopClient
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        scrollToTop={scrollToTop}
        setIsLogin={setIsLogin}
        setShowAuthModal={setShowAuthModal}
      />

      {/* ===== CAROUSEL PRO VERSION ===== */}
      <div id="carouselExample" className="carousel slide relative" data-bs-ride="carousel">
        {/* Đổi từ 550px lên 650px hoặc 700px */}
        <div className="carousel-inner h-[650px]">
          {list_slide.map((value, index) => (
            <div
              key={index}
              className={`carousel-item h-full ${index === 0 ? "active" : ""}`}
            >
              {/* Ảnh nền - Giữ object-cover để ảnh không bị méo */}
              <img
                src={value.hinh_anh}
                className="d-block w-100 h-full object-cover"
                alt="slide"
              />

              {/* Lớp phủ tối */}
              <div className="absolute inset-0 bg-black/45"></div>

              {/* NỘI DUNG CHỮ & NÚT BẤM (Đã bỏ nút Tạo sự kiện) */}
              <div className="absolute inset-0 flex flex-col justify-end items-center text-center text-white pb-32 z-10 container mx-auto">
                {/* Tiêu đề lớn */}
                <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {value.title}
                </h1>

                {/* Mô tả ngắn */}
                <p className="text-xl md:text-2xl mb-10 max-w-4xl text-gray-100 drop-shadow-lg animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
                  {value.desc}
                </p>

                {/* Chỉ để lại 1 nút Khám phá ngay duy nhất */}
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">
                  <button
                    onClick={() => navigate('/events')}
                    className="btn btn-danger btn-lg px-8 py-3 fw-bold rounded-pill shadow-lg hover:scale-110 transition-transform text-uppercase tracking-wider"
                  >
                    Khám phá ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nút mũi tên trái phải (Giữ nguyên) */}
        <button
          className="carousel-control-prev z-20"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next z-20"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
      {/* ===== QUICK ACTION ===== */}
      <div className="mb-5">
        <div className="container">
          <div className="row mb-5" style={{ marginTop: "-50px" }}>
            <div className="col-lg-8 mx-auto">
              <div className="row">
                {/* CARD TẠO SỰ KIỆN */}
                <div className="col-lg-6">
                  <div className="card border-bottom border-0 border-3 border-danger p-2 shadow-sm">
                    <div className="card-body d-flex justify-content-between">
                      <div>
                        <i className="fa-solid fa-calendar-plus fa-4x text-danger"></i>
                      </div>
                      <div className="ms-4 pe-5">
                        <h5 className="fw-bold">Tạo sự kiện nhanh</h5>
                        <p className="text-muted mb-2">
                          Tạo và quản lý sự kiện chỉ trong vài bước
                        </p>
                        <button className="btn btn-danger px-4 py-2">
                          <i className="fa-solid fa-plus me-2"></i>
                          Tạo sự kiện
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD NGƯỜI THAM GIA - Đã sửa style cho đồng nhất */}
                <div className="col-lg-6">
                  <div className="card border-bottom border-0 border-3 border-danger p-2 shadow-sm">
                    <div className="card-body d-flex justify-content-between">
                      <div>
                        {/* Đổi màu icon từ trắng (text-light) sang đỏ (text-danger) */}
                        <i className="fa-solid fa-users fa-4x text-danger"></i>
                      </div>
                      <div className="ms-4 pe-5">
                        {/* Bỏ class text-light để chữ thành màu đen mặc định */}
                        <h5 className="fw-bold">
                          Quản lý người tham gia
                        </h5>
                        {/* Đổi màu chữ mô tả sang màu xám mờ (text-muted) */}
                        <p className="text-muted mb-2">
                          Theo dõi danh sách người tham dự
                        </p>
                        {/* Đổi nút từ màu trắng (btn-light) sang màu đỏ (btn-danger) */}
                        <button className="btn btn-danger px-4 py-2">
                          <i className="fa-solid fa-eye me-2"></i>
                          Xem danh sách
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> {/* Đóng row */}
            </div> {/* Đóng col-lg-8 */}
          </div> {/* Đóng row mb-5 */}
        </div> {/* Đóng container */}
      </div> {/* Đóng thẻ div ngoài cùng của QUICK ACTION */}

      {/* ===== ABOUT EVENT PLATFORM ===== */}
      <div className="container"> {/* Đã thêm lại container bao bọc */}
        <div className="row bg-white border-0 shadow-sm mb-5 rounded-3 overflow-hidden"> {/* Đã thêm lại row bao bọc */}

          {/* Cột ảnh tự động lướt */}
          <div className="col-lg-6 ps-0 position-relative" style={{ height: "500px" }}>
            {aboutImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`event-${index}`}
                className={`position-absolute w-100 h-100 transition-opacity duration-1000 ${currentAboutImg === index ? "opacity-100" : "opacity-0"
                  }`}
                style={{ top: 0, left: 0, objectFit: "cover" }}
              />
            ))}
          </div>

          {/* Cột nội dung giới thiệu */}
          <div className="col-lg-6 py-4 px-4">
            <h5 className="text-uppercase text-danger fw-bold my-3">
              <i className="fa-solid fa-calendar-check fa-lg me-2"></i>
              Giới thiệu nền tảng
            </h5>
            <h3 className="fw-bold mb-4">
              Quản lý sự kiện chuyên nghiệp với công nghệ hiện đại
            </h3>
            <p className="fs-6 text-muted mb-4">
              Hệ thống quản lý sự kiện giúp bạn tạo, theo dõi và tổ chức sự kiện
              một cách nhanh chóng. Từ hội thảo, workshop, hội nghị đến sự kiện
              doanh nghiệp – tất cả đều được quản lý trên một nền tảng duy nhất.
            </p>
            <hr className="border border-danger border-2 opacity-75 w-75 mb-4" />
            <div className="row">
              <div className="col-lg-6">
                <ul className="list-unstyled">
                  <li className="text-secondary mb-3 fs-6">
                    <i className="fa-solid fa-calendar-days text-danger me-2"></i>
                    <strong>Tạo sự kiện không giới hạn</strong>
                  </li>
                  <li className="text-secondary mb-3 fs-6">
                    <i className="fa-solid fa-users text-danger me-2"></i>
                    <strong>Quản lý người tham gia</strong>
                  </li>
                  <li className="text-secondary mb-3 fs-6">
                    <i className="fa-solid fa-chart-line text-danger me-2"></i>
                    <strong>Báo cáo & thống kê chi tiết</strong>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul className="list-unstyled">
                  <li className="text-secondary mb-3 fs-6">
                    <i className="fa-solid fa-clock text-danger me-2"></i>
                    <strong>Theo dõi thời gian thực</strong>
                  </li>
                  <li className="text-secondary mb-3 fs-6">
                    <i className="fa-solid fa-ticket text-danger me-2"></i>
                    <strong>Check-in bằng QR code</strong>
                  </li>
                  <li className="text-secondary mb-3 fs-6">
                    <i className="fa-solid fa-shield text-danger me-2"></i>
                    <strong>Bảo mật dữ liệu cao</strong>
                  </li>
                </ul>
              </div>
            </div>
            <button className="btn btn-danger px-4 py-2 fw-bold">
              <i className="fa-solid fa-arrow-right me-2"></i>
              Khám phá thêm
            </button>
          </div>
        </div> {/* Đóng row */}
      </div> {/* Đóng container */}


      {/* ===== PRICING ===== */}
      <div className="container mb-5">
        <div className="card bg-light border-0 shadow-sm">
          <div className="card-body text-center p-4">
            <span className="badge bg-danger mb-2 d-inline-block">
              Bảng giá sử dụng
            </span>
            <h3 className="fw-bold mb-3">
              Chọn gói phù hợp để quản lý sự kiện của bạn
            </h3>
            <p className="text-muted mb-4">
              Hệ thống cung cấp nhiều gói dịch vụ khác nhau từ cơ bản đến chuyên nghiệp.
              Bạn có thể nâng cấp bất cứ lúc nào để mở khóa thêm tính năng.
            </p>

            <div className="row">
              {/* Dùng map để render 3 thẻ tự động */}
              {pricingPlans.map((plan) => {
                // Kiểm tra xem gói này có đang được chọn hay không
                const isSelected = selectedPlan === plan.id;

                return (
                  <div className="col-md-4 mb-3" key={plan.id}>
                    {/* Thẻ card sẽ đổi class CSS dựa trên trạng thái isSelected */}
                    <div
                      className={`card h-100 transition-all duration-300 cursor-pointer ${isSelected ? 'border-danger border-2 shadow-lg scale-105' : 'border-0 shadow-sm hover:shadow-md'
                        }`}
                      onClick={() => setSelectedPlan(plan.id)} // Click vào thẻ để chọn
                    >
                      <div className="card-body p-4 d-flex flex-column">
                        <h5 className="fw-bold text-dark">{plan.name}</h5>
                        <h3 className="text-danger my-2">{plan.price}</h3>
                        <p className="text-muted small mb-4">
                          {plan.desc}
                        </p>

                        <ul className="list-unstyled small text-start mb-4 flex-grow-1 mx-auto">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="mb-2 text-secondary">{feature}</li>
                          ))}
                        </ul>

                        {/* Nút bấm cũng tự động đổi màu */}
                        <button
                          className={`btn mt-auto w-100 fw-semibold transition-colors ${isSelected ? 'btn-danger' : 'btn-outline-danger'
                            }`}
                        >
                          Chọn gói
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* ===== FEATURED EVENTS / HOST ===== */}
      <div className="container mb-5">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center my-3">
              <div>
                <h3 className="fw-bold">Sự kiện & Nhà tổ chức nổi bật</h3>
                <p className="text-muted fs-6">
                  Những sự kiện được quan tâm nhiều nhất trên nền tảng
                </p>
              </div>
              <button className="btn btn-danger">Xem thêm</button>
            </div>
            <div className="row">
              {/* CARD 1 */}
              <div className="col-lg-4 col-md-6 mb-3">
                <div className="card border-danger border-3 rounded-4 h-100">
                  <div className="d-flex flex-column align-items-center p-3">
                    <img
                      src="https://images.unsplash.com/photo-1503424886307-b090341d25d1"
                      alt="event"
                      width="150"
                      height="150"
                      className="rounded-circle border p-1"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="bg-light px-3 py-2">
                    <div>
                      <span className="fw-semibold text-muted">Loại sự kiện: </span>
                      <span className="fw-bold text-danger">Hội thảo</span>
                    </div>
                    <div>
                      <span className="fw-semibold">500+ người tham gia</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5>
                      <i className="fa-solid fa-calendar me-2"></i>
                      <b>Tech Conference 2026</b>
                    </h5>
                    <hr />
                    <b>
                      <i className="fa-solid fa-location-dot me-2"></i>
                      TP. Hồ Chí Minh
                    </b>
                    <hr />
                    <b>
                      <i className="fa-solid fa-user me-2"></i>
                      Tổ chức bởi: EventPro
                    </b>
                    <button className="btn btn-danger w-100 mt-3">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>

              {/* CARD 2 */}
              <div className="col-lg-4 col-md-6 mb-3">
                <div className="card border-danger border-3 rounded-4 h-100">
                  <div className="d-flex flex-column align-items-center p-3">
                    <img
                      src="https://images.unsplash.com/photo-1511578314322-379afb476865"
                      alt="event"
                      width="150"
                      height="150"
                      className="rounded-circle border p-1"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="bg-light px-3 py-2">
                    <div>
                      <span className="fw-semibold text-muted">Loại sự kiện: </span>
                      <span className="fw-bold text-danger">Workshop</span>
                    </div>
                    <div>
                      <span className="fw-semibold">200+ người tham gia</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5>
                      <i className="fa-solid fa-calendar me-2"></i>
                      <b>Marketing Bootcamp</b>
                    </h5>
                    <hr />
                    <b>
                      <i className="fa-solid fa-location-dot me-2"></i>
                      Hà Nội
                    </b>
                    <hr />
                    <b>
                      <i className="fa-solid fa-user me-2"></i>
                      Tổ chức bởi: BizEvent
                    </b>
                    <button className="btn btn-danger w-100 mt-3">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>

              {/* CARD 3 */}
              <div className="col-lg-4 col-md-6 mb-3">
                <div className="card border-danger border-3 rounded-4 h-100">
                  <div className="d-flex flex-column align-items-center p-3">
                    <img
                      src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                      alt="event"
                      width="150"
                      height="150"
                      className="rounded-circle border p-1"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="bg-light px-3 py-2">
                    <div>
                      <span className="fw-semibold text-muted">Loại sự kiện: </span>
                      <span className="fw-bold text-danger">Hội nghị</span>
                    </div>
                    <div>
                      <span className="fw-semibold">1000+ người tham gia</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5>
                      <i className="fa-solid fa-calendar me-2"></i>
                      <b>Startup Summit</b>
                    </h5>
                    <hr />
                    <b>
                      <i className="fa-solid fa-location-dot me-2"></i>
                      Đà Nẵng
                    </b>
                    <hr />
                    <b>
                      <i className="fa-solid fa-user me-2"></i>
                      Tổ chức bởi: Innovate VN
                    </b>
                    <button className="btn btn-danger w-100 mt-3">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FAQ SECTION ĐÃ TÁCH FILE ===== */}
      <FAQAccordion />

      {/* ===== BOT CLIENT ===== */}
      {/* Thêm Modal AuthPage vào đây */}
      <AuthPage 
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />          
      <BotClient />
    </div>
  );
}