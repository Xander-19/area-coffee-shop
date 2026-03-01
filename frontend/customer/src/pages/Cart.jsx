import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const TAX_RATE = 0.12;

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  } = useCart();

  const subtotal = getCartTotal();
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const itemCount = getCartCount();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-heading)]">
              Your Cart
            </h1>
            <p className="text-[var(--color-muted)] mt-2">0 items</p>
          </header>

          <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-12 text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-[var(--color-border)]/30 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-[var(--color-muted)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[var(--color-heading)] mb-2">
              Your cart is empty
            </h2>
            <p className="text-[var(--color-muted)] mb-6">
              Add some delicious drinks to get started
            </p>
            <Link
              to="/menu"
              className="inline-block px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-hover)] transition-colors"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page header */}
        <header className="mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-heading)]">
            Your Cart
          </h1>
          <p className="text-[var(--color-muted)] mt-2">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Cart items */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
              {cart.map((item, index) => {
                const itemPrice =
                  (item.price + (item.size?.priceAdd || 0)) * item.quantity;
                return (
                  <div key={item.id}>
                    <div className="p-4 sm:p-6 flex gap-4">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-gradient-to-br from-[var(--color-gradient-from)] via-[var(--color-gradient-via)] to-[var(--color-gradient-to)]" />

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[var(--color-heading)]">
                          {item.name}
                        </h3>
                        {(item.size?.label || item.sugar) && (
                          <p className="text-sm text-[var(--color-muted)] mt-0.5">
                            {[item.size?.label, item.sugar]
                              .filter(Boolean)
                              .join(' • ')}
                          </p>
                        )}
                        <p className="text-lg font-bold text-[var(--color-primary)] mt-1">
                          ₱{itemPrice.toFixed(0)}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-lg border border-[var(--color-border)] flex items-center justify-center text-[var(--color-body)] hover:bg-[var(--color-border)] transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-medium text-[var(--color-body)]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-lg border border-[var(--color-border)] flex items-center justify-center text-[var(--color-body)] hover:bg-[var(--color-border)] transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                    {index < cart.length - 1 && (
                      <div className="mx-6 border-b border-[var(--color-border)]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column - Order summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6">
              <h2 className="font-semibold text-[var(--color-heading)] text-lg mb-4">
                Order Summary
              </h2>
              <div className="space-y-2 text-[var(--color-body)]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (12%)</span>
                  <span>₱{tax.toFixed(0)}</span>
                </div>
                <div className="flex justify-between font-semibold text-[var(--color-heading)] pt-2 border-t border-[var(--color-border)]">
                  <span>Total</span>
                  <span>₱{total.toFixed(0)}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block w-full mt-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold text-center hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                Proceed to Checkout
              </Link>
              <button
                type="button"
                onClick={clearCart}
                className="block w-full mt-3 py-2 text-sm text-[var(--color-muted)] hover:text-red-500 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
