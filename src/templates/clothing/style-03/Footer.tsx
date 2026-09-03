import { Camera, MessageCircle, Share2 } from 'lucide-react';
import { useShopConfig } from '../../../hooks/useShopConfig';
import { buildShopContactUrl } from '../../../utils/whatsapp';

export function Footer() {
  const shop = useShopConfig();
  return <footer className="site-footer">
    <div className="footer-orbit" aria-hidden="true"/>
    <div className="container footer-inner">
      <div className="footer-brand"><span>{shop.brandMark}</span><p>Neo Spatial / Collection 03</p></div>
      <p className="footer-categories">Clothing <i/> Footwear <i/> Accessories</p>
      <div className="footer-links">
        <a href={buildShopContactUrl(shop)} target="_blank" rel="noreferrer" aria-label={`Contact ${shop.name} on WhatsApp`}><MessageCircle aria-hidden="true"/> WhatsApp</a>
        <a href={shop.instagramUrl} target="_blank" rel="noreferrer" aria-label={`${shop.name} on Instagram`}><Camera aria-hidden="true"/> Instagram</a>
        <a href={shop.facebookUrl} target="_blank" rel="noreferrer" aria-label={`${shop.name} on Facebook`}><Share2 aria-hidden="true"/> Facebook</a>
      </div>
    </div>
    <div className="container copyright">© {new Date().getFullYear()} {shop.name}. Demo catalogue.</div>
  </footer>;
}
