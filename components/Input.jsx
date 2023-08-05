import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineGif } from 'react-icons/ai';
import { BsEmojiSmile, BsImage } from 'react-icons/bs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { IoCalendarNumberOutline  } from 'react-icons/io5';
import { RiBarChart2Line } from 'react-icons/ri';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { collection, serverTimestamp, updateDoc, doc, addDoc  } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { db, storage } from '../Firebase';


const Input = () => {

 const { data: session } = useSession();
 const [loading, setLoading] = useState(false);

 // show emoji state
 const [showEmojis, setShowEmojis] = useState(false);

 // text area input 
 const [input, setInput] = useState("");

 // to hold file to be uploaded
 const [selectedFile, setSelectedFile] = useState(null); 

 // function to add image in the post
 const addImageToPost = (e) => {
  const reader = new FileReader();
  if(e.target.files[0]) {
   reader.readAsDataURL(e.target.files[0]);
  }
  reader.onload = (readerEvent) => {
   setSelectedFile(readerEvent.target.result);
  }
 }

 // function use emoji in the text area
 const addEmoji = (e) => {
  const sym = e.unified.split("-");
  const codesArray = [];
  sym.forEach((e1) => codesArray.push("0x"+e1));
  const emoji = String.fromCodePoint(...codesArray);
  setInput(input+emoji)
 }

 

 // tweet the post we just created
 const sendPost = async () => {
  if(loading) return;

  setLoading(true);

  const docRef = await addDoc(collection(db, "posts"), {
   id: session.user.uid,
   username: session.user.name,
   userImg: session.user.image,
   tag: session.user.tag,
   text: input,
   timestamp: serverTimestamp()
  })

  const imageRef = ref(storage, `posts/${docRef.id}/image`);
  if(selectedFile) {
   await uploadString(imageRef, selectedFile, "data_url")
   .then(async () => {
    const downloadURL = await getDownloadURL(imageRef);
    await updateDoc(doc(db, "posts", docRef.id), {
     image: downloadURL
    })
   })
  }

  setLoading(false);
  setInput("");
  setSelectedFile(null);  
  setShowEmojis(false);
 }


 return (
  <div className={`mt-4 px-4 ${loading && "opacity-60"}`}>
   <div className='grid grid-cols-[48px,1fr] gap-4'>
    <div>
     <img src={session?.user?.image}
      alt="userImage"
      className='h-12 w-12 rounded-full object-contain'
     />
    </div>
    <div className='w-[100%]'>
     <textarea
      className='w-[100%] bg-transparent  text-[20px]'
      rows="2"
      placeholder="What's Happening...."
      value={input}
      onChange={(e) => setInput(e.target.value)}
     />

     {selectedFile && (
      <div className="relative mb-4">
       <div className='absolute w-8 h-8 bg-#15181c hover:[#272c26] bg-opacity-75 rounded-full flex items-center
        justify-center top-1 left-1 cursor-pointer' 
        onClick={() => setSelectedFile(null)}>
        <AiOutlineClose className='h-5 text-white' />
       </div>

       <img src={selectedFile}
        alt="image"
        className='rounded-2xl max-h-60 object-contain' 
       />
      </div>
     )}

     {!loading && (
      <div className='flex justify-between items-center'>
       <div className='flex gap-4 text-[20px] text-[#1d9bf0]'>
        <label htmlFor="file">
         <BsImage className='cursor-pointer' />
        </label>
        <input type="file" id="file" hidden onChange={addImageToPost} />

        <div className='border-[#1d9bf0] border-rounded h-[16px] text-[26px] grid place-items-center cursor-pointer'>
         <AiOutlineGif />
        </div>

        <RiBarChart2Line className='rotate-90 cursor-pointer' />
        <BsEmojiSmile className='cursor-pointer' onClick={()=>setShowEmojis(!showEmojis)} />
        <IoCalendarNumberOutline className='cursor-pointer' />
        <HiOutlineLocationMarker className='cursor-pointer' />

       </div>

       <button className='bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] 
        disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-none'
        disabled={(!input.trim()) && !selectedFile} 
        onClick={sendPost}
       >
        Tweet
       </button>

      </div>
     )}

     {showEmojis && (
      <div className='absolute mt-[10px] -ml-[40px] max-w-[320px] rounded-[20px]'>
       <Picker 
        onEmojiSelect = {addEmoji}
        data = {data}
        theme = "dark" 
       />
      </div>
     )}

    </div>
   </div>
  </div>
 )
}

export default Input
