import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // Khởi tạo React root và render ứng dụng
  <React.StrictMode>
    {/* BrowserRouter giúp điều hướng giữa các trang bằng React Router */}
    <BrowserRouter> {}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
