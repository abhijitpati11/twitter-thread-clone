import Feed from '@/components/Feed'
import News from '@/components/News'
import Sidebar from '@/components/Sidebar'
import Trending from '@/components/Trending'
import React from 'react'

const trending = () => {
  return (
    <div>
      <div className='relative max-w-[1400px] mx-auto'>
        <Sidebar />
        <div className='flex gap-6'>
          <News />
          <Trending />
        </div>
      </div>
    </div>
  )
}

export default trending
