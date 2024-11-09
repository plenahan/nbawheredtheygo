import { createClient } from './utils/supabase/server'
import { cookies } from 'next/headers'
import CollegeSearchBar, { College, Player, PlayerCollege} from './CollegeSearchBar'


export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  let page = Math.floor(Math.random() * 5240);

  const { data: players } = await supabase.from('players').select('*').range(page, page)
  const { data: colleges } = await supabase.from('colleges').select('name').order('name', { ascending: true })
  
  let player = players?.at(Math.floor(Math.random()*players?.length))
  let imgsrc = "https://www.basketball-reference.com/req/202106291/images/headshots/" + player.id + ".jpg";

  const { data: playerColleges } = await supabase.from('player_colleges').select('colleges!inner(name), players!inner(name)').eq('players.id', player.id);
  

  return (
    <div className='flex flex-col items-center w-full'>
      {player.name}
      <img className='rounded-lg' src={imgsrc} alt="" />
        {playerColleges && colleges && <CollegeSearchBar playerColleges={playerColleges} colleges={colleges} />}
    </div>
  )
}