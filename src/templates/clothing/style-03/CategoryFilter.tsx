import { categories } from '../../../data/categories';
import type { Category } from '../../../types/product.types';

export function CategoryFilter({ value, onChange }: { value: 'All' | Category; onChange: (value: 'All' | Category) => void }) {
  return <div className="category-rail"><div className="categories" role="group" aria-label="Product categories">
    {categories.map((item) => <button type="button" key={item} aria-pressed={value === item} onClick={() => onChange(item)}>{item}</button>)}
  </div></div>;
}
