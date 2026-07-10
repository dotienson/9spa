import { motion } from 'motion/react';
import { Sparkles, Droplets, Zap, Activity } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Dịch vụ A',
    description: 'Diễn giải A - Sẽ cập nhật sau',
    price: 'X.XXX.XXX đ',
    icon: Droplets,
  },
  {
    id: 2,
    title: 'Dịch vụ B',
    description: 'Diễn giải B - Sẽ cập nhật sau',
    price: 'X.XXX.XXX đ',
    icon: Zap,
  },
  {
    id: 3,
    title: 'Dịch vụ C',
    description: 'Diễn giải C - Sẽ cập nhật sau',
    price: 'X.XXX.XXX đ',
    icon: Activity,
  },
  {
    id: 4,
    title: 'Dịch vụ D',
    description: 'Diễn giải D - Sẽ cập nhật sau',
    price: 'X.XXX.XXX đ',
    icon: Sparkles,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-[#F5F2EC] relative min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold text-xs md:text-sm font-bold tracking-[0.3em] uppercase block mb-3 md:mb-4"
          >
            Bảng Giá Dịch Vụ
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl text-[#3D3833] mb-4 md:mb-6"
          >
            Personal Magic: <br />
            <span className="italic text-gold">Bí thuật của Riêng mình</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '4rem' }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-[1px] bg-gold mx-auto mb-6"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gold/20 p-5 md:p-6 rounded-sm shadow-sm flex flex-col hover:border-gold/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b border-dashed border-gray-200 pb-3 mb-3 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                    <service.icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-semibold text-[#3D3833]">
                    {service.title}
                  </h3>
                </div>
                <span className="font-serif text-gold text-lg md:text-xl shrink-0 sm:text-right pl-11 sm:pl-0">
                  {service.price}
                </span>
              </div>
              <p className="text-sm md:text-base text-[#756E65] leading-relaxed pl-0 sm:pl-11">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 md:mt-16 text-center"
        >
          <p className="text-xs md:text-sm italic text-[#756E65]">
            * Bảng giá mang tính chất tham khảo. Mức giá thực tế có thể thay đổi tùy theo tình trạng da sau khi được chuyên gia thăm khám trực tiếp.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
