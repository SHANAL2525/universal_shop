import { useShopConfig } from '../../hooks/useShopConfig';
import type { Product } from '../../types/product.types';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '../../utils/whatsapp';
import type { ProductSelectionErrors } from './useProductDetails';

interface WhatsAppOrderOptions {
  product: Product;
  size?: string;
  colour?: string;
  quantity: number;
  onValidation: (errors: ProductSelectionErrors) => void;
}

export function useWhatsAppOrder({ product, size, colour, quantity, onValidation }: WhatsAppOrderOptions) {
  const shop = useShopConfig();
  const disabled = product.stockQuantity === 0;

  const order = () => {
    const errors: ProductSelectionErrors = {
      ...(product.sizes.length && !size ? { size: 'Please select a size.' } : {}),
      ...(product.colours.length && !colour ? { colour: 'Please select a colour.' } : {}),
    };
    onValidation(errors);
    if (Object.keys(errors).length) return;
    const message = buildWhatsAppMessage(shop, product, { size, colour, quantity, productUrl: window.location.href });
    window.open(buildWhatsAppUrl(shop.whatsappNumber, message), '_blank', 'noopener,noreferrer');
  };

  return { disabled, order };
}
