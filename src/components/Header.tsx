import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

// Component Header: hiển thị phần đầu trang với tiêu đề và menu điều hướng

const Header = () => (
  <header className="header">
    <h2>Cửa Hàng Thời Trang TLU</h2>
    <nav>
      <NavLink to="/" end className="link-btn">Trang chủ</NavLink>
      <NavLink to="/products" className="link-btn">Sản phẩm</NavLink>
      <NavLink to="/about" className="link-btn">Giới thiệu</NavLink>
  </nav>
  </header>
);

export default Header;
