export function LoadingSkeleton() { return <div className="skeleton-grid" aria-label="Loading products">{Array.from({length: 8}, (_,i) => <div className="skeleton" key={i}/>)}</div>; }
