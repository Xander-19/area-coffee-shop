import { useState } from 'react';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiFacebook,
  FiInstagram,
  FiTwitter,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const CONTACT_CARDS = [
  {
    icon: FiMapPin,
    title: 'Visit Us',
    content: '123 Coffee Street, Downtown, Metro Manila',
  },
  {
    icon: FiPhone,
    title: 'Call Us',
    content: '(02) 8123-4567',
  },
  {
    icon: FiMail,
    title: 'Email Us',
    content: 'hello@areacoffee.com',
  },
];

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
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-heading)]">
            Get in Touch
          </h1>
          <p className="text-[var(--color-muted)] mt-2">
            We&apos;d love to hear from you. Reach out anytime.
          </p>
        </header>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-12">
          {/* Left column - Contact info cards */}
          <div className="space-y-6">
            {CONTACT_CARDS.map(({ icon: Icon, title, content }) => (
              <div
                key={title}
                className="flex gap-4 p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-heading)]">
                    {title}
                  </h3>
                  <p className="text-[var(--color-body)] mt-1">{content}</p>
                </div>
              </div>
            ))}

            {/* Opening hours card */}
            <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <h3 className="font-semibold text-[var(--color-heading)] mb-3">
                Opening Hours
              </h3>
              <div className="space-y-2 text-[var(--color-body)]">
                <p>
                  <span className="font-medium text-[var(--color-heading)]">
                    Mon – Fri
                  </span>{' '}
                  7:00 AM – 9:00 PM
                </p>
                <p>
                  <span className="font-medium text-[var(--color-heading)]">
                    Sat – Sun
                  </span>{' '}
                  8:00 AM – 10:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Right column - Contact form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4"
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

        {/* Map placeholder */}
        <div className="rounded-2xl bg-gray-200 dark:bg-gray-700 h-64 flex items-center justify-center gap-3 mb-12">
          <FiMapPin className="w-10 h-10 text-[var(--color-muted)]" />
          <span className="text-[var(--color-muted)] font-medium">
            Map Coming Soon
          </span>
        </div>

        {/* Social media links */}
        <div className="flex justify-center gap-6">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-body)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors"
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
