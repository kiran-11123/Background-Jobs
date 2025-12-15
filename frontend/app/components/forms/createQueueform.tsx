"use client"

import { useState } from "react"
import {X} from 'lucide-react'
import axios from "axios";
const SERVER_NAME = process.env.NEXT_PUBLIC_SERVER_URL;

interface CreateQueue {
     projectId: string;
  isOpen: boolean;
  onClose: () => void;
   onQueueCreated: (project: any) => void;
}

export default  function createQueueForm({projectId,  isOpen , onClose , onQueueCreated } : CreateQueue){

    const[name,setQueueName] = useState('');
    const[message , SetMessage] = useState('')

    if(!isOpen) return null;

    

   async function SubmitQueue(e:any){
        e.preventDefault();

        try{
          console.log(projectId);

            const response = await axios.post(`${SERVER_NAME}/queue/create` , {
              projectId : projectId,
              name : name ,
            } , {
                withCredentials : true
            })

            if(response.status === 200){
                 SetMessage(response.data.message);
                  setTimeout(()=>{
                 onQueueCreated(response.data.queue);
                 onClose();
               },1000)
              

            }
            else{
                SetMessage(response.data.message);
            }

        }
        catch(er){

                if (typeof er === "object" && er !== null && "response" in er) {
                    SetMessage((er as any).response.data.message);
                }
                else{
                    SetMessage('error in creating the queue');
                }
            }

        finally{
                setTimeout(()=>{
                    SetMessage('');
                    setQueueName('');
                    onClose();
                },1000)
            }
   }
    
       
    return(
        <div className="flex min-h-screen font-roboto items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 fixed inset-0 bg-black/40  z-50 overflow-auto">
  <div className="w-full max-w-md sm:max-w-lg bg-gradient-to-tr from-white/10 to-white/5 hover:to-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
    
    <div className="flex items-center text-white justify-between gap-20 mb-10 font-poppins text-xl ">
        <h1>Create Queue</h1>

        <button title="button" onClick={onClose} className="px-1 py-1 
          shadow-md
          transition-all duration-300
          hover:scale-110 hover:rotate-90  rounded-full bg-red-500 hover:bg-red-700 "><X/></button>

    </div>
    

    <form className="space-y-6" onSubmit={SubmitQueue}>
      <div className="flex flex-col">
        <label className="text-lg sm:text-xl font-semibold mb-2 text-gray-200">Title</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setQueueName(e.target.value)}
          placeholder="Enter your title"
          className="w-full px-5 py-3 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all backdrop-blur-sm shadow-inner"
        />
      </div>

    

      <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg sm:text-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
        Create
      </button>
    </form>

    

    {message && (
      <p className="text-center font-bold text-red-400 mt-6 animate-pulse">{message}</p>
    )}
  </div>
</div>
    )
}