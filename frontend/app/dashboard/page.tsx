"use client";

import { X, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState , useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const[isOpen , setIsOpen] = useState(false);

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
                           DashBoard
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
                           onClick={()=>router.push("/home")}
                          
                           >
                           Home
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
                         " onClick={()=>router.push("/")}>
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
                           shadow-sm hover:shadow-md "   onClick={()=>router.push('/home')} >
                                           Home
                                       </button>
                                       <button  className="px-3 py-2 rounded-lg 
                                       font-roboto
                           bg-blue-600 
                           hover:bg-blue-500 
                           focus:ring-2 focus:ring-blue-400
                           hover:scale-105
                           transition-all duration-300 
                           shadow-sm hover:shadow-lg" onClick={()=>router.push("/")}>
                                           Logout
                                       </button>
                                   </div>
                )}
   
   
                  
            </div>
   
  );
}
