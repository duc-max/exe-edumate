import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

import "./style.css"
import { Link } from 'react-router-dom';

function Footer() {
  return  <footer className="footer">
  <div className="container">
    <div className="footer-content">
      {/* Thông tin về website */}
      <div className="footer-section">
        <h3 className="footer-title">Học Cùng Thầy Cô</h3>
        <p className="footer-desc">Nền tảng kết nối gia sư chuyên nghiệp với học sinh trên toàn quốc.</p>
        <div className="social-links">
          <Link href="#" className="social-link">
            <FaFacebookF />
          </Link>
          <Link href="#" className="social-link">
            <FaTwitter />
          </Link>
          <Link href="#" className="social-link">
            <FaInstagram />
          </Link>
          <Link href="#" className="social-link">
            <FaYoutube />
          </Link>
        </div>
      </div>

      {/* Liên kết nhanh */}
      <div className="footer-section">
        <h3 className="footer-heading">Liên Kết Nhanh</h3>
        <ul className="footer-links">
          <li><Link href="#">Trang chủ</Link></li>
          <li><Link href="#">Tìm gia sư</Link></li>
          <li><Link href="#">Đăng ký làm gia sư</Link></li>
          <li><Link href="#">Khóa học trực tuyến</Link></li>
          <li><Link href="#">Blog giáo dục</Link></li>
        </ul>
      </div>

      {/* Hỗ trợ */}
      <div className="footer-section">
        <h3 className="footer-heading">Hỗ Trợ</h3>
        <ul className="footer-links">
          <li><Link href="#">Câu hỏi thường gặp</Link></li>
          <li><Link href="#">Hướng dẫn sử dụng</Link></li>
          <li><Link href="#">Chính sách bảo mật</Link></li>
          <li><Link href="#">Điều khoản sử dụng</Link></li>
          <li><Link href="#">Liên hệ</Link></li>
        </ul>
      </div>

      {/* Liên hệ */}
      <div className="footer-section">
        <h3 className="footer-heading">Liên Hệ</h3>
        <div className="contact-info">
          <p className="contact-item">
            <FiMapPin className="contact-icon" />
            <span>Đại học FPT, Hòa Lạc, Hà Nội</span>
          </p>
          <p className="contact-item">
            <FiPhone className="contact-icon" />
            <span>0123 456 789</span>
          </p>
          <p className="contact-item">
            <FiMail className="contact-icon" />
            <span>edumate@gmail.com</span>
          </p>
        </div>
      </div>
    </div>

    {/* Đăng ký nhận tin */}
    <div className="newsletter">
      <div className="newsletter-content">
        <div className="newsletter-info">
          <h3 className="footer-heading">Đăng Ký Nhận Thông Tin</h3>
          <p>Nhận thông tin về các khóa học mới và tài liệu giáo dục miễn phí.</p>
        </div>
        <div className="newsletter-form">
          <input
            type="email"
            className="newsletter-input"
            placeholder="Email của bạn"
          />
          <button className="newsletter-button">
            Đăng Ký
          </button>
        </div>
      </div>
    </div>

    {/* Copyright */}
    <div className="copyright">
      <p>&copy; {new Date().getFullYear()} Học Cùng Thầy Cô. Tất cả quyền được bảo lưu.</p>
    </div>
  </div>
</footer>
}

export default Footer;
