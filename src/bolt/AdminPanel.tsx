import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Users, Hash, Crown, UserCog } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, type Profile, type Channel } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Avatar } from '@/components/Avatar';

type AdminPanelProps = {
  onClose: () => void;
  onChanged: () => void;
};

type Tab = 'users' | 'channels';

export default function AdminPanel({ onClose, onChanged }: AdminPanelProps) {
  const { profile } = useAuth();
  const [tab, setTab] = useState<Tab>('users');
  const [users, setUsers] = useState<Profile[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    const [usersRes, channelsRes] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('channels').select('*').order('created_at', { ascending: false }),
    ]);
    setUsers((usersRes.data ?? []) as Profile[]);
    setChannels((channelsRes.data ?? []) as Channel[]);
    setLoading(false);
  }

  useEffect(() => {
    if (profile?.role === 'admin') loadData();
  }, [profile?.role]);

  async function toggleRole(userId: string, currentRole: string) {
    const newRole = currentRole === 'admin' ? 'member' : 'admin';
    await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
    loadData();
    onChanged();
  }

  async function deleteChannel(id: string) {
    if (!confirm('Delete this channel and all its messages?')) return;
    await supabase.from('channels').delete().eq('id', id);
    loadData();
    onChanged();
  }

  if (profile?.role !== 'admin') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50"
      >
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] mx-4">
          {/* header */}
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">Admin Panel</h2>
                <p className="text-slate-500 text-xs">Manage users and channels</p>
              </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* tabs */}
          <div className="flex gap-1 p-1 mx-6 mt-4 bg-slate-800/50 rounded-xl">
            {([['users', 'Users', Users], ['channels', 'Channels', Hash]] as const).map(([key, label, Icon]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`relative flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors ${
                  tab === key ? 'text-white' : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                {tab === key && (
                  <motion.div layoutId="adminTab" className="absolute inset-0 bg-indigo-500 rounded-lg" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                )}
                <span className="relative z-10 flex items-center gap-2"><Icon className="w-4 h-4" /> {label}</span>
              </button>
            ))}
          </div>

          {/* content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {loading ? (
              <p className="text-slate-600 text-sm text-center py-8">Loading...</p>
            ) : tab === 'users' ? (
              <div className="space-y-1.5">
                {users.map((u) => (
                  <div key={u.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-colors">
                    <Avatar profile={u} size={40} />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{u.display_name}</p>
                      <p className="text-slate-500 text-xs">{u.id === profile?.id ? 'You' : 'User'}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
                      u.role === 'admin' ? 'bg-amber-500/15 text-amber-400' : 'bg-slate-700/50 text-slate-400'
                    }`}>
                      {u.role === 'admin' && <Crown className="w-3 h-3" />}
                      <span className="capitalize">{u.role}</span>
                    </div>
                    {u.id !== profile?.id && (
                      <button
                        onClick={() => toggleRole(u.id, u.role)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-500/50 rounded-lg transition-all"
                      >
                        <UserCog className="w-3.5 h-3.5" />
                        {u.role === 'admin' ? 'Demote' : 'Promote'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1.5">
                {channels.map((ch) => (
                  <div key={ch.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center shrink-0">
                      <Hash className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{ch.name}</p>
                      <p className="text-slate-500 text-xs truncate">{ch.description || 'No description'}</p>
                    </div>
                    <button
                      onClick={() => deleteChannel(ch.id)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-500/50 rounded-lg transition-all"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {channels.length === 0 && <p className="text-slate-600 text-sm text-center py-8">No channels</p>}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
