import React, { useEffect } from "react";
import { useProduct } from "hooks/useProduct";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './productList.css';

function ProductList() {
  const {
    products,
    onLoadProducts
  } = useProduct();

  useEffect(() => {
    onLoadProducts();
  }, []);

  return (
    <div className="container-fluid py-5">
      <div className="row g-2">
        {products.map((product) => (
          <div className="col-12 col-md-6 col-lg-4" key={product.id}>
            <div className="card-container">
              <Link
                to={`/products/${product.id}`}
                className="text-decoration-none text-reset"
              >
                <div className="thumbnail-head">
                  <img
                    className="thumbnail-image"
                    src={`${process.env.REACT_APP_API_URL}/images/` + product.thumbnailUrl}
                    alt="상품 이미지 준비 중"
                  />
                </div>
                <div className="ms-2 py-3">
                  <p className="mb-0 fs-5">{product.name}</p>
                  <p className="mb-0 fw-bold fs-5">{product.price.toLocaleString()}원</p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
