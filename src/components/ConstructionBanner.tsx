import { useState } from 'react';
import { X, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ConstructionBanner() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[100] bg-[#1A1A1A] border border-gold/30 p-5 shadow-2xl rounded-sm flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
            <Wrench className="w-5 h-5" />
          </div>
          <div className="flex-1 pt-0.5">
            <h4 className="text-white font-bold text-sm mb-1.5 uppercase tracking-wide">Website đang xây dựng</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Một số tính năng có thể chưa hoàn thiện. Cảm ơn bạn đã ghé thăm!
            </p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
