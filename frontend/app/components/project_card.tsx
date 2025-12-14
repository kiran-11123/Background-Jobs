"use client"

import axios from "axios";
import { Plus, Trash } from "lucide-react";

interface CardComponents {
  id: string;
  title: string;
  onDelete?: (id: string) => void; // optional callback for deletion
}

export default function ProjectCard({ id, title, onDelete }: CardComponents) {

   async function handleDelete(id: string) {

    try{
      
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/project/delete/${id}` , {
            withCredentials : true
        })

        if(response.status === 200 ) {
            console.log("Project deleted successfully");

        }
          
    }
    catch(er){
        console.error("Error deleting project:", er);
    }



   }



  return (
    <div
      className="
        group relative w-full max-w-sm h-52
        rounded-2xl p-5
        bg-gradient-to-br from-neutral-900/80 via-neutral-800/60 to-neutral-900/90
        border border-white/10
        shadow-lg backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-2xl hover:border-white/20
      "
    >
      {/* Title */}
      <div className="flex-1 flex items-center justify-center text-center">
        <h2 className="font-poppins text-lg font-semibold tracking-wide text-white/90">
          {title}
        </h2>
      </div>

      {/* Open Project Button */}
      <button
        type="button"
        title="Open Project"
        className="
          absolute bottom-4 right-16
          h-11 w-11 rounded-full
          flex items-center justify-center
          bg-white text-black
          shadow-md
          transition-all duration-300
          group-hover:scale-110 group-hover:rotate-90
        "
      >
        <Plus className="h-5 w-5" />
      </button>

      {/* Delete Button */}
      <button
        type="button"
        title="Delete Project"
        className="
          absolute bottom-4 right-4
          h-11 w-11 rounded-full
          flex items-center justify-center
          bg-red-500 text-white
          shadow-md
          transition-all duration-300
          hover:scale-110 hover:bg-red-700
        "
        onClick={() => handleDelete(id)}
      >
        <Trash className="h-5 w-5" />
      </button>
    </div>
  );
}
