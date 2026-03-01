import { Link, useLocation } from 'react-router-dom';
import {
  FiCoffee,
  FiGrid,
  FiShoppingBag,
  FiFolder,
  FiImage,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

const navItems = [
  { to: '/', icon: FiGrid, label: 'Dashboard' },
  { to: '/orders', icon: FiShoppingBag, label: 'Orders' },
  { to: '/menu', icon: FiCoffee, label: 'Menu' },
  { to: '/categories', icon: FiFolder, label: 'Categories' },
  { to: '/gallery', icon: FiImage, label: 'Gallery' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen bg-[var(--color-sidebar)] flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo & Admin badge */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10 shrink-0">
        <FiCoffee className="w-8 h-8 text-white shrink-0" aria-hidden />
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-white text-sm leading-tight">AREA</span>
            <span className="font-semibold text-white text-sm leading-tight">COFFEE</span>
            <span className="text-xs text-white/70 mt-0.5 bg-white/20 px-2 py-0.5 rounded w-fit">
              Admin
            </span>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => {
            const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/90 transition-all duration-200 ${
                    isActive
                      ? 'bg-[var(--color-sidebar-active)] text-white'
                      : 'hover:bg-[var(--color-sidebar-hover)]'
                  } ${collapsed ? 'justify-center' : ''}`}
                  title={collapsed ? label : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" aria-hidden />
                  {!collapsed && <span className="truncate">{label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-white/10 shrink-0">
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center justify-center w-full gap-3 px-3 py-2.5 rounded-lg text-white/90 hover:bg-[var(--color-sidebar-hover)] transition-all duration-200"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <FiChevronRight className="w-5 h-5" aria-hidden />
          ) : (
            <>
              <FiChevronLeft className="w-5 h-5" aria-hidden />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
