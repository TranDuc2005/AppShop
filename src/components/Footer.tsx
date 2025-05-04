import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h4>Cửa Hàng Thời Trang TLU</h4>
        <p>Địa chỉ: Đường Nghiêm Xuân Yêm - Quận Hoàng Mai - TP.Hà Nội</p>
        <p>Điện thoại: 024.3852.2201</p>
        <p>Email: hoanhao@gmail.com</p>
      </div>
      <div className="footer-section">
        <h4>Danh mục</h4>
        <ul>
          <li><Link to="/products?category=ao">Áo</Link></li>
          <li><Link to="/products?category=quan">Quần</Link></li>
          <li><Link to="/products?category=mu">Mũ</Link></li>
          <li><Link to="/products?category=giay">Giày dép</Link></li>
          <li><Link to="/products?category=phukien">Phụ kiện</Link></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Liên kết</h4>
        <ul>
          <li><Link to="/about">Giới thiệu</Link></li>
          <li><Link to="/contact">Liên hệ</Link></li>
          <li><Link to="/policy">Chính sách</Link></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      © 2024 - Bài tập lớn Công Nghệ Web
    </div>
  </footer>
);

export default Footer;
