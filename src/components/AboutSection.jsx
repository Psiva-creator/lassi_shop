import { motion } from 'framer-motion';
import frame6 from '../assets/frames/frame6.jpg';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <img
                src={frame6}
                alt="Fresh ingredients"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
                <p className="text-[var(--color-mango)] font-bold text-3xl mb-1">100%</p>
                <p className="text-white text-sm font-medium tracking-wider uppercase">Natural Ingredients</p>
              </div>
            </div>
            {/* Background blur decorative element */}
            <div className="absolute -inset-4 bg-[var(--color-mango)]/20 blur-3xl -z-10 rounded-full opacity-50"></div>
          </motion.div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[var(--color-mango)] font-semibold tracking-widest uppercase mb-3 text-sm"
              >
                Our Story
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-white font-serif leading-tight"
              >
                Redefining the <br />
                <span className="text-[var(--color-mango)] italic font-light">Café Experience</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-gray-400 font-light leading-relaxed text-lg"
            >
              <p>
                At FreshSip, we believe that a great beverage is more than just a drink—it's an experience. We source the finest, freshest ingredients from local farms and blend them using authentic, time-honored recipes.
              </p>
              <p>
                Every glass is crafted with precision, passion, and a commitment to premium quality. Whether it's the rich sweetness of our Alphonso Mango Lassi or the invigorating spice of our Masala Buttermilk, we guarantee a taste that lingers long after the last sip.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-4 flex items-center gap-6"
            >
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-12 h-12 rounded-full border-2 border-[#0a0a0a] bg-gray-800 flex items-center justify-center text-xs text-white shadow-sm z-[${10-i}]`}>
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Customer" className="w-full h-full rounded-full opacity-80" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-semibold">10k+ Happy Customers</p>
                <div className="flex text-[var(--color-mango)] text-sm">
                  ★★★★★
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
