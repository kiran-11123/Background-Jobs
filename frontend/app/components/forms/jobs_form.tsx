"use client"

import { useState } from "react"
import axios from "axios"
import {X} from 'lucide-react'


interface JobFormProps {
  projectId?: string;
  isOpen: boolean;
  onClose: () => void;
}
export default function JobsPageForm({ isOpen, onClose }: JobFormProps) {
     

    
    const[name ,Setname] = useState('');
    const[message , SetMessage] = useState('');
    const[jobsName , setJobName] = useState('');
    const[selected , setSelected] = useState('');
    const JobsType = ['Email ', 'Verification Code', 'Activity Summary' , 'Delete Old Jobs'];

    if(!isOpen) return null;

    async function SubmitJob(e:any){
        e.preventDefault();

    }

   
    return(

<div className="flex min-h-screen font-roboto items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 fixed inset-0 bg-black/40  z-50 overflow-auto">
<div className="w-full max-w-md sm:max-w-lg bg-gradient-to-tr from-white/10 to-white/5 hover:to-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
    
    <div className="flex items-center text-white justify-between gap-20 mb-10 font-poppins text-xl ">
        <h1>Create Job</h1>

        <button title="button" className="px-1 py-1 
          shadow-md
          transition-all duration-300
          hover:scale-110 hover:rotate-90  rounded-full bg-red-500 hover:bg-red-700 " onClick={onClose}><X/></button>

    </div>
    

    <form className="space-y-6"  onSubmit={SubmitJob}>
      <div className="flex flex-col">

         <div className="text-sm   text-white mb-1">Choose your Job</div>
        
        <div>
      <select
        title="dropdown"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full sm:max-w-md max-w-sm rounded-md text-sm p-2  bg-gray-700 text-white border border-gray-500"
      >
        <option value="" disabled>Select workspace</option>

        {Array.isArray(JobsType) && JobsType.length > 0 ? (
          JobsType.map((name: string, index: number) => (
            <option key={index} value={name} className="text-sm">
              {name}
            </option>
          ))
        ) : (
          <option value="Default" className="text-sm" disabled>Choose Any option</option>
        )}
      </select>
    </div>

        <label className="text-lg sm:text-xl font-semibold mb-2 text-gray-200">Title</label>
        <input
          type="text"
          required
          value={jobsName}
          onChange={(e) => setJobName(e.target.value)}
          placeholder="Enter your title"
          className="w-full px-5 py-2 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all backdrop-blur-sm shadow-inner"
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