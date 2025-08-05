import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Main-top-bar';
import AdminList from './pages/admin/AdminList';
import AdminProduct from './pages/admin/AdminProduct'
import AdminProductDetailImage from './pages/admin/AdminProductDetailImage';
import AdminMemberList from './pages/admin/AdminMemberList';
import ProductList from './pages/product/ProductList';
import ProductDetailPage from './pages/product/ProductDetailPage';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<ProductList />} />
        <Route path="/admin" element={<AdminList />} />
        <Route path="/admin/products" element={<AdminProduct />} />
        <Route path="/admin/products/:id/detail-images" element={<AdminProductDetailImage />} />
        <Route path="/products" element={<ProductList />}/>
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path='/admin/members' element={<AdminMemberList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
