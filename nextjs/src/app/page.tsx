import { createClient } from './utils/supabase/server'
import { cookies } from 'next/headers'
import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js'
import CollegeSearchBar from './components/CollegeSearchBar'
import PlayerData from './components/PlayerData'

export interface Player {
  id: number,
  name: string,
  played_from: number,
  played_to: number,
  height: string,
  weight: number, 
  position: string
}

export interface PlayerCollege {
  colleges: Array<{name: string}>,
  players: Array<{name: string}>
}

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const playersQuery = supabase.from('players').select(`
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
  // const { data: playerData } = await supabase.from('players').select('*').order('played_to', {ascending: false});

  const collegesQuery = supabase.from(`colleges`).select(`
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

  const player = playerData?.at(Math.floor(Math.random()*playerData?.length))

  // const { data: playerCollegeData } = await supabase.from('player_colleges').select('colleges!inner(name, conference, state), players!inner(name)').eq('players.id', player?.id);
  
  async function createHighScore(highScore: string) {
    "use server";

    (await cookies()).set("highScore", highScore);
  }

  const currentHighScore = (await cookieStore).get("highScore")?.value;

  return (
    <div>
      {playerData && collegeData && <PlayerData playerData={playerData} collegeData={collegeData} currentPlayer={player} createHighScore={createHighScore} currentHighScore={currentHighScore} /> }
    </div>
  )
}