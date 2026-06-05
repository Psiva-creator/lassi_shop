import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Calendar, Users, MapPin, DollarSign, ChevronRight, Clock, AlertCircle, Search, Loader2, Send } from 'lucide-react';
import { eventService } from '../../services/eventService';

const AdminEvents = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [followUpNote, setFollowUpNote] = useState('');

  const statuses = ["Inquiry Received", "Contacted", "Quotation Sent", "Confirmed", "Completed"];

  const fetchInquiries = useCallback(async () => {
    try {
      const data = await eventService.getAllInquiries();
      setInquiries(data);
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await eventService.updateInquiryStatus(id, newStatus);
      fetchInquiries();
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
      }
    } catch {
      alert('Failed to update status');
    }
  };

  const handleAddFollowUp = async (e) => {
    e.preventDefault();
    if (!followUpNote.trim()) return;
    try {
      await eventService.addFollowUp(selectedInquiry.id, followUpNote);
      setFollowUpNote('');
      fetchInquiries();
      // Update selected inquiry in local state
      const updatedInquiry = await eventService.getAllInquiries().then(data => data.find(enq => enq.id === selectedInquiry.id));
      setSelectedInquiry(updatedInquiry);
    } catch {
      alert('Failed to add follow-up');
    }
  };

  const filteredInquiries = inquiries.filter(enq => {
    const matchesStatus = filterStatus === 'All' || enq.status === filterStatus;
    const matchesSearch = enq.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          enq.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          enq.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Inquiry Received': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Contacted': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Quotation Sent': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Confirmed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Completed': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase">
            EVENT <span className="text-[var(--color-mango)]">LEADS</span>
          </h1>
          <p className="text-gray-500">Manage your stall bookings and event inquiries.</p>
        </div>

        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10">
          {['All', ...statuses].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filterStatus === status 
                  ? 'bg-[var(--color-mango)] text-black shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {status === 'Inquiry Received' ? 'New' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search leads by name, event type or location..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-[var(--color-mango)] transition-all"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leads List */}
        <div className="lg:col-span-2 space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-[var(--color-mango)]" size={40} />
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="p-20 text-center rounded-[2.5rem] bg-white/5 border border-white/10">
              <AlertCircle className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-400">No leads found matching your criteria.</p>
            </div>
          ) : (
            filteredInquiries.map((enq) => (
              <motion.div
                key={enq.id}
                layoutId={enq.id}
                onClick={() => setSelectedInquiry(enq)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer group ${
                  selectedInquiry?.id === enq.id 
                    ? 'bg-[var(--color-mango)]/5 border-[var(--color-mango)] shadow-[0_0_20px_rgba(255,155,5,0.1)]' 
                    : 'bg-white/5 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{enq.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Calendar size={14} />
                      {new Date(enq.eventDate).toLocaleDateString()} • {enq.eventType}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusColor(enq.status)}`}>
                    {enq.status}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {enq.location}</span>
                  <span className="flex items-center gap-1"><Users size={12} /> {enq.guestCount} Guests</span>
                  <span className="flex items-center gap-1"><DollarSign size={12} /> {enq.budget}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Lead Details / Follow-up */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {selectedInquiry ? (
              <motion.div
                key={selectedInquiry.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="sticky top-8 space-y-6"
              >
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10">
                  <h2 className="text-2xl font-bold mb-6 flex items-center justify-between">
                    Lead Details
                    <button onClick={() => setSelectedInquiry(null)} className="text-gray-500 hover:text-white"><ChevronRight className="rotate-90 md:rotate-0" size={20} /></button>
                  </h2>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400">
                        <Mail size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Email</p>
                        <p className="text-sm font-medium">{selectedInquiry.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400">
                        <Phone size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Phone</p>
                        <p className="text-sm font-medium">{selectedInquiry.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Requirements</p>
                    <p className="text-sm text-gray-400 italic leading-relaxed">"{selectedInquiry.requirements || 'No special requirements specified.'}"</p>
                  </div>

                  <div className="mt-8 space-y-3">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Update Status</p>
                    <div className="flex flex-wrap gap-2">
                      {statuses.map(status => (
                        <button
                          key={status}
                          onClick={() => handleStatusUpdate(selectedInquiry.id, status)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                            selectedInquiry.status === status 
                              ? 'bg-[var(--color-mango)] text-black' 
                              : 'bg-white/5 text-gray-500 hover:text-white'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Follow-ups */}
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <Clock className="text-[var(--color-mango)]" size={20} />
                    Follow-ups
                  </h3>

                  <div className="space-y-6 mb-8 max-h-60 overflow-y-auto pr-2 scrollbar-hide">
                    {selectedInquiry.followUps.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center italic">No follow-ups recorded yet.</p>
                    ) : (
                      selectedInquiry.followUps.map(f => (
                        <div key={f.id} className="relative pl-6 border-l border-white/10">
                          <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-[var(--color-mango)]" />
                          <p className="text-xs text-gray-500 mb-1">{new Date(f.date).toLocaleString()}</p>
                          <p className="text-sm text-gray-300">{f.note}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <form onSubmit={handleAddFollowUp} className="relative">
                    <input 
                      value={followUpNote}
                      onChange={(e) => setFollowUpNote(e.target.value)}
                      placeholder="Add follow-up note..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-[var(--color-mango)]"
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-mango)] hover:scale-110 transition-transform">
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center p-12 text-center rounded-[2.5rem] bg-white/5 border border-white/10 border-dashed">
                <p className="text-gray-500 italic">Select a lead to view details and track follow-ups.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;
