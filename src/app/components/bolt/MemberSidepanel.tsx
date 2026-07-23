import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Crown, UserMinus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, type Channel, type Profile } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Avatar } from '@/components/Avatar';

type MembersPanelProps = {
  channel: Channel | null;
  onClose: () => void;
  onChanged: () => void;
};

export default function MembersPanel({ channel, onClose, onChanged }: MembersPanelProps) {
  const { profile } = useAuth();
  const [members, setMembers] = useState<Profile[]>([]);
  const [allProfiles, setAllProfiles] = useState<Profile[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!channel) return;
    setLoading(true);
    supabase
      .from('channel_members')
      .select('profile:profiles(*)')
      .eq('channel_id', channel.id)
      .then(({ data, error }) => {
        if (error) console.error(error);
        const profiles = (data ?? []).map((r) => (r as unknown as { profile: Profile }).profile).filter(Boolean);
        setMembers(profiles);
        setLoading(false);
      });
  }, [channel?.id]);

  async function loadAllProfiles() {
    const { data } = await supabase.from('profiles').select('*').order('display_name');
    setAllProfiles((data ?? []) as Profile[]);
  }

  useEffect(() => {
    loadAllProfiles();
  }, []);

  const isChannelOwner = profile?.id === channel?.created_by;
  const memberIds = new Set(members.map((m) => m.id));
  const available = allProfiles.filter((p) => !memberIds.has(p.id));

  async function addMember(userId: string) {
    if (!channel) return;
    await supabase.from('channel_members').insert({ channel_id: channel.id, user_id: userId });
    const p = allProfiles.find((x) => x.id === userId);
    if (p) setMembers((prev) => [...prev, p]);
    onChanged();
  }

  async function removeMember(userId: string) {
    if (!channel) return;
    await supabase.from('channel_members').delete().eq('channel_id', channel.id).eq('user_id', userId);
    setMembers((prev) => prev.filter((m) => m.id !== userId));
    onChanged();
  }

  return (
    <AnimatePresence>
      {channel && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-slate-900 border-l border-slate-800 z-50 flex flex-col"
          >
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-white font-semibold">Members</h2>
                <p className="text-slate-500 text-xs">{members.length} in #{channel.name}</p>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              {loading ? (
                <p className="text-slate-600 text-sm text-center py-8">Loading...</p>
              ) : (
                <div className="space-y-1">
                  {members.map((m) => (
                    <div key={m.id} className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-800/60 transition-colors group">
                      <Avatar profile={m} size={32} />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{m.display_name}</p>
                        <p className="text-slate-500 text-xs capitalize">{m.role}</p>
                      </div>
                      {m.id === channel.created_by && <Crown className="w-4 h-4 text-amber-400 shrink-0" />}
                      {isChannelOwner && m.id !== profile?.id && (
                        <button
                          onClick={() => removeMember(m.id)}
                          className="text-slate-600 hover:text-red-400 p-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                          title="Remove member"
                        >
                          <UserMinus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {isChannelOwner && (
              <div className="border-t border-slate-800 p-3">
                {!showAdd ? (
                  <button
                    onClick={() => setShowAdd(true)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500/50 rounded-xl transition-all"
                  >
                    <UserPlus className="w-4 h-4" /> Add Member
                  </button>
                ) : (
                  <div className="space-y-1">
                    <p className="text-slate-400 text-xs font-medium px-1 mb-1">Add to #{channel.name}</p>
                    <div className="max-h-48 overflow-y-auto space-y-1">
                      {available.length === 0 && <p className="text-slate-600 text-xs text-center py-3">All users are already members</p>}
                      {available.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => addMember(p.id)}
                          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-800 transition-colors text-left"
                        >
                          <Avatar profile={p} size={28} />
                          <span className="text-white text-sm flex-1 truncate">{p.display_name}</span>
                          <UserPlus className="w-4 h-4 text-slate-500" />
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setShowAdd(false)} className="w-full text-center text-slate-500 hover:text-white text-xs py-1.5 transition-colors">
                      Done
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
