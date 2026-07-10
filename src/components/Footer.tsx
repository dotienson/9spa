import { Instagram, Facebook, MapPin, Globe, Phone } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-[#FCFBF9] text-[#756E65] pt-16 md:pt-20 pb-8 md:pb-10 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-10 md:mb-16">
          
          <div className="md:col-span-5 space-y-4 md:space-y-6">
            <div className="mb-2 md:mb-6 flex items-center">
              <Logo className="h-12 md:h-16" />
            </div>
            <p className="text-sm text-[#756E65] leading-relaxed max-w-sm tracking-wide">
              Nơi đánh thức vẻ đẹp vượt thời gian. Chúng tôi mang đến những liệu trình trẻ hóa da tiên tiến, chuẩn y khoa, giúp bạn tự tin tỏa sáng với làn da hoàn mỹ.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white text-[#756E65] transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white text-[#756E65] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4 md:space-y-6">
            <h4 className="text-[#3D3833] font-bold uppercase tracking-[0.3em] text-xs md:text-sm mb-2">Liên Kết</h4>
            <ul className="space-y-2 md:space-y-3 text-sm uppercase tracking-widest">
              <li><a href="#about" className="hover:text-gold transition-colors">Về 9pm Skincare</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Dịch vụ & Bảng giá</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Chính sách bảo mật</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4 md:space-y-6">
            <h4 className="text-[#3D3833] font-bold uppercase tracking-[0.3em] text-xs md:text-sm mb-2">Liên Hệ</h4>
            <ul className="space-y-3 md:space-y-4 text-sm tracking-wide">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Số 46, ngõ 196, Nguyễn Sơn, Bồ Đề</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>0984 144 492</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-gold shrink-0" />
                <span className="uppercase tracking-widest">9pmskincare.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-center items-center gap-4 text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#756E65]">
          <p>&copy; {new Date().getFullYear()} 9PM Skincare Medical Spa</p>
        </div>
      </div>
    </footer>
  );
}
