'use client'

import { useState, useEffect } from 'react'

export interface College {
    name: string
}

export interface Player {
    name: string
}

export interface PlayerCollege {
    players: Player,
    colleges: College
}

interface CollegeSearchBarProps {
    colleges: Array<College>,
    playerColleges: Array<any>
}

const CollegeSearchBar = ({ playerColleges, colleges }: CollegeSearchBarProps) => {

    const [searchInput, setSearchInput] = useState("");
    const [filteredColleges, setFilteredColleges] = useState(colleges);
    const [selectedCollege, setSelectedCollege] = useState(colleges.at(0));

    const handleChange = (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };
      
      useEffect(() => {
        document.getElementById('selectedCollege')!.style.backgroundColor = '';
        if (searchInput.length > 0) {
            const filtered = colleges.filter((college) =>
                college.name.toLowerCase().includes(searchInput.toLowerCase())
            );
            setFilteredColleges(filtered);
            setSelectedCollege(filtered[0]);
        } else  {
            setFilteredColleges(colleges);
            setSelectedCollege(colleges[0]);
        }
    }, [searchInput, colleges]);

    const selectCollege = async (college: College) => {
        setSelectedCollege(college);
        document.getElementById('selectedCollege')!.style.backgroundColor = '';
        
    }

    function guessCollege() {
        let a = document.getElementById('selectedCollege');
        let correct = false;
        if(playerColleges == null || playerColleges.length == 0) {
            if(selectedCollege?.name == 'None') {
                a!.style.backgroundColor = 'lightgreen';
            } else {
                a!.style.backgroundColor = 'indianred';
            }
        } else {
            playerColleges.forEach(playerCollege => {
                if(playerCollege.colleges.name == selectedCollege?.name) {
                    a!.style.backgroundColor = 'lightgreen';
                    correct = true;
                }
            })
            if(!correct) {
                a!.style.backgroundColor = 'indianred';
            }
        } 
    }

    return (
        <div className='flex flex-col items-center max-w-xs m-4 w-72'>
            <input id="collegeSearch"
            type="search"
            className='text-center mx-4 rounded-t-xl w-72' 
            placeholder="Enter College"
            onChange={handleChange}
            value={searchInput} />
            <div className='flex flex-col w-auto items-center bg-white max-h-72 w-72 rounded-b-xl overflow-auto overflow-x-hidden'>
                {filteredColleges.map((college, index) => (
                    <div onClick={() => selectCollege(college)} 
                    className={`m-y-0.5 text-center hover:bg-red-200 rounded w-72 cursor-pointer ${selectedCollege?.name === college.name ? 'bg-red-400' : ''}`} 
                    key={index}>
                        {college.name}
                    </div>
                ))}
            </div>
            <div id='selectedCollege' className='mt-4 flex flex-col text-center rounded-xl p-1'>
                <strong>Guess:</strong> {selectedCollege?.name}
            </div>
            <button onClick={guessCollege} type='submit' className='m-4 bg-red-400 px-10 py-2 rounded-full'>Submit Guess</button>
        </div>
    )
};

export default CollegeSearchBar;