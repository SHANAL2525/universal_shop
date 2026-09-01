import { CategoryFilter } from '../components/catalogue/CategoryFilter';
import { ProductGrid } from '../components/catalogue/ProductGrid';
import { SearchBar } from '../components/catalogue/SearchBar';
import { EmptyState } from '../components/shared/EmptyState';
import { products } from '../data/products';
import { useProductSearch } from '../hooks/useProductSearch';
import { useShopConfig } from '../hooks/useShopConfig';
export default function CataloguePage() { const shop = useShopConfig(); const search = useProductSearch(products); const featured = products.filter((p) => p.isFeatured).slice(0, 4); return <>
  <section className="catalogue-intro"><div className="container intro-inner"><div><span className="kicker">New season · Colombo</span><h1>{shop.tagline}</h1><p>Thoughtful everyday pieces, selected for how you really live.</p></div><div className="intro-note"><span>Free islandwide delivery</span><small>on orders over Rs. 12,000</small></div></div></section>
  <section className="container catalogue"><div className="catalogue-tools"><SearchBar value={search.query} onChange={search.setQuery}/><CategoryFilter value={search.category} onChange={search.setCategory}/></div>
    {!search.query && search.category === 'All' && <section className="featured"><div className="section-heading"><div><span className="kicker">Editor’s selection</span><h2>Fresh arrivals</h2></div><span>{featured.length} curated pieces</span></div><ProductGrid products={featured}/></section>}
    <section><div className="section-heading"><div><span className="kicker">The collection</span><h2>{search.category === 'All' ? 'Shop all' : search.category}</h2></div><span>{search.filteredProducts.length} {search.filteredProducts.length === 1 ? 'piece' : 'pieces'}</span></div>{search.filteredProducts.length ? <ProductGrid products={search.filteredProducts}/> : <EmptyState query={search.query} onReset={search.reset}/>}</section>
  </section></>; }
