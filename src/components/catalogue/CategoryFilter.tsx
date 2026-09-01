import { categories } from '../../data/categories';
import type { Category } from '../../types/product.types';
import { useEffect, useRef } from 'react';
export function CategoryFilter({ value, onChange }: { value: 'All' | Category; onChange: (value: 'All' | Category) => void }) {
  const selectedRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { selectedRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', inline: 'nearest', block: 'nearest' }); }, [value]);
  return <div className="categories" role="group" aria-label="Product categories">{categories.map((item) => <button ref={value === item ? selectedRef : undefined} type="button" key={item} aria-pressed={value === item} onClick={() => onChange(item)}>{item}</button>)}</div>;
}
