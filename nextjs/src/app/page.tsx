import { createClient } from './utils/supabase/server'
import { cookies } from 'next/headers'
import CollegeSearchBar from './components/CollegeSearchBar'
import PlayerData from './components/PlayerData'

export interface College {
  name: string
}

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
  const { data: playerData } = await supabase.from('players').select('*').order('played_to', {ascending: false});
  const { data: collegeData } = await supabase.from('colleges').select('name').order('name', { ascending: true });
  const player = playerData?.at(Math.floor(Math.random()*playerData?.length))
  const { data: playerCollegeData } = await supabase.from('player_colleges').select('colleges!inner(name), players!inner(name)').eq('players.id', player?.id);
  
  async function createHighScore(highScore: string) {
    "use server";

    (await cookies()).set("highScore", highScore);
  }

  const currentHighScore = (await cookieStore).get("highScore")?.value;

  return (
    <div>
      {playerCollegeData && playerData && collegeData && <PlayerData playerData={playerData} collegeData={collegeData} playerCollegeData={playerCollegeData} currentPlayer={player} createHighScore={createHighScore} currentHighScore={currentHighScore} /> }
    </div>
  )
}