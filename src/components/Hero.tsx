import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-[80px] overflow-hidden bg-[#FDFCF9]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=2070"
          alt="Spa Treatment"
          className="w-full h-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFCF9]/90 via-[#FDFCF9]/70 to-[#FDFCF9]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <span className="text-gold text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
            Khoảng Thư Giãn Thuần Túy
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-[#2D2D2D] leading-tight mb-8">
            Đánh Thức Làn Da <br className="hidden md:block" />
            <span className="italic text-gold">Thanh Xuân</span>
          </h1>
          
          <div className="text-base md:text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed font-light text-justify md:text-center">
            <p>
              Nghiên cứu xã hội học cho ta biết về "khoảng thư giãn thuần tuý" (uncontaminated leisure) của chị em phụ nữ. Mở đầu từ 9:00 tối, khi con đã ngủ, cũng là lúc các bạn, các mẹ bắt đầu ngơi tay để có thời gian dành cho chính bản thân mình. Đó cũng là khung giờ mà y học khuyên chúng ta nên bắt đầu thư giãn, nghỉ ngơi để cơ thể được chữa lành...
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#booking"
              className="px-8 py-4 bg-gold text-white font-bold text-sm tracking-[0.2em] uppercase hover:bg-[#B38F2E] transition-colors w-full sm:w-auto text-center"
            >
              Đặt lịch hẹn
            </a>
            <a
              href="#services"
              className="px-8 py-4 border border-gold text-gold font-bold text-sm tracking-[0.2em] uppercase hover:bg-gold hover:text-white transition-colors w-full sm:w-auto text-center"
            >
              Khám phá dịch vụ
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs tracking-widest text-neutral-500 uppercase">Cuộn xuống</span>
        <div className="w-[1px] h-12 bg-gold/50"></div>
      </div>
    </section>
  );
}
