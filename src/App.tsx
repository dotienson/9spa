import { useState } from 'react';
import TopNav from './components/TopNav';
import HomeLanding from './components/HomeLanding';
import DoctorInfo from './components/DoctorInfo';
import ServicesModal from './components/ServicesModal';
import SupportChatWidget from './components/SupportChatWidget';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'doctor'>('home');
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] font-sans text-[#1D1D1F] selection:bg-[#8C6730]/20 selection:text-[#1D1D1F] flex flex-col relative">
      {/* Luminous Aurora Aura Background Layer */}
      <div className="aurora-canvas" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
        <div className="aurora-blob aurora-blob-4" />
      </div>

      <div className="relative z-10 flex flex-col min-h-[100dvh]">
        <TopNav
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onOpenServices={() => setIsServicesOpen(true)}
        />

        <main className="flex-1">
          {currentTab === 'home' && (
            <HomeLanding
              setCurrentTab={setCurrentTab}
              onOpenServices={() => setIsServicesOpen(true)}
            />
          )}
          {currentTab === 'doctor' && <DoctorInfo setCurrentTab={setCurrentTab} />}
        </main>
      </div>

      <ServicesModal
        isOpen={isServicesOpen}
        onClose={() => setIsServicesOpen(false)}
      />

      {!isServicesOpen && <SupportChatWidget />}
    </div>
  );
}
