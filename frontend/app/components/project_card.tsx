// ...existing code...
"use client"

import { Plus } from "lucide-react"

interface CardComponents {
    title: string,
}

export default function ProjectCard({ title }: CardComponents) {
    return (
        <div className="w-full max-w-md sm:max-w-72 p-4 rounded-sm h-48 flex flex-col gap-4 items-center justify-between shadow-xl bg-black/85 text-white transition-all duration-300 hover:scale-105  
                         hover:shadow-md border border-white hover:border-white ">
            <div className="w-full flex items-center justify-center ">
                <h2 className="font-poppins font-semibold text-center ">{title}</h2>
            </div>
        
    

            <button
                type="button"
                title="open-project"
                className="flex-1 cursor-pointer w-full mb-2 flex items-center justify-center bg-white/90   rounded-md "
            >
                <Plus className="w-8 h-8 text-black" />
            </button>


        </div>
    )
}
// ...existing code...