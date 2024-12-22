import { createClient, getAllColleges, getAllPlayers } from './utils/supabase/server'
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

  const collegeData = await getAllColleges(supabase);
  const playerData = await getAllPlayers(supabase);
  const player = playerData?.at(Math.floor(Math.random()*playerData?.length));
  
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