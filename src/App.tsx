import { useState } from 'react';
import CountdownLanding from './components/CountdownLanding';
import DoctorInfo from './components/DoctorInfo';
import FloatingHotline from './components/FloatingHotline';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'doctor'>('home');

  return (
    <div className="min-h-[100dvh] bg-[#111111] font-sans text-neutral-100 selection:bg-gold/30 selection:text-white flex flex-col relative">
      <main className="flex-1">
        {currentTab === 'home' && <CountdownLanding setCurrentTab={setCurrentTab} />}
        {currentTab === 'doctor' && <DoctorInfo setCurrentTab={setCurrentTab} />}
      </main>
      <FloatingHotline />
    </div>
  );
}
