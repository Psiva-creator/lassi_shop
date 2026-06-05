import { useState } from 'react';
import { Plus, Trash2, MapPin, Loader2, Home, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AddressManager = ({ user, onAdd, onRemove }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: 'Home',
    street: '',
    city: '',
    zip: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onAdd(newAddress);
      setIsAdding(false);
      setNewAddress({ label: 'Home', street: '', city: '', zip: '' });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addresses = user?.addresses || [];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">Saved Addresses</h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl transition-colors border border-white/10"
        >
          {isAdding ? 'Cancel' : <><Plus size={18} /> Add New</>}
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Label</label>
                  <select 
                    value={newAddress.label}
                    onChange={(e) => setNewAddress({...newAddress, label: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-[var(--color-mango)]"
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Street Address</label>
                  <input 
                    type="text"
                    required
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-[var(--color-mango)]"
                    placeholder="123 Mango Street"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">City</label>
                  <input 
                    type="text"
                    required
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-[var(--color-mango)]"
                    placeholder="Mumbai"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">ZIP Code</label>
                  <input 
                    type="text"
                    required
                    value={newAddress.zip}
                    onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-[var(--color-mango)]"
                    placeholder="400001"
                  />
                </div>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-[var(--color-mango)] text-black font-bold px-6 py-2 rounded-xl flex items-center gap-2"
              >
                {isSubmitting && <Loader2 className="animate-spin" size={18} />}
                Save Address
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white/5 rounded-2xl border border-dashed border-white/10">
            <MapPin size={48} className="mx-auto mb-4 opacity-20" />
            <p>No saved addresses yet</p>
          </div>
        ) : (
          addresses.map((addr) => (
            <div key={addr.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-start group">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[var(--color-mango)]">
                  {addr.label === 'Home' ? <Home size={20} /> : addr.label === 'Work' ? <Briefcase size={20} /> : <MapPin size={20} />}
                </div>
                <div>
                  <h4 className="font-bold text-white">{addr.label}</h4>
                  <p className="text-sm text-gray-400">{addr.street}</p>
                  <p className="text-sm text-gray-400">{addr.city}, {addr.zip}</p>
                </div>
              </div>
              <button 
                onClick={() => onRemove(addr.id)}
                className="text-gray-500 hover:text-red-500 p-2 rounded-lg hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default AddressManager;
