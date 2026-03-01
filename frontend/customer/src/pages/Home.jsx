import { Link } from "react-router-dom";
import { FiCoffee, FiHeart, FiStar } from "react-icons/fi";
import HeroCarousel from "../components/HeroCarousel";

const FEATURED_DRINKS = [
  { name: "Cappuccino", price: 130 },
  { name: "Matcha Latte", price: 150 },
  { name: "Caramel Frappe", price: 170 },
];

const WHY_CHOOSE_US = [
  {
    icon: FiCoffee,
    title: "Fresh Roasted",
    description: "Beans roasted daily for peak flavor",
  },
  {
    icon: FiHeart,
    title: "Made with Love",
    description: "Every cup crafted with passion",
  },
  {
    icon: FiStar,
    title: "Premium Quality",
    description: "Only the finest ingredients",
  },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-x-clip overflow-y-visible">
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center px-6 sm:px-12 lg:px-20 py-20 lg:py-0 -mt-18">
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0 anim-fade-left anim-delay-200">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[4em] leading-tight font-bold text-white drop-shadow-lg mb-4 lg:mb-6">
              Brewing Happiness, One Cup at a Time
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/95 mb-6 lg:mb-10 max-w-2xl">
              Experience the finest handcrafted coffee in a cozy atmosphere
            </p>
            <div className="">
              <Link
                to="/menu"
                className="px-8 py-3.5 rounded-full bg-[var(--color-secondary)]/20 backdrop-blur text-white font-semibold border-2 border-[var(--color-gradient-to)]/60 hover:bg-[var(--color-secondary-hover)] transition-colors"
              >
                Order Now
              </Link>
            </div>
          </div>
          <div className="py-10 md:py-16 lg:py-8 anim-fade-up anim-delay-300">
            <HeroCarousel />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[var(--color-surface)]/50">
        {/* FEATURED DRINKS */}
        <section className="py-16 p-4 sm:p-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="scroll-reveal scroll-fade-up scroll-delay-200 font-serif text-3xl font-bold text-[var(--color-heading)] text-center mb-10">
              Our Favorites
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {FEATURED_DRINKS.map((drink) => (
                <div
                  key={drink.name}
                  className="scroll-reveal scroll-fade-up scroll-delay-400 w-full rounded-2xl bg-[var(--color-surface)] shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                <div className="h-40 bg-gradient-to-br from-[var(--color-gradient-from)] via-[var(--color-gradient-via)] to-[var(--color-gradient-to)]" />
                <div className="p-4">
                  <h3 className="font-semibold text-[var(--color-heading)]">
                    {drink.name}
                  </h3>
                  <p className="text-lg font-bold text-[var(--color-primary)] mt-1">
                    ₱{drink.price}
                  </p>
                  <Link
                    to="/menu"
                    className="mt-3 block w-full py-2 rounded-full bg-[var(--color-primary)] text-white text-center text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
                  >
                    Order
                  </Link>
                </div>
              </div>
            ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="scroll-reveal scroll-fade-up scroll-delay-200 font-serif text-3xl font-bold text-[var(--color-heading)] text-center mb-12">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {WHY_CHOOSE_US.map(({ icon: Icon, title, description }, index) => (
                <div
                  key={title}
                  className={`scroll-reveal scroll-fade-up scroll-delay-${(index + 2) * 100} text-center p-6 rounded-2xl bg-[var(--color-cream)] border border-[var(--color-border)]`}
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-semibold text-[var(--color-heading)] text-lg">
                    {title}
                  </h3>
                  <p className="text-[var(--color-muted)] mt-2">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>

      {/* OPENING HOURS */}
      <section className="py-16 px-6">
        <div className="max-w-md mx-auto">
          <h2 className="scroll-reveal scroll-fade-up scroll-delay-200 font-serif text-3xl font-bold text-[var(--color-heading)] text-center mb-8">
            Opening Hours
          </h2>
          <div className="scroll-reveal scroll-fade-up scroll-delay-400 rounded-2xl bg-[var(--color-surface)] shadow-lg p-8 border border-[var(--color-border)]">
            <div className="space-y-3 text-center">
              <p className="text-[var(--color-body)]">
                <span className="font-medium text-[var(--color-heading)]">
                  Mon – Fri
                </span>{" "}
                7:00 AM – 9:00 PM
              </p>
              <p className="text-[var(--color-body)]">
                <span className="font-medium text-[var(--color-heading)]">
                  Sat – Sun
                </span>{" "}
                8:00 AM – 10:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 px-6">
        <div className="scroll-reveal scroll-fade-left scroll-delay-200 max-w-3xl mx-auto text-center rounded-2xl bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-via)] p-12 text-white">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
            Ready for your next coffee?
          </h2>
          <Link
            to="/menu"
            className="inline-block px-8 py-3.5 rounded-full bg-white text-[var(--color-primary)] font-semibold hover:bg-[var(--color-cream)] transition-colors"
          >
            View Our Menu
          </Link>
        </div>
      </section>
    </main>
  );
}
