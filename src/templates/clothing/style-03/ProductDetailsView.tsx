import { ArrowLeft, Box, PackageCheck, ShieldCheck, Truck } from 'lucide-react';
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

  if (!details.product) return <section className="container not-found">
    <div className="not-found-orbit" aria-hidden="true"/>
    <Box aria-hidden="true"/>
    <span className="kicker">Error / 404</span>
    <h1>Piece not found.</h1>
    <p>This item may have moved beyond the current collection.</p>
    <Link className="button" to={routes.clothing('style-03')}><ArrowLeft aria-hidden="true"/> Return to the catalogue</Link>
  </section>;

  const product = details.product;
  return <>
    <div className="container product-page">
      <Link className="back-link" to={routes.clothing('style-03')}><ArrowLeft aria-hidden="true"/> Back to catalogue</Link>
      <div className="product-layout">
        <ProductGallery images={product.images}/>
        <section className="product-info" aria-labelledby="product-title">
          <span className="panel-index" aria-hidden="true">03</span>
          <div className="eyebrow">{product.category} / {product.code}</div>
          <h1 id="product-title">{product.name}</h1>
          <PriceDisplay price={product.price} originalPrice={product.originalPrice} large/>
          <StockBadge status={product.stockStatus}/>
          <p className="lead">{product.shortDescription}</p>
          <div className="divider"/>
          <ProductOptions label="Size" options={product.sizes} selected={details.size} error={details.errors.size} onSelect={details.selectSize}/>
          <ProductOptions label="Colour" kind="colour" options={product.colours} selected={details.colour} error={details.errors.colour} onSelect={details.selectColour}/>
          <QuantitySelector value={details.quantity} max={product.stockQuantity} disabled={!product.stockQuantity} onChange={details.setQuantity}/>
          <p className="stock-count" aria-live="polite">{details.availability}</p>
          <WhatsAppOrderButton product={product} size={details.size} colour={details.colour} quantity={details.quantity} onValidation={details.setErrors}/>
          <div className="product-description"><span className="kicker">Detail / 01</span><h2>Product details</h2><p>{product.description}</p></div>
          <div className="service-points"><span><PackageCheck aria-hidden="true"/> Quality checked</span><span><Truck aria-hidden="true"/> Islandwide delivery</span><span><ShieldCheck aria-hidden="true"/> WhatsApp ordering</span></div>
        </section>
      </div>
    </div>
    <RelatedProducts products={details.related}/>
  </>;
}
