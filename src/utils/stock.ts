import type { StockStatus } from '../types/product.types';
export const stockLabel = (status: StockStatus) => ({ 'in-stock': 'In Stock', 'low-stock': 'Low Stock', 'out-of-stock': 'Out of Stock' })[status];
