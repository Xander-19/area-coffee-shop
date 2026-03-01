import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative flex items-center w-14 h-7 rounded-full bg-[var(--color-input-bg)] border border-[var(--color-input-border)] transition-all duration-300"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span
        className={`absolute top-1 w-5 h-5 rounded-full bg-[var(--color-primary)] transition-all duration-300 ${
          isDark ? 'left-8' : 'left-1'
        }`}
      />
      <FiSun
        className={`absolute left-1.5 w-4 h-4 transition-opacity duration-200 ${
          isDark ? 'opacity-40 text-[var(--color-muted)]' : 'opacity-100 text-[var(--color-warning)]'
        }`}
        aria-hidden
      />
      <FiMoon
        className={`absolute right-1.5 w-4 h-4 transition-opacity duration-200 ${
          isDark ? 'opacity-100 text-[var(--color-muted)]' : 'opacity-40 text-[var(--color-muted)]'
        }`}
        aria-hidden
      />
    </button>
  );
}
