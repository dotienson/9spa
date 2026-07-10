import { useState } from 'react';
import Header from './components/Header';
import About from './components/About';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import ConstructionBanner from './components/ConstructionBanner';
import FloatingHotline from './components/FloatingHotline';
import WelcomePopup from './components/WelcomePopup';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'services' | 'pricing'>('home');

  return (
    <div className="min-h-screen bg-[#111111] font-sans text-neutral-100 selection:bg-gold/30 selection:text-white flex flex-col relative">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="flex-1 pt-[70px]">
        {currentTab === 'home' && <About />}
        {currentTab === 'services' && <Services />}
        {currentTab === 'pricing' && <Pricing />}
      </main>
      <Footer />
      <ConstructionBanner />
      <FloatingHotline />
      <WelcomePopup />
    </div>
  );
}
