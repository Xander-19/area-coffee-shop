import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { getOrder } from '../services/api';

const STEPS = [
  { key: 'pending', label: 'Pending' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'ready', label: 'Ready' },
  { key: 'completed', label: 'Completed' },
];

const STATUS_TO_INDEX = {
  pending: 0,
  preparing: 1,
  ready: 2,
  completed: 3,
};

function getStepIndex(status) {
  if (!status) return 0;
  const normalized = String(status).toLowerCase();
  return STATUS_TO_INDEX[normalized] ?? 0;
}

export default function OrderStatus() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrder = async () => {
    if (!id) return;
    try {
      const data = await getOrder(id);
      setOrder(data);
      setError(null);
    } catch (err) {
      setOrder(null);
      setError(err?.response?.status === 404 ? 'Order not found' : 'Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  // Poll every 10 seconds for status updates
  useEffect(() => {
    if (!id || !order) return;
    const interval = setInterval(fetchOrder, 10000);
    return () => clearInterval(interval);
  }, [id, order]);

  if (loading) {
    return (
      <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-[var(--color-border)] rounded w-48" />
            <div className="h-64 bg-[var(--color-border)] rounded-2xl" />
            <div className="h-48 bg-[var(--color-border)] rounded-2xl" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-2xl font-bold text-[var(--color-heading)] mb-4">
            {error || 'Order not found'}
          </h1>
          <Link
            to="/menu"
            className="inline-block px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            Back to Menu
          </Link>
        </div>
      </main>
    );
  }

  const currentStepIndex = getStepIndex(order.status);

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-heading)]">
            Order #{order.id}
          </h1>
          <p className="text-[var(--color-muted)] mt-2">
            Track your order status
          </p>
        </header>

        {/* Status stepper */}
        <div className="mb-10 px-2">
          <div className="flex items-start justify-between">
            {STEPS.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isFuture = index > currentStepIndex;

              return (
                <div key={step.key} className="flex flex-1 items-start min-w-0">
                  {/* Connector line before circle (except first) */}
                  {index > 0 && (
                    <div
                      className={`flex-1 h-0.5 mt-5 mr-1 ${
                        currentStepIndex >= index
                          ? 'bg-green-500'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  )}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${isCompleted ? 'bg-green-500 text-white' : ''}
                        ${isCurrent ? 'bg-[var(--color-primary)] text-white animate-pulse' : ''}
                        ${isFuture ? 'bg-gray-300 dark:bg-gray-600 text-[var(--color-muted)]' : ''}
                      `}
                    >
                      {isCompleted ? (
                        <FiCheck className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium text-center ${
                        isCurrent
                          ? 'text-[var(--color-primary)]'
                          : isCompleted
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-[var(--color-muted)]'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {/* Connector line after circle (except last) */}
                  {index < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mt-5 ml-1 ${
                        currentStepIndex > index
                          ? 'bg-green-500'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Order details card */}
        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 space-y-6">
          <h2 className="font-semibold text-[var(--color-heading)] text-lg">
            Order Details
          </h2>

          <div className="space-y-2">
            <p className="text-[var(--color-body)]">
              <span className="font-medium text-[var(--color-heading)]">
                Customer:
              </span>{' '}
              {order.customerName}
            </p>
            <p className="text-[var(--color-body)]">
              <span className="font-medium text-[var(--color-heading)]">
                Phone:
              </span>{' '}
              {order.customerPhone}
            </p>
            {order.pickupTime && (
              <p className="text-[var(--color-body)]">
                <span className="font-medium text-[var(--color-heading)]">
                  Pickup time:
                </span>{' '}
                {order.pickupTime}
              </p>
            )}
            {order.notes && (
              <p className="text-[var(--color-body)]">
                <span className="font-medium text-[var(--color-heading)]">
                  Notes:
                </span>{' '}
                {order.notes}
              </p>
            )}
          </div>

          <div>
            <h3 className="font-medium text-[var(--color-heading)] mb-2">
              Items
            </h3>
            <ul className="space-y-2">
              {(order.items || []).map((item, idx) => {
                const itemTotal =
                  (item.price + (item.size?.priceAdd || 0)) * (item.quantity || 1);
                return (
                  <li
                    key={item.id || idx}
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
                      × {item.quantity || 1}
                    </span>
                    <span>₱{itemTotal.toFixed(0)}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="pt-4 border-t border-[var(--color-border)] flex justify-between font-semibold text-[var(--color-heading)]">
            <span>Total</span>
            <span>
              ₱
              {(order.total ?? order.items?.reduce(
                (sum, i) =>
                  sum +
                  (i.price + (i.size?.priceAdd || 0)) * (i.quantity || 1),
                0
              ) ?? 0).toFixed(0)}
            </span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/menu"
            className="inline-block px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    </main>
  );
}
