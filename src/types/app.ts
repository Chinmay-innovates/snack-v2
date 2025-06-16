import { Database } from './supabase';

export type User = Database['public']['Tables']['users']['Row'];
export type Workspace = Database['public']['Tables']['workspaces']['Row'];
