import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const EventTestimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'HR Director, TechCorp',
      content: 'The beverage stall was the highlight of our annual summit. Professional service and the mango lassi was an absolute hit with everyone!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Event Coordinator, UNIFEST',
      content: 'FreshSip managed a crowd of 5000+ students effortlessly. Their stall setup is modern and adds a premium feel to the festival.',
      rating: 5
    },
    {
      name: 'Anita Desai',
      role: 'Bride',
      content: 'Exceeded our expectations! The presentation was beautiful and perfectly matched our wedding theme. Highly recommend the premium package.',
      rating: 5
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 relative"
        >
          <Quote className="absolute top-8 right-8 text-[var(--color-mango)] opacity-20" size={40} />
          <div className="flex gap-1 mb-6">
            {[...Array(t.rating)].map((_, star) => (
              <Star key={star} size={14} className="fill-[var(--color-mango)] text-[var(--color-mango)]" />
            ))}
          </div>
          <p className="text-gray-300 italic mb-8 leading-relaxed">"{t.content}"</p>
          <div>
            <h4 className="font-bold text-white">{t.name}</h4>
            <p className="text-sm text-gray-500">{t.role}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default EventTestimonials;
