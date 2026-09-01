export type Category = 'Women' | 'Men' | 'Kids' | 'Shoes' | 'Accessories';
export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface ProductImage { src: string; alt: string; position?: string; }
export interface Product {
  id: number; slug: string; code: string; name: string; category: Category; audience: string;
  shortDescription: string; description: string; price: number; originalPrice?: number; currency: 'LKR';
  images: ProductImage[]; thumbnail: ProductImage; sizes: string[]; colours: string[];
  stockQuantity: number; stockStatus: StockStatus; isNew: boolean; isSale: boolean; isFeatured: boolean; keywords: string[];
}
