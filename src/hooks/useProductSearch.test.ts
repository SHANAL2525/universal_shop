import { describe, expect, it } from 'vitest';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { filterProducts } from './useProductSearch';

describe('catalogue product data and filtering', () => {
  it('contains 15 unique, complete, shareable products', () => {
    expect(products).toHaveLength(15);
    expect(new Set(products.map((p) => p.slug)).size).toBe(15);
    expect(new Set(products.map((p) => p.code)).size).toBe(15);
    products.forEach((product) => {
      expect(product.images.length).toBeGreaterThan(0);
      expect(product.description).toBeTruthy();
      expect(product.thumbnail.alt).toContain(product.name);
    });
  });

  it('covers every required category', () => {
    categories.filter((category) => category !== 'All').forEach((category) => expect(filterProducts(products, '', category).length).toBeGreaterThan(0));
  });

  it('supports name, code, keyword, case and whitespace search', () => {
    expect(filterProducts(products, '  VC-001  ', 'All')[0]?.name).toBe('Textured Fringe Poncho');
    expect(filterProducts(products, 'FRINGE', 'All')[0]?.code).toBe('VC-001');
    expect(filterProducts(products, '  knit   runners ', 'All')[0]?.code).toBe('VC-013');
  });

  it('combines category and search and supports empty results', () => {
    expect(filterProducts(products, 'dress', 'Women')).toHaveLength(2);
    expect(filterProducts(products, 'dress', 'Men')).toHaveLength(0);
    expect(filterProducts(products, '', 'All')).toHaveLength(15);
  });
});
