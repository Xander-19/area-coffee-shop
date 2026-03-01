import React, { useState, useEffect, useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getOrders, updateOrderStatus } from '../services/api';

const STATUS_OPTIONS = ['pending', 'preparing', 'ready', 'completed', 'cancelled'];
const FILTER_TABS = ['all', ...STATUS_OPTIONS];

const STATUS_STYLES = {
  pending: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  preparing: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  ready: 'bg-green-500/15 text-green-600 dark:text-green-400',
  completed: 'bg-gray-500/15 text-gray-600 dark:text-gray-400',
  cancelled: 'bg-red-500/15 text-red-600 dark:text-red-400',
};

function OrderRowSkeleton() {
  return (
    <tr className="animate-pulse">
      {[...Array(8)].map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-[var(--color-border)] rounded" />
        </td>
      ))}
    </tr>
  );
}

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedStatus !== 'all') params.status = selectedStatus;
      if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
      const data = await getOrders(params);
      setOrders(Array.isArray(data) ? data : data?.orders ?? []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      toast.error('Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [selectedStatus, debouncedSearch]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success('Order status updated');
      fetchOrders();
    } catch (err) {
      console.error('Failed to update order:', err);
      toast.error('Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-heading)]">
          Manage Orders
        </h1>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setSelectedStatus(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedStatus === tab
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-[var(--color-surface)] text-[var(--color-body)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted)]"
          aria-hidden
        />
        <input
          type="search"
          placeholder="Search by customer name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-body)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
        />
      </div>

      {/* Orders table */}
      <div className="bg-[var(--color-surface)] rounded-2xl overflow-hidden border border-[var(--color-border)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--color-table-header)]">
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                  Order #
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                  Pickup Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {loading ? (
                [...Array(5)].map((_, i) => <OrderRowSkeleton key={i} />)
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-16 text-center text-[var(--color-muted)]"
                  >
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr
                      onClick={() => toggleExpand(order.id)}
                      className="hover:bg-[var(--color-table-header)]/50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-[var(--color-heading)]">
                        #{order.orderNumber ?? order.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-[var(--color-body)]">
                        {order.customerName ?? order.customer ?? '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-[var(--color-body)]">
                        {order.phone ?? '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-[var(--color-body)]">
                        {order.items?.length ?? 0}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-[var(--color-heading)]">
                        ₱{Number(order.total ?? 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-[var(--color-body)]">
                        {order.pickupTime
                          ? new Date(order.pickupTime).toLocaleString()
                          : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            STATUS_STYLES[order.status] ?? STATUS_STYLES.pending
                          }`}
                        >
                          {order.status ?? 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={order.status ?? 'pending'}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          disabled={updatingId === order.id}
                          className="px-3 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-body)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    {expandedId === order.id && (
                      <tr>
                        <td colSpan={8} className="p-0 bg-[var(--color-table-header)]/30">
                          <div className="px-6 py-4">
                            <h4 className="text-sm font-semibold text-[var(--color-heading)] mb-3">
                              Order Items
                            </h4>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="text-[var(--color-muted)]">
                                  <th className="text-left py-2 font-medium">
                                    Product Name
                                  </th>
                                  <th className="text-left py-2 font-medium">
                                    Size
                                  </th>
                                  <th className="text-left py-2 font-medium">
                                    Sugar
                                  </th>
                                  <th className="text-left py-2 font-medium">
                                    Qty
                                  </th>
                                  <th className="text-left py-2 font-medium">
                                    Price
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-[var(--color-border)]">
                                {(order.items ?? []).map((item, idx) => (
                                  <tr key={idx}>
                                    <td className="py-2 text-[var(--color-body)]">
                                      {item.productName ?? item.name ?? '—'}
                                    </td>
                                    <td className="py-2 text-[var(--color-body)]">
                                      {item.size ?? '—'}
                                    </td>
                                    <td className="py-2 text-[var(--color-body)]">
                                      {item.sugar ?? '—'}
                                    </td>
                                    <td className="py-2 text-[var(--color-body)]">
                                      {item.quantity ?? item.qty ?? 0}
                                    </td>
                                    <td className="py-2 text-[var(--color-body)]">
                                      ₱{Number(item.price ?? 0).toLocaleString()}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {order.notes && (
                              <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
                                <span className="text-xs font-medium text-[var(--color-muted)]">
                                  Notes:{' '}
                                </span>
                                <span className="text-sm text-[var(--color-body)]">
                                  {order.notes}
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
