'use server';

import { supabaseServerClient } from '@/supabase/supabase-server';
import { getUserData } from './get-user-data';

export const createWorkspace = async ({
  imageUrl,
  name,
  slug,
  invite_code,
}: {
  imageUrl?: string;
  name: string;
  slug: string;
  invite_code: string;
}) => {
  console.log('createWorkspace', { imageUrl, name, slug, invite_code });
};
