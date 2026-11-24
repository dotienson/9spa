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
      className="advantage-marquee-viewport w-full max-w-full overflow-hidden py-1"
      aria-label="Ưu điểm nổi bật của 9 p.m. SkinCare Medspa"
    >
      <div className="advantage-marquee-track">
        {[0, 1].map((copyIdx) => (
          <div
            key={copyIdx}
            aria-hidden={copyIdx === 1}
            className={`flex items-stretch shrink-0 gap-2.5 pr-2.5 ${
              copyIdx === 1 ? 'advantage-marquee-duplicate' : ''
            }`}
          >
            {MEDSPA_ADVANTAGES.map((item) => (
              <div
                key={`${copyIdx}-${item.topLine}-${item.bottomLine}`}
                className="w-[128px] sm:w-[138px] shrink-0 bg-white/78 backdrop-blur-md border border-black/[0.07] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 flex flex-col items-center justify-center text-center"
              >
                <span className="block text-[11.5px] sm:text-xs font-medium text-[#8C6730] leading-tight whitespace-nowrap">
                  {item.topLine}
                </span>
                <span className="block mt-0.5 text-[14px] sm:text-[15px] font-bold text-[#1D1D1F] tracking-[-0.015em] leading-tight whitespace-nowrap">
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
