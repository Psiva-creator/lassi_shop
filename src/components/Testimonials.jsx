import { motion } from 'framer-motion';

const Testimonials = () => {
  const reviews = [
    {
      name: "Sarah Jenkins",
      review: "The Alphonso Mango Lassi here is life-changing. It's perfectly sweet, incredibly creamy, and you can really taste the fresh mangoes.",
      rating: 5
    },
    {
      name: "David Chen",
      review: "I'm a regular for their Belgian Chocolate Shake. The premium quality is undeniable, and the cafe's atmosphere is absolutely luxurious.",
      rating: 5
    },
    {
      name: "Priya Patel",
      review: "Authentic taste meets modern presentation. The Spiced Masala Buttermilk reminds me of home, but elevated. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-[var(--color-mango)] font-semibold tracking-widest uppercase mb-3 text-sm"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white font-serif"
          >
            What Our <span className="text-[var(--color-mango)] italic font-light">Guests Say</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[#111] p-8 rounded-2xl border border-white/5 relative"
            >
              <div className="text-4xl text-[var(--color-mango)] opacity-50 font-serif absolute top-6 right-8">"</div>
              <div className="flex text-[var(--color-mango)] text-sm mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-gray-300 font-light leading-relaxed mb-8 italic">"{review.review}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 border border-white/10 overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?img=${index + 30}`} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{review.name}</h4>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Verified Customer</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
