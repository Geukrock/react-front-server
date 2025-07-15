import { useEffect, useState } from "react";
import { Product, ProductDetail, DetailImageUrl } from "types/product";
import * as PrdouctApi from "api/ProductApi";


export function useProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
  const [detailImageUrls, setDetailImageUrls] = useState<DetailImageUrl[]>([]);
  const [loading, setLoading] = useState(false);

  // 제품 목록 조회
  const onLoadProducts = async () => {
    setLoading(true);
    try {
      const data = await PrdouctApi.fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("제품 목록 불러오기 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 제품 상세 단건 조회
  const onLoadProductDetail = async (id: number) => {
    setLoading(true);
    try {
      const data = await PrdouctApi.fetchProductDetail(id);
      setProductDetail(data);
    } catch (error) {
      console.error("제품 상세 단건 조회 오류: ", error);
    } finally {
      setLoading(true);
    }
  }

  // 제품 삭제
  const onDeleteProduct = async (id: number) => {
    try {
      await PrdouctApi.deleteProduct(id);
      await onLoadProducts(); // 삭제 후 목록 새로고침
    } catch (error) {
      console.error("제품 삭제 오류:", error);
    }
  };

  // 제품 수정
  const onUpdateProduct = async (formData: FormData) => {
    try {
      await PrdouctApi.updateProduct(formData);
      await onLoadProducts();
    } catch (error) {
      console.error("제품 수정 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 제품 등록
  const onCreateProduct = async (formData: FormData) => {
    try {
      await PrdouctApi.createProduct(formData);
      await onLoadProducts();
    } catch (error) {
      console.error("제품 등록 오류:", error);
      throw error;
    }
  };

  // 상세 이미지 조회
  const onLoadDetailImages = async (id: number) => {
    setLoading(true);
    try {
      const data = await PrdouctApi.fetchDetailImageUrls(id);
      setDetailImageUrls(data);
    } catch (error) {
      console.error("상세 이미지 조회 오류: ", error);
    } finally {
      setLoading(false);
    }
  };

  // 상세 이미지 추가
  const onCreateDetailImages = async (id: number, formData: FormData) => {
    try {
      await PrdouctApi.addDetailImages(id, formData);
    } catch (error) {
      console.log("상세 이미지 추가 오류: " + error);
    }
  };

  // 상세 이미지 삭제
  const onDeleteDetailImage = async (id: number) => {
    try {
      await PrdouctApi.deleteDetailImage(id);
    } catch (error) {
      console.log("상세 이미지 삭제 오류: " + error)
    }
  };

  // 상세 이미지 시퀀스 수정
  const onUpdateDetailImageSequence = async (detailImageId: number, newSequence: number) => {
    try {
      await PrdouctApi.updateDetailImageSequence(detailImageId, newSequence);
    } catch (error) {
      console.log("상세 이미지 시퀀스 수정 오류: " + error);
    }
  }

  return {
    products,
    productDetail,
    detailImageUrls,
    loading,
    onLoadProducts,
    onDeleteProduct,
    onUpdateProduct,
    onCreateProduct,
    onLoadProductDetail,
    onLoadDetailImages,
    onDeleteDetailImage,
    onCreateDetailImages,
    onUpdateDetailImageSequence,
  };
}
