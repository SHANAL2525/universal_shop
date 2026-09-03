import { MessageCircle } from 'lucide-react';
import type { Product } from '../../types/product.types';
import { useShopConfig } from '../../hooks/useShopConfig';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '../../utils/whatsapp';
export function WhatsAppOrderButton({ product, size, colour, quantity, onValidation }: { product: Product; size?: string; colour?: string; quantity: number; onValidation: (errors: { size?: string; colour?: string }) => void }) {
  const shop = useShopConfig(); const disabled = product.stockQuantity === 0;
  const order = () => { const errors = { ...(product.sizes.length && !size ? { size: 'Please select a size.' } : {}), ...(product.colours.length && !colour ? { colour: 'Please select a colour.' } : {}) }; onValidation(errors); if (Object.keys(errors).length) return; const message = buildWhatsAppMessage(shop, product, { size, colour, quantity, productUrl: window.location.href }); window.open(buildWhatsAppUrl(shop.whatsappNumber, message), '_blank', 'noopener,noreferrer'); };
  return <><button type="button" className="whatsapp-button" disabled={disabled} onClick={order}><MessageCircle aria-hidden="true"/> {disabled ? 'Currently out of stock' : 'Order via WhatsApp'}</button>{disabled && <p className="disabled-note">Ordering is unavailable because this item is out of stock.</p>}</>;
}
