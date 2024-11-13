import { createClient } from './utils/supabase/server'
import { cookies } from 'next/headers'
import CollegeSearchBar, { College, Player, PlayerCollege} from './components/CollegeSearchBar'


export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: players } = await supabase.from('players').select('*').order('played_to', {ascending: false})
  const { data: colleges } = await supabase.from('colleges').select('name').order('name', { ascending: true })
  
  let player = players?.at(Math.floor(Math.random()*players?.length))
  let imgsrc = "https://www.basketball-reference.com/req/202106291/images/headshots/" + player.id + ".jpg";
  

  const { data: playerColleges } = await supabase.from('player_colleges').select('colleges!inner(name), players!inner(name)').eq('players.id', player.id);
  

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='m-1'>
        <strong>{player.name}</strong>
      </div>
      <div className='flex flex-row'>
        <img className='rounded-lg' src={imgsrc} alt="" />
        <div className='flex flex-col m-3 items-center'>
          <h3>Played: {player?.played_from}-{player?.played_to}</h3>
          <h3>Position: {player?.position}</h3>
          <h3>Height: {player?.height}</h3>
          <h3>Weight: {player?.weight}</h3>
        </div>
      </div>
      
        {playerColleges && colleges && <CollegeSearchBar playerColleges={playerColleges} colleges={colleges} />}
        <button>next</button>
    </div>
  )
}