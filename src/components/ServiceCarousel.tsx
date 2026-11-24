import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SERVICES } from '../data/services';

interface ServiceCarouselProps {
  onOpenAllServices: () => void;
}

const AUTOPLAY_MS = 5500;

export default function ServiceCarousel({ onOpenAllServices }: ServiceCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isHovered, setIsHovered] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const touchStartX = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const total = SERVICES.length;
  const current = SERVICES[activeIndex];

  const goTo = useCallback(
    (nextIdx: number, dir?: 1 | -1) => {
      const normalized = (nextIdx + total) % total;
      if (dir) {
        setDirection(dir);
      } else {
        setDirection(normalized >= activeIndex ? 1 : -1);
      }
      setActiveIndex(normalized);
    },
    [activeIndex, total]
  );

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isHovered || prefersReducedMotion) return;
    const timer = window.setInterval(handleNext, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [isHovered, prefersReducedMotion, handleNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 42) {
      if (delta < 0) handleNext();
      else handlePrev();
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? 28 : -28,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? -28 : 28,
      opacity: 0,
    }),
  };

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Các dịch vụ tại 9 p.m. SkinCare"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5 sm:mb-6">
        <div>
          <p className="text-xs font-semibold text-[#8C6730] mb-1">
            Liệu trình tại 9 p.m. SkinCare
          </p>
          <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold tracking-[-0.025em] text-[#1D1D1F] leading-tight">
            Các nhóm dịch vụ chuyên sâu
          </h2>
        </div>

        <button
          type="button"
          onClick={onOpenAllServices}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#8C6730] hover:text-[#725224] transition-colors duration-150 self-start sm:self-auto whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6730]/40 rounded py-1"
        >
          <span>Xem danh sách đầy đủ</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Flat Frosted-White Showcase Card */}
      <div className="relative bg-white/78 backdrop-blur-xl rounded-[20px] sm:rounded-[24px] border border-black/[0.07] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: prefersReducedMotion ? 0.15 : 0.34,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="grid grid-cols-1 md:grid-cols-12 items-stretch"
          >
            {/* Full-Bleed Clean Visual Panel */}
            <div className="md:col-span-6 relative bg-[#F2F3F5]">
              <div className="w-full aspect-[4/3] md:h-full md:min-h-[440px] overflow-hidden">
                {!failedImages[current.id] ? (
                  <img
                    src={current.image}
                    alt={current.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [current.id]: true }))
                    }
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#F2F3F5]">
                    <span className="text-xs font-semibold text-[#8C6730] tabular-nums mb-2">
                      {current.index} / 0{total}
                    </span>
                    <span className="text-lg font-semibold text-[#1D1D1F]">
                      {current.title}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Clean Editorial Detail Panel */}
            <div className="md:col-span-6 p-6 sm:p-8 md:p-9 flex flex-col justify-between text-left bg-white/65">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#6E6E73] mb-3">
                  <span className="tabular-nums font-semibold text-[#8C6730]">
                    {current.index} / 0{total}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{current.category}</span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-[26px] font-semibold tracking-[-0.025em] text-[#1D1D1F] leading-[1.22] text-balance">
                  {current.title}
                </h3>

                <p className="mt-3.5 text-[14.5px] sm:text-[15px] text-[#424245] leading-[1.72] text-justify">
                  {current.carouselDescription}
                </p>

                <div className="mt-5 pt-4 border-t border-black/[0.07]">
                  <p className="text-xs font-semibold text-[#8C6730] mb-1.5">
                    Công nghệ & phương pháp
                  </p>
                  <p className="text-[13.5px] sm:text-sm text-[#525F7F] leading-[1.68] italic text-justify">
                    {current.carouselMethod}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between gap-4">
                <a
                  href="https://zalo.me/0374558669"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#0068FF] hover:text-[#0055D4] transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0068FF]/30 rounded py-1"
                >
                  <span>Tư vấn qua Zalo</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={onOpenAllServices}
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D1D1F]/30 rounded py-1"
                >
                  <span>Chi tiết</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Minimal Slide Indicator & Prev/Next Bar */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div
          className="flex items-center gap-1.5 bg-white/78 backdrop-blur-md px-3.5 h-10 rounded-full border border-black/[0.07]"
          role="tablist"
          aria-label="Chọn dịch vụ"
        >
          {SERVICES.map((service, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={service.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Xem dịch vụ ${service.title}`}
                onClick={() => goTo(idx)}
                className="py-2 px-0.5 cursor-pointer focus-visible:outline-none"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-7 bg-[#8C6730]'
                      : 'w-1.5 bg-black/20 hover:bg-black/40'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Dịch vụ trước"
            className="w-10 h-10 rounded-full bg-white/78 hover:bg-white backdrop-blur-md border border-black/[0.07] text-[#1D1D1F] flex items-center justify-center transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6730]/35"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Dịch vụ tiếp theo"
            className="w-10 h-10 rounded-full bg-white/78 hover:bg-white backdrop-blur-md border border-black/[0.07] text-[#1D1D1F] flex items-center justify-center transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6730]/35"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
