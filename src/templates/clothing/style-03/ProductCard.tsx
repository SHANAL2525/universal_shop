import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ErrorState } from '../../../components/shared/ErrorState';
import { PriceDisplay } from '../../../components/shared/PriceDisplay';
import { StockBadge } from '../../../components/shared/StockBadge';
import { routes } from '../../../config/routes.config';
import type { Product } from '../../../types/product.types';

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  return <article className="product-card">
    <Link to={routes.product('style-03', product.slug)} aria-label={`${product.name}, ${product.code}`}>
      <div className="product-card__image">
        {failed ? <ErrorState/> : <img src={product.thumbnail.src} alt={product.thumbnail.alt} style={{ objectPosition: product.thumbnail.position }} width="520" height="650" loading={priority ? 'eager' : 'lazy'} onError={() => setFailed(true)}/>} 
        <div className="badges">
          {product.isNew && <span className="badge-new">New</span>}
          {product.isSale && <span className="badge-sale">Sale</span>}
          {product.stockStatus === 'low-stock' && <span className="badge-stock">Low stock</span>}
          {product.stockStatus === 'out-of-stock' && <span className="badge-stock">Out of stock</span>}
        </div>
      </div>
      <div className="product-card__body">
        <div className="eyebrow">{product.category} / {product.code}</div>
        <div className="product-title-row"><h3>{product.name}</h3><ArrowUpRight aria-hidden="true"/></div>
        <PriceDisplay price={product.price} originalPrice={product.originalPrice}/>
        <StockBadge status={product.stockStatus}/>
      </div>
    </Link>
  </article>;
}
