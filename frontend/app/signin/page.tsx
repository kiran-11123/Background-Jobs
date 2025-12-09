"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
const SERVER_NAME = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Signin(){

    const[email , setEmail] = useState('')
    const[password , setPassword]= useState('')
    const[message  , SetMessage] = useState('')
    const router = useRouter();

    async function SubmitForm(e:any){
        e.preventDefault();

        try{
          const response  = await axios.post(`${SERVER_NAME}/users/signin` , {
            email,
            password
          } ,{
            withCredentials : true
          })

          if(response.status===200){
             localStorage.setItem("token" , response.data.token);
               SetMessage(response.data.message);
               router.replace("/home")

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
                    SetMessage('error in login');
                }
            } else {
                SetMessage('error in login');
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
  <div className="w-full max-w-md sm:max-w-lg bg-gradient-to-tr from-white/10 to-white/5 hover:to-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
    
    <h1 className="text-center text-xl sm:text-2xl  font-extrabold text-blue-500 mb-10 ">
       Welcome Back
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

      <div className="flex flex-col">
        <label className="text-lg sm:text-xl font-semibold mb-2 text-gray-200">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-5 py-3 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all backdrop-blur-sm shadow-inner"
        />
      </div>

      <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg sm:text-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300">
        Login
      </button>
    </form>

    <div className="mt-6 flex flex-col items-center space-y-3 text-center">
      <p className="text-gray-300 text-sm sm:text-base">
        Don’t have an account? {' '}
        <Link href="/signup" className="text-blue-400 hover:text-blue-300 hover:underline transition">
          Sign up
        </Link>
      </p>
      <p className="text-gray-300 text-sm sm:text-base px-4 py-2 rounded-lg hover:bg-white/10 transition">
        <Link href="/forgetpassword" className="text-blue-400 hover:text-blue-300 hover:underline transition">
          Forgot password?
        </Link>
      </p>
    </div>

    {message && (
      <p className="text-center font-bold text-red-400 mt-6 animate-pulse">{message}</p>
    )}
  </div>
</div>


    )
}