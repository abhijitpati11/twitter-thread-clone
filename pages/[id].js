import React, { useContext } from 'react';
import Head from 'next/head';
import Sidebar from '@/components/Sidebar';
import Trending from '@/components/Trending';
import SinglePost from '@/components/SinglePost';
import Modal from '@/components/Modal';
import { AppContext } from '@/context/AppContext';

const PostPage = () => {

 const [appContext] = useContext(AppContext);

  return (
    <div>
      <Head>
        <title>Reply</title>
        <meta name='description' content=''/>
      </Head>

      <main className='relative max-w-[1400px] mx-auto'> 
       <Sidebar />
       <div className='flex gap-6 '>
        <SinglePost />
        <Trending />
        {appContext?.isModalOpen && <Modal />}
       </div>
      </main>

    </div>
  )
}

export default PostPage
