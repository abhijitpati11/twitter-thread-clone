
import React from 'react'

const TrendingList = ({ category, topic, news }) => {

    return (
        <div className='mt-4 flex items-center'>
            <div>
                <p className='text-white-500 text-[14px] mb-1'>{category} · LIVE</p>
                <h1 className='font-medium pr-2'>{topic}: {news}</h1>
            </div>

        </div>
    )
}

export default TrendingList