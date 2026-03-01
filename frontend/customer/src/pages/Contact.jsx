import { useState } from 'react';
import {
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiExternalLink,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const ADDRESS = 'Area Coffee';
const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Area+Coffee/@14.890761,120.9524355,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ab0006c38c6f:0x4c3346644fa946b9!8m2!3d14.890761!4d120.9550104!16s%2Fg%2F11xvg0vs29?entry=ttu';

const SOCIAL_LINKS = [
  { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission (replace with actual API call when backend is ready)
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast.success("Message sent! We'll get back to you soon.");
    }, 500);
  };

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page header */}
        <header className="text-center mb-12">
          <h1 className="anim-fade-up anim-delay-200 font-serif text-4xl sm:text-5xl font-bold text-[var(--color-heading)]">
            Get in Touch
          </h1>
          <p className="anim-fade-left anim-delay-300 text-[var(--color-muted)] mt-2">
            We&apos;d love to hear from you. Reach out anytime.
          </p>
        </header>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-12 items-stretch">
          {/* Left column - Visit Us (address + opening hours) */}
          <div className="space-y-6">
            <div className="anim-fade-left anim-delay-200 flex gap-4 p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                <FiMapPin className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-heading)]">
                  Visit Us
                </h3>
                <p className="text-[var(--color-body)] mt-1">{ADDRESS}</p>
                <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                  <h4 className="font-semibold text-[var(--color-heading)] text-sm mb-2">
                    Opening Hours
                  </h4>
                  <div className="space-y-1 text-sm text-[var(--color-body)]">
                    <p>
                      <span className="font-medium text-[var(--color-heading)]">Mon – Sun</span>{' '}
                      12:00 AM – 9:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location section */}
            <div className="anim-fade-left anim-delay-400 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
              <h3 className="font-semibold text-[var(--color-heading)] p-4 pb-2">
                Location
              </h3>
              <div className="relative h-64 w-full bg-[var(--color-border)]/30">
                <iframe
                  title="Area Coffee location map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=120.944%2C14.880%2C120.966%2C14.902&layer=mapnik&marker=14.890761%2C120.9550104"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="p-4 pt-2 text-sm text-[var(--color-muted)]">
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-primary)] hover:underline inline-flex items-center gap-1"
                >
                  View on Google Maps
                  <FiExternalLink className="w-3.5 h-3.5" />
                </a>
              </p>
            </div>
          </div>

          {/* Right column - Contact form */}
          <div className="anim-fade-right anim-delay-400 flex flex-col">
            <form
              onSubmit={handleSubmit}
              className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4 h-full flex flex-col"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[var(--color-heading)] mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] text-[var(--color-body)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[var(--color-heading)] mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] text-[var(--color-body)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-[var(--color-heading)] mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] text-[var(--color-body)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[var(--color-heading)] mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] text-[var(--color-body)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Social media links */}
        <div className="flex justify-center gap-6">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="scroll-reveal scroll-fade-up w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-body)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
