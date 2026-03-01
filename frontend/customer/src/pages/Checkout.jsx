import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';

const TAX_RATE = 0.12;

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart, getCartTotal } = useCart();
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    pickupTime: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getCartTotal();
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.customerName?.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!formData.customerPhone?.trim()) {
      toast.error('Please enter your phone number');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        customerName: formData.customerName.trim(),
        customerPhone: formData.customerPhone.trim(),
        pickupTime: formData.pickupTime || null,
        notes: formData.notes?.trim() || null,
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          sizeId: item.size?.id ?? null,
          sugar: item.sugar ?? null,
        })),
      };

      const order = await createOrder(orderData);
      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/order/${order.id}`);
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || 'Failed to place order';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    'w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-body)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]';

  if (cart.length === 0 && !isSubmitting) {
    return (
      <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-4xl font-bold text-[var(--color-heading)] mb-4">
            Checkout
          </h1>
          <p className="text-[var(--color-muted)] mb-6">
            Your cart is empty. Add items to proceed.
          </p>
          <Link
            to="/menu"
            className="inline-block px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-heading)]">
            Checkout
          </h1>
          <p className="text-[var(--color-muted)] mt-2">
            Complete your order details
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left - Order form */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="customerName"
                  className="block text-sm font-medium text-[var(--color-heading)] mb-1"
                >
                  Customer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="customerPhone"
                  className="block text-sm font-medium text-[var(--color-heading)] mb-1"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="customerPhone"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="(02) 8123-4567"
                />
              </div>
              <div>
                <label
                  htmlFor="pickupTime"
                  className="block text-sm font-medium text-[var(--color-heading)] mb-1"
                >
                  Preferred Pickup Time
                </label>
                <input
                  type="time"
                  id="pickupTime"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-[var(--color-heading)] mb-1"
                >
                  Special Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputClasses} resize-none`}
                  placeholder="Any special requests or instructions..."
                />
              </div>
            </div>

            {/* Right - Order summary */}
            <div>
              <div className="lg:sticky lg:top-24 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6">
                <h2 className="font-semibold text-[var(--color-heading)] text-lg mb-4">
                  Order Summary
                </h2>
                <ul className="space-y-2 mb-4">
                  {cart.map((item) => {
                    const itemPrice =
                      (item.price + (item.size?.priceAdd || 0)) * item.quantity;
                    return (
                      <li
                        key={item.id}
                        className="flex justify-between text-sm text-[var(--color-body)]"
                      >
                        <span>
                          {item.name}
                          {(item.size?.label || item.sugar) && (
                            <span className="text-[var(--color-muted)]">
                              {' '}
                              ({[item.size?.label, item.sugar]
                                .filter(Boolean)
                                .join(', ')})
                            </span>
                          )}{' '}
                          × {item.quantity}
                        </span>
                        <span>₱{itemPrice.toFixed(0)}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="space-y-2 pt-4 border-t border-[var(--color-border)]">
                  <div className="flex justify-between text-[var(--color-body)]">
                    <span>Subtotal</span>
                    <span>₱{subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-[var(--color-body)]">
                    <span>Tax (12%)</span>
                    <span>₱{tax.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-[var(--color-heading)] pt-2">
                    <span>Total</span>
                    <span>₱{total.toFixed(0)}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
