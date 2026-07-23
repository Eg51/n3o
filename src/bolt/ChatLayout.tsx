import { useEffect, useState } from 'react';
import { supabase, type Channel, type Profile } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar';
import ChatArea from '@/components/ChatArea';
import MembersPanel from '@/components/MembersPanel';
import AdminPanel from '@/components/AdminPanel';

export default function ChatLayout() {
  const { profile } = useAuth();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [members, setMembers] = useState<Profile[]>([]);
  const [showMembers, setShowMembers] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  async function loadChannels() {
    if (!profile) return;
    const { data, error } = await supabase
      .from('channels')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) console.error('Error loading channels:', error);
    setChannels((data ?? []) as Channel[]);
  }

  async function loadMembers(channelId: string) {
    const { data, error } = await supabase
      .from('channel_members')
      .select('profile:profiles(*)')
      .eq('channel_id', channelId);
    if (error) console.error('Error loading members:', error);
    const profiles = (data ?? []).map((r) => (r as unknown as { profile: Profile }).profile).filter(Boolean);
    setMembers(profiles);
  }

  useEffect(() => {
    loadChannels();
  }, [profile?.id]);

  // realtime: channels list
  useEffect(() => {
    const sub = supabase
      .channel('channels_list')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'channels' }, () => {
        loadChannels();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'channel_members' }, () => {
        if (activeChannel) loadMembers(activeChannel.id);
        loadChannels();
      })
      .subscribe();
    return () => { supabase.removeChannel(sub); };
  }, [activeChannel?.id]);

  function handleSelectChannel(id: string) {
    const ch = channels.find((c) => c.id === id) ?? null;
    setActiveChannel(ch);
    if (ch) loadMembers(ch.id);
  }

  function handleChannelsChanged() {
    loadChannels();
  }

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <Sidebar
        channels={channels}
        activeChannelId={activeChannel?.id ?? null}
        onSelectChannel={handleSelectChannel}
        onChannelsChanged={handleChannelsChanged}
        onOpenAdmin={() => setShowAdmin(true)}
        onOpenMembers={() => setShowMembers(true)}
      />
      <ChatArea
        channel={activeChannel}
        members={members}
        onOpenMembers={() => setShowMembers(true)}
      />
      <MembersPanel
        channel={activeChannel}
        onClose={() => setShowMembers(false)}
        onChanged={() => { if (activeChannel) loadMembers(activeChannel.id); }}
      />
      <AdminPanel
        onClose={() => setShowAdmin(false)}
        onChanged={loadChannels}
      />
    </div>
  );
}
