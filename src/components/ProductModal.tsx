import React, { useRef } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Product } from 'types/product';


interface ProductModalProps {
  product: Product | null;
  onCreate: (formData: FormData) => Promise<void>;
  onUpdate: (formData: FormData) => Promise<void>;
}

function ProductModal({product, onCreate,onUpdate}: ProductModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const isEdit = Boolean(product);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    if(!formData.has("selling")){
      formData.append("selling", "false");
    }

    try {
      if (isEdit) {
        await onUpdate(formData);
      } else {
        await onCreate(formData);
      }
      window.location.reload();
    } catch (error) {
      alert("오류 발생");
      console.error(error);
    }
  };

  return (
    <div
      className="modal fade"
      id="productModal"
      tabIndex={-1}
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title" id="productModalLabel">제품 등록</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="닫기"></button>
          </div>

          <div className="modal-body">
            <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">제품 이름</label>
                <input type="text" className="form-control" id="productName" name="name" autoComplete="off" defaultValue={product?.name}/>
              </div>

              <div className="mb-3">
                <label htmlFor="productPrice" className="form-label">가격</label>
                <input type="number" className="form-control" id="productPrice" name="price" defaultValue={product?.price}/>
              </div>

              <div className="mb-4">
                <label htmlFor="productThumbnail" className="form-label">썸네일 이미지</label>
                <input type="file" className="form-control" id="productThumbnail" name="image" />
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="productSelling"
                  name="selling"
                  value="true"
                  defaultChecked={product ? !!product.selling : true}
                />
                <label className="form-check-label" htmlFor="productSelling">판매 여부</label>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                <button type="submit" className={product? "btn btn-warning": "btn btn-primary"}>{product? "수정" : "등록"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;