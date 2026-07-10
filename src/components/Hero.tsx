import { motion } from 'motion/react';
import { Phone } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-[70px] overflow-hidden bg-[#FCFBF9]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=2070"
          alt="Spa Treatment"
          className="w-full h-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCFBF9]/90 via-[#FCFBF9]/70 to-[#FCFBF9]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mt-[-5vh] md:mt-0"
        >
          <span className="text-gold text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-3 md:mb-4 block">
            9PM Skincare
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-[#3D3833] leading-tight mb-6 md:mb-8">
            Khoảng Lặng Cho <br className="hidden md:block" />
            <span className="italic text-gold">Riêng Mình</span>
          </h1>
          
          <div className="flex flex-col items-center justify-center gap-4 md:gap-6 mt-8 md:mt-12">
            <a
              href="tel:0984144492"
              className="px-8 md:px-10 py-4 md:py-5 bg-gold text-white font-bold text-base md:text-xl tracking-[0.1em] hover:bg-[#B38F2E] transition-all w-full sm:w-auto text-center rounded-sm shadow-lg shadow-gold/20 flex items-center justify-center gap-2 md:gap-3 hover:-translate-y-1"
            >
              <Phone className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" />
              HOTLINE: 0984 144 492
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] md:text-xs tracking-widest text-neutral-400 uppercase">Cuộn xuống</span>
        <div className="w-[1px] h-8 md:h-12 bg-gold/40"></div>
      </div>
    </section>
  );
}
