
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "hooks/useProduct";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProductSelector from "components/ProductSelector";
import './productDetailPage.css';
import QuantityControl from "components/QuantityControl";


function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedItems, setSelectedItems] = useState<Record<string, string>[]>([]);
  
  const {
    productDetail,
    onLoadProductDetail,
  } = useProduct();

  useEffect(() => {
    if (id) {
      onLoadProductDetail(Number(id));
    }
  }, [id]);

  const handleSelectorComplete = (selectedItems: Record<string, string>[]) => {
    setSelectedItems(selectedItems);
  };

  if (!productDetail) return <p>상품 정보를 불러올 수 없습니다.</p>;

  return (
    <div className="container py-5">
      {/* 제품 썸네일 및 정보 */}
      <div className="row">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API_URL}/images/${productDetail.thumbnailUrl}`}
            alt={productDetail.name}
            className="img-fluid rounded"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{productDetail.name}</h2>
          <h4 className="text-muted mt-2">
            가격: {productDetail.price.toLocaleString()}원
          </h4>
          <div className="mt-3">
            <span
              className={`badge ${productDetail.selling ? "bg-success" : "bg-secondary"
                }`}
            >
              {productDetail.selling ? "신청 가능" : "신청 마감"}
            </span>
          </div>
          <div>
            <hr className="my-5" />
            <ProductSelector
              items={[
                { initialLabel: "사이즈 선택", label: "사이즈", options: ["S", "M", "L"] },
                { initialLabel: "색상 선택", label: "색상", options: ["검정", "흰색"] },
              ]}
              onComplete={handleSelectorComplete}
            />
          </div>
          <div className="selection-summary-list">
            {/* 선택된 아이템 항목 */}
            {selectedItems.map((sel, idx) => (
              <div key={idx} className="selection-summary-box">
                <div className="d-flex justify-content-between">
                  <strong>{Object.values(sel).join(" · ")}</strong>
                  <button className="selection-close-button">X</button>
                </div>
                <div className="d-flex justify-content-between">
                  < QuantityControl />
                  <strong>{productDetail.price.toLocaleString()}원</strong>
                </div>
              </div>
            ))}
            {/* 합계 및 신청 버튼 */}
            {selectedItems.length > 0 && (
              <div>
                <hr className="my-3" />
                <div className="d-flex justify-content-between mb-3 container">
                  <strong>총 {selectedItems.length}개</strong>
                  <strong>{(productDetail.price * selectedItems.length).toLocaleString()}원</strong>
                </div>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-dark btn btn-lg">신청하기</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="my-5" />

      {/* 상세 이미지 */}
      <div className="row">
        {productDetail.detailImageUrls.map((url, idx) => (
          <div key={idx} className="col-12 mb-4 d-flex justify-content-center">
            <img
              src={`${process.env.REACT_APP_API_URL}/images/${url}`}
              alt={`상세 이미지 ${idx + 1}`}
              className="img-fluid rounded"
              style={{ maxWidth: "1000px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default ProductDetailPage;