import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  FiCoffee,
  FiMenu,
  FiX,
  FiShoppingCart,
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { getCartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`sticky top-0 z-50 w-full ${
        isScrolled
          ? 'bg-[var(--color-surface)]/80 backdrop-blur-md border-b border-[var(--color-border)] shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-[var(--color-heading)] font-semibold text-lg tracking-wide hover:text-[var(--color-primary)] transition-colors duration-200"
          >
            <FiCoffee className="w-6 h-6" aria-hidden />
            <span>AREA COFFEE</span>
          </Link>

          {/* Right side: Nav links + Theme toggle + Cart */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-[var(--color-primary)] underline underline-offset-4 decoration-2'
                        : 'text-[var(--color-body)] hover:text-[var(--color-primary)]'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
            <ThemeToggle />
            <Link
              to="/cart"
              className="relative p-2 text-[var(--color-body)] hover:text-[var(--color-primary)] transition-colors duration-200 rounded-lg hover:bg-[var(--color-border)]/50"
              aria-label={`Cart with ${getCartCount()} items`}
            >
              <FiShoppingCart className="w-5 h-5" aria-hidden />
              {getCartCount() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold px-1">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 text-[var(--color-heading)] hover:text-[var(--color-primary)] hover:bg-[var(--color-border)]/50 rounded-lg transition-all duration-200"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6" aria-hidden />
              ) : (
                <FiMenu className="w-6 h-6" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav (slide-down) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
          <div className="flex flex-col gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-[var(--color-body)] font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                      : 'hover:bg-[var(--color-border)]/50 hover:text-[var(--color-heading)]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/cart"
              onClick={closeMobileMenu}
              className="px-4 py-3 rounded-lg text-[var(--color-body)] font-medium hover:bg-[var(--color-border)]/50 hover:text-[var(--color-heading)] transition-colors duration-200 flex items-center gap-2"
            >
              <FiShoppingCart className="w-5 h-5" />
              Cart {getCartCount() > 0 && `(${getCartCount()})`}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
