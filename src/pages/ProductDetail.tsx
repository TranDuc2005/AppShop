import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
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
  if (name.includes('túi') || name.includes('ví') || name.includes('balo')) return 'Phụ kiện';
  return 'Khác';
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get<Product[]>('/data.json')
      .then(res => {
        // Thêm category cho mỗi sản phẩm
        const productsWithCategories = res.data.map(product => ({
          ...product,
          category: getProductCategory(product)
        }));
        
        const found = productsWithCategories.find(p => p.id === Number(id));
        if (found) {
          setProduct(found);
          
          // Tìm sản phẩm liên quan (cùng danh mục)
          const related = productsWithCategories
            .filter(p => p.category === found.category && p.id !== found.id)
            .slice(0, 3);
          setRelatedProducts(related);
          
          setError('');
        } else {
          setError('Không tìm thấy sản phẩm.');
        }
      })
      .catch(() => setError('Không lấy được dữ liệu sản phẩm.'));
  }, [id]);

  const handleAddToCart = () => {
    alert(`Đã thêm ${quantity} ${product?.name} vào giỏ hàng!`);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  if (!product) return <div>Đang tải...</div>;

  return (
    <div className="product-detail-page">
      <div className="breadcrumb">
        <Link to="/">Trang chủ</Link> &gt; 
        <Link to="/products">Sản phẩm</Link> &gt; 
        <span>{product.name}</span>
      </div>
      
      <div className="product-detail-container">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <div className="product-category">Danh mục: {product.category}</div>
          <div className="product-price">Giá: {product.price.toLocaleString()} đ</div>
          <div className="product-description">{product.description}</div>
          <div className="product-meta">
            <div>Mã sản phẩm: {product.id}</div>
            <div>Ngày nhập: {product.createdAt}</div>
          </div>
          
          <div className="product-quantity">
            <label htmlFor="quantity">Số lượng:</label>
            <input 
              type="number" 
              id="quantity" 
              value={quantity} 
              onChange={handleQuantityChange} 
              min="1" 
            />
          </div>
          
          <div className="product-actions">
            <button className="button" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
            <button
              className="button button-primary"
              onClick={() => alert("Mua hàng thành công!")}
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h4>Sản phẩm liên quan</h4>
          <div className="product-list">
            {relatedProducts.map(p => (
              <ProductCard
                key={String(p.id)}
                id={p.id}
                name={p.name}
                description={p.description}
                image={p.image}
                price={p.price}
                category={p.category}
                onClick={() => navigate(`/products/${p.id}`)}
              />
            ))}
          </div>
        </div>
      )}
      
      <button className="button back-button" onClick={() => navigate('/products')}>
        Quay lại danh mục
      </button>
    </div>
  );
};

export default ProductDetail;
