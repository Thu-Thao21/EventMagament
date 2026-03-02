import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-top">
      <div className="container py-4">
        <div className="row">

          {/* Cột 1 */}
          <div className="col-lg-4 col-md-6">
            <h3 className="fw-bold mb-3 text-danger">
              <i className="fa-solid fa-calendar-check me-2"></i>
              Event Management System
            </h3>

            <p className="text-secondary mb-4">
              Chúng tôi cung cấp nền tảng quản lý sự kiện chuyên nghiệp giúp bạn
              tạo, theo dõi và tổ chức sự kiện dễ dàng, nhanh chóng và hiệu quả.
            </p>

            <div className="small">
              <p>
                <i className="fa-solid fa-location-dot me-2 text-danger"></i>
                01 Hoàng Minh Thảo, Hoà Khánh Nam, Liên Chiểu, Đà Nẵng
              </p>
              <p>
                <i className="fa-solid fa-phone me-2 text-danger"></i>
                0788606420
              </p>
              <p>
                <i className="fa-solid fa-envelope me-2 text-danger"></i>
                thuthaor120608@gmail.com
              </p>
              <p>
                <i className="fa-solid fa-clock me-2 text-danger"></i>
                Thứ 2 - Thứ 7: 8:00 - 18:00
              </p>
            </div>
          </div>

          {/* Cột 2 */}
          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="fw-bold mb-3 text-danger">Chức năng</h5>
            <ul className="list-unstyled small">
              <li className="mb-2">Tạo sự kiện</li>
              <li className="mb-2">Quản lý vé</li>
              <li className="mb-2">Quản lý người tham gia</li>
              <li className="mb-2">Theo dõi lịch</li>
              <li className="mb-2">Báo cáo thống kê</li>
            </ul>
          </div>

          {/* Cột 3 */}
          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="fw-bold mb-3 text-danger">Loại sự kiện</h5>
            <ul className="list-unstyled small">
              <li className="mb-2">Hội thảo</li>
              <li className="mb-2">Workshop</li>
              <li className="mb-2">Triển lãm</li>
              <li className="mb-2">Sự kiện doanh nghiệp</li>
              <li className="mb-2">Sự kiện giải trí</li>
            </ul>
          </div>

          {/* Cột 4 */}
          <div className="col-lg-4 col-md-12">
            <h5 className="fw-bold mb-3 text-danger">
              Nhận thông báo sự kiện mới
            </h5>

            <div className="border rounded-3 p-3 mb-3">
              <p className="text-secondary small">
                Đăng ký để nhận thông tin sự kiện và ưu đãi mới nhất từ chúng tôi
              </p>

              <div className="input-group mb-3">
                <span className="input-group-text bg-white">
                  <i className="fa-solid fa-envelope text-danger"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Nhập email của bạn..."
                />
              </div>

              <button className="btn btn-danger w-100">
                <i className="fa-solid fa-paper-plane me-2"></i>
                Đăng ký ngay
              </button>
            </div>

            {/* Social */}
            <div className="text-center">
              <p className="small text-secondary">Kết nối với chúng tôi</p>
              <div className="d-flex justify-content-center gap-3">
                <i className="fa-brands fa-facebook fs-5 text-danger"></i>
                <i className="fa-brands fa-x-twitter fs-5 text-danger"></i>
                <i className="fa-brands fa-instagram fs-5 text-danger"></i>
                <i className="fa-brands fa-linkedin fs-5 text-danger"></i>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-top">
        <div className="container py-3 d-flex flex-column flex-md-row justify-content-between align-items-center small">
          <span className="text-secondary">
            © 2026 Event Management System. All rights reserved.
          </span>

          <div className="d-flex gap-2 mt-2 mt-md-0">
            <button className="btn btn-outline-danger btn-sm">
              Chính sách bảo mật
            </button>
            <button className="btn btn-outline-danger btn-sm">
              Điều khoản sử dụng
            </button>
            <button className="btn btn-outline-danger btn-sm">
              Liên hệ
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
