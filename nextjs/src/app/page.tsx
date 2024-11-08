import { createClient } from './utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  let page = Math.floor(Math.random() * 6) * 1000;

  const { data: players } = await supabase.from('players').select('*').range(page, page + 1000)
  let player = players?.at(Math.floor(Math.random()*players?.length))
  let imgsrc = "https://www.basketball-reference.com/req/202106291/images/headshots/" + player.id + ".jpg";

  return (
    <div className='flex flex-col items-center'>
      {player.name}
      <img src={imgsrc} alt="" />
      <div>
        <input className='text-center' type="text" />
      </div>
      <button>Submit Guess</button>
    </div>
  )
}