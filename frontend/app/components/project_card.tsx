// ...existing code...
"use client"

import { Plus } from "lucide-react"

interface CardComponents {
    title: string,
}

export default function ProjectCard({ title }: CardComponents) {
    return (
        <div className="w-full max-w-md sm:max-w-72 p-4 rounded-md h-48 flex flex-col gap-4 items-center justify-between shadow-xl bg-gray-300">
            <div className="w-full flex items-center justify-center ">
                <h2 className="font-poppins font-semibold text-center ">{title}</h2>
            </div>
        
    

            <button
                type="button"
                title="open-project"
                className="flex-1 w-full mb-2 flex items-center justify-center bg-black/50 hover:bg-black/60 rounded-md "
            >
                <Plus className="w-8 h-8 text-white/80" />
            </button>


        </div>
    )
}
// ...existing code...