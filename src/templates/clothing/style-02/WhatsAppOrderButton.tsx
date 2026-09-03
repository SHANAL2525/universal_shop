import { MessageCircle } from 'lucide-react';
import { useWhatsAppOrder } from '../../../core/hooks/useWhatsAppOrder';
import type { ProductSelectionErrors } from '../../../core/hooks/useProductDetails';
import type { Product } from '../../../types/product.types';

export function WhatsAppOrderButton({ product, size, colour, quantity, onValidation }: { product: Product; size?: string; colour?: string; quantity: number; onValidation: (errors: ProductSelectionErrors) => void }) {
  const { disabled, order } = useWhatsAppOrder({ product, size, colour, quantity, onValidation });
  return <><button type="button" className="whatsapp-button" disabled={disabled} onClick={order}><MessageCircle aria-hidden="true"/> {disabled ? 'Currently out of stock' : 'Order via WhatsApp'}</button>{disabled && <p className="disabled-note">Ordering is unavailable because this item is out of stock.</p>}</>;
}
