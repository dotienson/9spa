import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Header({ 
  currentTab, 
  setCurrentTab 
}: { 
  currentTab: 'home' | 'services' | 'pricing';
  setCurrentTab: (tab: 'home' | 'services' | 'pricing') => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
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
    <header className="fixed w-full top-0 z-50 bg-[#FCFBF9]/90 backdrop-blur-md border-b border-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center z-50">
            <button onClick={() => { setCurrentTab('home'); setIsOpen(false); window.scrollTo(0, 0); }}>
              <Logo className="h-16 md:h-24 transition-all" />
            </button>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-10 text-sm uppercase tracking-widest font-medium">
            <button onClick={() => { setCurrentTab('home'); window.scrollTo(0, 0); }} className={`${currentTab === 'home' ? 'text-gold' : 'text-[#3D3833]'} hover:text-gold transition-colors`}>Câu Chuyện</button>
            <button onClick={() => { setCurrentTab('services'); window.scrollTo(0, 0); }} className={`${currentTab === 'services' ? 'text-gold' : 'text-[#3D3833]'} hover:text-gold transition-colors`}>Dịch Vụ</button>
            <button onClick={() => { setCurrentTab('pricing'); window.scrollTo(0, 0); }} className={`${currentTab === 'pricing' ? 'text-gold' : 'text-[#3D3833]'} hover:text-gold transition-colors`}>Bảng Giá</button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:0984144492"
              className="bg-gold px-6 py-3 text-sm md:text-base font-bold uppercase tracking-widest text-white hover:bg-[#B38F2E] transition-all shadow-md rounded-sm"
            >
              Hotline: 0984 144 492
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#3D3833] hover:text-gold focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? 'close' : 'menu'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#FCFBF9] md:hidden flex flex-col items-center justify-center pt-20"
          >
            <nav className="flex flex-col items-center gap-8 w-full px-6">
              <button onClick={() => { setCurrentTab('home'); setIsOpen(false); window.scrollTo(0, 0); }} className={`text-2xl font-serif ${currentTab === 'home' ? 'text-gold' : 'text-[#3D3833]'} hover:text-gold transition-colors`}>Câu Chuyện</button>
              <button onClick={() => { setCurrentTab('services'); setIsOpen(false); window.scrollTo(0, 0); }} className={`text-2xl font-serif ${currentTab === 'services' ? 'text-gold' : 'text-[#3D3833]'} hover:text-gold transition-colors`}>Dịch Vụ</button>
              <button onClick={() => { setCurrentTab('pricing'); setIsOpen(false); window.scrollTo(0, 0); }} className={`text-2xl font-serif ${currentTab === 'pricing' ? 'text-gold' : 'text-[#3D3833]'} hover:text-gold transition-colors`}>Bảng Giá</button>
              
              <div className="w-12 h-[1px] bg-gold/50 my-4"></div>
              
              <a 
                href="tel:0984144492" 
                className="bg-gold px-8 py-4 text-base font-bold tracking-[0.1em] text-white hover:bg-[#B38F2E] transition-all shadow-md rounded-sm w-full text-center flex items-center justify-center gap-2"
              >
                HOTLINE: 0984 144 492
              </a>
            </nav>
            
            <div className="absolute bottom-12 left-0 right-0 text-center opacity-50">
              <Logo className="h-12 mx-auto grayscale" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
