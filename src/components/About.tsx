import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="pt-28 pb-16 md:pt-40 md:pb-24 bg-[#F5F2EC] relative border-b border-gold/10 min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 md:space-y-6"
          >
            <span className="text-gold text-xs md:text-sm font-bold tracking-[0.3em] uppercase block mb-2 md:mb-4">
              Câu Chuyện Thương Hiệu
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#3D3833] mb-4 md:mb-6 leading-tight">
              Tại sao lại là 9PM?
            </h2>
            <div className="space-y-3 md:space-y-4 text-base md:text-lg text-[#756E65] leading-relaxed font-light text-justify md:text-left">
              <p>
                Nghiên cứu xã hội học cho ta biết về "khoảng thư giãn thuần tuý" của chị em phụ nữ. Mở đầu từ 9:00 tối, khi con đã ngủ, cũng là lúc các bạn, các mẹ bắt đầu ngơi tay để có thời gian dành cho chính bản thân mình. 
              </p>
              <p>
                Đó cũng là khung giờ mà y học khuyên chúng ta nên bắt đầu thư giãn, nghỉ ngơi để cơ thể được chữa lành.
              </p>
              <p className="font-medium text-[#3D3833] pt-2 md:pt-4">
                Từ đó, 9PM Skincare ra đời với mong muốn tạo ra một không gian tĩnh lặng, nơi bạn có thể gác lại mọi bộn bề sau một ngày dài để tận hưởng những phút giây chăm sóc bản thân trọn vẹn nhất.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative mt-4 md:mt-0"
          >
            <div className="aspect-[4/3] bg-white border border-gold/20 p-2 overflow-hidden relative z-10">
               <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=2070" alt="Spa Interior" className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-24 h-24 md:w-32 md:h-32 border-b-2 border-l-2 border-gold/30 z-0"></div>
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-24 h-24 md:w-32 md:h-32 border-t-2 border-r-2 border-gold/30 z-0"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
