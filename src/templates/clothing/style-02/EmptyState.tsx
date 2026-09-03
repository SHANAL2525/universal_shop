import { SearchX } from 'lucide-react';

export function EmptyState({ query, onReset }: { query: string; onReset: () => void }) {
  return <div className="empty-state"><SearchX size={30} aria-hidden="true"/><h2>No products found</h2><p>{query ? <>Nothing matched “{query}”. Try another word or clear your filters.</> : 'There are no products in this category right now.'}</p><button type="button" className="button button--dark" onClick={onReset}>Reset filters</button></div>;
}
