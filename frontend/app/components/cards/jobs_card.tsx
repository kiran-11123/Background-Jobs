"use client";



import { useState } from "react";
import { Trash} from 'lucide-react'
import axios from "axios";


interface JobsCardProps {
    
  queueId: string;
  _id: string;
  projectId: string;
  name: string;
  status: string;
  attempts: number;
  failedReason?: string;
   onDelete?: (id: string , queueId:string) => void;
   type: string;
}

export function JobsCard({
  queueId,
  _id,
  name,
  status,
  attempts,
  failedReason,
  onDelete,
  type
}: JobsCardProps) {
  const statusColor =
    status === "completed"
      ? "bg-emerald-500/15 text-emerald-400"
      : status === "failed"
      ? "bg-red-500/15 text-red-400"
      : "bg-yellow-500/15 text-yellow-400";


    

  return (
    <div
      className="
        group relative w-full max-w-sm h-52
        rounded-2xl p-5
       bg-white/10
        border border-white/10
        shadow-lg backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-2xl hover:border-white/20 text-black
      "
    >
      <div className="flex h-full flex-col justify-between">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="font-roboto font-semibold text-lg  truncate">
            {name}
          </h1>
          <p className="text-xs">Type: {type}</p>
        </div>

        {/* Status Row */}
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor}`}
          >
            {status.toUpperCase()}
          </span>

          <span className="text-sm">
            Attempts:{" "}
            <span className="font-semibold ">{attempts}</span>
          </span>

         
        </div>
       
       <div className="flex justify-end">
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
       onClick={(e) => {
            e.stopPropagation(); // prevent triggering onClick for the card
           onDelete && onDelete(_id , queueId);
          }}
      >
        <Trash className="h-5 w-5" />
      </button>

       </div>
       

        {/* Failed Reason */}
        {failedReason && (
          <div className="rounded-lg bg-red-500/10 p-2 text-xs text-red-300 line-clamp-2">
            {failedReason}
          </div>
        )}
      </div>
    </div>
  );
}
