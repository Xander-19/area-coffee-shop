import { useState, useEffect, useCallback, useRef } from 'react';
import { FiCoffee, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const PRODUCT_IMAGES = [
  { alt: 'Cappuccino', gradient: 'from-amber-800 via-amber-600 to-yellow-500' },
  { alt: 'Matcha Latte', gradient: 'from-green-800 via-emerald-600 to-lime-400' },
  { alt: 'Caramel Frappe', gradient: 'from-yellow-900 via-amber-500 to-orange-300' },
  { alt: 'Mocha', gradient: 'from-stone-900 via-amber-900 to-stone-700' },
  { alt: 'Espresso', gradient: 'from-stone-950 via-stone-800 to-stone-600' },
];

const TOTAL = PRODUCT_IMAGES.length;
const ANGLE_STEP = 360 / TOTAL;
const AUTO_DELAY = 3500;

function getRadius() {
  if (typeof window === 'undefined') return 320;
  if (window.innerWidth < 640) return 200;
  if (window.innerWidth < 1024) return 280;
  return 320;
}

export default function HeroCarousel() {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [radius, setRadius] = useState(getRadius);
  const [isDragging, setIsDragging] = useState(false);

  const dragRef = useRef({ startX: 0, startRotation: 0, lastX: 0 });
  const wrapperRef = useRef(null);

  const currentIndex = ((Math.round(-rotation / ANGLE_STEP) % TOTAL) + TOTAL) % TOTAL;

  useEffect(() => {
    const onResize = () => setRadius(getRadius());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollPrev = useCallback(() => {
    setRotation((r) => r + ANGLE_STEP);
  }, []);

  const scrollNext = useCallback(() => {
    setRotation((r) => r - ANGLE_STEP);
  }, []);

  const goToSlide = useCallback((index) => {
    const targetAngle = -index * ANGLE_STEP;
    setRotation((r) => {
      let diff = targetAngle - r;
      diff = ((diff + 180) % 360) - 180;
      return r + diff;
    });
  }, []);

  const snapToNearest = useCallback(() => {
    setRotation((r) => {
      const nearest = Math.round(r / ANGLE_STEP) * ANGLE_STEP;
      return nearest;
    });
  }, []);

  const getClientX = (e) => {
    if (e.touches) return e.touches[0].clientX;
    return e.clientX;
  };

  const handleDragStart = useCallback((e) => {
    setIsDragging(true);
    setIsHovered(true);
    const clientX = getClientX(e);
    dragRef.current.startX = clientX;
    dragRef.current.lastX = clientX;
    dragRef.current.startRotation = rotation;
  }, [rotation]);

  const handleDragMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = getClientX(e);
    const wrapperWidth = wrapperRef.current?.offsetWidth || 400;
    const deltaX = clientX - dragRef.current.startX;
    const degreesPerPixel = ANGLE_STEP / (wrapperWidth / TOTAL);
    const newRotation = dragRef.current.startRotation + deltaX * degreesPerPixel;
    dragRef.current.lastX = clientX;
    setRotation(newRotation);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsHovered(false);
    snapToNearest();
  }, [isDragging, snapToNearest]);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e) => handleDragMove(e);
    const onEnd = () => handleDragEnd();
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(scrollNext, AUTO_DELAY);
    return () => clearInterval(timer);
  }, [isHovered, scrollNext]);

  return (
    <div
      ref={wrapperRef}
      className="carousel-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { if (!isDragging) setIsHovered(false); }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
    >
      <div className="carousel-scene">
        <div
          className={`carousel-ring ${isDragging ? 'carousel-ring--dragging' : ''}`}
          style={{ transform: `rotateY(${rotation}deg)` }}
        >
          {PRODUCT_IMAGES.map((image, index) => {
            const angle = index * ANGLE_STEP;
            return (
              <div
                key={image.alt}
                className="carousel-card"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                }}
              >
                <div className={`w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br ${image.gradient} flex items-center justify-center border border-white/10`}>
                  <FiCoffee className="w-12 h-12 sm:w-16 sm:h-16 text-white/40" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="carousel-controls">
        <button
          type="button"
          onClick={scrollPrev}
          className="coverflow-btn coverflow-btn-prev"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          className="coverflow-btn coverflow-btn-next"
          aria-label="Next slide"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-0 md:mt-4 lg:mt-6 relative z-50">
        {PRODUCT_IMAGES.map((image, index) => (
          <button
            key={image.alt}
            type="button"
            onClick={() => goToSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white w-6'
                : 'bg-white/40 hover:bg-white/60 w-2.5'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
