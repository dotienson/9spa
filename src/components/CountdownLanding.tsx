import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

export default function CountdownLanding({ setCurrentTab }: { setCurrentTab: (tab: 'home' | 'doctor') => void }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    const targetDate = new Date('2026-08-08T08:00:00').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-[100dvh] bg-[#FDFCFB] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background decoration - simplified for mobile performance using gradients instead of blur */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 10% 10%, rgba(206,170,105,0.15) 0%, transparent 40%), radial-gradient(circle at 90% 90%, rgba(206,170,105,0.15) 0%, transparent 40%)'
        }}
      >
      </div>

      <div
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center my-auto pt-10 pb-20"
      >
        <Logo className="h-24 md:h-48 mb-6 md:mb-10" />

        <h1 className="text-lg sm:text-xl md:text-3xl font-serif font-bold text-[#1F1A17] mb-4 md:mb-6 leading-relaxed max-w-2xl mx-auto px-2 md:px-4">
          Cuối ngõ nhỏ yên bình, dưới tán hoa giấy, <br className="hidden md:block" />
          có một medspa nhỏ sắp khai trương
        </h1>
        <p className="text-gold-dark text-lg sm:text-xl md:text-4xl font-bold tracking-widest mb-8 md:mb-12 uppercase px-2">
          8:00 ngày 08/08/2026
        </p>

        {/* Countdown */}
        <div className="flex gap-2 sm:gap-4 md:gap-8 mb-10 md:mb-16">
          <TimeUnit value={timeLeft.days} label="Ngày" />
          <TimeUnit value={timeLeft.hours} label="Giờ" />
          <TimeUnit value={timeLeft.minutes} label="Phút" />
          <TimeUnit value={timeLeft.seconds} label="Giây" />
        </div>

        <div className="flex flex-col gap-3 md:gap-4 w-full max-w-3xl mx-auto mb-8 md:mb-10 px-2 sm:px-4">
          {/* Hàng 1 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full">
            <a
              href="tel:0374558669"
              className="flex flex-col items-center justify-center gap-1 bg-gold text-white px-2 py-3 md:py-4 font-bold uppercase tracking-widest rounded-sm hover:bg-gold-dark transition-colors shadow-md text-center h-full"
            >
              <span className="text-[10px] md:text-xs opacity-90">Hotline Gọi</span>
              <span className="text-sm md:text-base">0374 558 669</span>
            </a>
            
            <a
              href="https://zalo.me/0374558669"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 bg-[#0068FF] text-white px-2 py-3 md:py-4 font-bold uppercase tracking-widest rounded-sm hover:bg-[#0054cc] transition-colors shadow-md text-center h-full"
            >
              <span className="text-[10px] md:text-xs opacity-90">Nhắn tin Zalo</span>
              <span className="text-sm md:text-base">0374 558 669</span>
            </a>

            {/* Desktop Cal.com Buttons */}
            <button
              data-cal-link="9pmskincare/basic"
              data-cal-namespace="basic"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              className="hidden md:flex flex-col items-center justify-center gap-1 bg-[#1F1A17] text-white px-2 py-3 md:py-4 font-bold uppercase tracking-widest rounded-sm hover:bg-black transition-colors shadow-md text-center h-full"
            >
              <span className="text-sm md:text-base whitespace-nowrap">Đặt lịch</span>
              <span className="text-sm md:text-base whitespace-nowrap">Cơ bản</span>
            </button>
            
            <button
              data-cal-link="9pmskincare/120min"
              data-cal-namespace="120min"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              className="hidden md:flex flex-col items-center justify-center gap-1 bg-gold-dark text-white px-2 py-3 md:py-4 font-bold uppercase tracking-widest rounded-sm hover:bg-gold transition-colors shadow-md text-center h-full"
            >
              <span className="text-sm md:text-base whitespace-nowrap">Đặt lịch</span>
              <span className="text-sm md:text-base whitespace-nowrap">Chuyên sâu</span>
            </button>

            {/* Mobile Direct Links */}
            <a
              href="https://cal.com/9pmskincare/basic"
              target="_blank"
              rel="noopener noreferrer"
              className="flex md:hidden flex-col items-center justify-center gap-1 bg-[#1F1A17] text-white px-2 py-3 md:py-4 font-bold uppercase tracking-widest rounded-sm hover:bg-black transition-colors shadow-md text-center h-full"
            >
              <span className="text-sm md:text-base whitespace-nowrap">Đặt lịch</span>
              <span className="text-sm md:text-base whitespace-nowrap">Cơ bản</span>
            </a>
            <a
              href="https://cal.com/9pmskincare/120min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex md:hidden flex-col items-center justify-center gap-1 bg-gold-dark text-white px-2 py-3 md:py-4 font-bold uppercase tracking-widest rounded-sm hover:bg-gold transition-colors shadow-md text-center h-full"
            >
              <span className="text-sm md:text-base whitespace-nowrap">Đặt lịch</span>
              <span className="text-sm md:text-base whitespace-nowrap">Chuyên sâu</span>
            </a>
          </div>

          {/* Hàng 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full mt-2">
            <button
              onClick={() => setShowPopup(true)}
              className="flex flex-col items-center justify-center gap-1 bg-transparent border-2 border-gold-dark text-gold-dark px-3 py-3 md:py-4 font-bold uppercase tracking-widest rounded-sm hover:bg-gold-dark hover:text-white transition-colors text-center h-full"
            >
              <span className="text-sm md:text-base">Các dịch vụ tại 9PM</span>
            </button>
            <button
              onClick={() => { setCurrentTab('doctor'); window.scrollTo(0, 0); }}
              className="flex flex-col items-center justify-center gap-1 bg-transparent border-2 border-[#1F1A17] text-[#1F1A17] px-3 py-3 md:py-4 font-bold uppercase tracking-widest rounded-sm hover:bg-[#1F1A17] hover:text-white transition-colors text-center h-full"
            >
              <span className="text-[10px] md:text-xs opacity-90">Thông tin về</span>
              <span className="text-sm md:text-base">Chuyên gia phụ trách</span>
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm md:text-base text-[#4D4741] max-w-2xl mx-auto italic mb-8 md:mb-12 leading-relaxed px-4 md:px-6">
          "9 p.m. là 9 giờ tối - thời khắc ta dành cho riêng ta những phút chữa lành sau một ngày dài với nhiều trách nhiệm. Các liệu pháp tại 9 p.m. SkinCare Medspa cũng vậy, như một &quot;personal magic&quot; - phép màu dành cho riêng bạn"
        </p>

        <div className="flex flex-col items-center">
          <a 
            href="https://share.google/65bPVQf5EgZLYkwWS"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1F1A17] text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest mb-0.5 sm:mb-1 hover:text-gold transition-colors inline-block px-2 sm:px-4 leading-relaxed"
          >
            Số 46, ngõ 196 Nguyễn Sơn, Bồ Đề
          </a>
          <a 
            href="https://share.google/65bPVQf5EgZLYkwWS"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] sm:text-xs text-[#4D4741] italic hover:text-gold transition-colors"
          >
            (Click để chỉ đường trên Google Map)
          </a>
        </div>
      </div>

      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#1F1A17]/60 backdrop-blur-sm"
              onClick={() => setShowPopup(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-[#FDFCFB] border border-gold/30 p-6 md:p-8 rounded-sm shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            >
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-[#4D4741] hover:text-[#1F1A17] transition-colors"
              >
                ✕
              </button>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1F1A17] mb-6 text-center">
                Các dịch vụ hiện có tại 9PM SkinCare
              </h3>
              
              <div className="space-y-6 text-left text-sm md:text-base text-[#4D4741]">
                <div>
                  <h4 className="font-bold text-[#1F1A17] uppercase tracking-wider mb-1">LASER TÁI TẠO & PHỤC HỒI</h4>
                  <p>Phù hợp cho trẻ hoá, trị sẹo, tổn thương nổi trên da</p>
                  <p>Công nghệ sử dụng: <span className="font-semibold">Laser Fractional CO2</span></p>
                </div>
                
                <div>
                  <h4 className="font-bold text-[#1F1A17] uppercase tracking-wider mb-1">DƯỠNG CHẤT NÂNG CẤP DA</h4>
                  <p>Skin Booster với Cấp Độ Cơ Bản Tuỳ Chỉnh và Cao Cấp (R)</p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1F1A17] uppercase tracking-wider mb-1">CẢI THIỆN NỀN DA CÔNG NGHỆ CAO</h4>
                  <p>Phù hợp cho: Kháng Viêm Trị Mụn; Phục Hồi Cấu Trúc & Giảm Đỏ</p>
                  <p>Công nghệ sử dụng: <span className="font-semibold">DPL (công nghệ ánh sáng xung động cao cấp)</span></p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1F1A17] uppercase tracking-wider mb-1">CHĂM SÓC DA & TRỊ MỤN</h4>
                  <p>Công nghệ sử dụng: <span className="font-semibold">AquaPeel, Laser Fractional CO2 và DPL tuỳ gói</span></p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1F1A17] uppercase tracking-wider mb-1">Triệt Lông Công Nghệ Cao</h4>
                  <p>Từng vùng hoặc tay, chân</p>
                  <p>Công nghệ sử dụng: <span className="font-semibold">DPL lạnh</span></p>
                </div>

                <div>
                  <h4 className="font-bold text-[#1F1A17] uppercase tracking-wider mb-1">THƯ GIÃN CƠ VÀ TRẺ HOÁ</h4>
                  <p>Liên hệ để được tư vấn chi tiết</p>
                </div>

                <div className="pt-4 border-t border-gold/20 italic text-xs md:text-sm text-center">
                  <p className="mb-1">* Lưu ý: Thông tin có thể cập nhật mới tại thời điểm tư vấn.</p>
                  <p>Xin liên hệ trực tiếp để 9PM tư vấn cụ thể và chi tiết nhất.</p>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4 w-full pt-2">
                  <a
                    href="tel:0374558669"
                    className="flex flex-col items-center justify-center gap-1 bg-gold text-white px-2 py-3 md:py-4 font-bold uppercase tracking-widest rounded-sm hover:bg-gold-dark transition-colors shadow-md text-center h-full"
                  >
                    <span className="text-[10px] md:text-xs opacity-90">Hotline Gọi</span>
                    <span className="text-sm md:text-base">0374 558 669</span>
                  </a>
                  
                  <a
                    href="https://zalo.me/0374558669"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-1 bg-[#0068FF] text-white px-2 py-3 md:py-4 font-bold uppercase tracking-widest rounded-sm hover:bg-[#0054cc] transition-colors shadow-md text-center h-full"
                  >
                    <span className="text-[10px] md:text-xs opacity-90">Nhắn tin Zalo</span>
                    <span className="text-sm md:text-base">0374 558 669</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-2 text-center w-full text-[10px] sm:text-xs text-[#4D4741] px-4">
        Copyright &copy; 9 p.m. SkinCare Medspa 2026 Mọi quyền đều được bảo vệ
      </div>
    </section>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 flex items-center justify-center bg-white/60 backdrop-blur-sm border border-gold/30 rounded-sm mb-2 shadow-sm">
        <span className="text-xl sm:text-2xl md:text-4xl font-bold font-serif text-[#1F1A17]">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs md:text-sm text-[#4D4741] uppercase tracking-widest font-bold">
        {label}
      </span>
    </div>
  );
}

