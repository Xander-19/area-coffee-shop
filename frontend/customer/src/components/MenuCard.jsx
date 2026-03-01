import { useState } from 'react';
import { FiCoffee } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const SUGAR_OPTIONS = ['Normal', 'Less', 'None'];

export default function MenuCard({ product }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? null);
  const [sugar, setSugar] = useState('Normal');
  const [quantity, setQuantity] = useState(1);

  const hasSizes = product.sizes && product.sizes.length > 0;
  const basePrice = product.price;
  const sizePriceAdd = selectedSize?.priceAdd ?? 0;
  const totalPrice = basePrice + sizePriceAdd;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: basePrice,
      size: selectedSize,
      sugar,
      quantity,
    });
    toast.success('Added to cart!');
  };

  return (
    <div className="rounded-2xl bg-[var(--color-surface)] shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Image area */}
      <div className="relative h-48 bg-gradient-to-br from-[var(--color-gradient-from)] via-[var(--color-gradient-via)] to-[var(--color-gradient-to)] flex items-center justify-center">
        <FiCoffee className="w-16 h-16 text-white/60" />
        {product.category && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-primary)]/90 text-white">
            {product.category?.name ?? product.category}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-[var(--color-heading)] text-lg">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm text-[var(--color-muted)] [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden mt-1">
            {product.description}
          </p>
        )}
        <p className="text-lg font-bold text-[var(--color-primary)] mt-2">
          ₱{totalPrice.toFixed(0)}
        </p>

        {/* Size selector */}
        {hasSizes && (
          <div className="flex flex-wrap gap-2 mt-3">
            {product.sizes.map((size) => (
              <button
                key={size.id}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedSize?.id === size.id
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-border)] text-[var(--color-body)] hover:bg-[var(--color-secondary)]/30'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        )}

        {/* Sugar level */}
        <div className="mt-3">
          <label className="text-xs text-[var(--color-muted)] block mb-1">
            Sugar level
          </label>
          <select
            value={sugar}
            onChange={(e) => setSugar(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-body)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
          >
            {SUGAR_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-2 mt-3">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-9 h-9 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-body)] hover:bg-[var(--color-border)] transition-colors"
          >
            −
          </button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-9 h-9 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-body)] hover:bg-[var(--color-border)] transition-colors"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full mt-4 py-2.5 rounded-full bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
