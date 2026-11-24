interface TopNavProps {
  currentTab: 'home' | 'doctor';
  setCurrentTab: (tab: 'home' | 'doctor') => void;
  onOpenServices: () => void;
}

export default function TopNav({ currentTab, setCurrentTab, onOpenServices }: TopNavProps) {
  const handleGoHome = () => {
    setCurrentTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoDoctor = () => {
    setCurrentTab('doctor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/75 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_2px_12px_-6px_rgba(15,23,42,0.05)]">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2 sm:gap-6">
        {/* Zone 1: Prominent compact 9pm brand wordmark */}
        <button
          type="button"
          onClick={handleGoHome}
          className="text-xl sm:text-2xl font-bold tracking-[-0.04em] text-[#1D1D1F] hover:text-[#8C6730] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D1D1F]/30 rounded py-0.5 leading-none"
          aria-label="9pm Trang chủ"
        >
          9pm
        </button>

        {/* Zone 2: Desktop-only single-line nav links (hidden on mobile to keep top bar clean) */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden md:flex items-center gap-7 text-sm"
        >
          <button
            type="button"
            onClick={handleGoHome}
            className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D1D1F]/30 rounded px-1.5 py-2 ${
              currentTab === 'home'
                ? 'text-[#1D1D1F] font-semibold'
                : 'text-[#525F7F] hover:text-[#1D1D1F] font-medium'
            }`}
          >
            Trang chủ
          </button>
          <button
            type="button"
            onClick={onOpenServices}
            className="whitespace-nowrap shrink-0 cursor-pointer text-[#525F7F] hover:text-[#1D1D1F] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D1D1F]/30 rounded px-1.5 py-2"
          >
            Dịch vụ
          </button>
          <button
            type="button"
            onClick={handleGoDoctor}
            className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D1D1F]/30 rounded px-1.5 py-2 ${
              currentTab === 'doctor'
                ? 'text-[#1D1D1F] font-semibold'
                : 'text-[#525F7F] hover:text-[#1D1D1F] font-medium'
            }`}
          >
            Chuyên gia
          </button>
        </nav>

        {/* Zone 3: Booking Actions (Desktop Cal.com popups + Mobile direct links) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Desktop Cal.com Triggers */}
          <button
            type="button"
            data-cal-link="9pmskincare/basic"
            data-cal-namespace="basic"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="hidden md:inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold text-white bg-[#1D1D1F] hover:bg-black rounded-xl shadow-[0_6px_16px_-6px_rgba(29,29,31,0.35)] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D1D1F]/40"
          >
            Đặt lịch cơ bản
          </button>
          <button
            type="button"
            data-cal-link="9pmskincare/120min"
            data-cal-namespace="120min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="hidden md:inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold text-white bg-[#8C6730] hover:bg-[#725224] rounded-xl shadow-[0_6px_16px_-6px_rgba(140,103,48,0.35)] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6730]/40"
          >
            Đặt lịch chuyên sâu
          </button>

          {/* Mobile Direct Booking Links */}
          <a
            href="https://cal.com/9pmskincare/basic"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex md:hidden items-center justify-center px-2.5 sm:px-3 py-2 text-[11px] sm:text-xs font-semibold text-white bg-[#1D1D1F] hover:bg-black rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            Đặt lịch cơ bản
          </a>
          <a
            href="https://cal.com/9pmskincare/120min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex md:hidden items-center justify-center px-2.5 sm:px-3 py-2 text-[11px] sm:text-xs font-semibold text-white bg-[#8C6730] hover:bg-[#725224] rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            Đặt lịch chuyên sâu
          </a>
        </div>
      </div>
    </header>
  );
}
