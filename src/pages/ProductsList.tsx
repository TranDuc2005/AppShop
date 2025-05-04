import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
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
  if (name.includes('túi') || name.includes('nhẫn') || name.includes('vòng')) return 'Phụ kiện';
  return 'Khác';
};

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  //location

  useEffect(() => {
    // Lấy category từ URL nếu có
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      // Chuyển đổi category từ URL thành tên hiển thị
      switch(categoryParam) {
        case 'ao': setSelectedCategory('Áo'); break;
        case 'quan': setSelectedCategory('Quần'); break;
        case 'mu': setSelectedCategory('Mũ'); break;
        case 'giay': setSelectedCategory('Giày dép'); break;
        case 'phukien': setSelectedCategory('Phụ kiện'); break;
        default: setSelectedCategory('all');
      }
    }

    axios.get<Product[]>('/data.json')
      .then(res => {
        // Thêm category cho mỗi sản phẩm
        const productsWithCategories = res.data.map(product => ({
          ...product,
          category: getProductCategory(product)
        }));
        setProducts(productsWithCategories);
      })
      .catch(() => setError('Không lấy được danh sách sản phẩm.'));
  }, [location.search]);

  // Lọc sản phẩm theo tên và danh mục
  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Lấy danh sách các danh mục sản phẩm
  const categories = Array.from(new Set(products.map(p => p.category || 'Khác')));

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="products-page">
      <h3>Danh mục sản phẩm</h3>
      
      <div className="products-container">
        <div className="sidebar">
          <div className="category-filter">
            <h4>Danh mục sản phẩm</h4>
            <ul className="category-list">
              <li 
                className={selectedCategory === 'all' ? 'active' : ''}
                onClick={() => handleCategoryChange('all')}
              >
                Tất cả sản phẩm
              </li>
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={selectedCategory === category ? 'active' : ''}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
          
          
        </div>
        
        <div className="main-content">
          <SearchBar
            value={search}
            onChange={e => setSearch(e.target.value)}
            onSearch={() => {}}
            placeholder="Tìm kiếm sản phẩm..."
          />
          
          {error && <div style={{color: 'red'}}>{error}</div>}
          
          <div className="product-list">
            {filtered.map(p => (
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
          
          {filtered.length === 0 && <div>Không tìm thấy sản phẩm phù hợp.</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;