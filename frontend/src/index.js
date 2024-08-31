import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/Auth';
import { SearchProvider } from './context/Search';
import { CartProvider } from './context/CartContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
   <SearchProvider>
   <CartProvider>
   <BrowserRouter>
   <App />
   </BrowserRouter>
   </CartProvider>
   </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
