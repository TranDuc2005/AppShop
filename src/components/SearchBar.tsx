import React from 'react';
// Định nghĩa kiểu dữ liệu cho props của SearchBar

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  placeholder?: string;
};
// Component SearchBar nhận vào các props từ cha

const SearchBar = ({ value, onChange, onSearch, placeholder = "Tìm sản phẩm..." }: SearchBarProps) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={(e) => e.key === 'Enter' && onSearch()}
    />
    <button className="button" onClick={onSearch}>Tìm kiếm</button>
  </div>
);


export default SearchBar;
