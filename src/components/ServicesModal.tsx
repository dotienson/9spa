import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X, Phone, MessageCircle } from 'lucide-react';
import { SERVICES } from '../data/services';

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ServicesModal({ isOpen, onClose }: ServicesModalProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="services-modal-title"
        >
          {/* Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 bg-[#172B4D]/35 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Mobile Bottom-Sheet / Desktop Centered Dialog */}
          <motion.div
            initial={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : 28,
              scale: prefersReducedMotion ? 1 : 0.99,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : 24,
              scale: prefersReducedMotion ? 1 : 0.99,
            }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[86dvh] bg-[#FAF9F6] rounded-t-[28px] sm:rounded-[28px] ring-1 ring-black/[0.08] shadow-[0_24px_64px_-16px_rgba(15,23,42,0.28)] flex flex-col overflow-hidden"
          >
            {/* Mobile Sheet Grab Indicator */}
            <div className="sm:hidden flex justify-center pt-2.5 pb-1 bg-white shrink-0">
              <span className="w-10 h-1 rounded-full bg-black/15" aria-hidden="true" />
            </div>

            {/* Sticky Compact Header */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-7 pt-2 sm:pt-5 pb-3.5 sm:pb-5 bg-white border-b border-black/[0.06] shrink-0">
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs font-semibold text-[#8C6730] mb-0.5">
                  Danh mục liệu trình
                </p>
                <h3
                  id="services-modal-title"
                  className="text-[17px] sm:text-xl font-semibold tracking-[-0.02em] text-[#1D1D1F] leading-snug text-balance"
                >
                  Các dịch vụ hiện có tại 9PM SkinCare
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Đóng bảng dịch vụ"
                className="min-w-[44px] min-h-[44px] rounded-full bg-[#F4F2EE] hover:bg-[#EAE6DF] text-[#1D1D1F] flex items-center justify-center transition-colors duration-150 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6730]/40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile-Optimized Scrollable Service Cards */}
            <div className="overflow-y-auto overscroll-contain px-4 sm:px-7 py-4 sm:py-5 space-y-3 sm:space-y-3.5">
              {SERVICES.map((service) => (
                <article
                  key={service.id}
                  className="bg-white rounded-2xl p-3.5 sm:p-5 ring-1 ring-black/[0.05] shadow-[0_2px_10px_-4px_rgba(15,23,42,0.06)] text-left"
                >
                  {/* Visual Anchor + Numbered Title Row */}
                  <div className="flex items-center gap-3 sm:gap-3.5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-[#F2F0EC] shrink-0">
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-[#6E6E73]">
                        <span className="font-semibold text-[#8C6730] tabular-nums">
                          {service.index}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{service.category}</span>
                      </div>
                      <h4 className="text-[15px] sm:text-base font-semibold text-[#1D1D1F] tracking-[-0.015em] leading-snug mt-0.5">
                        {service.title}
                      </h4>
                    </div>
                  </div>

                  {/* Full-Width Readable Description (Zero Cramped Left Indent on Mobile) */}
                  <div className="mt-3 pt-3 border-t border-black/[0.05] space-y-1.5 text-[13.5px] sm:text-sm text-[#424245] leading-[1.62] text-justify">
                    <p>{service.suitability}</p>
                    {service.id !== 'skin-booster' &&
                      service.id !== 'muscle-relaxation' &&
                      service.technology && (
                        <p className="text-[#6E6E73]">
                          Công nghệ sử dụng:{' '}
                          <span className="font-semibold text-[#1D1D1F]">
                            {service.technology}
                          </span>
                        </p>
                      )}
                  </div>
                </article>
              ))}

              <div className="pt-2 pb-1 px-2 text-xs text-[#6E6E73] leading-relaxed text-center">
                <p>* Lưu ý: Thông tin có thể cập nhật mới tại thời điểm tư vấn.</p>
                <p className="mt-0.5">
                  Xin liên hệ trực tiếp để 9PM tư vấn cụ thể và chi tiết nhất.
                </p>
              </div>
            </div>

            {/* Sticky Thumb-Zone Footer Actions (Prominent Emerald Hotline & Zalo Blue) */}
            <div className="px-4 sm:px-7 pt-3 pb-[max(0.875rem,env(safe-area-inset-bottom))] sm:py-4 bg-white/95 backdrop-blur-md border-t border-black/[0.06] grid grid-cols-2 gap-2.5 sm:gap-3 shrink-0">
              <a
                href="tel:0374558669"
                className="flex items-center justify-center gap-2 bg-[#0C7F54] hover:bg-[#096B46] text-white px-3 py-3 rounded-2xl shadow-[0_8px_20px_-8px_rgba(12,127,84,0.45)] transition-colors duration-150 text-center min-h-[48px] sm:min-h-[52px]"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold tracking-[0.02em] whitespace-nowrap">
                  GỌI HOTLINE
                </span>
              </a>
              <a
                href="https://zalo.me/0374558669"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#0068FF] hover:bg-[#0055D4] text-white px-3 py-3 rounded-2xl shadow-[0_8px_20px_-8px_rgba(0,104,255,0.45)] transition-colors duration-150 text-center min-h-[48px] sm:min-h-[52px]"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold tracking-[0.02em] whitespace-nowrap">
                  NHẮN QUA ZALO
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
