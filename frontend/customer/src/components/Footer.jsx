import { Link } from 'react-router-dom';
import { FiCoffee, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const socialLinks = [
  { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="scroll-reveal scroll-fade-up scroll-delay-200 bg-[var(--color-footer-bg)] text-[var(--color-footer-text)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Logo & tagline */}
          <div className="scroll-reveal scroll-fade-left scroll-delay-400 space-y-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-semibold text-[var(--color-footer-text)] hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              <FiCoffee className="w-6 h-6" aria-hidden />
              <span>AREA COFFEE</span>
            </Link>
            <p className="text-[var(--color-footer-muted)] text-sm leading-relaxed">
              Brewing happiness, one cup at a time
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="scroll-reveal scroll-fade-left scroll-delay-400">
            <h3 className="font-semibold text-[var(--color-footer-text)] mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-[var(--color-footer-muted)] hover:text-[var(--color-accent)] transition-colors duration-200 text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className='scroll-reveal scroll-fade-left scroll-delay-400'>
            <h3 className="font-semibold text-[var(--color-footer-text)] mb-4 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3 text-[var(--color-footer-muted)] text-sm">
              <li>
                <span className="sr-only">Address:</span>
                123 Coffee Street, Downtown
              </li>
              <li>
                <span className="sr-only">Phone:</span>
                <a
                  href="tel:+61281234567"
                  className="hover:text-[var(--color-accent)] transition-colors duration-200"
                >
                  (02) 8123-4567
                </a>
              </li>
              <li>
                <span className="sr-only">Email:</span>
                <a
                  href="mailto:hello@areacoffee.com"
                  className="hover:text-[var(--color-accent)] transition-colors duration-200"
                >
                  hello@areacoffee.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div className='scroll-reveal scroll-fade-left scroll-delay-400'>
            <h3 className="font-semibold text-[var(--color-footer-text)] mb-4 text-sm uppercase tracking-wider">
              Hours
            </h3>
            <ul className="space-y-2 text-[var(--color-footer-muted)] text-sm">
              <li>Mon–Fri: 7AM–9PM</li>
              <li>Sat–Sun: 8AM–10PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--color-footer-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-footer-muted)] text-sm scroll-reveal scroll-fade-up scroll-delay-400">
            © 2026 Area Coffee Shop. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="scroll-reveal scroll-fade-up scroll-delay-400 text-[var(--color-footer-muted)] hover:text-[var(--color-accent)] transition-colors duration-200 p-2 rounded-lg hover:bg-[var(--color-footer-border)]/30"
                aria-label={label}
              >
                <Icon className="w-5 h-5" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
