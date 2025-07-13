export interface Product {
    id: number;
    name: string;
    price: number;
    selling: Boolean;
    thumbnailUrl: string;
  }

export interface ProductDetail extends Product{
    detailImageUrls: string[];
}

export interface DetailImageUrl{
    id: number;
    productId: number;
    detailImageUrl: string;
    sequence: number;
}