import { User, Mail, Calendar, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileOverview = ({ user }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-white/10">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-mango)] to-orange-600 flex items-center justify-center text-black text-4xl font-bold">
          {user?.name?.[0].toUpperCase()}
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-white">{user?.name}</h2>
          <p className="text-gray-400">Premium Member since 2024</p>
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm border border-green-500/20">
            <ShieldCheck size={14} />
            Verified Account
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
          <h3 className="text-lg font-semibold text-[var(--color-mango)] flex items-center gap-2">
            <User size={18} />
            Personal Details
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Full Name</span>
              <span className="text-white font-medium">{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date of Birth</span>
              <span className="text-white font-medium">May 12, 1995</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Gender</span>
              <span className="text-white font-medium">Not Specified</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
          <h3 className="text-lg font-semibold text-[var(--color-mango)] flex items-center gap-2">
            <Mail size={18} />
            Contact Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Email Address</span>
              <span className="text-white font-medium">{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Phone Number</span>
              <span className="text-white font-medium">{user?.phone || 'Not Provided'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-lg font-semibold text-[var(--color-mango)] flex items-center gap-2 mb-4">
          <Calendar size={18} />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[var(--color-mango)]">
                <User size={20} />
              </div>
              <div>
                <p className="text-white font-medium">Profile updated successfully</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileOverview;
