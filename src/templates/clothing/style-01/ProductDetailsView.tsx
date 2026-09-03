import { ArrowLeft, PackageCheck, ShieldCheck, Truck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { PriceDisplay } from '../../../components/shared/PriceDisplay';
import { StockBadge } from '../../../components/shared/StockBadge';
import { routes } from '../../../config/routes.config';
import { useProductDetails } from '../../../core/hooks/useProductDetails';
import { ProductGallery } from './ProductGallery';
import { ProductOptions } from './ProductOptions';
import { QuantitySelector } from './QuantitySelector';
import { RelatedProducts } from './RelatedProducts';
import { WhatsAppOrderButton } from './WhatsAppOrderButton';

export default function ProductDetailsView() {
  const { slug } = useParams();
  const details = useProductDetails(slug);
  if (!details.product) return <section className="container not-found"><span className="kicker">Product unavailable</span><h1>We couldn’t find that piece.</h1><p>It may have been renamed or removed from the current collection.</p><Link className="button button--dark" to={routes.clothing('style-01')}>Browse the catalogue</Link></section>;
  const product = details.product;
  return <><div className="container product-page"><Link className="back-link" to={routes.clothing('style-01')}><ArrowLeft aria-hidden="true"/> Back to catalogue</Link><div className="product-layout"><ProductGallery images={product.images}/><section className="product-info"><div className="eyebrow">{product.category} · {product.code}</div><h1>{product.name}</h1><PriceDisplay price={product.price} originalPrice={product.originalPrice} large/><StockBadge status={product.stockStatus}/><p className="lead">{product.shortDescription}</p><div className="divider"/><ProductOptions label="Size" options={product.sizes} selected={details.size} error={details.errors.size} onSelect={details.selectSize}/><ProductOptions label="Colour" options={product.colours} selected={details.colour} error={details.errors.colour} onSelect={details.selectColour}/><QuantitySelector value={details.quantity} max={product.stockQuantity} disabled={!product.stockQuantity} onChange={details.setQuantity}/><p className="stock-count" aria-live="polite">{details.availability}</p><WhatsAppOrderButton product={product} size={details.size} colour={details.colour} quantity={details.quantity} onValidation={details.setErrors}/><div className="product-description"><h2>About this piece</h2><p>{product.description}</p></div><div className="service-points"><span><PackageCheck aria-hidden="true"/> Quality checked</span><span><Truck aria-hidden="true"/> Islandwide delivery</span><span><ShieldCheck aria-hidden="true"/> Secure WhatsApp ordering</span></div></section></div></div><RelatedProducts products={details.related}/></>;
}
