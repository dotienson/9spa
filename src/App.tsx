import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import ConstructionBanner from './components/ConstructionBanner';

export default function App() {
  return (
    <div className="min-h-screen bg-[#111111] font-sans text-neutral-100 selection:bg-gold/30 selection:text-white flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Pricing />
      </main>
      <Footer />
      <ConstructionBanner />
    </div>
  );
}
