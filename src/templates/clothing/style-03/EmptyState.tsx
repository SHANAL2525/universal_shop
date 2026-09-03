import { SearchX } from 'lucide-react';

export function EmptyState({ query, onReset }: { query: string; onReset: () => void }) {
  return <div className="empty-state">
    <span className="empty-orbit" aria-hidden="true"><SearchX/></span>
    <span className="kicker">Search / 00</span>
    <h2>No pieces found.</h2>
    <p>{query ? <>Nothing matched “{query}”. Try another search or reset your filters.</> : 'There are no pieces in this category right now.'}</p>
    <button type="button" className="button" onClick={onReset}>Reset filters</button>
  </div>;
}
