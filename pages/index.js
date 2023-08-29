import React, { useContext } from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import Login from '@/components/Login';
import Sidebar from '@/components/Sidebar';
import Feed from '@/components/Feed';
import { AppContext } from '@/context/AppContext';
import Modal from '@/components/Modal';
import Trending from '@/components/Trending';

const index = () => {

  const { data: session } = useSession();
  if(!session) {
    return <Login />;
  }

  const [appContext] = useContext(AppContext);

  return (
    <div>
      <Head>
        <title>Thread-clone-Know what's happening</title>
        <meta name='description' content='Thread/Twitter clone to conenct and shate your opinions' />
      </Head>

      <main className='relative max-w-[1400px] mx-auto'>
        <Sidebar />
        <div className='flex gap-6'>
          <Feed />
          <Trending />
          {appContext?.isModalOpen && <Modal />}
        </div> 
      </main>
    </div> 
  )
}

export default index;

