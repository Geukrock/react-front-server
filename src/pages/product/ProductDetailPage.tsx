
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "hooks/product/useProduct";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './productDetailPage.css';


function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  const {
    productDetail,
    onLoadProductDetail,
  } = useProduct();

  useEffect(() => {
    if (id) {
      onLoadProductDetail(Number(id));
    }
  }, [id]);

  const openGoogleForm = () => {
    window.open("https://forms.gle/C28X7tNS1eBA9Vu97");
  };

  console.log("랜더링됨")
  if (!productDetail) return <p>상품 불러오는 중</p>;

  return (
    <div className="container-fluid py-5">
      {/* <button
        className="btn btn-dark fixed-button shadow"
        onClick={openGoogleForm}
      >
        신청하기
      </button> */}

      {/* 제품 썸네일 및 정보 */}
      <div className="row justify-content-center">
        <div className="col-md-5">
          <img
            src={`${process.env.REACT_APP_API_URL}/images/${productDetail.thumbnailUrl}`}
            alt={productDetail.name}
            className="img-fluid rounded"
            style={{ maxHeight: "600px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-5">
          <h2>{productDetail.name}</h2>
          <h4 className="text-muted mt-2">
            가격: {productDetail.price.toLocaleString()}원
          </h4>
          <div className="mt-3">
            <span
              className={`badge fs-5 ${productDetail.selling ? "bg-success" : "bg-secondary"
                }`}
            >
              {productDetail.selling ? "신청 가능" : "신청 마감"}
            </span>
          </div>
          <div>
            <hr className="my-5" />
            <div className="d-flex justify-content-start">
              <button
                className="btn btn-dark btn"
                style={{ width: "100%", fontSize: "25px" }}
                onClick={openGoogleForm} // 구글 폼으로 이동
              >신청하기
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-5" />

      {/* 상세 이미지 */}
      <div className="row" style={{ gap: "200px", margin: "0px 0px 300px 0px" }}>
        {productDetail.detailImageUrls.map((url, idx) => (
          <div key={idx} className="col-12 mb-4 d-flex justify-content-center" >
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