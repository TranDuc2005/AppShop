import React from 'react';

type ProductCardProps = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category?: string;
  onClick: () => void;
};

const ProductCard = ({
  id,
  name,
  description,
  image,
  price,
  category,
  onClick
}: ProductCardProps) => {
  const handleAddToCart = () => {
    // Bạn có thể thêm logic xử lý thêm vào giỏ ở đây nếu cần
    alert("Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="product-card">
      <img src={image} alt={name} />
      {category && <div className="product-category-tag">{category}</div>}
      <div className="product-title">{name}</div>
      <div className="product-short">{description}</div>
      <div className="product-price">{price.toLocaleString()} đ</div>
      <div className="product-actions">
        <button className="button" onClick={onClick}>Xem chi tiết</button>
        <button className="button button-cart" onClick={handleAddToCart}>Thêm vào giỏ</button>
      </div>
    </div>
  );
};

export default ProductCard;
