import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShopConfig } from '../../hooks/useShopConfig';
import { buildShopContactUrl } from '../../utils/whatsapp';

export function ShopHeader() {
  const shop = useShopConfig();

  return <>
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label={`${shop.name} catalogue`}>
          <span>{shop.brandMark}</span>
          <small>Clothing / Footwear / Accessories</small>
        </Link>
        <a className="header-contact" href={buildShopContactUrl(shop)} target="_blank" rel="noreferrer" aria-label={`Contact ${shop.name} on WhatsApp`}>
          <MessageCircle size={19} aria-hidden="true"/>
          <span>WhatsApp</span>
        </a>
      </div>
    </header>
    <div className="promo-strip">New drop <span aria-hidden="true">·</span> Order directly through WhatsApp</div>
  </>;
}
