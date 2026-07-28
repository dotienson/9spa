import { useState, useEffect } from 'react';
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
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

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

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '0808') {
      window.open('https://drive.google.com/drive/folders/1nXyUEfjuNdpgQmMr4THCFtj9drZAthVu?usp=sharing', '_blank');
      setShowPopup(false);
      setCode('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <section className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full mix-blend-multiply filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-light rounded-full mix-blend-multiply filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
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

        <div className="flex flex-col sm:flex-row gap-3 md:gap-6 w-full max-w-lg mx-auto mb-8 md:mb-10 px-2 sm:px-4">
          <a
            href="tel:0374558669"
            className="flex-1 flex flex-col items-center justify-center gap-1 bg-gold text-white px-3 py-3 md:py-4 font-bold uppercase tracking-widest rounded-sm hover:bg-gold-dark transition-colors shadow-md text-center"
          >
            <div className="flex items-center gap-2 text-[9px] md:text-xs opacity-90 mb-0.5 md:mb-1">
              <span>Hotline đặt lịch</span>
            </div>
            <span className="text-sm sm:text-base md:text-lg">0374 558 669</span>
          </a>
          <button
            onClick={() => { setCurrentTab('doctor'); window.scrollTo(0, 0); }}
            className="flex-1 flex flex-col items-center justify-center gap-1 bg-transparent border-2 border-[#1F1A17] text-[#1F1A17] px-3 py-3 md:py-4 font-bold uppercase tracking-widest rounded-sm hover:bg-[#1F1A17] hover:text-white transition-colors text-center"
          >
            <div className="flex items-center gap-2 text-[9px] md:text-xs opacity-90 mb-0.5 md:mb-1">
              <span>Thông tin</span>
            </div>
            <span className="text-sm sm:text-base md:text-lg">Chuyên gia</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm md:text-base text-[#4D4741] max-w-2xl mx-auto italic mb-8 md:mb-12 leading-relaxed px-4 md:px-6">
          "9 p.m. là 9 giờ tối - thời khắc ta dành cho riêng ta những phút chữa lành sau một ngày dài với nhiều trách nhiệm. Các liệu pháp tại 9 p.m. SkinCare Medspa cũng vậy, như một &quot;personal magic&quot; - phép màu dành cho riêng bạn"
        </p>

        <a 
          href="https://share.google/65bPVQf5EgZLYkwWS"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1F1A17] text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest mb-4 hover:text-gold transition-colors inline-block px-2 sm:px-4 leading-relaxed"
        >
          Số 46, ngõ 196 Nguyễn Sơn, Bồ Đề
        </a>
        
        <button
          onClick={() => setShowPopup(true)}
          className="text-gold-dark text-xs sm:text-sm md:text-base font-bold underline underline-offset-4 decoration-gold/50 hover:decoration-gold transition-colors leading-relaxed px-2"
        >
          Xem trước các dịch vụ của 9 p.m Skincare
        </button>
      </motion.div>

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
              className="relative bg-[#FDFCFB] border border-gold/30 p-6 md:p-8 rounded-sm shadow-xl w-full max-w-md"
            >
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-[#4D4741] hover:text-[#1F1A17] transition-colors"
              >
                ✕
              </button>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1F1A17] mb-6 text-center">
                Bạn có mã Khách quen nhà 9PM chưa?
              </h3>
              <form onSubmit={handleCodeSubmit} className="flex flex-col gap-4">
                <div>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setError(false);
                    }}
                    placeholder="Nhập mã..."
                    className={`w-full px-4 py-3 bg-white border ${error ? 'border-red-500' : 'border-gold/30'} rounded-sm focus:outline-none focus:border-gold transition-colors text-center font-bold tracking-widest text-[#1F1A17]`}
                    autoFocus
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-2 text-center">Mã không chính xác, vui lòng thử lại!</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold text-white font-bold uppercase tracking-widest py-3 rounded-sm hover:bg-gold-dark transition-colors"
                >
                  Xác nhận
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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

