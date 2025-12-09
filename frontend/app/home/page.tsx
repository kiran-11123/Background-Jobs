"use client"

import { useState } from "react"
import AuthGuard from "../components/AuthGuard"

export default function Home(){
      
    return(

        <AuthGuard>
         <div>
            welcome to home
         </div>

         </AuthGuard>
    )
}