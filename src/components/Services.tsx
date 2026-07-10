import { motion } from 'motion/react';
import { Sparkles, Droplets, Zap, Activity } from 'lucide-react';

const servicesList = [
  {
    id: 1,
    title: 'Dịch vụ A',
    description: 'Ứng dụng công nghệ ánh sáng và laser tiên tiến giúp tái tạo bề mặt da, xóa mờ nếp nhăn và hắc sắc tố, mang lại làn da đều màu, săn chắc.',
    icon: Sparkles,
  },
  {
    id: 2,
    title: 'Dịch vụ B',
    description: 'Liệu pháp tiêm tinh chất siêu vi điểm đưa dưỡng chất vào sâu trong da, cải thiện độ đàn hồi và cấu trúc da mỏng yếu.',
    icon: Droplets,
  },
  {
    id: 3,
    title: 'Dịch vụ C',
    description: 'Sử dụng sóng siêu âm hội tụ hoặc RF để kích thích tăng sinh collagen, định hình khuôn mặt V-line và xóa rãnh cười mà không cần phẫu thuật.',
    icon: Zap,
  },
  {
    id: 4,
    title: 'Dịch vụ D',
    description: 'Phác đồ điều trị mụn, sẹo và các vấn đề da liễu khác được thiết kế cá nhân hóa bởi đội ngũ chuyên gia da liễu giàu kinh nghiệm.',
    icon: Activity,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#FDFCF9] relative border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold text-sm font-bold tracking-[0.3em] uppercase block mb-4"
          >
            Dịch Vụ Tiêu Biểu
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl text-[#2D2D2D] mb-6"
          >
            Nâng Tầm Nhan Sắc <span className="italic text-gold">Việt</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '4rem' }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-[1px] bg-gold mx-auto mb-6"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-sm shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all border border-gold/10 hover:border-gold/30"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6">
                <service.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-[#2D2D2D] mb-4">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
