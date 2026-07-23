import { motion, AnimatePresence } from 'framer-motion';
import { Hash, Plus, X, Trash2, Settings, Users, LogOut, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase, type Channel, type Profile } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Avatar } from '@/components/Avatar';

type SidebarProps = {
  channels: Channel[];
  activeChannelId: string | null;
  onSelectChannel: (id: string) => void;
  onChannelsChanged: () => void;
  onOpenAdmin: () => void;
  onOpenMembers: () => void;
};

export default function Sidebar({
  channels, activeChannelId, onSelectChannel, onChannelsChanged, onOpenAdmin, onOpenMembers,
}: SidebarProps) {
  const { profile, signOut } = useAuth();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim() || !profile) return;
    setCreating(true);
    setError(null);
    const { data: channel, error: chError } = await supabase
      .from('channels')
      .insert({ name: newName.trim(), description: newDesc.trim(), created_by: profile.id })
      .select()
      .single();
    if (chError) {
      setError(chError.message);
      setCreating(false);
      return;
    }
    await supabase.from('channel_members').insert({ channel_id: channel.id, user_id: profile.id });
    setNewName('');
    setNewDesc('');
    setShowCreate(false);
    setCreating(false);
    onChannelsChanged();
    onSelectChannel(channel.id);
  }

  return (
    <div className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col h-full">
      {/* header */}
      <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <MessageSquare className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-white font-bold text-base leading-tight">Admin Chat</h1>
          <p className="text-slate-500 text-xs">Real-time messaging</p>
        </div>
      </div>

      {/* channels */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Channels</span>
          <button
            onClick={() => setShowCreate(true)}
            className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-md p-1 transition-colors"
            title="Create channel"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-0.5">
          {channels.length === 0 && (
            <p className="text-slate-600 text-xs px-2 py-4 text-center">No channels yet</p>
          )}
          {channels.map((ch) => (
            <ChannelItem
              key={ch.id}
              channel={ch}
              active={ch.id === activeChannelId}
              onClick={() => onSelectChannel(ch.id)}
            />
          ))}
        </div>
      </div>

      {/* admin / members buttons */}
      {profile?.role === 'admin' && (
        <div className="px-3 py-2 border-t border-slate-800">
          <button
            onClick={onOpenAdmin}
            className="w-full flex items-center gap-2 px-2 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            Admin Panel
          </button>
        </div>
      )}

      {/* user footer */}
      {profile && (
        <div className="px-3 py-3 border-t border-slate-800 flex items-center gap-3">
          <Avatar profile={profile} size={36} />
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{profile.display_name}</p>
            <p className="text-slate-500 text-xs capitalize">{profile.role}</p>
          </div>
          <button
            onClick={onOpenMembers}
            className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg p-1.5 transition-colors"
            title="Members"
          >
            <Users className="w-4 h-4" />
          </button>
          <button
            onClick={signOut}
            className="text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg p-1.5 transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* create channel modal */}
      <AnimatePresence>
        {showCreate && (
          <CreateChannelModal
            name={newName}
            desc={newDesc}
            creating={creating}
            error={error}
            onName={setNewName}
            onDesc={setNewDesc}
            onClose={() => setShowCreate(false)}
            onCreate={handleCreate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ChannelItem({ channel, active, onClick }: { channel: Channel; active: boolean; onClick: () => void }) {
  const { profile } = useAuth();
  const [showDelete, setShowDelete] = useState(false);

  const isOwner = profile?.id === channel.created_by;

  async function handleDelete() {
    if (!confirm(`Delete channel "${channel.name}"? This removes all messages.`)) return;
    await supabase.from('channels').delete().eq('id', channel.id);
  }

  return (
    <div
      className="group relative"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <button
        onClick={onClick}
        className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm transition-all ${
          active
            ? 'bg-indigo-500/15 text-white border border-indigo-500/30'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
        }`}
      >
        <Hash className={`w-4 h-4 shrink-0 ${active ? 'text-indigo-400' : 'text-slate-500'}`} />
        <span className="truncate font-medium">{channel.name}</span>
      </button>
      {isOwner && showDelete && (
        <button
          onClick={handleDelete}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-red-400 p-1 rounded transition-colors"
          title="Delete channel"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

function CreateChannelModal({
  name, desc, creating, error, onName, onDesc, onClose, onCreate,
}: {
  name: string;
  desc: string;
  creating: boolean;
  error: string | null;
  onName: (v: string) => void;
  onDesc: (v: string) => void;
  onClose: () => void;
  onCreate: (e: React.FormEvent) => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
      >
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 mx-4">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold text-lg">Create Channel</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={onCreate} className="space-y-4">
            <div>
              <label className="text-slate-400 text-xs font-medium mb-1.5 block">Channel name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => onName(e.target.value)}
                placeholder="e.g. general"
                autoFocus
                required
                className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-medium mb-1.5 block">Description (optional)</label>
              <input
                type="text"
                value={desc}
                onChange={(e) => onDesc(e.target.value)}
                placeholder="What's this channel about?"
                className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
            {error && <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">{error}</p>}
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={onClose} className="flex-1 py-2.5 text-sm font-medium text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-xl transition-all">
                Cancel
              </button>
              <button type="submit" disabled={creating} className="flex-1 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-400 hover:to-sky-400 rounded-xl transition-all disabled:opacity-50">
                {creating ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}
