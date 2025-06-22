import { getPagination } from '@/lib/utils';
import { getUserData } from '@/server/get-user-data';
import { supabaseServerClient } from '@/supabase/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const supabase = await supabaseServerClient();
    const user = await getUserData();
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const userId = user.id;
    const recipientId = searchParams.get('recipientId');

    if (!recipientId) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    const page = Number(searchParams.get('page'));
    const size = Number(searchParams.get('size'));
    const { from, to } = getPagination(page, size);

    const { data, error } = await supabase
      .from('direct_messages')
      .select(`*, user_one: user_one (*), user_two: user_two (*), user: user (*)`)
      .or(
        `and(user_one.eq.${userId},user_two.eq.${recipientId}),and(user_one.eq.${recipientId},user_two.eq.${userId})`,
      )
      .range(from, to)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching direct messages', error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.log('SERVER ERROR: ', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
