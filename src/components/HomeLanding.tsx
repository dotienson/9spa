import { useState } from 'react';
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
import { motion, useReducedMotion } from 'motion/react';
import Logo from './Logo';
import ServiceCarousel from './ServiceCarousel';
import MedspaAdvantageMarquee from './MedspaAdvantageMarquee';
import ConsultationChatBox from './ConsultationChatBox';
import ScrollReveal from './ScrollReveal';

interface HomeLandingProps {
  setCurrentTab: (tab: 'home' | 'doctor') => void;
  onOpenServices: () => void;
}

export default function HomeLanding({ setCurrentTab, onOpenServices }: HomeLandingProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isChatActive, setIsChatActive] = useState(false);

  const handleOpenDoctor = () => {
    setCurrentTab('doctor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-transparent text-[#1D1D1F]">
      {/* BAND 1: Luminous Aurora Hero — Brand Identity + Inline Founder Quote & Expanding Consultation Chat */}
      <section className="w-full border-b border-black/[0.05]">
        <div
          className={`mx-auto px-4 sm:px-6 pt-8 pb-10 sm:pt-12 sm:pb-14 transition-[max-width] duration-300 ${
            isChatActive ? 'max-w-[1088px]' : 'max-w-5xl'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-9 items-start">
            {/* Left Column: Large Sharp Logo + Brand Positioning + Horizontal Advantage Cards */}
            <div
              className={`${
                isChatActive ? 'lg:col-span-5' : 'lg:col-span-6'
              } lg:pt-2 min-w-0 w-full flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-300`}
            >
              <div
                className={`${
                  isChatActive ? 'w-44 sm:w-52 lg:w-52' : 'w-48 sm:w-56 md:w-64'
                } -my-5 sm:-my-6 overflow-hidden flex items-center justify-center lg:justify-start transition-all duration-300`}
              >
                <Logo className="w-full h-auto contrast-[1.06]" />
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1 text-xs sm:text-[13px] font-medium text-[#6E6E73]">
                <span className="text-[#8C6730] font-semibold">Spa của Bác sĩ Dương</span>
                <span aria-hidden="true">·</span>
                <span>46/196 Nguyễn Sơn, Bồ Đề</span>
              </div>

              <h1
                className="mt-2.5 font-semibold tracking-[-0.03em] text-[#1D1D1F] leading-[1.16]"
                style={{
                  fontSize: isChatActive
                    ? 'clamp(1.75rem, 2.9vw, 2.4rem)'
                    : 'clamp(1.85rem, 3.6vw, 2.75rem)',
                }}
              >
                <span className="block overflow-hidden pb-0.5">
                  <motion.span
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, y: 20, filter: 'blur(6px)' }
                    }
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.7,
                      delay: 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="block hero-title-sheen"
                  >
                    Chuyên gia da liễu
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-0.5">
                  <motion.span
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, y: 20, filter: 'blur(6px)' }
                    }
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.72,
                      delay: 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="block hero-title-sheen"
                  >
                    trực tiếp vận hành
                  </motion.span>
                </span>
              </h1>

              <div className="mt-4 w-full">
                <MedspaAdvantageMarquee />
              </div>
            </div>

            {/* Right Column: Translucent White Frosted Quote Card + Simulated Consultation Chat Box */}
            <div
              className={`${
                isChatActive ? 'lg:col-span-7' : 'lg:col-span-6'
              } min-w-0 space-y-4 transition-all duration-300`}
            >
              <ScrollReveal delay={1}>
                <div className="bg-white/78 backdrop-blur-xl rounded-[20px] sm:rounded-[24px] p-6 sm:p-7 border border-black/[0.07]">
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
              </ScrollReveal>

              <ConsultationChatBox onActiveChange={setIsChatActive} />
            </div>
          </div>
        </div>
      </section>

      {/* BAND 2: Translucent Frosted Band for Sliding Services */}
      <section className="w-full bg-white/35 backdrop-blur-xs border-b border-black/[0.05] py-10 sm:py-14">
        <ScrollReveal className="max-w-5xl mx-auto px-4 sm:px-6">
          <ServiceCarousel onOpenAllServices={onOpenServices} />
        </ScrollReveal>
      </section>

      {/* BAND 3: Action Hub — Harmonious Hierarchy & Effortless Usability */}
      <section className="w-full bg-transparent border-b border-black/[0.05] py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="mb-6 text-center sm:text-left">
            <p className="text-xs font-semibold text-[#8C6730] mb-1">
              Kết nối & Đặt hẹn
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-[-0.025em] text-[#1D1D1F]">
              Tìm hiểu thêm hoặc đặt lịch trực tiếp
            </h2>
          </ScrollReveal>

          <div className="space-y-4">
            {/* Top Row (2 Discovery Cards) */}
            <ScrollReveal delay={1} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              <button
                type="button"
                onClick={onOpenServices}
                className="group flex items-center justify-between gap-4 bg-white/78 hover:bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-black/[0.07] hover:border-black/[0.12] transition-colors duration-150 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6730]/35"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-[#8C6730]/10 text-[#8C6730] flex items-center justify-center shrink-0">
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
                className="group flex items-center justify-between gap-4 bg-white/78 hover:bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-black/[0.07] hover:border-black/[0.12] transition-colors duration-150 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6730]/35"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-[#8C6730]/10 text-[#8C6730] flex items-center justify-center shrink-0">
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
            </ScrollReveal>

            {/* Bottom Row (4 Compact, Flat-Refined Contact & Booking Actions) */}
            <ScrollReveal delay={2} className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
              <a
                href="tel:0374558669"
                className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#0C7F54] hover:bg-[#096B46] text-white px-2.5 sm:px-4 py-2.5 rounded-xl transition-colors duration-150 text-center min-h-[44px] sm:min-h-[46px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C7F54]/40"
              >
                <Phone className="w-3.5 h-3.5 text-white/90 shrink-0" />
                <span className="text-[11.5px] sm:text-[13px] font-semibold tracking-[0.015em] text-white whitespace-nowrap">
                  GỌI HOTLINE
                </span>
              </a>

              <a
                href="https://zalo.me/0374558669"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#0068FF] hover:bg-[#0055D4] text-white px-2.5 sm:px-4 py-2.5 rounded-xl transition-colors duration-150 text-center min-h-[44px] sm:min-h-[46px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0068FF]/40"
              >
                <MessageCircle className="w-3.5 h-3.5 text-white/90 shrink-0" />
                <span className="text-[11.5px] sm:text-[13px] font-semibold tracking-[0.015em] text-white whitespace-nowrap">
                  NHẮN QUA ZALO
                </span>
              </a>

              {/* Desktop Cal.com Popup Triggers */}
              <button
                type="button"
                data-cal-link="9pmskincare/basic"
                data-cal-namespace="basic"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="hidden md:inline-flex items-center justify-center gap-2 bg-[#F6EFE4] hover:bg-[#EDE0CC] text-[#6B4B1F] border border-[#8C6730]/22 px-4 py-2.5 rounded-xl transition-colors duration-150 text-center min-h-[46px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6730]/40"
              >
                <Calendar className="w-3.5 h-3.5 text-[#8C6730] shrink-0" />
                <span className="text-[13px] font-semibold tracking-[-0.01em] text-[#5C3F17] whitespace-nowrap">
                  Đặt lịch cơ bản
                </span>
              </button>

              <button
                type="button"
                data-cal-link="9pmskincare/120min"
                data-cal-namespace="120min"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="hidden md:inline-flex items-center justify-center gap-2 bg-[#966D31] hover:bg-[#7E5924] text-white px-4 py-2.5 rounded-xl transition-colors duration-150 text-center min-h-[46px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#966D31]/40"
              >
                <CalendarClock className="w-3.5 h-3.5 text-white/90 shrink-0" />
                <span className="text-[13px] font-semibold tracking-[-0.01em] whitespace-nowrap">
                  Đặt lịch chuyên sâu
                </span>
              </button>

              {/* Mobile Direct Booking Links */}
              <a
                href="https://cal.com/9pmskincare/basic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex md:hidden items-center justify-center gap-1.5 bg-[#F6EFE4] hover:bg-[#EDE0CC] text-[#6B4B1F] border border-[#8C6730]/22 px-2.5 py-2.5 rounded-xl transition-colors duration-150 text-center min-h-[44px]"
              >
                <Calendar className="w-3.5 h-3.5 text-[#8C6730] shrink-0" />
                <span className="text-[11.5px] font-semibold text-[#5C3F17] whitespace-nowrap">
                  Đặt lịch cơ bản
                </span>
              </a>

              <a
                href="https://cal.com/9pmskincare/120min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex md:hidden items-center justify-center gap-1.5 bg-[#966D31] hover:bg-[#7E5924] text-white px-2.5 py-2.5 rounded-xl transition-colors duration-150 text-center min-h-[44px]"
              >
                <CalendarClock className="w-3.5 h-3.5 text-white/90 shrink-0" />
                <span className="text-[11.5px] font-semibold whitespace-nowrap">
                  Đặt lịch chuyên sâu
                </span>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* BAND 5: Quiet Translucent Footer */}
      <footer className="w-full bg-white/55 backdrop-blur-md py-9 sm:py-10">
        <ScrollReveal className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
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
        </ScrollReveal>
      </footer>
    </div>
  );
}
