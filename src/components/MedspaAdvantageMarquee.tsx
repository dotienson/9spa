interface AdvantageItem {
  topLine: string;
  bottomLine: string;
}

const MEDSPA_ADVANTAGES: AdvantageItem[] = [
  { topLine: 'Am hiểu', bottomLine: 'hoạt chất' },
  { topLine: 'Hiểu rõ', bottomLine: 'cơ chế' },
  { topLine: 'Công nghệ', bottomLine: 'tinh tuyển' },
  { topLine: 'Liệu trình', bottomLine: 'tối giản' },
  { topLine: 'Tay nghề', bottomLine: 'hàng đầu' },
];

export default function MedspaAdvantageMarquee() {
  return (
    <div
      className="advantage-marquee-viewport w-full max-w-full overflow-hidden py-1.5"
      aria-label="Ưu điểm nổi bật của 9 p.m. SkinCare Medspa"
    >
      <div className="advantage-marquee-track">
        {[0, 1].map((copyIdx) => (
          <div
            key={copyIdx}
            aria-hidden={copyIdx === 1}
            className={`flex items-stretch shrink-0 gap-2.5 sm:gap-3 pr-2.5 sm:pr-3 ${
              copyIdx === 1 ? 'advantage-marquee-duplicate' : ''
            }`}
          >
            {MEDSPA_ADVANTAGES.map((item) => (
              <div
                key={`${copyIdx}-${item.topLine}-${item.bottomLine}`}
                className="w-[132px] sm:w-[144px] shrink-0 bg-gradient-to-b from-white to-[#FAF4EA] backdrop-blur-md rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 ring-1 ring-[#8C6730]/22 shadow-[0_8px_22px_-10px_rgba(140,103,48,0.22)] flex flex-col items-center justify-center text-center"
              >
                <span className="block text-[12px] sm:text-[12.5px] font-medium text-[#7A6A53] leading-tight whitespace-nowrap">
                  {item.topLine}
                </span>
                <span className="block mt-0.5 text-[14.5px] sm:text-[15.5px] font-bold text-[#1D1D1F] tracking-[-0.015em] leading-tight whitespace-nowrap">
                  {item.bottomLine}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
