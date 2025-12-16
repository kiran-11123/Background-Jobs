"use client"
import { JobsCard } from "@/app/components/cards/jobs_card"
import {use, useEffect, useState } from "react"
import axios from "axios"
import { usePathname, useRouter } from "next/navigation"
import {X,Menu} from 'lucide-react'
import JobsPageForm from "@/app/components/forms/jobs_form"

interface Props {
  params: { id: string };
}

interface JobsCardProps {
    queueId:string,
    _id: string,
    projectId:string,
    name: string,
    status:string,
    attempts:number,
    failedReason:string
    onDelete?: (id: string , queueId:string) => void;
}

export default function JobsPage() {

    const[data , SetJobs] = useState<JobsCardProps[]>([]);
     const pathname = usePathname(); // e.g., "/jobs_page/123"
const parts = pathname.split("/");
const queueId = parts[2]; 
    const router = useRouter();
    const[model , setOpenModel] = useState(false);
    const[isOpen , setIsOpen] = useState(false);


    
useEffect(()=>{
  
    async function GetJobs() {
        
    try{

        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/jobs/get_allJobs`,{
            params:{ queueId : queueId },
            withCredentials : true
        })

        if(response.status==200){
           
            SetJobs(response.data.jobs);
        }
        else{
            SetJobs([]);
        }

    }
    catch(er){
        SetJobs([]);

    }
}

 GetJobs();

},[])

function logout(){
    //logout logic
    router.replace("/");

}

function AddNewJobs(job:JobsCardProps){
     SetJobs((prev) => [...prev, job]);
}

async function handleDelete(id:string ,queueId:string){

    try{
       
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/jobs/delete_job`,{
            params: { jobId: id , queueId: queueId },
            withCredentials : true
        });

        if(response.status === 200){
            SetJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
        }
        else{
            console.log("Error in deleting the job");
        }
    }
    catch(er){
        console.log("Error in deleting the job" , er);
         
    }
     
}

function onClose(){
    setOpenModel(false);
}
    return (
        <div className="  flex  flex-col justify-between w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#e8e5e5] via-[#a3a3a3] to-[#e5e5e5] ">
        <div className="flex justify-between items-center mt-2 z-50  w-full bg-black text-white rounded-md px-6 py-4 font-bold shadow-xl ">
            <div className="px-4 py-2 rounded-lg 
                                    font-roboto
                                    text-lg
                       
                      
                        focus:ring-2 focus:ring-blue-400
                        hover:scale-105
                           border border-white/20 
                         bg-white/5 
                         hover:bg-white/10 
                        hover:border-white/40
                        transition-all duration-300 
                        shadow-sm hover:shadow-lg">
                        Jobs
                      </div>

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
                        "
                        onClick={() => setOpenModel(true)}
                        >
                        Create Jobs
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
                      " onClick={logout} >
                        Logout
                      </button>
                
                    </div>
                    <div className='sm:hidden flex items-center'>
                        
                        <button onClick={()=>setIsOpen(!isOpen)} className='text-white focus:outline-none'>{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
                       
                    </div>

                     
                


          </div>

           {isOpen && (
                                <div className="sm:hidden text-white w-full max-w-xl  px-6 mt-2 flex flex-col   gap-2 bg-[#0f0c29] rounded-xl shadow-lg text-center py-4">
                                    <button   className=" px-3 py-2 rounded-lg 
                        border border-white/20 
                        font-roboto
                        bg-white/5 
                        hover:bg-white/10 
                        hover:border-white/40
                        hover:scale-105
                        transition-all duration-300
                        shadow-sm hover:shadow-md "   onClick={()=>setOpenModel(true)} >
                                        Create
                                    </button>
                       
                                    <button  className="px-3 py-2 rounded-lg 
                                    font-roboto
                        bg-blue-600 
                        hover:bg-blue-500 
                        focus:ring-2 focus:ring-blue-400
                        hover:scale-105
                        transition-all duration-300 
                        shadow-sm hover:shadow-lg" onClick={logout}>
                                        Logout
                                    </button>
                                </div>
             )}
        
            {model && <JobsPageForm  queueId= {queueId} isOpen={model} onClose={onClose}  AddNewJobs={AddNewJobs}/>}


      
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 justify-center items-center md:grid-cols-4 gap-6 mt-5">
                
                    
            {data && data.length > 0 ? (
              data.map((jobs: JobsCardProps) => (
                <JobsCard
                  key={jobs._id}
                  queueId={jobs.queueId}
                  _id={jobs._id}
                  projectId={jobs.projectId}
                  name={jobs.name}
                  status={jobs.status}
                  attempts={jobs.attempts}
                  failedReason={jobs.failedReason   }
                   onDelete={handleDelete}
                    
                />
              ))
            ) : (
              <p className="text-black font-roboto text-xl text-center col-span-full">
                No Jobs found for the Queue
              </p>
            )}
          </div>
          </div>

    )


}
