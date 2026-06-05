import { useState } from 'react';
import { Send, Loader2, Calendar, Users, MapPin, Briefcase, Mail, Phone, User, DollarSign, MessageSquare } from 'lucide-react';
import { eventService } from '../../services/eventService';

const EventInquiryForm = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Corporate Event',
    eventDate: '',
    location: '',
    guestCount: '',
    budget: '',
    requirements: ''
  });

  const eventTypes = [
    'College Festival',
    'Wedding',
    'Corporate Event',
    'Exhibition',
    'Food Festival',
    'Private Party',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await eventService.submitInquiry(formData);
      alert('Inquiry submitted successfully! Our team will contact you shortly.');
      onSuccess?.();
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit inquiry. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">
          EVENT <span className="text-[var(--color-mango)]">INQUIRY</span>
        </h2>
        <p className="text-gray-500">Fill out the form below and we'll craft the perfect beverage experience for you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-3 mb-4">
            <User className="text-[var(--color-mango)]" size={20} />
            Contact Details
          </h3>
          
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--color-mango)]" size={18} />
            <input 
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-[var(--color-mango)] transition-all"
            />
          </div>

          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--color-mango)]" size={18} />
            <input 
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-[var(--color-mango)] transition-all"
            />
          </div>

          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--color-mango)]" size={18} />
            <input 
              required
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-[var(--color-mango)] transition-all"
            />
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-3 mb-4">
            <Calendar className="text-[var(--color-mango)]" size={20} />
            Event Details
          </h3>

          <div className="relative group">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <select 
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-[var(--color-mango)] appearance-none transition-all"
            >
              {eventTypes.map(type => (
                <option key={type} value={type} className="bg-black">{type}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative group">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                required
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[var(--color-mango)] transition-all text-sm"
              />
            </div>
            <div className="relative group">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                required
                type="number"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                placeholder="Guest Count"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[var(--color-mango)] transition-all"
              />
            </div>
          </div>

          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              required
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Event Location"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-[var(--color-mango)] transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative group">
          <DollarSign className="absolute left-4 top-5 text-gray-500" size={18} />
          <input 
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Estimated Budget (e.g. $1000 - $2000)"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-[var(--color-mango)] transition-all"
          />
        </div>
        <div className="relative group">
          <MessageSquare className="absolute left-4 top-5 text-gray-500" size={18} />
          <textarea 
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Special Requirements (e.g. vegan options, specific theme)"
            rows="3"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-[var(--color-mango)] transition-all resize-none"
          />
        </div>
      </div>

      <button
        disabled={isLoading}
        className="w-full bg-[var(--color-mango)] text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform disabled:opacity-50"
      >
        {isLoading ? (
          <><Loader2 className="animate-spin" size={20} /> SENDING...</>
        ) : (
          <><Send size={20} /> SUBMIT INQUIRY</>
        )}
      </button>
    </form>
  );
};

export default EventInquiryForm;
