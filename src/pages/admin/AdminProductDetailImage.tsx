import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './adminProduct.css';
import { useProduct } from "hooks/product/useProduct";
import { useParams } from 'react-router-dom';
import React, { ChangeEvent, useEffect, useRef } from "react";
import "./AdminProductDetailImage.css";
import { useLocation } from 'react-router-dom';



function AdminProductDetailImage() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const productName = location.state?.productName;

    const fileInputRef = useRef<HTMLInputElement>(null);
    const {
        detailImageUrls,
        onLoadDetailImages,
        onDeleteDetailImage,
        onCreateDetailImages,
    } = useProduct();

    useEffect(() => {
        onLoadDetailImages(Number(id));
    }, [id])

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleAddImages = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!id || !e.target.files) return;

        const files = Array.from(e.target.files);
        const formData = new FormData();

        files.forEach((file) => {
            formData.append("images", file);
        });
        try {
            await onCreateDetailImages(Number(id), formData);
            await onLoadDetailImages(Number(id));
        } catch (error) {
            console.error("이미지 업로드 또는 목록 조회 실패:", error);
        }
    };

    const handleDeleteImage = async (detailImageId: Number) => {
        try {
            await onDeleteDetailImage(Number(detailImageId));
            await onLoadDetailImages(Number(id));
        } catch (error) {
            console.error("이미지 업로드 또는 목록 조회 실패:", error);
        }
    };

    return (
        <div className='container'>
            <div className='text-center mb-5'>
                <h3>상세 이미지 수정</h3>
                <h1>{"제품: " + productName}</h1>
            </div>

            <div className="text-end mb-4">
                <button className="btn btn-primary" onClick={triggerFileInput}>
                    + 이미지 추가
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    accept="image/*"
                    onChange={handleAddImages}
                    style={{ display: "none" }}
                />
            </div>

            <div className="row">
                {detailImageUrls.map((detailImage, idx) => (
                    <div className="col-12 mb-4 d-flex justify-content-center" key={detailImage.id}>
                        <div className="card d-flex align-items-center" style={{ maxWidth: '300px', width: '100%' }}>
                            <img
                                src={`${process.env.REACT_APP_API_URL}/images/${detailImage.detailImageUrl}`}
                                alt={`상세 이미지 ${idx + 1}`}
                                className="img-fluid rounded"
                            />
                            <div className="d-flex justify-content-between align-items-center w-100 px-3">
                                <div className="d-flex gap-1">
                                    {/* <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleDeleteImage(detailImage.id)}
                                    >
                                        ▲
                                    </button>3
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleDeleteImage(detailImage.id)}
                                    >
                                        ▼
                                    </button> */}
                                </div>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteImage(detailImage.id)}
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default AdminProductDetailImage;