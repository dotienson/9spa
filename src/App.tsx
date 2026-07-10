import Header from './components/Header';
import About from './components/About';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import ConstructionBanner from './components/ConstructionBanner';
import FloatingHotline from './components/FloatingHotline';

export default function App() {
  return (
    <div className="min-h-screen bg-[#111111] font-sans text-neutral-100 selection:bg-gold/30 selection:text-white flex flex-col relative">
      <Header />
      <main className="flex-1">
        <About />
        <Services />
        <Pricing />
      </main>
      <Footer />
      <ConstructionBanner />
      <FloatingHotline />
    </div>
  );
}
