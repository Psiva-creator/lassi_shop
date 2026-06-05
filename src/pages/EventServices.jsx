import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, PartyPopper, Building2, UtensilsCrossed, GraduationCap, Presentation, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventInquiryForm from '../components/events/EventInquiryForm';
import PackageCard from '../components/events/PackageCard';
import EventGallery from '../components/events/EventGallery';
import EventTestimonials from '../components/events/EventTestimonials';

const EventServices = () => {
  const [showForm, setShowForm] = useState(false);

  const eventTypes = [
    { name: 'College Festivals', icon: GraduationCap, desc: 'Energetic beverage stalls for student crowds.' },
    { name: 'Weddings', icon: PartyPopper, desc: 'Elegant lassi & mocktail bars for your special day.' },
    { name: 'Corporate Events', icon: Building2, desc: 'Professional catering for meetings and summits.' },
    { name: 'Exhibitions', icon: Presentation, desc: 'Refreshing stops for busy expo attendees.' },
    { name: 'Food Festivals', icon: UtensilsCrossed, desc: 'Signature stalls that stand out in the crowd.' },
    { name: 'Private Parties', icon: Star, desc: 'Exclusive service for birthdays and anniversaries.' },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[var(--color-mango)] selection:text-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000" 
            className="w-full h-full object-cover opacity-20 scale-110 blur-sm"
            alt="Event Background"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-6 uppercase"
          >
            ELEVATE YOUR <span className="text-[var(--color-mango)]">EVENTS</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Premium beverage catering and artisanal stall setups for gatherings that leave a lasting impression.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => setShowForm(true)}
            className="bg-[var(--color-mango)] text-black px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(255,155,5,0.3)]"
          >
            BOOK AN EVENT
          </motion.button>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-20">
        {/* Event Types Grid */}
        <section className="mb-32">
          <h2 className="text-4xl font-black tracking-tighter mb-12 text-center uppercase">
            WE CATER TO <span className="text-[var(--color-mango)]">EVERY OCCASION</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-[var(--color-mango)]/30 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-mango)]/10 flex items-center justify-center text-[var(--color-mango)] mb-6 group-hover:scale-110 transition-transform">
                  <type.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{type.name}</h3>
                <p className="text-gray-400 leading-relaxed">{type.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Packages Section */}
        <section className="mb-32" id="packages">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tighter mb-4 uppercase">
              SELECT YOUR <span className="text-[var(--color-mango)]">PACKAGE</span>
            </h2>
            <p className="text-gray-400">Tailored solutions for events of any scale.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PackageCard 
              name="Basic"
              price="Starting at $499"
              features={['Single Stall Setup', 'Classic Menu (5 items)', '1 Server', '4-Hour Service']}
              color="gray"
            />
            <PackageCard 
              name="Standard"
              price="Starting at $999"
              features={['Double Stall Setup', 'Premium Menu (10 items)', '2 Servers', '6-Hour Service', 'Disposable Glassware']}
              color="mango"
              recommended
            />
            <PackageCard 
              name="Premium"
              price="Starting at $1999"
              features={['Custom Brand Setup', 'Full Menu + Seasonal Specials', '4 Servers', 'Unlimited Service', 'Artisanal Glassware', 'Live Garnishing Bar']}
              color="gold"
            />
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mb-32">
          <h2 className="text-4xl font-black tracking-tighter mb-12 text-center uppercase">
            EVENT <span className="text-[var(--color-mango)]">GALLERY</span>
          </h2>
          <EventGallery />
        </section>

        {/* Testimonials */}
        <section className="mb-32">
          <h2 className="text-4xl font-black tracking-tighter mb-12 text-center uppercase">
            WHAT OUR <span className="text-[var(--color-mango)]">CLIENTS SAY</span>
          </h2>
          <EventTestimonials />
        </section>
      </main>

      {/* Inquiry Form Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-[3rem] p-8 md:p-12 max-w-4xl w-full relative overflow-y-auto max-h-[90vh] scrollbar-hide"
            >
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronRight className="rotate-90 md:rotate-0" />
              </button>
              <EventInquiryForm onSuccess={() => setShowForm(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default EventServices;
