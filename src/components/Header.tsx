import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-[#111111]/90 backdrop-blur-md border-b border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-[90px]">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#">
              <Logo />
            </a>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-10 text-sm uppercase tracking-widest font-medium">
            <a href="#about" className="text-neutral-300 hover:text-gold transition-colors">Giới Thiệu</a>
            <a href="#services" className="text-neutral-300 hover:text-gold transition-colors">Dịch Vụ</a>
            <a href="#pricing" className="text-neutral-300 hover:text-gold transition-colors">Bảng Giá</a>
            <a href="#booking" className="text-neutral-300 hover:text-gold transition-colors">Liên Hệ</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="#booking"
              className="border border-gold px-6 py-2 text-xs md:text-sm uppercase tracking-widest text-gold hover:bg-gold hover:text-white transition-all"
            >
              Hotline: 0984 144 492
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-300 hover:text-gold focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#111111] border-b border-gold/20"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-neutral-300 hover:text-gold">Về Chúng Tôi</a>
            <a href="#services" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-neutral-300 hover:text-gold">Dịch Vụ</a>
            <a href="#pricing" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-neutral-300 hover:text-gold">Bảng Giá</a>
            <a href="#booking" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-neutral-300 hover:text-gold">Đặt Lịch</a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
