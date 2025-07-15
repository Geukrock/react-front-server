import axios from "axios";
import { DetailImageUrl, Product, ProductDetail} from "types/product";

const apiUrl = process.env.REACT_APP_API_URL;

// 제품 전체 조회
export async function fetchProducts(): Promise<Product[]> {
    const response = await axios.get<Product[]>(`${apiUrl}/products`);
    return response.data;
}

// 제품 단건 조회
export async function deleteProduct(id: number): Promise<void> {
    await axios.delete(`${apiUrl}/products/${id}`);
}

// 제품 수정
export async function updateProduct(formData: FormData) {
    // await axios.put(`http://localhost:8070/products/${product.id}`, formData);
}

// 제품 추가
export async function createProduct(formData: FormData) {
    const config = {
        headers: { "Content-Type": "multipart/form-data" },
    };
    const response = await axios.post(`${apiUrl}/products`, formData, config);
    return response.data;
}

// 제품 상세 조회
export async function fetchProductDetail(id:number) : Promise<ProductDetail> {
    const response = await axios.get<ProductDetail>(`${apiUrl}/products/${id}/with-detail-images`)
    return response.data;
}

// 상세 이미지 조회
export async function fetchDetailImageUrls(id:number) : Promise<DetailImageUrl[]>{
    const response = await axios.get<DetailImageUrl[]>(`${apiUrl}/products/${id}/detail-images`);
    return response.data;
}

// 상세 이미지 추가(배열)
export async function addDetailImages(id:number, formData: FormData) {
    const response = await axios.post(`${apiUrl}/products/${id}/detail-images`,formData);
    return response.data;
}

// 상세 이미지 삭제
export async function deleteDetailImage(id:number){
    await axios.delete(`${apiUrl}/products/detail-images/${id}`);
};

// 상세 이미지 시퀀스 수정
export async function updateDetailImageSequence(detailImageId: number, newSequence: number) {
    await axios.put(
      `${apiUrl}/products/detail-images/${detailImageId}/sequence`,
      { sequence: newSequence }
    );
  }

