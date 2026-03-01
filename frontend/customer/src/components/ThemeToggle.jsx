import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 text-[var(--color-body)] hover:text-[var(--color-primary)] hover:bg-[var(--color-border)]/50 rounded-lg transition-all duration-200"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <FiMoon className="w-5 h-5" aria-hidden />
      ) : (
        <FiSun className="w-5 h-5" aria-hidden />
      )}
    </button>
  );
}
