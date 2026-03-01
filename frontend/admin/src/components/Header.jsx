import { FiBell } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

export default function Header({ title }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
      <h1 className="text-lg font-semibold text-[var(--color-heading)]">{title}</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button
          type="button"
          className="p-2 text-[var(--color-body)] hover:text-[var(--color-primary)] hover:bg-[var(--color-border)]/50 rounded-lg transition-colors duration-200"
          aria-label="Notifications"
        >
          <FiBell className="w-5 h-5" aria-hidden />
        </button>
        <div
          className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--color-primary)] text-white font-semibold text-sm"
          aria-hidden
        >
          A
        </div>
      </div>
    </header>
  );
}
