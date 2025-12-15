"use client"

const SERVER_NAME = process.env.NEXT_PUBLIC_SERVER_URL;
import { useState } from "react";
import axios from "axios";


interface ApiKeyFormProps {
   queueId?: string;
   isOpen: boolean;
   onClose: () => void;
}


export default function ApiKeyForm({isOpen , onClose}:ApiKeyFormProps){

    return(
        <div>
            Hi this is from API key form
        </div>
    )



}