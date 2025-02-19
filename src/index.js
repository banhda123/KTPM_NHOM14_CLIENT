import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';
import AuthService from './services/AuthService';

// Interceptor cho mọi request để thêm token nếu đã đăng nhập
axios.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho mọi response để xử lý lỗi 401 (Unauthorized)
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      AuthService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Vô hiệu hóa các console warnings không cần thiết trong môi trường development
if (process.env.NODE_ENV === 'development') {
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    if (
      args.length > 0 &&
      typeof args[0] === 'string' &&
      (args[0].includes('manifest.json') || args[0].includes('favicon.ico'))
    ) {
      return;
    }
    originalConsoleWarn(...args);
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 