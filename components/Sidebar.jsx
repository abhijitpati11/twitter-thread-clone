import React from 'react';
import { TbNeedleThread } from 'react-icons/tb';
import { AiFillHome, AiOutlineInbox, AiOutlineUser } from 'react-icons/ai'
import { BiHash } from 'react-icons/bi';
import { BsBell, BsBookmark, BsThreeDots } from 'react-icons/bs';
import { HiOutlineClipboardList, HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import SidebarLink from './SidebarLink';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Sidebar = () => {

 // to acces auth feature of signout
 const { data:session } = useSession();
 const router = useRouter()

  const homeClick = () => router.push('/');

  const trending = () => router.push('/trending');
  
  const profile = () => router.push('/profile');
  
  const more = () => router.push('/more');

  return (
    <div className='hidden sm:flex flex-col items-center 
    xl:items-start xl:w-[340px] p-2 fixed h-full border-r 
    border-gray-400 pr-0 xl:pr-8'>
     
     {/* thread logo */}
     <div className='flex items-center justify-center w-14 h-14 hoverEffect p-0 xl:ml-24'>
      <TbNeedleThread className='text-white text-[35px]' />
     </div>

     {/* sidebar menu, (home, profile, account etc) */}
     <div className='space-y-2 mt-4 mb-2.5 xl:ml-24'>
      <div onClick={homeClick}>
        <SidebarLink text="Home" Icon={AiFillHome} />
      </div>
      <p onClick={trending}><SidebarLink text="Trending" Icon={BiHash} /></p>
      <p><SidebarLink text="Notifications" Icon={BsBell} /></p>
      <p><SidebarLink text="Messages" Icon={AiOutlineInbox} /></p>
      <p><SidebarLink text="Bookmarks" Icon={BsBookmark} /></p>
      <p><SidebarLink text="Lists" Icon={HiOutlineClipboardList} /></p>
      <p onClick={profile}><SidebarLink text="Profile" Icon={AiOutlineUser} /></p>
      <p onClick={more}><SidebarLink text="More" Icon={HiOutlineDotsCircleHorizontal} /></p>
     </div>

     {/* tweet button */}
     <button className='hidden xl:inline 
     ml-auto bg-[#1d9bf0] text-white rounded-full 
     w-52 h-[52px] text-lg font-bold hover:bg-[#1a8cd8]'>
      Tweet
     </button>

     {/* username and signOut button */}
     <div className='text-[#d9d9d9] flex items-center justify-center mt-auto hoverEffect
     xl:ml-auto xl:-mr-5 px-4 py-2' onClick={signOut}>

      <img src={session?.user.image}
      alt='user'
      className='h-10 w-10 rounded-full xl:mr-2.5'/>

      <div className='hidden xl:inline leading-5'>
       <h4 className='font-bold'>{session?.user?.name}</h4>
       <p className='text-sm text-[#6e767d]'>@{session?.user?.tag}</p>
      </div>

      <BsThreeDots className='h-5 hidden xl:inline ml-10' />
     </div>

    </div>
  )
}

export default Sidebar
