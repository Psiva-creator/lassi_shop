import { motion } from 'framer-motion';
import { Leaf, Award, ShieldCheck, Clock } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Fresh Ingredients",
      description: "We use only 100% natural, farm-fresh ingredients with zero artificial flavors."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Every beverage is crafted to perfection, ensuring a rich and luxurious taste."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Hygienic Preparation",
      description: "Strict quality control and modern hygienic standards in our open kitchens."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Fast Service",
      description: "Your favorite premium drinks served swiftly without compromising quality."
    }
  ];

  return (
    <section className="py-24 bg-black border-t border-b border-white/5 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white font-serif mb-4"
          >
            The FreshSip <span className="text-[var(--color-mango)] italic font-light">Difference</span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-gray-400 max-w-2xl mx-auto"
          >
            We don't just make drinks; we craft moments. Here's why our customers keep coming back.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#111] border border-white/5 rounded-2xl p-8 hover:bg-[#151515] hover:border-[var(--color-mango)]/20 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-mango)]/10 text-[var(--color-mango)] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--color-mango)] group-hover:text-black transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed font-light text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
