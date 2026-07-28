import { motion } from 'motion/react';
import { ArrowLeft, Award, GraduationCap, Heart, BookOpen } from 'lucide-react';
import Logo from './Logo';

export default function DoctorInfo({ setCurrentTab }: { setCurrentTab: (tab: 'home' | 'doctor') => void }) {
  return (
    <section className="min-h-[100dvh] bg-[#FDFCFB] flex flex-col p-4 md:p-8 relative">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header simple */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 mb-8 md:mb-16 border-b border-gold/20 gap-4">
          <button
            onClick={() => { setCurrentTab('home'); window.scrollTo(0, 0); }}
            className="flex items-center gap-2 text-[#1F1A17] hover:text-gold transition-colors font-bold tracking-widest uppercase text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </button>
          <Logo className="h-12 text-[#1F1A17]" />
          {/* Empty div for layout balancing on desktop */}
          <div className="hidden sm:block w-[100px]"></div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start animate-fade-in-up"
        >
          <div className="hidden md:block md:col-span-5 relative md:sticky top-24 max-w-sm mx-auto md:max-w-none w-full">
            <div className="aspect-[3/4] bg-neutral-100 border border-gold/30 p-2 relative z-10">
               {/* Doctor portrait placeholder */}
               <div className="w-full h-full bg-[#E6D8C9] flex items-center justify-center overflow-hidden">
                 <img 
                   src="/doctor.jpg" 
                   alt="Bác sĩ" 
                   className="w-full h-full object-cover" 
                 />
               </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-gold/50 z-0 pointer-events-none"></div>
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-gold/50 z-0 pointer-events-none"></div>
          </div>

          <div className="md:col-span-7 space-y-8 text-[#4D4741]">
            <div className="text-center md:text-left">
              <span className="text-gold text-sm sm:text-base md:text-lg font-bold tracking-[0.15em] sm:tracking-[0.3em] uppercase block mb-4 md:mb-8">
                Chuyên gia phụ trách vận hành
              </span>
              <h2 className="font-serif text-[22px] min-[375px]:text-2xl sm:text-4xl md:text-5xl text-[#1F1A17] font-bold mb-4 md:mb-6 leading-tight whitespace-nowrap">
                BS. TRẦN THUỲ DƯƠNG
              </h2>
              <div className="text-gold text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider space-y-1 md:space-y-2">
                <p>Bác sĩ chuyên khoa Da liễu</p>
                <p>
                  <span className="md:hidden">Sáng lập và điều hành DermaButter</span>
                  <span className="hidden md:inline">Sáng lập và điều hành hệ sinh thái DermaButter</span>
                </p>
                <p>
                  <span className="md:hidden">Cố vấn chuyên môn 9 p.m. SkinCare</span>
                  <span className="hidden md:inline">Cố vấn chuyên môn hệ thống 9 p.m. SkinCare Medspa</span>
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 pt-4">
              <div className="flex flex-row items-start gap-3 md:gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-gold" />
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-[#1F1A17] mb-2 text-base md:text-lg text-left">
                    <span className="md:hidden">Học vấn</span>
                    <span className="hidden md:inline">Hành trình đào tạo y khoa chính quy</span>
                  </h4>
                  <ul className="text-xs sm:text-sm font-medium space-y-2 list-none md:list-disc pl-0 md:pl-4 text-left">
                    <li>Tốt nghiệp Bác sĩ Đa khoa – Hệ Chính quy – Học viện Quân y</li>
                    <li>Đào tạo lâm sàng chuyên sâu về Da liễu thẩm mỹ tại Đại học Y dược TP. Hồ Chí Minh, Bệnh viện Đại học Y dược TP. Hồ Chí Minh và Bệnh viện Da liễu Trung ương</li>
                    <li>Đang theo học chương trình Bác sĩ Chuyên khoa Cấp I về Da liễu tại Đại học Y Hà Nội (khoá 2024-2026)</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-row items-start gap-3 md:gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-gold" />
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-[#1F1A17] mb-2 text-base md:text-lg text-left">
                    <span className="md:hidden">Chứng chỉ chuyên môn</span>
                    <span className="hidden md:inline">Chứng chỉ chuyên môn chuẩn pháp lý và vượt chuẩn medspa</span>
                  </h4>
                  <ul className="text-xs sm:text-sm font-medium space-y-2 list-none md:list-disc pl-0 md:pl-4 text-left">
                    <li>Chứng chỉ hành nghề chuyên khoa Da liễu (từ 2020)</li>
                    <li>Các chứng chỉ kỹ thuật chuyên khoa</li>
                    <li>Chứng chỉ Đào tạo tại Singapore, Thái Lan, Malaysia, Hàn Quốc</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-row items-start gap-3 md:gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-gold" />
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-[#1F1A17] mb-2 text-base md:text-lg text-left">
                    <span className="md:hidden">Nghiên cứu khoa học</span>
                    <span className="hidden md:inline">Dấu ấn xuất bản nghiên cứu khoa học</span>
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-left">Các công trình khoa học xuất bản trong nước và quốc tế về bệnh lý da liễu bệnh học, viêm da tiếp xúc, tác động của môi trường lên hệ gene tại các cấu trúc của da.</p>
                </div>
              </div>
              <div className="flex flex-row items-start gap-3 md:gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 text-gold" />
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-[#1F1A17] mb-2 text-base md:text-lg text-left">
                    <span className="md:hidden">Kinh nghiệm</span>
                    <span className="hidden md:inline">Kinh nghiệm lâm sàng từ Nam ra Bắc</span>
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-left">09 năm kinh nghiệm trực tiếp điều trị và chăm sóc da liễu thẩm mỹ, đào tạo chuyển giao kĩ thuật cho các đơn vị lâm sàng, trực tiếp và gián tiếp mang lại làn da khỏe mạnh cho hàng ngàn khách hàng.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gold/20 flex flex-col sm:flex-row gap-4">
              <a
                href="https://zalo.me/0374558669"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#0068FF] text-white px-8 py-4 font-bold uppercase tracking-widest rounded-sm hover:bg-[#0054cc] transition-colors w-full sm:w-auto text-sm md:text-base shadow-md"
              >
                Nhắn tin Zalo
              </a>
              <a
                href="tel:0374558669"
                className="flex items-center justify-center gap-2 bg-gold text-white px-8 py-4 font-bold uppercase tracking-widest rounded-sm hover:bg-gold-dark transition-colors w-full sm:w-auto text-sm md:text-base shadow-md"
              >
                Gọi Hotline
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
