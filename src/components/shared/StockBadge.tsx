import type { StockStatus } from '../../types/product.types';
import { stockLabel } from '../../utils/stock';
export function StockBadge({ status }: { status: StockStatus }) { return <span className={`stock stock--${status}`}><span aria-hidden="true" />{stockLabel(status)}</span>; }
