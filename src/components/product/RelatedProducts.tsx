import type { Product } from '../../types/product.types';
import { ProductCard } from '../catalogue/ProductCard';
export function RelatedProducts({ products }: { products: Product[] }) { if (!products.length) return null; return <section className="related container"><div className="section-heading"><div><span className="kicker">You may also like</span><h2>Complete the look</h2></div></div><div className="product-grid product-grid--related">{products.map((p) => <ProductCard key={p.id} product={p}/>)}</div></section>; }
