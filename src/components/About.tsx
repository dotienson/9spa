import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#111111] relative border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-gold text-sm font-bold tracking-[0.3em] uppercase block mb-4">
              Giới Thiệu
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight">
              Thời Gian Dành Riêng <br/>
              <span className="italic text-gold">Cho Bản Thân Bạn</span>
            </h2>
            <div className="space-y-4 text-base md:text-lg text-gray-400 leading-relaxed font-light text-justify md:text-left">
              <p>
                Tại 9PM Skincare, chúng tôi hiểu rằng vẻ đẹp thực sự bắt nguồn từ sự thư giãn sâu thẳm bên trong. Chúng tôi mang đến không gian tĩnh lặng, nơi bạn có thể gác lại mọi bộn bề sau một ngày dài để tận hưởng những phút giây chăm sóc bản thân trọn vẹn nhất.
              </p>
              <p>
                Với đội ngũ chuyên gia giàu kinh nghiệm và phác đồ điều trị cá nhân hóa, 9PM Skincare cam kết đồng hành cùng bạn trên hành trình tìm lại làn da thanh xuân, rạng rỡ và khỏe mạnh từ gốc rễ. Hãy để chúng tôi đánh thức vẻ đẹp tiềm ẩn của bạn.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] bg-[#1A1A1A] border border-gold/20 p-2 overflow-hidden relative z-10">
               <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=2070" alt="Spa Interior" className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-gold/30 z-0"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-gold/30 z-0"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
