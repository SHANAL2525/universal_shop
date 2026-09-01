import type { Product } from '../types/product.types';
import type { ShopConfig } from '../types/shop.types';
import { formatCurrency } from './currency';

export interface OrderDetails { size?: string; colour?: string; quantity: number; productUrl: string; }
export const buildWhatsAppMessage = (shop: ShopConfig, product: Product, order: OrderDetails) => [
  'Hello, I would like to order this item.', '', `Shop: ${shop.name}`, `Product: ${product.name}`, `Item Code: ${product.code}`,
  ...(order.size ? [`Size: ${order.size}`] : []), ...(order.colour ? [`Colour: ${order.colour}`] : []),
  `Quantity: ${order.quantity}`, `Unit Price: ${formatCurrency(product.price)}`, `Total: ${formatCurrency(product.price * order.quantity)}`,
  `Product Link: ${order.productUrl}`
].join('\n');
export const buildWhatsAppUrl = (number: string, message: string) => `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
export const buildShopContactUrl = (shop: ShopConfig) => buildWhatsAppUrl(shop.whatsappNumber, `Hello ${shop.name}, I would like to know more about your collection.`);
