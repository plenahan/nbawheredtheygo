'use client';

import { createClient } from '../utils/supabase/client'
import CollegeSearchBar from './CollegeSearchBar'
import { useState, useEffect } from 'react';
import { Player, PlayerCollege } from '../page';
import GuessBox from './GuessBox';

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
    const [player, setPlayer] = useState(currentPlayer);
    const [streak, setStreak] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [filteredColleges, setFilteredColleges] = useState(colleges);
    const [selectedCollege, setSelectedCollege] = useState(colleges.at(0));
    const [guess, setGuess] = useState(0);

    
    

    async function guessCollege() {
      setGuess(guess+1);
      let correct = false;
      if(player.colleges == null || player.colleges.length == 0) {
          if(selectedCollege?.name == 'None') {
              correct = true;
          } else {
              correct = false;
          }
      } else {
          player.colleges.forEach((playerCollege: { name: any; }) => {
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

      player.colleges.forEach((college: any) => {
        addGuessBox(college);
      });

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

    function addGuessBox(playerCollege: any) {
      let guessNum = document.getElementById('guessNum');
      let college = document.getElementById('college');
      let division = document.getElementById('division');
      let conference = document.getElementById('conference');
      let region = document.getElementById('region');
      let state = document.getElementById('state');

      let divChild = document.createElement("div");
      divChild.textContent = (guess+1).toString() || "N/A";
      divChild.className = 'border rounded-md px-1 text-center'
      guessNum?.appendChild(divChild);

      createGuessBoxElement(selectedCollege?.name, playerCollege?.name, college!);
      createGuessBoxElement(selectedCollege?.conference?.division?.name, playerCollege?.conference?.division?.name, division!);
      createGuessBoxElement(selectedCollege?.conference?.name, playerCollege?.conference?.name, conference!);
      createGuessBoxElement(selectedCollege?.state?.region?.name, playerCollege?.state?.region?.name, region!);
      createGuessBoxElement(selectedCollege?.state?.name, playerCollege?.state?.name, state!);
    }

    function createGuessBoxElement(guess: string, answer: string, col: HTMLElement) {
      let divChild = document.createElement("div");
      divChild.textContent = guess || "N/A";
      if(guess == answer) {
        divChild.style.backgroundColor = 'lightgreen';
      } else {
        divChild.style.backgroundColor = 'indianred';
      }
      divChild.className = 'border rounded-md px-1 text-center'
      col?.appendChild(divChild);
    }

    function clearGuessBox() {
      let guessNum = document.getElementById('guessNum');
      let college = document.getElementById('college');
      let division = document.getElementById('division');
      let conference = document.getElementById('conference');
      let region = document.getElementById('region');
      let state = document.getElementById('state');
      guessNum!.innerHTML = '<div>Guess #<div/>';
      college!.innerHTML = '<div>College<div/>';
      division!.innerHTML = '<div>Division<div/>';
      conference!.innerHTML = '<div>Conference<div/>';
      state!.innerHTML = '<div>State<div/>';
      region!.innerHTML = '<div>Region<div/>';
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
    const player = players?.at(Math.floor(Math.random()*players?.length))
    setSelectedCollegeColor('inherit');
    toggleCorrectCollege(true);
    setPlayer(player!);
    setSearchInput("");
    clearGuessBox();
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
        

        <GuessBox />

        <h1>Streak: { streak }</h1>
        <h1>High Score: { currentHighScore }</h1>
    </div>
  )
}