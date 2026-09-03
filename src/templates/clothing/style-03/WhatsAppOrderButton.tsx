import { ArrowUpRight, MessageCircle } from 'lucide-react';
import type { ProductSelectionErrors } from '../../../core/hooks/useProductDetails';
import { useWhatsAppOrder } from '../../../core/hooks/useWhatsAppOrder';
import type { Product } from '../../../types/product.types';

type Props = { product: Product; size?: string; colour?: string; quantity: number; onValidation: (errors: ProductSelectionErrors) => void };

export function WhatsAppOrderButton({ product, size, colour, quantity, onValidation }: Props) {
  const { disabled, order } = useWhatsAppOrder({ product, size, colour, quantity, onValidation });
  return <div className="order-panel">
    <div><span>Ready to order?</span><small>Continue directly with the seller.</small></div>
    <button type="button" className="whatsapp-button" disabled={disabled} onClick={order}>
      <MessageCircle aria-hidden="true"/> {disabled ? 'Currently out of stock' : 'Order via WhatsApp'} {!disabled && <ArrowUpRight aria-hidden="true"/>}
    </button>
    {disabled && <p className="disabled-note">Ordering is unavailable because this item is out of stock.</p>}
  </div>;
}
