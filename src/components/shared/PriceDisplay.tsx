import { formatCurrency } from '../../utils/currency';
export function PriceDisplay({ price, originalPrice, large = false }: { price: number; originalPrice?: number; large?: boolean }) {
  return <div className="price-row"><strong className={large ? 'price price--large' : 'price'}>{formatCurrency(price)}</strong>{originalPrice && <span className="old-price">{formatCurrency(originalPrice)}</span>}</div>;
}
