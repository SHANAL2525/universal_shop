import { CategoryFilter } from '../components/catalogue/CategoryFilter';
import { ProductGrid } from '../components/catalogue/ProductGrid';
import { SearchBar } from '../components/catalogue/SearchBar';
import { EmptyState } from '../components/shared/EmptyState';
import { products } from '../data/products';
import { useProductSearch } from '../hooks/useProductSearch';

export default function CataloguePage() {
  const search = useProductSearch(products);
  const newDrop = products.filter((product) => product.isNew || product.isFeatured).slice(0, 4);

  return <>
    <section className="catalogue-intro">
      <div className="container intro-inner">
        <span className="kicker">New season / 26</span>
        <h1>Clean fits.<br/>Everyday rotation.</h1>
        <p>Modern essentials for clothing, footwear and everything in between.</p>
      </div>
    </section>
    <section className="container catalogue">
      <div className="catalogue-tools">
        <SearchBar value={search.query} onChange={search.setQuery}/>
        <CategoryFilter value={search.category} onChange={search.setCategory}/>
      </div>
      {!search.query && search.category === 'All' && <section className="featured">
        <div className="section-heading"><h2>New drop</h2><span>{newDrop.length} selected</span></div>
        <ProductGrid products={newDrop}/>
      </section>}
      <section>
        <div className="section-heading"><h2>{search.category === 'All' ? 'All products' : search.category}</h2><span>{search.filteredProducts.length} {search.filteredProducts.length === 1 ? 'item' : 'items'}</span></div>
        {search.filteredProducts.length ? <ProductGrid products={search.filteredProducts}/> : <EmptyState query={search.query} onReset={search.reset}/>}
      </section>
    </section>
  </>;
}
