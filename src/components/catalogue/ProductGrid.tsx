import type { Product } from '../../types/product.types';
import { ProductCard } from './ProductCard';
export function ProductGrid({ products }: { products: Product[] }) { return <div className="product-grid">{products.map((product, i) => <ProductCard key={product.id} product={product} priority={i < 4}/>)}</div>; }
