import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { QueryData, SupabaseClient } from "@supabase/supabase-js";

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookieStore).getAll()
        },
        async setAll(cookiesToSet) {
          try {
            // cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};

export const getAllColleges = async (db: SupabaseClient<any, "public", any>) => {
  const collegesQuery = db.from(`colleges`).select(`
      id, 
      name,
      conference (
        id, 
        name,
        division (
          id, 
          name
        )
      ),
      state (
        id,
        name,
        region (
          id, 
          name
        )
      )
      `).order('name', {ascending: true});
  
    type CollegeData = QueryData<typeof collegesQuery>;
    const { data: cData, error: cError } = await collegesQuery;
    if(cError) throw cError;
    const collegeData: CollegeData = cData;

    return collegeData;
}

export const getAllPlayers = async (db: SupabaseClient<any, "public", any>) => {
  const playersQuery = db.from('players').select(`
    id,
    name,
    played_from,
    played_to,
    height,
    weight, 
    position,
    colleges (
      id, 
      name,
      conference (
        id, 
        name,
        division (
          id, 
          name
        )
      ),
      state (
        id,
        name,
        region (
          id, 
          name
        )
      )
    )
  `).order('played_to', {ascending: false})

  type PlayerData = QueryData<typeof playersQuery>;
  const { data: pData, error: pError } = await playersQuery;
  if(pError) throw pError;
  const playerData: PlayerData = pData;

  return playerData;
}