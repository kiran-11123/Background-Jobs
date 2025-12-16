"use client"

import {X , Menu } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Home() {
      
      const router = useRouter();
      const[isOpen , setIsOpen] = useState(false);

      function Login(){
         router.push('/signin')
      }
      function Register(){
         router.push('/signup')
      }

  return (


<div className="h-screen flex flex-col items-center bg-gradient-to-b from-black via-neutral-900 to-black text-white">

  <main className='flex-grow'>
  <div className="px-6 py-2 sm:px-10 sm:py-7 w-full max-w-sm sm:max-w-4xl 
                  rounded-xl mt-5 flex items-center justify-between
                  bg-black/40 backdrop-blur-md border border-white/20 shadow-xl">
                  
    {/* Left Brand */}
    <div className="font-poppins text-xl sm:text-3xl font-semibold">
      <h1>SwiftQueues</h1>
    </div>

    {/* Buttons */}
    <div className="hidden sm:flex items-center gap-6 font-roboto text-lg">

      <button className="
        px-5 py-2 rounded-lg 
        border border-white/20 
        bg-white/5 
        hover:bg-white/10 
        hover:border-white/40
        hover:scale-105
        cursor-pointer
        transition-all duration-300
        shadow-sm hover:shadow-md
        " onClick={Login}>
        Login
      </button>

      <button className="
        px-5 py-2 rounded-lg 
        bg-blue-600 
        hover:bg-blue-500 
        focus:ring-2 focus:ring-blue-400
        hover:scale-105
        cursor-pointer
        transition-all duration-300 
        shadow-sm hover:shadow-lg
      " onClick={Register}>
        Register
      </button>

    </div>

    <div className='sm:hidden flex items-center'>
        
        <button onClick={()=>setIsOpen(!isOpen)} className='text-white focus:outline-none'>{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
       
    </div>

  </div>

  {isOpen && (
                <div className="sm:hidden w-full max-w-4xl px-6 mt-2 flex flex-col gap-2 bg-[#0f0c29] rounded-xl shadow-lg text-center py-4">
                    <button  onClick={Login} className=" px-3 py-2 rounded-lg 
        border border-white/20 
        font-roboto
        bg-white/5 
        hover:bg-white/10 
        hover:border-white/40
        hover:scale-105
        transition-all duration-300
        shadow-sm hover:shadow-md">
                        Login
                    </button>
                    <button onClick={Register} className="px-3 py-2 rounded-lg 
                    font-roboto
        bg-blue-600 
        hover:bg-blue-500 
        focus:ring-2 focus:ring-blue-400
        hover:scale-105
        transition-all duration-300 
        shadow-sm hover:shadow-lg">
                        Register
                    </button>
                </div>
            )}

<div className="w-full max-w-3xl px-6 py-10 mt-16 mb-12 text-center font-roboto rounded-3xl bg-white/10 backdrop-blur-lg text-white  hover:bg-white/5 hover:backdrop-blur-2xl shadow-lg  transition-shadow duration-300">
  <p className="text-base sm:text-xl md:text-2xl  leading-relaxed">
    SwiftQueues is a high-performance job queue and task scheduling platform designed to automate background work, improve app performance, and scale effortlessly.
  </p>
</div>
</main>

   <footer className="text-sm w-full  bg-gray-800 hover:bg-white/10 backdrop-blur-lg rounded-xl text-white sm:text-2xl font-roboto justify-end mb-2 text-center px-6 py-4">

                <p>&copy; {new Date().getFullYear()} SwiftQueues. All rights reserved.</p>

            </footer>

</div>




  );
}
