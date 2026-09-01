import { useMemo, useState } from 'react';
import type { Category, Product } from '../types/product.types';
export const filterProducts = (products: Product[], query: string, category: 'All' | Category) => {
  const normalized = query.trim().toLowerCase().replace(/\s+/g, ' ');
  return products.filter((product) => {
    const categoryMatches = category === 'All' || product.category === category;
    const haystack = [product.name, product.code, product.category, product.audience, ...product.keywords].join(' ').toLowerCase();
    return categoryMatches && (!normalized || normalized.split(' ').every((term) => haystack.includes(term)));
  });
};
export const useProductSearch = (products: Product[]) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | Category>('All');
  const filteredProducts = useMemo(() => filterProducts(products, query, category), [products, category, query]);
  const reset = () => { setQuery(''); setCategory('All'); };
  return { query, setQuery, category, setCategory, filteredProducts, reset };
};
