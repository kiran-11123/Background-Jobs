"use client"

import { useEffect, useState } from "react"
import AuthGuard from "../components/AuthGuard"
import ProjectCard from "../components/cards/project_card"
import { Menu , X } from "lucide-react"
import { useRouter } from "next/navigation"
import CreateProjectForm from "../components/forms/create_project_form"
import axios from "axios"
const SERVER_NAME = process.env.NEXT_PUBLIC_SERVER_URL;

interface Components {
   _id:string,
    title: string,
      onProjectCreated: (project: any) => void;
         onDelete?: (id: string) => void;
          onClick?: () => void; // Add this


}

interface Project {
  _id: string;
  title: string;
  description: string;
}


export default function Home(){

    const[isOpen , setIsOpen] = useState(false);
    const[model , setOpenModel] = useState(false);
const [data, setData] = useState<Project[]>([]);
    const router = useRouter();

    function logout(){
        
        localStorage.removeItem("token");
        router.replace("/");

    }

    function sendToJobsPage(projectId: string , title?: string){ 
        router.push(`/projects/${projectId}/jobs`);
    }


    useEffect(()=>{

      async function getProjects() {

        try{

          const response = await axios.get(`${SERVER_NAME}/project/get_projects` , {
            withCredentials : true
          })
          console.log("Projects Response :" , response.data.projects);

          if(response.status === 200){
               setData(response.data.projects);
          }
          else{
            setData([]);
          }

        }
        catch(er){
            setData([]);

        }
        
      }

      getProjects();



    },[]);

   const handleProjectCreated = (newProject: Project) => {
  setData(prevData => [...prevData  ,newProject]); // ✅ now type-safe
  setOpenModel(false);
}

  async function handleDelete(id: string) {

    try{
      
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/project/delete_project/${id}` , {
            withCredentials : true
        })

        if(response.status === 200 ) {
            console.log("Project deleted successfully");
            data && setData(prevData => prevData.filter(project => project._id !== id));

        }
          
    }
    catch(er){
        console.error("Error deleting project:", er);
    }



   }

      
    return(

        <AuthGuard>
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
                        Projects
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
                        Create
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
                      " onClick={logout}>
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


               <CreateProjectForm isOpen ={model} onClose={()=>setOpenModel(false)} onProjectCreated={handleProjectCreated}  /> 

          
                

      

            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 justify-center items-center md:grid-cols-4 gap-6 mt-5">

       
  {data && data.length > 0 ? (
    data.map((project:Project) => (
      <ProjectCard key={project._id} id={project._id} title={project.title} onDelete={handleDelete}  onClick={() => router.push(`/jobs/${project._id}`)} />
    ))
  ) : (
    <p className="text-black font-roboto text-xl text-center col-span-full">No projects found</p>
  )}
</div>
               
         </div>

         </AuthGuard>
    )
}