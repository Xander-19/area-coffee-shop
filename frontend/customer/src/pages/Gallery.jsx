import { useState, useEffect, useCallback } from 'react';
import { FiMaximize2, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { getGallery } from '../services/api';

const CATEGORIES = ['All', 'Drinks', 'Shop', 'Events', 'Food', 'Community'];

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categoryParam = selectedCategory === 'All' ? undefined : selectedCategory;

  useEffect(() => {
    setLoading(true);
    getGallery(categoryParam)
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [categoryParam]);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : items.length - 1));
  }, [items.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i < items.length - 1 ? i + 1 : 0));
  }, [items.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, goPrev, goNext]);

  const currentItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Page header */}
        <header className="text-center mb-12">
          <h1 className="anim-fade-up anim-delay-200 text-4xl sm:text-5xl font-bold text-[var(--color-heading)] tracking-tight">
            Our Gallery
          </h1>
          <p className="anim-fade-up anim-delay-300 mt-3 text-lg text-[var(--color-body)] max-w-2xl mx-auto">
            A glimpse into our world of coffee
          </p>
        </header>

        {/* Filter tabs */}
        <div className="anim-fade-left anim-delay-400 flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[var(--color-primary)] text-white shadow-md'
                  : 'bg-[var(--color-surface)] text-[var(--color-body)] hover:bg-[var(--color-primary-hover)] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        {loading ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="break-inside-avoid mb-4 animate-pulse"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div
                  className={`rounded-xl bg-[var(--color-surface)] ${
                    i % 3 === 0 ? 'h-48' : i % 3 === 1 ? 'h-64' : 'h-72'
                  }`}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            key={selectedCategory}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4"
            style={{ animation: 'fadeIn 0.4s ease-out' }}
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                className="scroll-reveal scroll-fade-up break-inside-avoid mb-4 group cursor-pointer"
                style={{ animationDelay: `${index * 30}ms` }}
                onClick={() => openLightbox(index)}
              >
                <div className="rounded-xl overflow-hidden bg-[var(--color-surface)] shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <div
                      className={`bg-gradient-to-br from-[var(--color-primary)]/40 to-[var(--color-secondary)]/40 ${
                        index % 3 === 0 ? 'h-48' : index % 3 === 1 ? 'h-64' : 'h-72'
                      }`}
                    >
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                      <FiMaximize2 className="w-10 h-10 text-white" />
                      <span className="text-white font-medium text-center px-4">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && items.length === 0 && (
          <p className="text-center text-[var(--color-muted)] py-16">
            No images in this category yet.
          </p>
        )}
      </div>

      {/* Lightbox modal */}
      {lightboxIndex !== null && currentItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={(e) => e.target === e.currentTarget && closeLightbox()}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <FiX className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous"
          >
            <FiChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next"
          >
            <FiChevronRight className="w-8 h-8" />
          </button>

          <div
            className="max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-xl overflow-hidden bg-[var(--color-surface)]">
              <div className="aspect-video bg-gradient-to-br from-[var(--color-primary)]/40 to-[var(--color-secondary)]/40 flex items-center justify-center">
                {currentItem.imageUrl ? (
                  <img
                    src={currentItem.imageUrl}
                    alt={currentItem.title}
                    className="w-full h-full object-contain max-h-[70vh]"
                  />
                ) : (
                  <div className="w-full h-64" />
                )}
              </div>
              <div className="p-6 text-[var(--color-body)]">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-primary)]/20 text-[var(--color-primary)]">
                    {currentItem.category}
                  </span>
                  {currentItem.createdAt && (
                    <span className="text-sm text-[var(--color-muted)]">
                      {formatDate(currentItem.createdAt)}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-[var(--color-heading)] mb-2">
                  {currentItem.title}
                </h2>
                {currentItem.description && (
                  <p className="text-[var(--color-body)]">{currentItem.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </main>
  );
}
