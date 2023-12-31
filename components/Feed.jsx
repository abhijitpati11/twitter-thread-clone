import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { db } from '../Firebase';
import { HiOutlineSparkles } from 'react-icons/hi';
import Input from './Input';
import Post from './Post';

const Feed = () => {

 const [posts, setPost] = useState([]);
 
 // getting data from firebase database
 useEffect(
  () => onSnapshot(
   query(collection(db, "posts"), orderBy("timestamp", "desc")),
   (snapshot) => {
    setPost(snapshot.docs)
   }
  ), [db]
 )

 console.log(posts)

 return (
  <div className='sm:ml-[81px] xl:ml-[340px] w-[700px] min-h-screen border-r border-gray-400 text-white py-2'>

   <div className='sticky top-0 flex justify-between font-medium text-[20px] px-4 py-2'>
    Home 
    <HiOutlineSparkles />
   </div>
   <Input />

   
   {posts.map((post) => (
    <Post key={post.id} id={post.id} post={post.data()} />
   ))}

  </div> 
 )
}

export default Feed;

