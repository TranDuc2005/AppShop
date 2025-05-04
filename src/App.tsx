import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductsList from './pages/ProductsList';
import ProductDetail from './pages/ProductDetail';
import AboutPage from './pages/AboutPage';
import './styles/app.css';

const App = () => (
  // Router để xử lý định tuyến (URL -> Component)
  <Router>
    <Header />{/* Phần đầu trang (navigation, logo, v.v.) */}
     {/* Vùng nội dung chính của trang */}
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<AboutPage />} />
        
      </Routes>
    </div>
    <Footer />
  </Router>
);

export default App;
