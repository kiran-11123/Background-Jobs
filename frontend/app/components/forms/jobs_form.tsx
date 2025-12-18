"use client"

import { useState } from "react"
import axios from "axios"
import {X} from 'lucide-react'
import { title } from "process";


interface JobFormProps {
  queueId: string;
  isOpen: boolean;
  onClose: () => void;
  AddNewJobs?: (job: any) => void;
}

type JobType = "sendEmail" | "sendCode" | "Activity" | "DeleteJobs"


export default function JobsPageForm({ queueId ,  isOpen, onClose ,AddNewJobs}: JobFormProps) {
     

    const queue_id = queueId;
    const[message , SetMessage] = useState('');
    const[jobsName , setJobName] = useState('');
    const[selected , setSelected] =useState<JobType | "">("");

    const[emailTo , setEmailTo] = useState('');
    const[emailSubject , setEmailSubject]=useState('');
    const[emailBody , setEmailBody] = useState('');


    const[expiryDays , SetExpiryDays] = useState('');

    function buildPayload(){

        switch(selected){

            case("sendEmail"):
                if(emailSubject.trim()===''){
                  SetMessage('Email Subject Should have more than 0 characters')
                  return
                }
                if(emailBody.trim()===''){
                  SetMessage('Email Body Should have more than 0 characters')
                }
                return{
                     type:"sendEmail",
                     data :{
                        email:emailTo,
                        subject:emailSubject,
                        message :emailBody

                     }
                }
            case("Activity"):
                if(title.trim()===''){
                    SetMessage('Title Should be more than 0 characters')
                    return 
                }
                return{
                      type: "summary",
                  data: {
            range: "last_24_hours",
          },  
                }
            case("sendCode"):
                return{
                    type:"sendCode", 
                    data:{
                        email : emailTo
                    }
                }
            case("DeleteJobs"):

                if(title.trim()===''){
                    SetMessage('Title Should be more than 0 characters')
                    return
                }
                if(expiryDays.trim()===''){
                   SetMessage('Expiry Days should give')
                   return 
                }
                return{
                     type:"DeleteJobs",
                     data:{
                        queueId : queueId,
                        days:expiryDays
                     }
                }

            default:
        return null;
                 
            

        }
           
        
    }

    if(!isOpen) return null;

    async function SubmitJob(e:any){
        e.preventDefault();

         if (!selected) {
      SetMessage("Please select a job type");
      return;
    }

    const payload = {
      queueId: queueId,
      name: selected,
      job: buildPayload(),
    };

    try{
        console.log("Payload in creating job" , queue_id , jobsName , selected , payload);

        const response  =await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/jobs/create-job`, {
            queueId : queue_id,
            name : jobsName,
            type: selected,
            payload : payload
        } , {
            withCredentials : true
        });

        if(response.status === 200){
            
            SetMessage(response.data.message || "Job created successfully.");
            setTimeout(()=>{  
                AddNewJobs && AddNewJobs(response.data.job);  
            onClose();

            },1000);
        }
        else{
            SetMessage(response.data.message || "Error in creating job. Please try again.");
        }

    }
    catch(er){
       if (typeof er === "object" && er !== null && "response" in er) {
                    SetMessage((er as any).response.data.message);
                }
                else{
                    SetMessage('error in creating the job');
        }
    }

    }

   
    return(

<div className="flex min-h-screen  flex-col md:flex-row font-roboto items-center justify-center gap-5 overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 fixed inset-0 bg-black/40  z-50 overflow-auto">
<div className="w-full max-w-md mt-30 sm:mt-0 sm:max-w-lg bg-gradient-to-tr from-white/10 to-white/5 hover:to-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
    
    <div className="flex items-center text-white justify-between gap-20 mb-10 font-poppins text-xl ">
        <h1>Create Job</h1>

        <button title="button" className="px-1 py-1 
          shadow-md
          transition-all duration-300
          hover:scale-110 hover:rotate-90  rounded-full bg-red-500 hover:bg-red-700 " onClick={onClose}><X/></button>

    </div>
    

    <form className="space-y-4"  onSubmit={SubmitJob}>
      <div className="flex flex-col">


        
        <div>
            <label className="text-sm text-white/70">Job Type</label>
            <select
            title="jobs"
              value={selected}
              onChange={(e) => setSelected(e.target.value as JobType)}
              className="mt-1 w-full rounded-lg bg-zinc-700 p-2 text-white"
            >
              <option value="" disabled>
                Select Job Type
              </option>
              <option>sendEmail</option>
              <option>sendCode</option>
              <option>Activity</option>
              <option>DeleteJobs</option>
            </select>
          </div>

        <label className="text-lg sm:text-xl font-semibold mb-2 text-gray-200 mt-2">Title</label>
        <input
          type="text"
          required
          value={jobsName}
          onChange={(e) => setJobName(e.target.value)}
          placeholder="Enter your title"
          className="w-full px-5 py-2 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all backdrop-blur-sm shadow-inner"
        />
      </div>

                
        

          {/* 🔹 Dynamic Fields */}
          {selected === "sendEmail" && (
            <div className="space-y-3 rounded-xl bg-white/5 p-4">
              <input
                type="email"
                placeholder="Recipient Email"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                className="w-full rounded bg-zinc-700 p-2 text-white"
                required
              />
              <input
                placeholder="Subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full rounded bg-zinc-700 p-2 text-white"
                required
              />
              <textarea
                placeholder="Email body"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="w-full rounded bg-zinc-700 p-2 text-white"
                rows={3}
                required
              />
            </div>
          )}

          {selected === "sendCode" &&(
              <div className="space-y-3 rounded-xl bg-white/5 p-4">
                  <input
                type="email"
                placeholder="Enter the Email To send the Code"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                className="w-full rounded bg-zinc-700 p-2 text-white"
                required
              />
                   
              </div>
          )}

          {selected === "DeleteJobs" && (
            <div className="rounded-xl bg-white/5 p-4">
              <input
               
                placeholder="Delete jobs older than (days)"
                value={expiryDays}
                onChange={(e) => SetExpiryDays(e.target.value)}
                className="w-full rounded bg-zinc-700 p-2 text-white"
                required
              />
            </div>
          )}

    

      <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg sm:text-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
        Create
      </button>
    </form>

    

    {message && (
      <p className="text-center font-bold text-red-400 mt-6 animate-pulse">{message}</p>
    )}
  </div>


  <div className="flex justify-end ">
   
  </div>
  {selected === 'sendEmail' && 
  ( <div className="mb-10"> <h2 className="text-white text-lg mb-2 ">Email Job:</h2> 
  <p className="text-gray-300 max-w-md">
     This job will send an email to the specified recipient with the provided subject and body content. </p> </div> )}
    
{selected==='Activity' &&(
     <div  className="mb-10" >  

        <h2 className="text-gray-300 max-w-md">
            This Job will send the activiy summary of the application 
        </h2>

        </div>
)}
{selected==='DeleteJobs' &&(
     <div  className="mb-10">  

        <h2 className="text-gray-300 max-w-md">
            This Job will Delete the Old Jobs which are Either completed or Failed
        </h2>

        </div>
)}

{selected==='sendCode' &&(
     <div  className="mb-10">  

        <h2 className="text-gray-300 max-w-md">
            This Job will Send the Verification code to the given email
        </h2>

        </div>
)}


    </div>


    )

}