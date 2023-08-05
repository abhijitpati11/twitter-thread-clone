import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import Moment from 'react-moment';
import { db } from '@/Firebase';

import { BsChat } from 'react-icons/bs';
import { FaRetweet } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from 'react-icons/ai';


const Post = ({ id, post }) => {

  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]); 

  const { data: session } = useSession();
  const router = useRouter();

  const [appContext, setAppContext] = useContext(AppContext);

  // like post
  const likePost = async () => {
    if(liked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid))
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        userName: session.user.name
      });
    }
  }
  // number of likes
  useEffect(() => 
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => 
    setLikes(snapshot.docs)), [db, id]
  )
  // to change the appearance of the like button
  useEffect(() => {
    setLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    )
  }, [likes]);


  // opening the modal on click in the comment icon
  const openModal = () => {
    setAppContext({
      ...appContext,
      isModalOpen: true,
      post, 
      postId: id
    })
  }

  // number of comments
  useEffect(() => 
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    ), [db, id]
  )

  return (
    <div className='mt-4 border-t border-gray-500 px-4 pt-6 pb-4 cursor-pointer'
     onClick={() => {router.push(`/${id}`)}}
    >

       {/* show user image */}
     <div className='grid grid-cols-[48px,1fr] gap4'>
      <div>
       <img src={post?.userImg} 
        alt="" 
        className='h-12 w-13 rounded-full object-cover'
       />
      </div>
      {/* user name, user tag, and timestamp */}
      <div className='ml-4'>
       <div className='block flex flex-col gap-1'>
        <h1 className='font-medium text-white'>{post?.username}</h1>
        <div className="flex">
         <p className='text-gray-500'>@{post?.tag} &nbsp; &nbsp; </p>
         <p className='text-gray-500'>
          <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
         </p>
        </div>
       </div>

       {/* tweet content and image(if availabel) */}
       <p>{post?.text}</p>
       <img 
        className='max-h-[400px] object-cover rounded-[25px] mt-3'
        src={post?.image} 
        alt="" 
       />

        {/* retweet, retweet, delete icon */}
       <div className='flex justify-between text-[20px] mt-4 w-[80%]'>
        {/* comment */}
        <div className='flex gap-1 items-center'>
          <BsChat className='hoverEffect w-7 h-7 p-1' 
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }} 
          />
          {comments.length > 0 && (
            <span className='text-sm'>
              {comments.length}
            </span>
          )}
        </div>
        
        {/* delete icon if current user else retweet icon */}
        {session?.user?.uid !== post?.id ? (
          <FaRetweet className='hoverEffect w-7 h-7 p-1' />
        ) : (
          <RiDeleteBin5Line  className='hoverEffect w-7 h-7 p-1'
            onClick={(e) => {
              e.stopPropagation();
              deleteDoc(doc(db, "posts", id));
            }}
          />
        )}

        {/* like post and show number of like in a tweet */}
        <div className='flex gap-1 items-center'
          onClick={(e) => {
            e.stopPropagation();
            likePost();
          }}
        >
          {liked ? 
            <AiFillHeart className='hoverEffect w-7 h-7 p-1 text-pink-700' />
           : 
            <AiOutlineHeart className='hoverEffect w-7 h-7 p-1 text-pink-700' />
          }

          {likes.length > 0 && (
            <span className={`${liked && "text-pink-700"} text-sm`}>
              {likes.length}
            </span>
          )}
        </div>
        <AiOutlineShareAlt className='hoverEffect w-7 h-7 p-1' />

       </div>
      </div>
     </div>

    </div>
  )
}

export default Post
