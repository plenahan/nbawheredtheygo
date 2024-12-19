"use client";

import { createClient } from '../utils/supabase/client'
import CollegeSearchBar from './CollegeSearchBar'
import { useState, useEffect } from 'react';
import { Player, PlayerCollege } from '../page';

interface PlayerDataProps {
    playerData: Array<any>,
    collegeData: Array<any>,
    currentPlayer: any,
    currentHighScore: any,
    createHighScore: any
}

export default function PlayerData({playerData, collegeData, currentPlayer, currentHighScore, createHighScore }: PlayerDataProps) {
    const supabase = createClient()

    const [searchInput, setSearchInput] = useState("");
    const [players, setPlayers] = useState(playerData);
    const [colleges, setColleges] = useState(collegeData);
    // const [playerColleges, setPlayerColleges] = useState(playerCollegeData);
    const [player, setPlayer] = useState(currentPlayer);
    const [streak, setStreak] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [filteredColleges, setFilteredColleges] = useState(colleges);
    const [selectedCollege, setSelectedCollege] = useState(colleges.at(0));
    const [guess, setGuess] = useState(0);

    async function guessCollege() {
      setGuess(guess+1);
      let a = document.getElementById('selectedCollege');
      let correct = false;
      if(player.colleges == null || player.colleges.length == 0) {
          if(selectedCollege?.name == 'None') {
              correct = true;
          } else {
              correct = false;
          }
      } else {
          player.colleges.forEach(playerCollege => {
              if(playerCollege?.name == selectedCollege?.name) {
                  correct = true;
              }
          })
      }

      if(correct){
        setSelectedCollegeColor('lightgreen');
      } else {
        setSelectedCollegeColor('indianred');
      }

      switch(guess) {
        case 0:
          console.log('g1');
          if(correct){
            setGuess(0);
            toggleCorrectCollege(false);
            updateScore(correct);
            await new Promise(resolve => setTimeout(resolve, 2000))
            fetchData();
          }
          break;
        case 1: 
          console.log('g2');
          if(correct){
            setGuess(0);
            toggleCorrectCollege(false);
            updateScore(correct);
            await new Promise(resolve => setTimeout(resolve, 2000))
            fetchData();
          }
          break;
        case 2:
          setGuess(0);
          console.log('g3');
          toggleCorrectCollege(false);
          updateScore(correct);
          await new Promise(resolve => setTimeout(resolve, 2000))
          fetchData();
          break;
        default:
          setGuess(0);
          console.log('g');
          break;
      }
    }   

    function updateScore(correct: boolean) {
        if(correct) {
            setStreak(streak + 1);
            if(streak + 1 > +currentHighScore || currentHighScore == undefined || currentHighScore == null || currentHighScore == ""){
                setHighScore(streak + 1);
                createHighScore("" + (streak + 1));
            }
        } else {
            setStreak(0);
        }
    }

  const fetchData = async () => {
    // const playerData = await supabase.from('players').select('*').order('played_to', {ascending: false});
    // const collegeData = await supabase.from('colleges').select('name').order('name', { ascending: true });
    const player = players?.at(Math.floor(Math.random()*players?.length))
    const playerCollegeData = await supabase.from('player_colleges').select('colleges!inner(name), players!inner(name)').eq('players.id', player?.id);

    setSelectedCollegeColor('inherit');
    toggleCorrectCollege(true);
    // setPlayers(playerData?.data!)
    // setColleges(collegeData?.data!)
    // setPlayerColleges(playerCollegeData?.data!)
    setPlayer(player!);
    setSearchInput("");
  }

  function toggleCorrectCollege(hide: boolean) {
    if(hide) {
        document.getElementById('correctCollege')!.style.display = 'none';
    } else {
        document.getElementById('correctCollege')!.style.display = 'flex';
    } 
  }

  function setSelectedCollegeColor(color: string) {
    let a = document.getElementById('selectedCollege');
    a!.style.backgroundColor = color;
  }

  let imgsrc = "https://www.basketball-reference.com/req/202106291/images/headshots/" + player?.id + ".jpg";

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='m-1'>
        <strong>{player?.name}</strong>
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
      
        {player && colleges &&
        <CollegeSearchBar
        player={player}
        colleges={colleges} 
        hooks={{searchInput, setSearchInput, 
        streak, setStreak, 
        highScore, setHighScore, 
        currentHighScore, createHighScore,
        selectedCollege, setSelectedCollege, 
        filteredColleges, setFilteredColleges}} />}
        <button onClick={guessCollege} type='submit' className='m-4 bg-red-400 px-10 py-2 rounded-full'>Submit Guess</button>
        <h1>Streak: { streak }</h1>
        <h1>High Score: { currentHighScore }</h1>
        <div>{player.colleges[0]?.conference?.name}</div>
    </div>
  )
}