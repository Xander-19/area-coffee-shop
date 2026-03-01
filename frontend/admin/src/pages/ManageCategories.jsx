import { useState, useEffect, useCallback } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/api';

const inputClass =
  'w-full bg-[var(--color-input-bg)] border border-[var(--color-input-border)] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-heading)]';

function CategoryModal({ isOpen, onClose, category, onSave }) {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name ?? '');
      setImageUrl(category.imageUrl ?? '');
    } else {
      setName('');
      setImageUrl('');
    }
  }, [category, isOpen]);

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
      name: name.trim(),
      imageUrl: imageUrl.trim() || null,
    };
    try {
      await onSave(payload);
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message ?? 'Failed to save category');
    }
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
          {category ? 'Edit Category' : 'Add Category'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-heading)] mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="Category name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-heading)] mb-1.5">
              Image URL
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={inputClass}
              placeholder="https://..."
            />
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

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      toast.error('Failed to load categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (payload) => {
    if (editingCategory) {
      await updateCategory(editingCategory.id, payload);
      toast.success('Category updated');
    } else {
      await createCategory(payload);
      toast.success('Category added');
    }
    setEditingCategory(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    setDeletingId(id);
    try {
      await deleteCategory(id);
      toast.success('Category deleted');
      fetchData();
    } catch (err) {
      toast.error(err?.response?.data?.message ?? 'Failed to delete category');
    } finally {
      setDeletingId(null);
    }
  };

  const openEdit = (category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  const getProductCount = (cat) => {
    return cat._count?.products ?? cat.productCount ?? 0;
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-heading)]">
          Manage Categories
        </h1>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium transition-colors"
        >
          + Add Category
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-[var(--color-surface)] rounded-2xl p-6 animate-pulse border border-[var(--color-border)]"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--color-border)] mx-auto" />
              <div className="mt-4 h-6 w-3/4 bg-[var(--color-border)] rounded mx-auto" />
              <div className="mt-2 h-4 w-1/2 bg-[var(--color-border)] rounded mx-auto" />
            </div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-[var(--color-surface)] rounded-2xl p-12 text-center border border-[var(--color-border)]">
          <p className="text-[var(--color-muted)]">No categories yet</p>
          <button
            onClick={openAdd}
            className="mt-4 text-[var(--color-primary)] hover:underline font-medium"
          >
            Add your first category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-200/50 to-amber-400/50 dark:from-amber-900/30 dark:to-amber-700/30 flex items-center justify-center shrink-0 overflow-hidden">
                    {category.imageUrl ? (
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl text-amber-600/50">📁</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-[var(--color-heading)] truncate">
                      {category.name}
                    </h3>
                    <p className="text-sm text-[var(--color-muted)]">
                      {getProductCount(category)} products
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => openEdit(category)}
                    className="p-2 text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg transition-colors"
                    aria-label="Edit"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    disabled={deletingId === category.id}
                    className="p-2 text-[var(--color-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 rounded-lg transition-colors disabled:opacity-50"
                    aria-label="Delete"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CategoryModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingCategory(null);
        }}
        category={editingCategory}
        onSave={handleSave}
      />
    </div>
  );
}
