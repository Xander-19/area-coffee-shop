import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { getCategories, getMenu } from '../services/api';
import MenuCard from '../components/MenuCard';

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [catsRes, menuRes] = await Promise.all([
          getCategories(),
          getMenu({ category: selectedCategory === 'all' ? undefined : selectedCategory, search: search || undefined }),
        ]);
        setCategories(Array.isArray(catsRes) ? catsRes : []);
        setProducts(Array.isArray(menuRes) ? menuRes : []);
      } catch {
        setCategories([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedCategory, search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.search?.value?.trim();
    setSearch(input ?? '');
  };

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page header */}
        <header className="text-center mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-heading)]">
            Our Menu
          </h1>
          <p className="text-[var(--color-muted)] mt-2">
            Handcrafted drinks made with care
          </p>
        </header>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-surface)] text-[var(--color-body)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(String(cat.id))}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === String(cat.id)
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-body)] border border-[var(--color-border)] hover:bg-[var(--color-border)]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto mb-10">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted)]" />
            <input
              type="text"
              name="search"
              placeholder="Search menu..."
              defaultValue={search}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-body)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
            />
          </div>
        </form>

        {/* Product grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-[var(--color-surface)] overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-[var(--color-border)]" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-[var(--color-border)] rounded w-3/4" />
                  <div className="h-4 bg-[var(--color-border)] rounded w-full" />
                  <div className="h-4 bg-[var(--color-border)] rounded w-1/2" />
                  <div className="h-10 bg-[var(--color-border)] rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[var(--color-muted)] text-lg">
              No products found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <MenuCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
