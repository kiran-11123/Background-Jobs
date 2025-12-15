"use client";
import axios from "axios";
import { get } from "http";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {X,Menu} from 'lucide-react'
import CreateQueueForm from "../../components/forms/createQueueform";
import ApiKeyForm from "@/app/components/forms/api_key_form";
interface Props {
  params: Promise<{ id: string }>;
}

interface queueData{
   id:string,
   name:string
}

export default function JobsPage({ params }: Props) {
  const router  = useRouter();
  const { id } = use(params); 
  const [data, setQueues] =  useState<queueData[]>([]);
  
  const[model , setOpenModel] = useState(false);
  const[APIModel , setOpenAPIModel] = useState(false);
  const[isOpen , setIsOpen] = useState(false);

  useEffect(() => {

    async function fetchQueues() {
      
      try{

      
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/queue/get_all_queues`,{
        params: { projectId: id },
    withCredentials: true,
      } );

      if(response.status === 200){
          console.log("Queues for the project :" , response.data.queues);
          setQueues(response.data.queues);

      }
      else{
          setQueues([]);
      }
    }

  

  catch(er){
      console.log("Error in fetching queues" , er);
  }

}
  fetchQueues();

  },[id])

  function logout(){
    router.replace("/");
  }

  function handleProjectCreated(queue:any){
      setQueues((prevQueues) => [...prevQueues, queue]);
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
                        Queues
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
                        onClick={()=>setOpenModel(true)}
                        >
                        Create Queue
                      </button>
                      

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
                        onClick={()=>setOpenAPIModel(true)}
                        >
                        API KEY
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
                         <button   className=" px-3 py-2 rounded-lg 
                        border border-white/20 
                        font-roboto
                        bg-white/5 
                        hover:bg-white/10 
                        hover:border-white/40
                        hover:scale-105
                        transition-all duration-300
                        shadow-sm hover:shadow-md "   onClick={()=>setOpenAPIModel(true)} >
                                        API KEY
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

             <CreateQueueForm projectId={id}
 isOpen ={model} onClose={()=>setOpenModel(false)} onQueueCreated={handleProjectCreated} />

 {APIModel && (<ApiKeyForm
  projectId={id} isOpen ={APIModel} onClose={()=>setOpenAPIModel(false)} />)}

 



          
        <div className="grid grid-cols-1 sm:grid-cols-3 p-4 justify-center items-center md:grid-cols-4 gap-6 mt-5">
      
             
      
                     
               </div>
  
     
     </div>
  )
}
