import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category?: string;
  createdAt: string;
}

// Phân loại sản phẩm
const getProductCategory = (product: Product): string => {
  const name = product.name.toLowerCase();
  if (name.includes('áo')) return 'Áo';
  if (name.includes('quần')) return 'Quần';
  if (name.includes('mũ')) return 'Mũ';
  if (name.includes('giày') || name.includes('dép')) return 'Giày dép';
  if (name.includes('túi') || name.includes('nhẫn') || name.includes('vòng')) return 'Phụ kiện';
  return 'Khác';
};

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get<Product[]>('/data.json')
      .then(res => {
        // Lấy 3 sản phẩm nổi bật
        const productsWithCategories = res.data.map(product => ({
          ...product,
          category: getProductCategory(product)
        }));
        setProducts(productsWithCategories.slice(0, 3));
      })
      .catch(() => setError('Không lấy được dữ liệu sản phẩm.'));
  }, []);

  return (
    <div className="home-page">
      <div className="hero-section">
        <h3>Chào mừng bạn đến với Cửa Hàng Thời Trang TLU</h3>
        <p>Shop tiện ích, sản phẩm tốt với giá hợp lý. Chúng tôi cung cấp các sản phẩm thời trang chất lượng cho sinh viên và giới trẻ.</p>
        <div className="hero-features">
          <div className="feature-item">
            <div className="feature-icon">📦</div>
            <div className="feature-text">Sản phẩm đa dạng</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💰</div>
            <div className="feature-text">Giá cả hợp lý</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🚚</div>
            <div className="feature-text">Giao hàng nhanh chóng</div>
          </div>
        </div>
      </div>
      
      <div className="category-section">
        <h3>Danh mục sản phẩm</h3>
        <div className="category-grid">
          <Link to="/products?category=ao" className="category-item">
            <div className="category-icon">👕</div>
            <div className="category-name">Áo</div>
          </Link>
          <Link to="/products?category=quan" className="category-item">
            <div className="category-icon">👖</div>
            <div className="category-name">Quần</div>
          </Link>
          <Link to="/products?category=mu" className="category-item">
            <div className="category-icon">🧢</div>
            <div className="category-name">Mũ</div>
          </Link>
          <Link to="/products?category=giay" className="category-item">
            <div className="category-icon">👟</div>
            <div className="category-name">Giày dép</div>
          </Link>
          <Link to="/products?category=phukien" className="category-item">
            <div className="category-icon">👜</div>
            <div className="category-name">Phụ kiện</div>
          </Link>
        </div>
      </div>
      
      <div className="featured-products">
        <h3>Sản phẩm nổi bật</h3>
        {error && <div style={{color: 'red'}}>{error}</div>}
        <div className="product-list">
          {products.map(p => (
            <div key={p.id} className="product-card">
              <img src={p.image} alt={p.name} />
              {p.category && <div className="product-category-tag">{p.category}</div>}
              <div className="product-title">{p.name}</div>
              <div className="product-short">{p.description}</div>
              <div className="product-price">{p.price.toLocaleString()} đ</div>
              <div className="product-actions">
                <Link className="button" to={`/products/${p.id}`}>Xem chi tiết</Link>
                <button
                  className="button button-cart"
                  onClick={() => {
                    alert("Đã thêm vào giỏ hàng!");
                  }}
                    >
                      Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all">
          <Link className="button" to="/products">Xem tất cả sản phẩm</Link>
        </div>
      </div>
      
      <div className="contact-section">
        <h3>Liên hệ với chúng tôi</h3>
        <div className="contact-info">
          <p><strong>Địa chỉ:</strong> Đường Nghiêm Xuân Yêm - Quận Hoàng Mai - Tp.Hà Nội</p>
          <p><strong>Điện thoại:</strong> 024.3852.2201</p>
          <p><strong>Email:</strong> hoanhao@gmail.com</p>
        </div>
        
      </div>
    </div>
  );
};

export default Home;