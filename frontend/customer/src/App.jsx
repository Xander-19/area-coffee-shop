import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {
  Home,
  Menu,
  Gallery,
  About,
  Contact,
  Cart,
  Checkout,
  OrderStatus,
} from './pages';

function useScrollReveal() {
  const location = useLocation();
  const observerRef = useRef(null);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('scroll-visible');
            } else {
              entry.target.classList.remove('scroll-visible');
            }
          });
        },
        { threshold: 0.1 }
      );
    }

    const observer = observerRef.current;

    const scan = () => {
      document.querySelectorAll('.scroll-reveal').forEach((el) => {
        observer.observe(el);
      });
    };

    scan();
    const timer = setTimeout(scan, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);
}

function ScrollRevealProvider({ children }) {
  useScrollReveal();
  return children;
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollRevealProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order/:id" element={<OrderStatus />} />
                </Routes>
              </div>
              <Footer />
            </div>
            <Toaster position="top-right" />
          </ScrollRevealProvider>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}
