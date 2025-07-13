import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Main-top-bar';
import Home from './pages/Home';
import AdminList from './pages/admin/AdminList';
import AdminProduct from './pages/admin/AdminProduct'
import AdminProductDetailImage from './pages/admin/AdminProductDetailImage';
import ProductList from './pages/product/ProductList';
import ProductDetailPage from './pages/product/ProductDetailPage';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminList />} />
        <Route path="/admin/products" element={<AdminProduct />} />
        <Route path="/admin/products/:id/detail-images" element={<AdminProductDetailImage />} />
        <Route path="/products" element={<ProductList />}/>
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
