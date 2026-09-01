import { describe, expect, it } from 'vitest';
import { products } from '../data/products';
import { shopConfig } from '../config/shop.config';
import { buildWhatsAppMessage, buildWhatsAppUrl } from './whatsapp';
describe('WhatsApp ordering', () => {
  it('includes selected options and accurate total', () => {
    const product = products[0];
    const message = buildWhatsAppMessage(shopConfig, product, { size: 'M', colour: 'Beige', quantity: 2, productUrl: 'https://example.com/product/test' });
    expect(message).toContain('Size: M'); expect(message).toContain('Colour: Beige'); expect(message).toContain('Total: Rs. 14,980');
  });
  it('creates an encoded wa.me URL', () => {
    const url = buildWhatsAppUrl('+94 70 000 0000', 'Hello world');
    expect(url).toBe('https://wa.me/94700000000?text=Hello%20world');
  });
});
