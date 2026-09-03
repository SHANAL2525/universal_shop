import type { Product } from '../../../types/product.types';
import { ProductCard } from './ProductCard';

export function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return <section className="related container">
    <div className="section-heading"><div><span className="section-number">03</span><div><span className="kicker">More from VÉRA</span><h2>You may also like</h2></div></div></div>
    <div className="product-grid product-grid--related">{products.map((product) => <ProductCard key={product.id} product={product}/>)}</div>
  </section>;
}
