import { motion } from 'motion/react';
import { Sparkles, Droplets, Zap, Activity } from 'lucide-react';

const servicesList = [
  {
    id: 1,
    title: 'Dịch vụ A',
    description: 'Diễn giải A - Sẽ cập nhật sau',
    icon: Sparkles,
  },
  {
    id: 2,
    title: 'Dịch vụ B',
    description: 'Diễn giải B - Sẽ cập nhật sau',
    icon: Droplets,
  },
  {
    id: 3,
    title: 'Dịch vụ C',
    description: 'Diễn giải C - Sẽ cập nhật sau',
    icon: Zap,
  },
  {
    id: 4,
    title: 'Dịch vụ D',
    description: 'Diễn giải D - Sẽ cập nhật sau',
    icon: Activity,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-[#FCFBF9] relative border-b border-gold/10 min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            className="text-gold text-xs md:text-sm font-bold tracking-[0.3em] uppercase block mb-3 md:mb-4"
          >
            Dịch Vụ Tiêu Biểu
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-serif text-3xl md:text-5xl text-[#3D3833] mb-4 md:mb-6"
          >
            Personal Magic: <br />
            <span className="italic text-gold">Từ 10 năm Kinh nghiệm</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '4rem' }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="h-[1px] bg-gold mx-auto mb-6"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-6 md:p-8 rounded-sm shadow-sm flex flex-col items-center text-center hover:shadow-md transition-all border border-gold/10 hover:border-gold/30"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4 md:mb-6">
                <service.icon className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-base md:text-lg font-bold text-[#3D3833] mb-2 md:mb-4">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-[#756E65] leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
