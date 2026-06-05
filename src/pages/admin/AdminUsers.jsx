import React, { useState, useEffect } from 'react';
import { User, Shield, Star } from 'lucide-react';
import { authService } from '../../services/authService';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await authService.getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return <div className="text-gray-400">Loading users...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-serif text-white">Manage Users</h1>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
        {/* Mobile View: Cards */}
        <div className="md:hidden divide-y divide-white/10">
          {users.map((user) => (
            <div key={user.id} className="p-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-mango)] flex items-center justify-center text-black font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-gray-500 text-xs font-mono">{user.id}</p>
                </div>
              </div>
              <div className="text-gray-400 text-sm">
                <p>{user.email}</p>
                <p>{user.phone}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    user.loyalty?.tier === 'Platinum' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                    user.loyalty?.tier === 'Gold' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                    user.loyalty?.tier === 'Silver' ? 'bg-gray-400/10 text-gray-300 border-gray-400/20' :
                    'bg-orange-500/10 text-orange-500 border-orange-500/20'
                  }`}>
                    <Star size={10} className="mr-1" />
                    {user.loyalty?.tier || 'Bronze'}
                  </span>
                  <span className="text-white text-sm font-medium">{user.loyalty?.points || 0} pts</span>
                </div>
                <span className="inline-flex items-center text-xs text-gray-400">
                  <User size={12} className="mr-1" /> Customer
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-black/50">
                <th className="p-4 text-gray-400 font-medium">User</th>
                <th className="p-4 text-gray-400 font-medium">Contact</th>
                <th className="p-4 text-gray-400 font-medium">Loyalty Tier</th>
                <th className="p-4 text-gray-400 font-medium">Points</th>
                <th className="p-4 text-gray-400 font-medium text-right">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-mango)] flex items-center justify-center text-black font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-gray-500 text-xs font-mono">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400 text-sm">
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      user.loyalty?.tier === 'Platinum' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                      user.loyalty?.tier === 'Gold' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                      user.loyalty?.tier === 'Silver' ? 'bg-gray-400/10 text-gray-300 border-gray-400/20' :
                      'bg-orange-500/10 text-orange-500 border-orange-500/20'
                    }`}>
                      <Star size={10} className="mr-1" />
                      {user.loyalty?.tier || 'Bronze'}
                    </span>
                  </td>
                  <td className="p-4 text-white font-medium">
                    {user.loyalty?.points || 0}
                  </td>
                  <td className="p-4 text-right">
                    <span className="inline-flex items-center text-xs text-gray-400">
                      <User size={12} className="mr-1" /> Customer
                    </span>
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

export default AdminUsers;
