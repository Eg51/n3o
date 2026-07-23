import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Hash, Users, Loader2, Trash2 } from 'lucide-react';
import { supabase, type Channel, type Profile, type MessageWithProfile } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Avatar } from '@/components/Avatar';
import { formatTime } from '@/components/Avatar';

type ChatAreaProps = {
  channel: Channel | null;
  members: Profile[];
  onOpenMembers: () => void;
};

export default function ChatArea({ channel, members, onOpenMembers }: ChatAreaProps) {
  const { user, profile } = useAuth();
  const [messages, setMessages] = useState<MessageWithProfile[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load messages when channel changes
  useEffect(() => {
    if (!channel) {
      setMessages([]);
      return;
    }
    setLoading(true);
    supabase
      .from('messages')
      .select('*, profile:profiles(*)')
      .eq('channel_id', channel.id)
      .order('created_at', { ascending: true })
      .limit(100)
      .then(({ data, error }) => {
        if (error) console.error('Error loading messages:', error);
        setMessages((data ?? []) as MessageWithProfile[]);
        setLoading(false);
        setTimeout(scrollToBottom, 50);
      });
  }, [channel?.id]);

  // Realtime subscription
  useEffect(() => {
    if (!channel) return;
    const sub = supabase
      .channel(`messages:${channel.id}`)
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `channel_id=eq.${channel.id}` },
        (payload) => {
          const newMsg = payload.new as MessageWithProfile;
          // fetch profile for the new message
          supabase
            .from('profiles')
            .select('*')
            .eq('id', newMsg.user_id)
            .maybeSingle()
            .then(({ data }) => {
              setMessages((prev) => [...prev, { ...newMsg, profile: data as Profile | undefined }]);
              setTimeout(scrollToBottom, 50);
            });
        }
      )
      .on('postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'messages', filter: `channel_id=eq.${channel.id}` },
        (payload) => {
          const oldId = (payload.old as { id: string }).id;
          setMessages((prev) => prev.filter((m) => m.id !== oldId));
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(sub); };
  }, [channel?.id]);

  function scrollToBottom() {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !channel || !user) return;
    setSending(true);
    const { error } = await supabase
      .from('messages')
      .insert({ channel_id: channel.id, content: input.trim() });
    if (error) console.error('Send error:', error);
    setInput('');
    setSending(false);
    inputRef.current?.focus();
  }

  async function handleDeleteMessage(id: string) {
    await supabase.from('messages').delete().eq('id', id);
  }

  if (!channel) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
            <Hash className="w-8 h-8 text-slate-600" />
          </div>
          <p className="text-slate-500 text-sm">Select a channel to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-950 h-full">
      {/* channel header */}
      <div className="px-6 py-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <Hash className="w-5 h-5 text-slate-500 shrink-0" />
          <div className="min-w-0">
            <h2 className="text-white font-semibold text-base truncate">{channel.name}</h2>
            {channel.description && (
              <p className="text-slate-500 text-xs truncate">{channel.description}</p>
            )}
          </div>
        </div>
        <button
          onClick={onOpenMembers}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Users className="w-4 h-4" />
          <span className="font-medium">{members.length}</span>
        </button>
      </div>

      {/* messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 text-slate-600 animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-slate-600 text-sm">No messages yet. Say hello!</p>
          </div>
        ) : (
          messages.map((msg, i) => {
            const prevMsg = messages[i - 1];
            const isGrouped = prevMsg && prevMsg.user_id === msg.user_id &&
              (new Date(msg.created_at).getTime() - new Date(prevMsg.created_at).getTime()) < 5 * 60 * 1000;
            const isOwn = msg.user_id === user?.id;
            return (
              <MessageRow
                key={msg.id}
                msg={msg}
                grouped={!!isGrouped}
                isOwn={isOwn}
                canDelete={isOwn}
                onDelete={() => handleDeleteMessage(msg.id)}
              />
            );
          })
        )}
      </div>

      {/* input */}
      <div className="px-6 py-4 border-t border-slate-800">
        <form onSubmit={handleSend} className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channel.name}`}
            className="w-full bg-slate-900 border border-slate-800 text-white placeholder-slate-600 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="submit"
            disabled={!input.trim() || sending}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-300 disabled:text-slate-600 disabled:cursor-not-allowed p-1.5 rounded-lg transition-colors"
          >
            {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </motion.button>
        </form>
      </div>
    </div>
  );
}

function MessageRow({
  msg, grouped, isOwn, canDelete, onDelete,
}: {
  msg: MessageWithProfile;
  grouped: boolean;
  isOwn: boolean;
  canDelete: boolean;
  onDelete: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const profile = msg.profile;

  if (grouped) {
    return (
      <div
        className="group flex gap-3 pl-12 py-0.5 hover:bg-slate-900/50 -mx-6 px-6 rounded-lg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="w-9 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-slate-200 text-sm break-words whitespace-pre-wrap">{msg.content}</p>
          {canDelete && hovered && (
            <button onClick={onDelete} className="mt-1 text-xs text-slate-600 hover:text-red-400 flex items-center gap-1 transition-colors">
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="group flex gap-3 py-1.5 hover:bg-slate-900/50 -mx-6 px-6 rounded-lg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {profile ? <Avatar profile={profile} size={36} /> : <div className="w-9 h-9 rounded-full bg-slate-800 shrink-0" />}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-white text-sm font-semibold">{profile?.display_name ?? 'Unknown'}</span>
          {isOwn && <span className="text-indigo-400 text-xs">(you)</span>}
          <span className="text-slate-600 text-xs">{formatTime(msg.created_at)}</span>
        </div>
        <p className="text-slate-200 text-sm break-words whitespace-pre-wrap mt-0.5">{msg.content}</p>
        {canDelete && hovered && (
          <button onClick={onDelete} className="mt-1 text-xs text-slate-600 hover:text-red-400 flex items-center gap-1 transition-colors">
            <Trash2 className="w-3 h-3" /> Delete
          </button>
        )}
      </div>
    </motion.div>
  );
}
