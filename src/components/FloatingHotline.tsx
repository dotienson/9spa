import { motion } from 'motion/react';
import { Phone } from 'lucide-react';

export default function FloatingHotline() {
  return (
    <motion.a
      href="tel:0984144492"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
      className="fixed bottom-6 right-6 z-50 bg-gold text-white p-4 rounded-full shadow-xl shadow-gold/20 flex items-center justify-center hover:bg-[#B38F2E] hover:scale-110 transition-all group"
      aria-label="Call Hotline"
    >
      <Phone className="w-6 h-6 animate-pulse" fill="currentColor" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap opacity-0 group-hover:opacity-100 font-bold ml-0 group-hover:ml-3">
        0984 144 492
      </span>
      
      {/* Ping animation behind the button */}
      <span className="absolute w-full h-full rounded-full bg-gold opacity-50 animate-ping -z-10"></span>
    </motion.a>
  );
}
