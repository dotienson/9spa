import { motion } from 'motion/react';
import { Sparkles, Droplets, Zap, Activity } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Dịch vụ A',
    description: 'Bổ sung HA siêu vi điểm, cấp ẩm tức thì, mang lại làn da ngậm nước, căng mọng rạng rỡ chuẩn Hàn Quốc.',
    price: 'X.XXX.XXX đ',
    icon: Droplets,
  },
  {
    id: 2,
    title: 'Dịch vụ B',
    description: 'Sử dụng sóng siêu âm hội tụ cường độ cao tác động sâu, kích thích tăng sinh collagen, nâng cơ chảy xệ không xâm lấn.',
    price: 'X.XXX.XXX đ',
    icon: Zap,
  },
  {
    id: 3,
    title: 'Dịch vụ C',
    description: 'Đưa dưỡng chất trực tiếp vào da, phục hồi cấu trúc da hư tổn, giảm nhăn, se khít lỗ chân lông hiệu quả.',
    price: 'X.XXX.XXX đ',
    icon: Activity,
  },
  {
    id: 4,
    title: 'Dịch vụ D',
    description: 'Loại bỏ hắc sắc tố, làm đều màu da, mờ thâm nám và tái tạo bề mặt da láng mịn bằng công nghệ Laser tiên tiến.',
    price: 'X.XXX.XXX đ',
    icon: Sparkles,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#F7F4EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold text-sm font-bold tracking-[0.3em] uppercase block mb-4"
          >
            Bảng Giá Dịch Vụ
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl text-[#2D2D2D] mb-6"
          >
            Nâng Niu Làn Da <span className="italic text-gold">Hoàn Mỹ</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '4rem' }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-[1px] bg-gold mx-auto mb-6"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-base text-gray-600 max-w-md mx-auto leading-relaxed"
          >
            9pm Skincare cam kết sử dụng công nghệ chính hãng, sản phẩm cao cấp cùng phác đồ điều trị được cá nhân hóa bởi đội ngũ chuyên gia da liễu.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gold/20 p-6 rounded-sm shadow-sm flex flex-col hover:border-gold/50 transition-colors"
            >
              <div className="flex justify-between items-end border-b border-dashed border-gray-200 pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <service.icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-semibold text-[#2D2D2D]">
                    {service.title}
                  </h3>
                </div>
                <span className="font-serif text-gold text-xl md:text-2xl shrink-0">
                  {service.price}
                </span>
              </div>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed pl-11">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-xs md:text-sm italic text-gray-500">
            * Bảng giá mang tính chất tham khảo. Mức giá thực tế có thể thay đổi tùy theo tình trạng da sau khi được chuyên gia thăm khám trực tiếp.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
