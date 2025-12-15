"use client"

const SERVER_NAME = process.env.NEXT_PUBLIC_SERVER_URL;
import { useEffect, useState } from "react";
import axios from "axios";
import {X} from 'lucide-react'


interface ApiKeyFormProps {
   queueId?: string;
   isOpen: boolean;
   onClose: () => void;
}


export default function ApiKeyForm({isOpen , onClose}:ApiKeyFormProps){

    const[message , SetMessage] = useState('');
    const[apiKey , setApiKey] = useState('');

    useEffect(()=>{

      async function fetchApiKey(){

      try{
        const response = await axios.get(`${SERVER_NAME}/queue/generate_api_key` , {
            withCredentials : true
        })

        if(response.status === 200){
             setApiKey(response.data.apiKey);

        }
        else{
            setApiKey('');
            SetMessage('Error in generating API Key');
        }

      }
      catch(er){

            SetMessage('Error in generating API Key');

      }

    }

    fetchApiKey();

         
    },[])

    async function CreateAPIKey(e:any){
          e.preventDefault();
          try{

            const response = await axios.post(`${SERVER_NAME}/queue/regenerate_api_key` , {
                queueId : apiKey
            } , {
                withCredentials : true
            })

          }
          catch(er){
             
          }
          finally{
            SetMessage('');
          }
    }

    if(!isOpen) return null;    

    
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
    

    <form className="space-y-6" onSubmit={CreateAPIKey}>
      <div className="flex flex-col">
        <label className="text-lg sm:text-xl font-semibold mb-2 text-gray-200">Title</label>
        <input
          type="text"
          required
        
          placeholder="Enter your title"
          className="w-full px-5 py-3 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all backdrop-blur-sm shadow-inner"
        />
      </div>

    

      <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg sm:text-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
        Generate API Key
      </button>
    </form>

    

    {message && (
      <p className="text-center font-bold text-red-400 mt-6 animate-pulse">{message}</p>
    )}
  </div>
</div>
    )



}