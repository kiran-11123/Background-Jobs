"use client"

const SERVER_NAME = process.env.NEXT_PUBLIC_SERVER_URL;
import { useEffect, useState } from "react";
import axios from "axios";
import { Copy } from "lucide-react";
import {X , Trash} from 'lucide-react'


interface ApiKeyFormProps {
   queueId?: string;
   isOpen: boolean;
   onClose: () => void;
}


export default function ApiKeyForm({queueId ,  isOpen , onClose}:ApiKeyFormProps){

    const[message , SetMessage] = useState('');
    const[apiKey , setApiKey] = useState('');
    const[copy, setCopied] = useState(false);

    useEffect(()=>{

      async function fetchApiKey(){

      try{
      const response = await axios.get(
  `${SERVER_NAME}/keys/get_key`,
  {
    params: { queue_id: queueId },
    withCredentials: true,
  }
);

        if(response.status === 200){
             setApiKey(response.data.api_key);

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

    async function  handleCopy() {
         try {
            await navigator.clipboard.writeText(apiKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {

            console.error('Failed to copy text: ', err);
        }
        
    }

    async function CreateAPIKey(e:any){
          e.preventDefault();
          try{

            const response = await axios.post(`${SERVER_NAME}/keys/generate_key` , {
                queue_id : queueId
            } , {
                withCredentials : true
            })

            if(response.status === 200){
                 setApiKey(response.data.api_key);
                 SetMessage('API Key Generated Successfully');

            }
            else{
                SetMessage(response.data.message);
            }

          }
          catch(er){

                SetMessage('Error in generating API Key');
             
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
        <h1>API Key Management</h1>

        <button title="button" onClick={onClose} className="px-1 py-1 
          shadow-md
          transition-all duration-300
          hover:scale-110 hover:rotate-90  rounded-full bg-red-500 hover:bg-red-700 "><X/></button>

    </div>

  { apiKey.length>0 ? (  
<form className="space-y-6" onSubmit={CreateAPIKey}>
  <div className="flex flex-1 items-center justify-between gap-2">
    <div className="flex flex-col flex-1">
      <label htmlFor="apiKey" className="text-white font-medium">
        API Key
      </label>
      <input
        type="text"
        id="apiKey"
        value={apiKey}
        readOnly
        placeholder="Your API Key"
        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <button
      type="button"
      title="Copy"
      onClick={handleCopy}
      className="flex items-center p-2 mt-5 bg-gray-300 rounded-md hover:bg-gray-400 hover:opacity-80 transition-shadow shadow-md"
    >
      <Copy size={16} color="black" />
    </button>
  </div>
</form>

  ) : null }
    <div className="flex justify-end mt-6">  

      <button className="w-full py-2 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg sm:text-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
        Generate API Key
      </button>

      <button title="delete" className="ml-2 p-2 bg-red-500 rounded-md hover:bg-red-60authys-innerargin better">  <Trash  color="white" /> </button>

      </div>


    

    {message && (
      <p className="text-center font-bold text-red-400 mt-6 animate-pulse">{message}</p>
    )}
  </div>
</div>
    )



}