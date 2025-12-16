"use client"
import { JobsCard } from "@/app/components/cards/jobs_card"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


interface JobsCardProps {
    queueId:string,
    _id: string,
    projectId:string,
    name: string,
    status:string,
    attempts:number,
    failedReason:string
}

export default function JobsPage() {

    const[data , SetJobs] = useState([]);
    const router = useRouter();


    
useEffect(()=>{
  
    async function GetJobs() {
        
    try{

        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/jobs/get_allJobs`,{
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
                


          </div>

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
                    
                />
              ))
            ) : (
              <p className="text-black font-roboto text-xl text-center col-span-full">
                No Queues found for the project
              </p>
            )}
          </div>
          </div>

    )


}
