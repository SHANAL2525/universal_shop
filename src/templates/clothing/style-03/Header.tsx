import { LayoutGrid, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { routes } from '../../../config/routes.config';
import { useShopConfig } from '../../../hooks/useShopConfig';
import { buildShopContactUrl } from '../../../utils/whatsapp';

export function Header() {
  const shop = useShopConfig();
  return <header className="site-header">
    <div className="container header-inner">
      <Link className="brand" to={routes.clothing('style-03')} aria-label={`${shop.name} Neo Spatial catalogue`}>
        <span>{shop.brandMark}</span>
        <small>Fashion / Footwear / Objects</small>
      </Link>
      <span className="header-edition" aria-label="Style 03, Neo Spatial">03 / Neo Spatial</span>
      <div className="header-actions">
        <Link className="template-return" to="/" aria-label="View other catalogue designs"><LayoutGrid aria-hidden="true"/><span>View other designs</span></Link>
        <a className="header-contact" href={buildShopContactUrl(shop)} target="_blank" rel="noreferrer" aria-label={`Contact ${shop.name} on WhatsApp`}><MessageCircle aria-hidden="true"/><span>WhatsApp</span></a>
      </div>
    </div>
  </header>;
}
