import { Search, X } from 'lucide-react';

export function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <label className="search">
    <span className="sr-only">Search products by name, item code or category</span>
    <Search aria-hidden="true"/>
    <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Find your next piece..."/>
    {value && <button type="button" aria-label="Clear search" onClick={() => onChange('')}><X aria-hidden="true"/></button>}
  </label>;
}
