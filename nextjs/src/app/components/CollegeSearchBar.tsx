'use client';

import { useState, useEffect, AwaitedReactNode, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react'
import { Player, PlayerCollege } from '../page';

interface CollegeSearchBarProps {
    player: any,
    colleges: Array<any>,
    hooks: {searchInput: string, setSearchInput: any,
        streak: number, setStreak: any,
        highScore: number, setHighScore: any,
        currentHighScore: string, createHighScore: any,
        selectedCollege: any, setSelectedCollege: any,
        filteredColleges: Array<any>, setFilteredColleges: any
    }
}

const CollegeSearchBar = ({ player, colleges, hooks }: CollegeSearchBarProps) => {

    const handleChange = (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        hooks.setSearchInput(e.target.value);
      };
      
      useEffect(() => {
        document.getElementById('selectedCollege')!.style.backgroundColor = '';
        if (hooks.searchInput.length > 0) {
            const filtered = colleges.filter((college) =>
                college.name.toLowerCase().includes(hooks.searchInput.toLowerCase())
            );
            hooks.setFilteredColleges(filtered);
            hooks.setSelectedCollege(filtered[0]);
        } else  {
            hooks.setFilteredColleges(colleges);
            hooks.setSelectedCollege(colleges[0]);
        }
    }, [hooks.searchInput, colleges]);

    const selectCollege = async (college: any) => {
        hooks.setSelectedCollege(college);
        document.getElementById('selectedCollege')!.style.backgroundColor = '';
        
    }

    return (
        <div className='flex flex-col items-center max-w-xs m-4 w-72'>
            <input id="collegeSearch"
            type="search"
            className='text-center mx-4 rounded-t-xl w-72' 
            placeholder="Enter College"
            onChange={handleChange}
            value={hooks.searchInput} />
            <div className='flex flex-col w-auto items-center bg-white max-h-72 w-72 rounded-b-xl overflow-auto overflow-x-hidden'>
                {hooks.filteredColleges.map((college, index) => (
                    <div onClick={() => selectCollege(college)} 
                    className={`m-y-0.5 text-center hover:bg-red-200 rounded w-72 cursor-pointer ${hooks.selectedCollege?.name === college.name ? 'bg-red-400' : ''}`} 
                    key={index}>
                        {college.name}
                    </div>
                ))}
            </div>
            <div id='selectedCollege' className='mt-4 flex flex-col text-center rounded-xl p-1'>
                <strong>Guess:</strong> {hooks.selectedCollege?.name}
            </div>
            
            <div id='correctCollege' className='flex flex-col text-center rounded-xl hidden'>
            <strong>Correct Colleges:</strong> 
            {player.colleges.map((playerCollege: { name: string }, index: number) => 
                <div key={index}>{playerCollege?.name}</div>
            )}
            </div>
        </div>
    )
};

export default CollegeSearchBar;