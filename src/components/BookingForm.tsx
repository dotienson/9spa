import { motion } from 'motion/react';
import { Calendar, User, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function BookingForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setIsSubmitted(true), 800);
  };

  return (
    <section id="booking" className="py-24 bg-[#111111] relative border-t border-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-2xl">
          
          {/* Left Text / Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#1A1A1A] p-12 lg:p-20 relative flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-gold/20"
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--color-gold) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="text-center z-10 space-y-6">
              <p className="text-[64px] font-serif text-gold opacity-40 leading-none">9PM</p>
              <p className="text-sm tracking-[0.5em] uppercase text-gray-400">Pure & Minimalist</p>
              
              <div className="pt-12 space-y-4 text-left">
                <div className="flex items-center gap-4 text-white">
                  <Phone className="w-5 h-5 text-gold" />
                  <div>
                    <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">Hotline</p>
                    <p className="text-base font-mono tracking-wider">0984 144 492</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <Calendar className="w-5 h-5 text-gold" />
                  <div>
                    <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">Giờ Mở Cửa</p>
                    <p className="text-sm tracking-wider uppercase">09:00 - 21:00 Hàng ngày</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#111111] border border-gold/20 p-10 lg:p-16 relative"
          >
            {isSubmitted ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Đặt Lịch Thành Công!</h3>
                <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                  Cảm ơn bạn đã tin tưởng 9pm Skincare. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất để xác nhận lịch hẹn.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-[11px] text-gold hover:text-[#B38F2E] font-bold uppercase tracking-widest underline underline-offset-4"
                >
                  Đặt lịch hẹn mới
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-serif text-center mb-8 text-white">Đặt lịch hẹn tư vấn</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="text-xs md:text-sm uppercase tracking-widest font-bold text-gray-500 mb-1 block">Họ và Tên</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      className="w-full border-b border-gray-700 py-2 text-base focus:outline-none focus:border-gold bg-transparent text-white"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="text-xs md:text-sm uppercase tracking-widest font-bold text-gray-500 mb-1 block">Số Điện Thoại</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required
                      className="w-full border-b border-gray-700 py-2 text-base focus:outline-none focus:border-gold bg-transparent text-white"
                      placeholder="0984 144 492"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="text-xs md:text-sm uppercase tracking-widest font-bold text-gray-500 mb-1 block">Dịch Vụ Quan Tâm</label>
                    <select 
                      id="service" 
                      required
                      className="w-full border-b border-gray-700 py-2 text-base focus:outline-none focus:border-gold bg-transparent text-white [&>option]:bg-[#111111]"
                    >
                      <option value="">Chọn dịch vụ</option>
                      <option value="mulgwang">Căng bóng da Mulgwang</option>
                      <option value="hifu">Nâng cơ trẻ hóa HIFU</option>
                      <option value="meso">Tiêm Meso phục hồi</option>
                      <option value="laser">Trẻ hóa Laser Fractional</option>
                      <option value="other">Tư vấn thăm khám chung</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="note" className="text-xs md:text-sm uppercase tracking-widest font-bold text-gray-500 mb-1 block">Ghi Chú</label>
                    <textarea 
                      id="note" 
                      rows={2}
                      className="w-full border-b border-gray-700 py-2 text-base focus:outline-none focus:border-gold bg-transparent text-white resize-none"
                      placeholder="Tình trạng da hiện tại..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-gold text-[#111111] py-4 mt-6 text-sm uppercase tracking-[0.2em] font-bold hover:bg-[#B38F2E] transition-colors"
                  >
                    Gửi yêu cầu đặt lịch
                  </button>
                </form>
                <p className="text-center text-xs md:text-sm text-gray-500 mt-6 leading-relaxed">
                  Chuyên viên của chúng tôi sẽ liên hệ xác nhận trong vòng 15 phút.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
