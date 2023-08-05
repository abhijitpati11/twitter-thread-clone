import React from 'react';
import { FiSearch } from 'react-icons/fi'
import TrendingList from './TrendingList';

const Trending = () => {
  return (
    <div className='hidden lg:block w-[350px] mt-2'>
      <div className='bg-[#16182C] flex gap-2 rounded-full py-2 px-4 text-white items-center
      text-[20px] sticky top-1 z-10'>
       <FiSearch />
       <input type="text" className='bg-transparent w-[100%] outline-none' 
       placeholder='Search Thread...'/>
      </div>

      <div className='bg-[#16182C] rounded-[20px] text-white mt-4 px-4 py-4'>
       <h1 className='text-[20px] font-medium'>What's Happening...</h1>
       <TrendingList category="Entertainment" topic="BigBossOTT" news="Dhruv Rathee denies entry to BigBossOTT" />
       <TrendingList category="Entertainment" topic="Space" news="Nasa captures new supernova explosion" />
       <TrendingList category="Entertainment" topic="Manipur" news="Situation worsens after viral video circulates" />
       <TrendingList category="Entertainment" topic="Football" news="Messi moving to Miami, was a good decision?" />
       <TrendingList category="Entertainment" topic="Entertainment" news="More updates about Musk vs. Zuck" />

      </div>
    </div>
  )
}

export default Trending


