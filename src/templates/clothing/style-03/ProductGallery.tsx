import { useEffect, useState } from 'react';
import { ErrorState } from '../../../components/shared/ErrorState';
import type { ProductImage } from '../../../types/product.types';

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState(false);
  useEffect(() => { setActive(0); setFailed(false); }, [images]);
  const current = images[active] ?? images[0];

  if (!current) return <div className="gallery gallery--single"><div className="gallery-main"><ErrorState/></div></div>;

  return <div className={`gallery${images.length < 2 ? ' gallery--single' : ''}`}>
    <div className="gallery-stage" aria-hidden="true"/>
    <div className="gallery-main">{failed ? <ErrorState/> : <img src={current.src} alt={current.alt} style={{ objectPosition: current.position }} width="900" height="1100" onError={() => setFailed(true)}/>}</div>
    {images.length > 1 && <div className="gallery-thumbs" aria-label="Product views">{images.map((image, index) => <button type="button" key={image.src} aria-label={`View ${image.alt}`} aria-pressed={active === index} onClick={() => { setActive(index); setFailed(false); }}><img src={image.src} alt="" style={{ objectPosition: image.position }} width="120" height="145" loading="lazy"/></button>)}</div>}
  </div>;
}
