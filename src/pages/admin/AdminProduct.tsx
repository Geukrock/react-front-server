import { useEffect, useState } from "react";
import ProductAdminHeader from "components/ProductAdminHeader";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from 'bootstrap';
import './adminProduct.css';
import ProductModal from "components/ProductModal";
import { useProduct } from "hooks/useProduct";
import { Product } from "types/product";
import { useNavigate } from 'react-router-dom';


function AdminProduct() {
  const navigate = useNavigate();

  const {
    products,
    onLoadProducts,
    onCreateProduct,
    onUpdateProduct,
    onDeleteProduct,
  } = useProduct();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    onLoadProducts();
  }, []);


  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setTimeout(() => {
      const modalElement = document.getElementById("productModal");
      if (modalElement) {
        const modal = Modal.getOrCreateInstance(modalElement);
        modal.show();
      }
    }, 0);
  };


  return (
    <>
      <ProductAdminHeader />
      <div className="container">
        <div className="mb-4">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#productModal"
            onClick={() => setEditingProduct(null)}
          >
            제품 등록
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>이름</th>
              <th>가격</th>
              <th>썸네일</th>
              <th>판매 여부</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map(product => (
                <tr key={product.id}>
                  <td style={{ width: '10%' }}>
                    <button
                      className="btn btn-warning btn-sm mb-1 me-1"
                      onClick={() => openEditModal(product)}
                    >수정</button>
                    <button
                      className="btn btn-danger btn-sm mb-1"
                      onClick={() => onDeleteProduct(product.id)}
                    >삭제</button>
                    <button
                      className="btn btn-info btn-sm mb-1"
                      onClick={() => navigate(`/admin/products/${product.id}/detail-images`, { state: { productName: product.name } })}
                      >상세 이미지 편집</button>
                  </td>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price.toLocaleString()}원</td>
                  <td>
                    <img
                      className="tumbnailImage"
                      src={`${process.env.REACT_APP_API_URL}/images/` + product.thumbnailUrl} alt="썸네일 없음" />
                  </td>
                  <td>{product.selling ? '판매 중' : '판매 중지'}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <ProductModal
        product={editingProduct}
        onCreate={onCreateProduct}
        onUpdate={onUpdateProduct} />
    </>
  );
}
export default AdminProduct;
