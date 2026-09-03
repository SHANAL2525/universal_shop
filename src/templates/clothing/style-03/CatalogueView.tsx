import { ArrowDownRight } from 'lucide-react';
import { products } from '../../../data/products';
import { useProductSearch } from '../../../hooks/useProductSearch';
import { CategoryFilter } from './CategoryFilter';
import { EmptyState } from './EmptyState';
import { ProductCard } from './ProductCard';
import { SearchBar } from './SearchBar';

export default function CatalogueView() {
  const search = useProductSearch(products);
  const newDrop = products.filter((product) => product.isNew || product.isFeatured).slice(0, 4);
  const grid = (items: typeof products) => <div className="product-grid">{items.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 4}/>)}</div>;

  return <>
    <section className="spatial-hero">
      <div className="hero-grid" aria-hidden="true"/>
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="kicker"><i aria-hidden="true"/> 03 / New system</span>
          <h1><span>Wear the</span><span>next layer.</span></h1>
          <p>Modern essentials, reframed for now.</p>
          <a href="#neo-collection">Explore the drop <ArrowDownRight aria-hidden="true"/></a>
        </div>
        <div className="spatial-scene" aria-hidden="true">
          <span className="scene-glow"/>
          <span className="scene-sphere"/>
          <span className="scene-ring"/>
          <span className="scene-slab"/>
          <span className="scene-orbit"/>
        </div>
      </div>
    </section>

    <section className="container catalogue" id="neo-collection">
      <div className="catalogue-tools">
        <SearchBar value={search.query} onChange={search.setQuery}/>
        <CategoryFilter value={search.category} onChange={search.setCategory}/>
      </div>

      {!search.query && search.category === 'All' && <section className="featured">
        <div className="section-heading">
          <div><span className="section-number">01</span><div><span className="kicker">Selected arrivals</span><h2>New drop</h2></div></div>
          <span>{newDrop.length} pieces</span>
        </div>
        {grid(newDrop)}
      </section>}

      <section>
        <div className="section-heading">
          <div><span className="section-number">02</span><div><span className="kicker">The collection</span><h2>{search.category === 'All' ? 'All pieces' : search.category}</h2></div></div>
          <span>{search.filteredProducts.length} {search.filteredProducts.length === 1 ? 'piece' : 'pieces'}</span>
        </div>
        {search.filteredProducts.length ? grid(search.filteredProducts) : <EmptyState query={search.query} onReset={search.reset}/>} 
      </section>
    </section>
  </>;
}
