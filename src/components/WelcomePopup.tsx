import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { X, Heart } from 'lucide-react';
import Logo from './Logo';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Prevent scrolling when popup is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Popup Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg bg-[#FCFBF9] rounded-sm shadow-2xl overflow-hidden border border-gold/20"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gold transition-colors z-10"
              aria-label="Close popup"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 md:p-10 text-center flex flex-col items-center">
              <Logo className="h-16 md:h-20 mb-6 md:mb-8" />
              
              <h3 className="font-serif text-2xl md:text-3xl text-[#3D3833] mb-6 leading-tight">
                Xin chào!
              </h3>
              
              <div className="space-y-4 text-[#756E65] text-sm md:text-base leading-relaxed">
                <p>
                  Chúng em là thành viên mới xuất hiện ở con phố bình yên <strong>196 Nguyễn Sơn</strong>, 9 p.m. (9 giờ đêm) SkinCare là đơn vị chăm sóc da được bác sĩ da liễu vận hành.
                </p>
                <p>
                  Chúng em rất mong được cô bác, anh chị em nơi đây yêu thương. Như dàn hoa giấy của bác hàng xóm, chúng em luôn nhẹ nhàng và đáng yêu như vậy!
                </p>
                <p className="font-medium text-gold pt-2 flex items-center justify-center gap-1.5">
                  Thời gian dự kiến khai trương: Cuối tháng 7 - 2026 <Heart className="w-4 h-4 text-[#D35400] fill-current" />
                </p>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="mt-8 px-8 py-3 bg-gold text-white text-sm font-bold tracking-widest uppercase hover:bg-[#B38F2E] transition-colors rounded-sm shadow-sm"
              >
                Khám phá ngay
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
