import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Coffee, Users, ShoppingCart, LogOut, ArrowLeft, Calendar, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Manage Drinks', path: '/admin/drinks', icon: Coffee },
    { name: 'Manage Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Manage Events', path: '/admin/events', icon: Calendar },
    { name: 'Manage Users', path: '/admin/users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#111] border-r border-white/10 flex flex-col h-full transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold tracking-wider flex items-center gap-2 mb-4">
              <span className="text-[var(--color-mango)]">FreshSip</span> Admin
            </div>
            <Link to="/" className="text-xs text-gray-400 hover:text-[var(--color-mango)] transition-colors flex items-center gap-1">
              <ArrowLeft size={12} /> Back to Customer Site
            </Link>
          </div>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-[var(--color-mango)] text-black font-semibold' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center p-4 border-b border-white/10 bg-[#111]">
          <button onClick={() => setSidebarOpen(true)} className="text-white hover:text-[var(--color-mango)] mr-4">
            <Menu size={24} />
          </button>
          <span className="font-bold tracking-wider"><span className="text-[var(--color-mango)]">FreshSip</span> Admin</span>
        </header>
        <div className="p-4 sm:p-8 md:p-12 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
