"use client"

import axios from "axios";
import { useState } from "react";

const SERVER_NAME = process.env.SERVER_NAME;

export default function ForgetPassword(){

    const [email , setEmail] = useState('');
    const [state , SetState] = useState(0);
    const[code,setCode] = useState('');
    const[password , setPassword]=useState('');
    const[message , SetMessage]=useState('');
    async function SubmitForm(e:any) {

        e.preventDefault();

        try{

            const response = await axios.post(`${SERVER_NAME}/users/resetPassword` , {
                email
            },{
                withCredentials: true
            })

            if(response.status===200){
                 SetMessage(response.data.message);
                 SetState(1);
                

            }
            else{
                SetMessage(response.data.message);
            }

            

        }
        catch(er){

            if (typeof er === "object" && er !== null && "response" in er) {
                const error = er as any;
                if (error.response && error.response.data && error.response.data.message) {
                    SetMessage(error.response.data.message);
                } else {
                    SetMessage('Error in Sending Code');
                }
            } else {
                SetMessage('Error in Sending Code');
            }

            
        }
        finally{

            setTimeout(()=>{

                 setEmail('');
            SetMessage('');

            },2000)

           

        }
        
    }
    
    async function SubmitCode(e:any) {
        e.preventDefault();

        try{

           

            const response = await axios.post( `${SERVER_NAME}/users/verify-code`,{
                email,
                code
            },{
                withCredentials:true
            })

            
            if(response.status===200){
                 SetMessage(response.data.message);
                 SetState(2);
                

            }
            else{
                SetMessage(response.data.message);
            }




        }
        catch(er){

              if (typeof er === "object" && er !== null && "response" in er) {
                const error = er as any;
                if (error.response && error.response.data && error.response.data.message) {
                    SetMessage(error.response.data.message);
                } else {
                    SetMessage('Error in verifying Code');
                }
            } else {
                SetMessage('Error in verifying  Code');
            }
            
        }
        finally{
            
            setTimeout(()=>{

                 setEmail('');
            setCode('');
            SetMessage('');

            },2000)
           

        }
        
    }

    async function ResetPassword(e:any) {

        e.preventDefault();

        try{

            const response = await axios.post(`${SERVER_NAME}/users/change-password`, {
                email,
                password
            },{
                withCredentials:true
            })

             if(response.status===200){
                 SetMessage(response.data.message);
                 SetState(0);
                

            }
            else{
                SetMessage(response.data.message);
            }

        }
        catch(er){

             if (typeof er === "object" && er !== null && "response" in er) {
                const error = er as any;
                if (error.response && error.response.data && error.response.data.message) {
                    SetMessage(error.response.data.message);
                } else {
                    SetMessage('Error in Sending Password');
                }
            } else {
                SetMessage('Error in Sending Password');
            }

        }
        finally{
          
            setTimeout(()=>{

                  setEmail('');
            setPassword('');
            SetMessage('');

            },2000)
          

        }
        
    }

    return(
         
         <div className="flex min-h-screen font-roboto items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
  {state===0 && <div className="w-full max-w-md sm:max-w-lg bg-gradient-to-tr from-white/10 to-white/5 hover:to-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
    
    <h1 className="text-center text-xl sm:text-2xl  font-extrabold text-blue-500 mb-10 ">
       Change Password
    </h1>

    <form className="space-y-6" onSubmit={SubmitForm}>
      <div className="flex flex-col">
        <label className="text-lg sm:text-xl font-semibold mb-2 text-gray-200">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-5 py-3 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all backdrop-blur-sm shadow-inner"
        />
      </div>

      

      <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg sm:text-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
        Send OTP
      </button>
    </form>

    <div>
        
    {message && (
      <p className="text-center font-bold text-red-400 mt-6 animate-pulse">{message}</p>
    )}
    </div>
    
    </div>   }


    {state===1 && (
         <div className="w-full max-w-md sm:max-w-lg bg-gradient-to-tr from-white/10 to-white/5 hover:to-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
    
    <h1 className="text-center text-xl sm:text-2xl  font-extrabold text-blue-500 mb-10 ">
       Change Password
    </h1>

    <form className="space-y-6" onSubmit={SubmitCode}>
      <div className="flex flex-col">
        <label className="text-lg sm:text-xl font-semibold mb-2 text-gray-200">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-5 py-3 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all backdrop-blur-sm shadow-inner"
        />
      </div>

       <div className="flex flex-col">
        <label className="text-lg sm:text-xl font-semibold mb-2 text-gray-200">Email</label>
        <input
          type="text"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter  OTP"
          className="w-full px-5 py-3 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all backdrop-blur-sm shadow-inner"
        />
      </div>


      

      <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg sm:text-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
        Submit 
      </button>
    </form>

    <div>
        
    {message && (
      <p className="text-center font-bold text-red-400 mt-6 animate-pulse">{message}</p>
    )}
        </div>
    
    </div>  
    )}

    {state===2 && (
            <div className="w-full max-w-md sm:max-w-lg bg-gradient-to-tr from-white/10 to-white/5 hover:to-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
    
    <h1 className="text-center text-xl sm:text-2xl  font-extrabold text-blue-500 mb-10 ">
       Reset Password
    </h1>

    <form className="space-y-6" onSubmit={ResetPassword}>
      <div className="flex flex-col">
        <label className="text-lg sm:text-xl font-semibold mb-2 text-gray-200">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-5 py-3 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all backdrop-blur-sm shadow-inner"
        />
      </div>

       <div className="flex flex-col">
        <label className="text-lg sm:text-xl font-semibold mb-2 text-gray-200">Email</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          className="w-full px-5 py-3 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all backdrop-blur-sm shadow-inner"
        />
      </div>


      

      <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg sm:text-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
        Reset 
      </button>
    </form>

    <div>
        
    {message && (
      <p className="text-center font-bold text-red-400 mt-6 animate-pulse">{message}</p>
    )}
    </div>
    
    </div> 
    )}

    </div>
    )
}