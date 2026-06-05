import { useState, useEffect, useCallback } from 'react';
import { Pencil, Save, X, Loader2 } from 'lucide-react';
import { menuService } from '../../services/menuService';

const AdminDrinks = () => {
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ price: '', name: '' });
  const [isSaving, setIsSaving] = useState(false);

  const fetchDrinks = useCallback(async () => {
    try {
      const data = await menuService.getAllDrinks();
      setDrinks(data);
    } catch (err) {
      console.error("Failed to load drinks", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrinks();
  }, [fetchDrinks]);

  const handleEdit = (drink) => {
    setEditingId(drink.id);
    setEditForm({ price: drink.price, name: drink.name });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ price: '', name: '' });
  };

  const handleSave = async (id) => {
    setIsSaving(true);
    try {
      await menuService.updateDrink(id, { 
        price: parseFloat(editForm.price),
        name: editForm.name
      });
      await fetchDrinks();
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update drink", err);
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-gray-400">Loading drinks...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-serif text-white">Manage Drinks</h1>
        <button className="bg-[var(--color-mango)] hover:bg-[var(--color-mango-dark)] text-black font-semibold px-4 py-2 rounded-lg transition-colors">
          Add New Drink
        </button>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
        {/* Mobile View: Cards */}
        <div className="md:hidden divide-y divide-white/10">
          {drinks.map((drink) => (
            <div key={drink.id} className="p-4 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-black shrink-0">
                  <img src={drink.image} alt={drink.name} className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="flex-1">
                  {editingId === drink.id ? (
                    <input 
                      type="text" 
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="bg-black border border-[var(--color-mango)]/50 rounded px-2 py-1 w-full text-white focus:outline-none focus:border-[var(--color-mango)] mb-2"
                    />
                  ) : (
                    <h3 className="text-white font-bold">{drink.name}</h3>
                  )}
                  <p className="text-gray-400 text-sm">{drink.category}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-white">
                  {editingId === drink.id ? (
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">₹</span>
                      <input 
                        type="number" 
                        step="1"
                        value={editForm.price}
                        onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                        className="bg-black border border-[var(--color-mango)]/50 rounded px-2 py-1 w-20 text-white focus:outline-none focus:border-[var(--color-mango)]"
                      />
                    </div>
                  ) : (
                    `₹${drink.price.toFixed(2)}`
                  )}
                </div>
                <div>
                  {editingId === drink.id ? (
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleSave(drink.id)}
                        disabled={isSaving}
                        className="p-2 text-green-500 bg-green-500/10 rounded-lg"
                      >
                        {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                      </button>
                      <button 
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="p-2 text-red-500 bg-red-500/10 rounded-lg"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleEdit(drink)}
                      className="p-2 text-gray-400 hover:text-[var(--color-mango)] bg-white/5 rounded-lg"
                    >
                      <Pencil size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/50">
                <th className="p-4 text-gray-400 font-medium">Image</th>
                <th className="p-4 text-gray-400 font-medium">Name</th>
                <th className="p-4 text-gray-400 font-medium">Category</th>
                <th className="p-4 text-gray-400 font-medium">Price</th>
                <th className="p-4 text-gray-400 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drinks.map((drink) => (
                <tr key={drink.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-black">
                      <img src={drink.image} alt={drink.name} className="w-full h-full object-cover opacity-80" />
                    </div>
                  </td>
                  <td className="p-4 text-white">
                    {editingId === drink.id ? (
                      <input 
                        type="text" 
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="bg-black border border-[var(--color-mango)]/50 rounded px-2 py-1 w-full text-white focus:outline-none focus:border-[var(--color-mango)]"
                      />
                    ) : (
                      drink.name
                    )}
                  </td>
                  <td className="p-4 text-gray-400">{drink.category}</td>
                  <td className="p-4 text-white">
                    {editingId === drink.id ? (
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">₹</span>
                        <input 
                          type="number" 
                          step="1"
                          value={editForm.price}
                          onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                          className="bg-black border border-[var(--color-mango)]/50 rounded px-2 py-1 w-20 text-white focus:outline-none focus:border-[var(--color-mango)]"
                        />
                      </div>
                    ) : (
                      `₹${drink.price.toFixed(2)}`
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {editingId === drink.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleSave(drink.id)}
                          disabled={isSaving}
                          className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors"
                        >
                          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        </button>
                        <button 
                          onClick={handleCancel}
                          disabled={isSaving}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleEdit(drink)}
                        className="p-2 text-gray-400 hover:text-[var(--color-mango)] hover:bg-[var(--color-mango)]/10 rounded-lg transition-colors"
                      >
                        <Pencil size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDrinks;
