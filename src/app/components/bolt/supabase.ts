import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type Profile = {
  id: string;
  display_name: string;
  avatar_color: string;
  role: 'admin' | 'member';
  created_at: string;
};

export type Channel = {
  id: string;
  name: string;
  description: string;
  created_by: string;
  created_at: string;
};

export type ChannelMember = {
  id: string;
  channel_id: string;
  user_id: string;
  joined_at: string;
};

export type Message = {
  id: string;
  channel_id: string;
  user_id: string;
  content: string;
  created_at: string;
};

export type MessageWithProfile = Message & {
  profile?: Profile;
};
