import { useState } from 'react';
import { ArrowLeft, MessageCircle, Phone } from 'lucide-react';

export default function DoctorInfo({
  setCurrentTab,
}: {
  setCurrentTab: (tab: 'home' | 'doctor') => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="w-full bg-transparent text-[#1D1D1F]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-16 sm:pt-10 sm:pb-24">
        {/* Clean Back Action */}
        <div className="mb-6 sm:mb-8">
          <button
            type="button"
            onClick={() => {
              setCurrentTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#525F7F] hover:text-[#1D1D1F] transition-colors duration-150 py-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D1D1F]/30 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang chủ</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
          {/* Desktop Sticky Portrait Card (Hidden on mobile per user preference) */}
          <div className="hidden md:block md:col-span-5 md:sticky md:top-20">
            <div className="bg-white/85 backdrop-blur-xl p-2.5 rounded-[28px] shadow-[0_20px_50px_-18px_rgba(15,23,42,0.12)] ring-1 ring-black/[0.05]">
              <div className="aspect-[3/4] w-full rounded-[20px] overflow-hidden bg-[#F4F5F7]">
                {!imgError ? (
                  <img
                    src="/doctor.jpg"
                    alt="BSCK1. Trần Thuỳ Dương — Giám đốc Chuyên môn 9 p.m. SkinCare"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-[48%_14%]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                    <span className="text-sm font-medium text-[#8C6730] mb-2">
                      Giám đốc Chuyên môn
                    </span>
                    <span className="text-xl font-semibold text-[#1D1D1F]">
                      BSCK1. Trần Thuỳ Dương
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Credentials Card Column */}
          <div className="md:col-span-7 space-y-6">
            {/* Identity Header */}
            <div className="bg-white/85 backdrop-blur-xl rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-[0_12px_36px_-14px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.05] text-center md:text-left">
              <p className="text-sm sm:text-base font-semibold text-[#8C6730] mb-3.5 md:mb-4">
                Giám đốc Chuyên môn
              </p>
              <h1 className="text-[19px] min-[375px]:text-[22px] sm:text-3xl md:text-[36px] font-semibold tracking-[-0.03em] text-[#1D1D1F] mb-4 leading-tight whitespace-nowrap">
                BSCK1. TRẦN THUỲ DƯƠNG
              </h1>
              <div className="text-xs sm:text-sm md:text-[15px] font-medium text-[#8C6730] space-y-1.5">
                <p>Bác sĩ chuyên khoa cấp I - Da liễu</p>
                <p>
                  <span className="md:hidden">Cố vấn chuyên môn 9 p.m. SkinCare</span>
                  <span className="hidden md:inline">
                    Cố vấn chuyên môn hệ thống 9 p.m. SkinCare Medspa
                  </span>
                </p>
              </div>
            </div>

            {/* 4 Credential Sections in Clean Frosted Argon Surface */}
            <div className="bg-white/85 backdrop-blur-xl rounded-[24px] sm:rounded-[28px] px-6 sm:px-8 py-2 shadow-[0_12px_36px_-14px_rgba(15,23,42,0.07)] ring-1 ring-black/[0.05] divide-y divide-black/[0.06]">
              <div className="py-5 sm:py-6">
                <div className="flex items-baseline gap-3 mb-2.5">
                  <span className="text-xs font-semibold text-[#8C6730] tabular-nums shrink-0">
                    01.
                  </span>
                  <h2 className="text-base md:text-lg font-semibold text-[#1D1D1F] tracking-[-0.015em]">
                    <span className="md:hidden">Học vấn</span>
                    <span className="hidden md:inline">
                      Hành trình đào tạo y khoa chính quy
                    </span>
                  </h2>
                </div>
                <ul className="pl-0 md:pl-7 text-sm md:text-[15px] text-[#424245] leading-relaxed space-y-2 list-none md:list-disc md:marker:text-[#86868B] text-justify">
                  <li>Tốt nghiệp Bác sĩ Đa khoa – Hệ Chính quy – Học viện Quân y</li>
                  <li>
                    Đào tạo lâm sàng chuyên sâu về Da liễu thẩm mỹ tại Đại học Y dược TP. Hồ Chí Minh, Bệnh viện Đại học Y dược TP. Hồ Chí Minh và Bệnh viện Da liễu Trung ương
                  </li>
                  <li>
                    Tốt nghiệp Bác sĩ Chuyên khoa Cấp I - Chuyên ngành Da liễu - Đại học Y Hà Nội năm 2026
                  </li>
                </ul>
              </div>

              <div className="py-5 sm:py-6">
                <div className="flex items-baseline gap-3 mb-2.5">
                  <span className="text-xs font-semibold text-[#8C6730] tabular-nums shrink-0">
                    02.
                  </span>
                  <h2 className="text-base md:text-lg font-semibold text-[#1D1D1F] tracking-[-0.015em]">
                    <span className="md:hidden">Chứng chỉ chuyên môn</span>
                    <span className="hidden md:inline">
                      Chứng chỉ chuyên môn chuẩn pháp lý và vượt chuẩn medspa
                    </span>
                  </h2>
                </div>
                <ul className="pl-0 md:pl-7 text-sm md:text-[15px] text-[#424245] leading-relaxed space-y-2 list-none md:list-disc md:marker:text-[#86868B] text-justify">
                  <li>Chứng chỉ hành nghề chuyên khoa Da liễu (từ 2020)</li>
                  <li>Chứng chỉ Kiểm soát nhiễm khuẩn</li>
                  <li>Đầy đủ các chứng chỉ chuyên khoa</li>
                  <li>Chứng chỉ Đào tạo Da liễu thẩm mỹ tại Singapore, Thái Lan, Malaysia, Hàn Quốc</li>
                </ul>
              </div>

              <div className="py-5 sm:py-6">
                <div className="flex items-baseline gap-3 mb-2.5">
                  <span className="text-xs font-semibold text-[#8C6730] tabular-nums shrink-0">
                    03.
                  </span>
                  <h2 className="text-base md:text-lg font-semibold text-[#1D1D1F] tracking-[-0.015em]">
                    <span className="md:hidden">Nghiên cứu khoa học</span>
                    <span className="hidden md:inline">
                      Dấu ấn xuất bản nghiên cứu khoa học
                    </span>
                  </h2>
                </div>
                <p className="pl-0 md:pl-7 text-sm md:text-[15px] text-[#424245] leading-relaxed text-justify">
                  Các công trình khoa học xuất bản trong nước và quốc tế về bệnh lý da liễu bệnh học, viêm da tiếp xúc, tác động của môi trường lên hệ gene tại các cấu trúc của da.
                </p>
              </div>

              <div className="py-5 sm:py-6">
                <div className="flex items-baseline gap-3 mb-2.5">
                  <span className="text-xs font-semibold text-[#8C6730] tabular-nums shrink-0">
                    04.
                  </span>
                  <h2 className="text-base md:text-lg font-semibold text-[#1D1D1F] tracking-[-0.015em]">
                    <span className="md:hidden">Kinh nghiệm</span>
                    <span className="hidden md:inline">
                      Kinh nghiệm lâm sàng từ Nam ra Bắc
                    </span>
                  </h2>
                </div>
                <p className="pl-0 md:pl-7 text-sm md:text-[15px] text-[#424245] leading-relaxed text-justify">
                  09 năm kinh nghiệm trực tiếp điều trị và chăm sóc da liễu thẩm mỹ, đào tạo chuyển giao kĩ thuật cho các đơn vị lâm sàng, trực tiếp và gián tiếp mang lại làn da khỏe mạnh cho hàng ngàn khách hàng.
                </p>
              </div>
            </div>

            {/* Direct Contact Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
              <a
                href="https://zalo.me/0374558669"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#0068FF] hover:bg-[#0055D4] text-white px-6 py-3.5 rounded-2xl text-sm sm:text-[15px] font-semibold shadow-[0_10px_24px_-10px_rgba(0,104,255,0.45)] transition-all duration-200 hover:-translate-y-0.5 min-h-[54px]"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Nhắn tin Zalo</span>
              </a>
              <a
                href="tel:0374558669"
                className="flex items-center justify-center gap-2 bg-[#1D1D1F] hover:bg-black text-white px-6 py-3.5 rounded-2xl text-sm sm:text-[15px] font-semibold shadow-[0_10px_24px_-10px_rgba(29,29,31,0.4)] transition-all duration-200 hover:-translate-y-0.5 min-h-[54px]"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Gọi Hotline</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
