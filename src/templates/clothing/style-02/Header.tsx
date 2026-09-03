import { LayoutGrid, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { routes } from '../../../config/routes.config';
import { useShopConfig } from '../../../hooks/useShopConfig';
import { buildShopContactUrl } from '../../../utils/whatsapp';

export function Header() {
  const shop = useShopConfig();
  return <><header className="site-header"><div className="container header-inner">
    <Link className="brand" to={routes.clothing('style-02')} aria-label={`${shop.name} Urban Minimal catalogue`}><span>{shop.brandMark}</span><small>Clothing / Footwear / Accessories</small></Link>
    <div className="header-actions"><Link className="template-return" to="/"><LayoutGrid aria-hidden="true"/><span>View other designs</span></Link><a className="header-contact" href={buildShopContactUrl(shop)} target="_blank" rel="noreferrer" aria-label={`Contact ${shop.name} on WhatsApp`}><MessageCircle size={19} aria-hidden="true"/><span>WhatsApp</span></a></div>
  </div></header><div className="promo-strip">New drop <span aria-hidden="true">·</span> Order directly through WhatsApp</div></>;
}
