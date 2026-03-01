import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiShoppingBag,
  FiCheckCircle,
  FiDollarSign,
  FiCoffee,
} from 'react-icons/fi';
import { getDashboard, getOrders } from '../services/api';

const STATUS_STYLES = {
  pending: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  preparing: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  ready: 'bg-green-500/15 text-green-600 dark:text-green-400',
  completed: 'bg-gray-500/15 text-gray-600 dark:text-gray-400',
  cancelled: 'bg-red-500/15 text-red-600 dark:text-red-400',
};

function formatRelativeTime(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hr ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

function StatCardSkeleton() {
  return (
    <div className="bg-[var(--color-surface)] rounded-2xl p-6 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-full bg-[var(--color-border)]" />
      </div>
      <div className="mt-4 h-8 w-16 bg-[var(--color-border)] rounded" />
      <div className="mt-2 h-4 w-24 bg-[var(--color-border)] rounded" />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, gradientClass, iconClass }) {
  return (
    <div
      className={`bg-[var(--color-surface)] rounded-2xl p-6 border border-[var(--color-border)] ${gradientClass}`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${iconClass}`}
        >
          <Icon className="w-6 h-6" aria-hidden />
        </div>
      </div>
      <p className="mt-4 text-2xl font-bold text-[var(--color-heading)]">
        {value}
      </p>
      <p className="mt-1 text-sm text-[var(--color-muted)]">{label}</p>
    </div>
  );
}

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [dashboardData, ordersData] = await Promise.all([
          getDashboard(),
          getOrders(),
        ]);
        setDashboard(dashboardData);
        setOrders(Array.isArray(ordersData) ? ordersData : ordersData?.orders ?? []);
      } catch (err) {
        console.error('Failed to fetch dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const recentOrders = orders.slice(0, 5);

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-heading)]">
            Dashboard
          </h1>
          <p className="mt-1 text-[var(--color-muted)]">Welcome back, Admin</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>

        <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] overflow-hidden">
          <div className="p-6 border-b border-[var(--color-border)]">
            <div className="h-6 w-32 bg-[var(--color-border)] rounded animate-pulse" />
          </div>
          <div className="divide-y divide-[var(--color-border)]">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-4 flex gap-4 animate-pulse">
                <div className="h-4 flex-1 bg-[var(--color-border)] rounded" />
                <div className="h-4 w-24 bg-[var(--color-border)] rounded" />
                <div className="h-4 w-20 bg-[var(--color-border)] rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-heading)]">
          Dashboard
        </h1>
        <p className="mt-1 text-[var(--color-muted)]">Welcome back, Admin</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <StatCard
          icon={FiShoppingBag}
          label="Pending Orders"
          value={dashboard?.pendingOrders ?? 0}
          gradientClass="bg-gradient-to-br from-blue-500/10 to-blue-600/10"
          iconClass="bg-blue-500/20 text-blue-500"
        />
        <StatCard
          icon={FiCheckCircle}
          label="Completed Today"
          value={dashboard?.completedToday ?? 0}
          gradientClass="bg-gradient-to-br from-green-500/10 to-green-600/10"
          iconClass="bg-green-500/20 text-green-500"
        />
        <StatCard
          icon={FiDollarSign}
          label="Today's Revenue"
          value={`₱${Number(dashboard?.todayRevenue ?? 0).toLocaleString()}`}
          gradientClass="bg-gradient-to-br from-amber-500/10 to-amber-600/10"
          iconClass="bg-amber-500/20 text-amber-500"
        />
        <StatCard
          icon={FiCoffee}
          label="Total Products"
          value={dashboard?.totalProducts ?? 0}
          gradientClass="bg-gradient-to-br from-purple-500/10 to-purple-600/10"
          iconClass="bg-purple-500/20 text-purple-500"
        />
      </div>

      <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
          <h2 className="text-lg font-semibold text-[var(--color-heading)]">
            Recent Orders
          </h2>
          <Link
            to="/orders"
            className="text-sm font-medium text-[var(--color-primary)] hover:underline"
          >
            View All
          </Link>
        </div>

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
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {recentOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-[var(--color-muted)]"
                  >
                    No orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-[var(--color-table-header)]/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-[var(--color-heading)]">
                      #{order.orderNumber ?? order.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--color-body)]">
                      {order.customerName ?? order.customer ?? '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--color-body)]">
                      {order.items?.length ?? 0} items
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[var(--color-heading)]">
                      ₱{Number(order.total ?? 0).toLocaleString()}
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
                    <td className="px-6 py-4 text-sm text-[var(--color-muted)]">
                      {order.createdAt
                        ? formatRelativeTime(order.createdAt)
                        : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
