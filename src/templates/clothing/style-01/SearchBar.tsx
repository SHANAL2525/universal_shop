import { Search, X } from 'lucide-react';

export function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <label className="search"><span className="sr-only">Search products by name, item code or category</span><Search size={19} aria-hidden="true"/><input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search by name or item code…"/>{value && <button type="button" aria-label="Clear search" onClick={() => onChange('')}><X size={18} aria-hidden="true"/></button>}</label>;
}
