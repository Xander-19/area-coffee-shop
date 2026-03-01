import { useState, useEffect, useCallback } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import {
  getMenu,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/api';

const inputClass =
  'w-full bg-[var(--color-input-bg)] border border-[var(--color-input-border)] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-heading)]';

function ProductModal({ isOpen, onClose, product, categories, onSave }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    imageUrl: '',
    available: true,
    sizes: [],
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name ?? '',
        description: product.description ?? '',
        price: product.price ?? '',
        categoryId: product.categoryId ?? product.category?.id ?? '',
        imageUrl: product.imageUrl ?? '',
        available: product.available ?? true,
        sizes: Array.isArray(product.sizes)
          ? product.sizes.map((s) => ({ label: s.label ?? '', price: s.price ?? '' }))
          : [],
      });
    } else {
      setForm({
        name: '',
        description: '',
        price: '',
        categoryId: categories[0]?.id ?? '',
        imageUrl: '',
        available: true,
        sizes: [],
      });
    }
  }, [product, categories, isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price) || 0,
      categoryId: form.categoryId || null,
      imageUrl: form.imageUrl.trim() || null,
      available: form.available,
      sizes: form.sizes
        .filter((s) => s.label.trim())
        .map((s) => ({ label: s.label.trim(), price: Number(s.price) || 0 })),
    };
    try {
      await onSave(payload);
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message ?? 'Failed to save product');
    }
  };

  const addSize = () => {
    setForm((f) => ({ ...f, sizes: [...f.sizes, { label: '', price: '' }] }));
  };

  const updateSize = (index, field, value) => {
    setForm((f) => ({
      ...f,
      sizes: f.sizes.map((s, i) =>
        i === index ? { ...s, [field]: value } : s
      ),
    }));
  };

  const removeSize = (index) => {
    setForm((f) => ({
      ...f,
      sizes: f.sizes.filter((_, i) => i !== index),
    }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[var(--color-surface)] rounded-2xl p-6 max-w-lg w-full shadow-xl transition-opacity duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-[var(--color-heading)] mb-6">
          {product ? 'Edit Product' : 'Add Product'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-heading)] mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={inputClass}
              placeholder="Product name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-heading)] mb-1.5">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              className={`${inputClass} min-h-[80px] resize-y`}
              placeholder="Product description"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-heading)] mb-1.5">
              Price (₱)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              className={inputClass}
              placeholder="0.00"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-heading)] mb-1.5">
              Category
            </label>
            <select
              value={form.categoryId}
              onChange={(e) =>
                setForm((f) => ({ ...f, categoryId: e.target.value }))
              }
              className={inputClass}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-heading)] mb-1.5">
              Image URL
            </label>
            <input
              type="text"
              value={form.imageUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, imageUrl: e.target.value }))
              }
              className={inputClass}
              placeholder="https://..."
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="available"
              checked={form.available}
              onChange={(e) =>
                setForm((f) => ({ ...f, available: e.target.checked }))
              }
              className="w-4 h-4 rounded border-[var(--color-input-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
            />
            <label
              htmlFor="available"
              className="text-sm font-medium text-[var(--color-heading)]"
            >
              Available
            </label>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-[var(--color-heading)]">
                Sizes
              </label>
              <button
                type="button"
                onClick={addSize}
                className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
              >
                + Add Size
              </button>
            </div>
            <div className="space-y-2">
              {form.sizes.map((size, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={size.label}
                    onChange={(e) => updateSize(i, 'label', e.target.value)}
                    className={`${inputClass} flex-1`}
                    placeholder="Label (e.g. Tall)"
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={size.price}
                    onChange={(e) => updateSize(i, 'price', e.target.value)}
                    className={`${inputClass} w-24`}
                    placeholder="Price"
                  />
                  <button
                    type="button"
                    onClick={() => removeSize(i)}
                    className="p-2 text-[var(--color-error)] hover:bg-[var(--color-error)]/10 rounded-lg transition-colors"
                    aria-label="Remove size"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-[var(--color-heading)] hover:bg-[var(--color-border)]/30 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ManageMenu() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (categoryFilter) params.category = categoryFilter;
      const [menuData, categoriesData] = await Promise.all([
        getMenu(params),
        getCategories(),
      ]);
      setProducts(Array.isArray(menuData) ? menuData : menuData?.products ?? []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err) {
      console.error('Failed to fetch menu:', err);
      toast.error('Failed to load menu');
      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [search, categoryFilter]);

  useEffect(() => {
    const debounce = setTimeout(fetchData, 300);
    return () => clearTimeout(debounce);
  }, [fetchData]);

  const handleSave = async (payload) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, payload);
      toast.success('Product updated');
    } else {
      await createProduct(payload);
      toast.success('Product added');
    }
    setEditingProduct(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    setDeletingId(id);
    try {
      await deleteProduct(id);
      toast.success('Product deleted');
      fetchData();
    } catch (err) {
      toast.error(err?.response?.data?.message ?? 'Failed to delete product');
    } finally {
      setDeletingId(null);
    }
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-heading)]">
          Manage Menu
        </h1>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium transition-colors"
        >
          + Add Product
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={inputClass}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={inputClass}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-[var(--color-surface)] rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="h-40 bg-[var(--color-border)]" />
              <div className="p-4 space-y-2">
                <div className="h-5 w-3/4 bg-[var(--color-border)] rounded" />
                <div className="h-4 w-1/2 bg-[var(--color-border)] rounded" />
                <div className="h-4 w-1/4 bg-[var(--color-border)] rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-[var(--color-surface)] rounded-2xl p-12 text-center border border-[var(--color-border)]">
          <p className="text-[var(--color-muted)]">No products found</p>
          <button
            onClick={openAdd}
            className="mt-4 text-[var(--color-primary)] hover:underline font-medium"
          >
            Add your first product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-[var(--color-surface)] rounded-2xl overflow-hidden border border-[var(--color-border)]"
            >
              <div className="h-40 bg-gradient-to-br from-amber-200/50 to-amber-400/50 dark:from-amber-900/30 dark:to-amber-700/30 flex items-center justify-center overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl text-amber-600/50">☕</span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-[var(--color-heading)] truncate">
                    {product.name}
                  </h3>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => openEdit(product)}
                      className="p-2 text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg transition-colors"
                      aria-label="Edit"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deletingId === product.id}
                      className="p-2 text-[var(--color-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 rounded-lg transition-colors disabled:opacity-50"
                      aria-label="Delete"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-2 flex-wrap">
                  {product.category && (
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-primary)]/15 text-[var(--color-primary)]">
                      {product.category.name}
                    </span>
                  )}
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      product.available
                        ? 'bg-[var(--color-success)]/15 text-[var(--color-success)]'
                        : 'bg-[var(--color-error)]/15 text-[var(--color-error)]'
                    }`}
                  >
                    {product.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <p className="mt-2 text-lg font-semibold text-[var(--color-heading)]">
                  ₱{Number(product.price ?? 0).toLocaleString()}
                </p>
                {product.sizes?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {product.sizes.map((s, i) => (
                      <span
                        key={i}
                        className="inline-flex px-2 py-0.5 rounded-lg text-xs bg-[var(--color-border)] text-[var(--color-body)]"
                      >
                        {s.label} ₱{Number(s.price ?? 0).toLocaleString()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <ProductModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        categories={categories}
        onSave={handleSave}
      />
    </div>
  );
}
