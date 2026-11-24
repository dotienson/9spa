import { AnimatePresence, motion } from 'motion/react';
import { X, Phone, MessageCircle } from 'lucide-react';
import { SERVICES } from '../data/services';

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ServicesModal({ isOpen, onClose }: ServicesModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="services-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-[#172B4D]/35 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white ring-1 ring-black/[0.06] rounded-[28px] shadow-[0_24px_64px_-16px_rgba(15,23,42,0.24)] w-full max-w-2xl max-h-[86dvh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b border-black/[0.06] shrink-0">
              <div>
                <p className="text-xs font-semibold text-[#8C6730] mb-0.5">
                  Danh mục liệu trình
                </p>
                <h3
                  id="services-modal-title"
                  className="text-lg sm:text-xl font-semibold tracking-[-0.02em] text-[#1D1D1F] text-balance"
                >
                  Các dịch vụ hiện có tại 9PM SkinCare
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Đóng bảng dịch vụ"
                className="w-9 h-9 rounded-full bg-[#F7F8FA] hover:bg-[#ECEEF2] ring-1 ring-black/[0.06] text-[#1D1D1F] flex items-center justify-center transition-colors duration-150 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D1D1F]/30"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Editorial List */}
            <div className="overflow-y-auto px-6 sm:px-8 py-6 divide-y divide-black/[0.06]">
              {SERVICES.map((service) => (
                <div key={service.id} className="py-4 first:pt-0 last:pb-0 text-left">
                  <div className="flex items-baseline gap-2.5 mb-1">
                    <span className="text-xs font-semibold text-[#8C6730] tabular-nums shrink-0">
                      {service.index}.
                    </span>
                    <h4 className="text-[15px] sm:text-base font-semibold text-[#1D1D1F] tracking-[-0.01em]">
                      {service.title}
                    </h4>
                  </div>
                  <div className="pl-6 space-y-1 text-sm text-[#424245] leading-relaxed text-justify">
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
                </div>
              ))}

              <div className="pt-5 mt-2 text-xs text-[#6E6E73] leading-relaxed text-center">
                <p>* Lưu ý: Thông tin có thể cập nhật mới tại thời điểm tư vấn.</p>
                <p className="mt-0.5">
                  Xin liên hệ trực tiếp để 9PM tư vấn cụ thể và chi tiết nhất.
                </p>
              </div>
            </div>

            {/* Footer Action Buttons (Hotline & Zalo only, per user specification) */}
            <div className="px-6 sm:px-8 py-4 bg-[#F7F8FA] border-t border-black/[0.06] grid grid-cols-2 gap-3 shrink-0">
              <a
                href="tel:0374558669"
                className="flex items-center justify-center gap-2 bg-[#1D1D1F] hover:bg-black text-white px-3 py-3.5 rounded-2xl shadow-[0_8px_20px_-8px_rgba(29,29,31,0.35)] transition-colors duration-150 text-center min-h-[52px]"
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
                className="flex items-center justify-center gap-2 bg-[#0068FF] hover:bg-[#0055D4] text-white px-3 py-3.5 rounded-2xl shadow-[0_8px_20px_-8px_rgba(0,104,255,0.4)] transition-colors duration-150 text-center min-h-[52px]"
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
