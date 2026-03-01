import { useState, useEffect, useCallback } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import {
  getGallery,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from '../services/api';

const GALLERY_CATEGORIES = [
  { value: 'drinks', label: 'Drinks' },
  { value: 'shop', label: 'Shop' },
  { value: 'events', label: 'Events' },
  { value: 'food', label: 'Food' },
  { value: 'community', label: 'Community' },
];

const inputClass =
  'w-full bg-[var(--color-input-bg)] border border-[var(--color-input-border)] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-heading)]';

function GalleryModal({ isOpen, onClose, image, onSave }) {
  const [form, setForm] = useState({
    title: '',
    imageUrl: '',
    category: 'drinks',
    description: '',
  });

  useEffect(() => {
    if (image) {
      setForm({
        title: image.title ?? '',
        imageUrl: image.imageUrl ?? '',
        category: image.category ?? 'drinks',
        description: image.description ?? '',
      });
    } else {
      setForm({
        title: '',
        imageUrl: '',
        category: 'drinks',
        description: '',
      });
    }
  }, [image, isOpen]);

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
      title: form.title.trim(),
      imageUrl: form.imageUrl.trim() || null,
      category: form.category,
      description: form.description.trim() || null,
    };
    try {
      await onSave(payload);
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message ?? 'Failed to save image');
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
          {image ? 'Edit Gallery Image' : 'Upload Image'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-heading)] mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              className={inputClass}
              placeholder="Image title"
              required
            />
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
          <div>
            <label className="block text-sm font-medium text-[var(--color-heading)] mb-1.5">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
              }
              className={inputClass}
            >
              {GALLERY_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
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
              placeholder="Image description"
              rows={3}
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

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function ManageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getGallery(categoryFilter || undefined);
      setImages(Array.isArray(data) ? data : data?.images ?? []);
    } catch (err) {
      console.error('Failed to fetch gallery:', err);
      toast.error('Failed to load gallery');
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, [categoryFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (payload) => {
    if (editingImage) {
      await updateGalleryImage(editingImage.id, payload);
      toast.success('Image updated');
    } else {
      await createGalleryImage(payload);
      toast.success('Image added');
    }
    setEditingImage(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    setDeletingId(id);
    try {
      await deleteGalleryImage(id);
      toast.success('Image deleted');
      fetchData();
    } catch (err) {
      toast.error(err?.response?.data?.message ?? 'Failed to delete image');
    } finally {
      setDeletingId(null);
    }
  };

  const openEdit = (image) => {
    setEditingImage(image);
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditingImage(null);
    setModalOpen(true);
  };

  const tabs = [
    { value: '', label: 'All' },
    ...GALLERY_CATEGORIES,
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-heading)]">
          Manage Gallery
        </h1>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium transition-colors"
        >
          + Upload Image
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.value || 'all'}
            onClick={() => setCategoryFilter(tab.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              categoryFilter === tab.value
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-heading)] hover:bg-[var(--color-border)]/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-[var(--color-surface)] rounded-2xl overflow-hidden animate-pulse border border-[var(--color-border)]"
            >
              <div className="h-48 bg-[var(--color-border)]" />
              <div className="p-4 space-y-2">
                <div className="h-5 w-3/4 bg-[var(--color-border)] rounded" />
                <div className="h-4 w-1/2 bg-[var(--color-border)] rounded" />
                <div className="h-4 w-full bg-[var(--color-border)] rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="bg-[var(--color-surface)] rounded-2xl p-12 text-center border border-[var(--color-border)]">
          <p className="text-[var(--color-muted)]">No images in this category</p>
          <button
            onClick={openAdd}
            className="mt-4 text-[var(--color-primary)] hover:underline font-medium"
          >
            Upload your first image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-[var(--color-surface)] rounded-2xl overflow-hidden border border-[var(--color-border)]"
            >
              <div className="h-48 bg-gradient-to-br from-amber-200/50 to-amber-400/50 dark:from-amber-900/30 dark:to-amber-700/30 flex items-center justify-center overflow-hidden">
                {image.imageUrl ? (
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-5xl text-amber-600/50">🖼️</span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-[var(--color-heading)] truncate flex-1">
                    {image.title}
                  </h3>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => openEdit(image)}
                      className="p-2 text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg transition-colors"
                      aria-label="Edit"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      disabled={deletingId === image.id}
                      className="p-2 text-[var(--color-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 rounded-lg transition-colors disabled:opacity-50"
                      aria-label="Delete"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-primary)]/15 text-[var(--color-primary)] capitalize">
                    {image.category}
                  </span>
                  <span className="text-xs text-[var(--color-muted)]">
                    {formatDate(image.createdAt)}
                  </span>
                </div>
                {image.description && (
                  <p className="mt-2 text-sm text-[var(--color-body)] line-clamp-2">
                    {image.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <GalleryModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingImage(null);
        }}
        image={editingImage}
        onSave={handleSave}
      />
    </div>
  );
}
