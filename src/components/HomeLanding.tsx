import {
  ChevronRight,
  Phone,
  MessageCircle,
  Calendar,
  CalendarClock,
  ClipboardList,
  Stethoscope,
  MapPin,
} from 'lucide-react';
import Logo from './Logo';
import ServiceCarousel from './ServiceCarousel';

interface HomeLandingProps {
  setCurrentTab: (tab: 'home' | 'doctor') => void;
  onOpenServices: () => void;
}

export default function HomeLanding({ setCurrentTab, onOpenServices }: HomeLandingProps) {
  const handleOpenDoctor = () => {
    setCurrentTab('doctor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-transparent text-[#1D1D1F]">
      {/* BAND 1: Luminous Aurora Hero — Brand Identity + Inline Founder Quote */}
      <section className="w-full border-b border-black/[0.05]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-10 sm:pt-12 sm:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Large Sharp Logo + Brand Positioning */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="w-48 sm:w-56 md:w-64 -my-5 sm:-my-6 overflow-hidden flex items-center justify-center lg:justify-start">
                <Logo className="w-full h-auto contrast-[1.06]" />
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1 text-xs sm:text-[13px] font-medium text-[#6E6E73]">
                <span className="text-[#8C6730] font-semibold">Spa của Bác sĩ Dương</span>
                <span aria-hidden="true">·</span>
                <span>46/196 Nguyễn Sơn, Bồ Đề</span>
              </div>

              <h1
                className="mt-2.5 font-semibold tracking-[-0.03em] text-[#1D1D1F] leading-[1.15]"
                style={{ fontSize: 'clamp(1.85rem, 3.6vw, 2.75rem)' }}
              >
                Chuyên gia da liễu
                <br />
                trực tiếp vận hành
              </h1>

              <p className="mt-3.5 text-sm sm:text-[15px] text-[#525F7F] leading-relaxed max-w-md text-justify">
                Chuyên môn y khoa bài bản, am hiểu hoạt chất và công nghệ điều trị tiên tiến — thiết kế liệu trình cá nhân hoá cho từng làn da.
              </p>
            </div>

            {/* Right Column: Translucent White Frosted Quote Card over Aurora */}
            <div className="lg:col-span-6">
              <div className="bg-white/80 backdrop-blur-xl rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 md:p-9 shadow-[0_16px_44px_-16px_rgba(15,23,42,0.08)] ring-1 ring-white/80 border border-black/[0.05]">
                <blockquote className="text-[15.5px] sm:text-[16.5px] text-[#1D1D1F] leading-[1.78] font-normal tracking-[-0.01em] text-justify">
                  <span
                    aria-hidden="true"
                    className="font-serif text-[26px] leading-none text-[#8C6730] align-[-0.14em] mr-1 select-none"
                  >
                    “
                  </span>
                  9 p.m. là 9 giờ tối — thời khắc ta dành cho riêng ta những phút chữa lành sau một ngày dài với nhiều trách nhiệm. Các liệu pháp tại 9 p.m. SkinCare Medspa cũng vậy, như một &quot;personal magic&quot; — phép màu dành cho riêng bạn.
                  <span
                    aria-hidden="true"
                    className="font-serif text-[26px] leading-none text-[#8C6730] align-[-0.18em] ml-1 select-none"
                  >
                    ”
                  </span>{' '}
                  <button
                    type="button"
                    onClick={handleOpenDoctor}
                    className="inline font-semibold text-[#1D1D1F] hover:text-[#8C6730] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D1D1F]/30 rounded"
                    aria-label="Xem hồ sơ BSCK1. Trần Thuỳ Dương"
                  >
                    — BSCK1. Trần Thuỳ Dương
                  </button>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BAND 2: Translucent Frosted Band for Sliding Services */}
      <section className="w-full bg-white/35 backdrop-blur-xs border-b border-black/[0.05] py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ServiceCarousel onOpenAllServices={onOpenServices} />
        </div>
      </section>

      {/* BAND 3: Action Hub — Harmonious Hierarchy & Effortless Usability */}
      <section className="w-full bg-transparent border-b border-black/[0.05] py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-6 text-center sm:text-left">
            <p className="text-xs font-semibold text-[#8C6730] mb-1">
              Kết nối & Đặt hẹn
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-[-0.025em] text-[#1D1D1F]">
              Tìm hiểu thêm hoặc đặt lịch trực tiếp
            </h2>
          </div>

          <div className="space-y-4">
            {/* Top Row (2 Discovery Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <button
                type="button"
                onClick={onOpenServices}
                className="group flex items-center justify-between gap-4 bg-white/85 hover:bg-white backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-[0_6px_24px_-12px_rgba(15,23,42,0.08)] hover:shadow-[0_12px_30px_-12px_rgba(15,23,42,0.14)] ring-1 ring-black/[0.06] transition-all duration-200 hover:-translate-y-0.5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D1D1F]/30"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-[#8C6730]/10 text-[#8C6730] flex items-center justify-center shrink-0">
                    <ClipboardList className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-medium text-[#8C6730]">
                      Danh mục liệu trình
                    </span>
                    <span className="block text-[15px] sm:text-base font-semibold text-[#1D1D1F] mt-0.5 truncate">
                      Các dịch vụ tại 9PM
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#86868B] group-hover:text-[#1D1D1F] group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>

              <button
                type="button"
                onClick={handleOpenDoctor}
                className="group flex items-center justify-between gap-4 bg-white/85 hover:bg-white backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-[0_6px_24px_-12px_rgba(15,23,42,0.08)] hover:shadow-[0_12px_30px_-12px_rgba(15,23,42,0.14)] ring-1 ring-black/[0.06] transition-all duration-200 hover:-translate-y-0.5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D1D1F]/30"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-[#8C6730]/10 text-[#8C6730] flex items-center justify-center shrink-0">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-medium text-[#8C6730]">
                      Thông tin về
                    </span>
                    <span className="block text-[15px] sm:text-base font-semibold text-[#1D1D1F] mt-0.5 truncate">
                      Chuyên gia phụ trách
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#86868B] group-hover:text-[#1D1D1F] group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            </div>

            {/* Bottom Row (4 Prominent & Balanced Contact & Booking Actions) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
              <a
                href="tel:0374558669"
                className="group flex flex-col items-center justify-center bg-[#0C7F54] hover:bg-[#096B46] text-white px-3 py-4 rounded-2xl shadow-[0_10px_24px_-10px_rgba(12,127,84,0.48)] transition-all duration-200 hover:-translate-y-0.5 text-center min-h-[84px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7F54]/40"
              >
                <Phone className="w-4 h-4 text-white/90 mb-2" />
                <span className="text-xs sm:text-sm font-semibold tracking-[0.02em] text-white whitespace-nowrap">
                  GỌI HOTLINE
                </span>
              </a>

              <a
                href="https://zalo.me/0374558669"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center bg-[#0068FF] hover:bg-[#0055D4] text-white px-3 py-4 rounded-2xl shadow-[0_10px_24px_-10px_rgba(0,104,255,0.48)] transition-all duration-200 hover:-translate-y-0.5 text-center min-h-[84px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0068FF]/40"
              >
                <MessageCircle className="w-4 h-4 text-white/90 mb-2" />
                <span className="text-xs sm:text-sm font-semibold tracking-[0.02em] text-white whitespace-nowrap">
                  NHẮN QUA ZALO
                </span>
              </a>

              {/* Desktop Cal.com Popup Triggers */}
              <button
                type="button"
                data-cal-link="9pmskincare/basic"
                data-cal-namespace="basic"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="hidden md:flex flex-col items-center justify-center bg-[#F6EFE4] hover:bg-[#EDE0CC] text-[#6B4B1F] ring-1 ring-[#8C6730]/30 px-3 py-4 rounded-2xl shadow-[0_8px_22px_-10px_rgba(140,103,48,0.22)] transition-all duration-200 hover:-translate-y-0.5 text-center min-h-[84px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6730]/40"
              >
                <Calendar className="w-4 h-4 text-[#8C6730] mb-1.5" />
                <span className="text-xs font-medium text-[#8C6730] whitespace-nowrap">
                  Đặt lịch
                </span>
                <span className="text-[15px] font-semibold tracking-[-0.01em] text-[#5C3F17] whitespace-nowrap mt-0.5">
                  Cơ bản
                </span>
              </button>

              <button
                type="button"
                data-cal-link="9pmskincare/120min"
                data-cal-namespace="120min"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="hidden md:flex flex-col items-center justify-center bg-[#966D31] hover:bg-[#7E5924] text-white px-3 py-4 rounded-2xl shadow-[0_10px_24px_-10px_rgba(150,109,49,0.42)] transition-all duration-200 hover:-translate-y-0.5 text-center min-h-[84px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#966D31]/40"
              >
                <CalendarClock className="w-4 h-4 text-white/85 mb-1.5" />
                <span className="text-xs font-medium text-white/85 whitespace-nowrap">
                  Đặt lịch
                </span>
                <span className="text-[15px] font-semibold tracking-[-0.01em] whitespace-nowrap mt-0.5">
                  Chuyên sâu
                </span>
              </button>

              {/* Mobile Direct Booking Links */}
              <a
                href="https://cal.com/9pmskincare/basic"
                target="_blank"
                rel="noopener noreferrer"
                className="flex md:hidden flex-col items-center justify-center bg-[#F6EFE4] hover:bg-[#EDE0CC] text-[#6B4B1F] ring-1 ring-[#8C6730]/30 px-3 py-4 rounded-2xl shadow-[0_8px_20px_-10px_rgba(140,103,48,0.2)] transition-colors duration-150 text-center min-h-[84px]"
              >
                <Calendar className="w-4 h-4 text-[#8C6730] mb-1.5" />
                <span className="text-[11px] font-medium text-[#8C6730] whitespace-nowrap">
                  Đặt lịch
                </span>
                <span className="text-sm font-semibold text-[#5C3F17] whitespace-nowrap mt-0.5">
                  Cơ bản
                </span>
              </a>

              <a
                href="https://cal.com/9pmskincare/120min"
                target="_blank"
                rel="noopener noreferrer"
                className="flex md:hidden flex-col items-center justify-center bg-[#966D31] hover:bg-[#7E5924] text-white px-3 py-4 rounded-2xl shadow-[0_10px_24px_-10px_rgba(150,109,49,0.38)] transition-colors duration-150 text-center min-h-[84px]"
              >
                <CalendarClock className="w-4 h-4 text-white/85 mb-1.5" />
                <span className="text-[11px] font-medium text-white/85 whitespace-nowrap">
                  Đặt lịch
                </span>
                <span className="text-sm font-semibold whitespace-nowrap mt-0.5">
                  Chuyên sâu
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BAND 5: Quiet Translucent Footer */}
      <footer className="w-full bg-white/55 backdrop-blur-md py-9 sm:py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <a
            href="https://share.google/65bPVQf5EgZLYkwWS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center gap-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D1D1F]/30 rounded-xl px-3 py-1"
          >
            <span className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-[#1D1D1F] group-hover:text-[#8C6730] transition-colors">
              <MapPin className="w-4 h-4 text-[#8C6730] shrink-0" />
              <span>Số 46, ngõ 196 Nguyễn Sơn, Bồ Đề</span>
            </span>
            <span className="text-xs text-[#6E6E73] group-hover:text-[#1D1D1F] transition-colors">
              (Click để chỉ đường trên Google Map)
            </span>
          </a>

          <p className="mt-5 text-xs text-[#86868B]">
            Copyright &copy; 9 p.m. SkinCare Medspa 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
