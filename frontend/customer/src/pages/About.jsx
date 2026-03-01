import { Link } from 'react-router-dom';
import { FiCoffee, FiUsers, FiHeart } from 'react-icons/fi';

const VALUES = [
  {
    icon: FiCoffee,
    title: 'Quality First',
    description:
      'We source only the finest beans from sustainable farms around the world.',
  },
  {
    icon: FiUsers,
    title: 'Community',
    description:
      "More than a coffee shop — we're a gathering place for friends, families, and creatives.",
  },
  {
    icon: FiHeart,
    title: 'Sustainability',
    description:
      'From compostable cups to locally sourced ingredients, we care about our planet.',
  },
];

const TEAM = [
  { name: 'Alex Rivera', role: 'Founder & Head Barista' },
  { name: 'Maria Santos', role: 'Master Roaster' },
  { name: 'Carlos Cruz', role: 'Pastry Chef' },
  { name: 'Sophia Chen', role: 'Manager' },
];

export default function About() {
  return (
    <main className="min-h-screen bg-[var(--color-cream)]">
      {/* Hero section */}
      <section
        className="relative py-20 sm:py-28 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-primary) 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Our Story
          </h1>
          <p className="mt-4 text-xl text-white/90 max-w-2xl mx-auto">
            Passionate about every cup since 2020
          </p>
        </div>
      </section>

      {/* Story section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-heading)] mb-6">
                Where It All Began
              </h2>
              <p className="text-lg text-[var(--color-body)] leading-relaxed">
                Area Coffee was born from a simple passion — to serve exceptional
                coffee in a warm, welcoming space. What started as a small corner
                shop has grown into a beloved community gathering place. We
                believe that every cup of coffee tells a story, and we're
                dedicated to making each one memorable.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden bg-[var(--color-surface)] shadow-lg">
              <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-primary)]/30 via-[var(--color-secondary)]/30 to-[var(--color-accent)]/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-16 sm:py-20 bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[var(--color-heading)] text-center mb-12">
            What We Believe In
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-[var(--color-cream)] rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-heading)] mb-3">
                  {title}
                </h3>
                <p className="text-[var(--color-body)] leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[var(--color-heading)] text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map(({ name, role }) => (
              <div
                key={name}
                className="bg-[var(--color-surface)] rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-primary)]/40 to-[var(--color-secondary)]/40" />
                <h3 className="text-lg font-bold text-[var(--color-heading)]">
                  {name}
                </h3>
                <p className="text-sm text-[var(--color-muted)] mt-1">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-20 bg-[var(--color-surface)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--color-heading)] mb-4">
            Come Visit Us
          </h2>
          <p className="text-lg text-[var(--color-body)] mb-8">
            We'd love to welcome you. Stop by for a cup, a chat, or to discover
            your new favorite blend.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full font-medium bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
