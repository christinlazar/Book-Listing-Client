
import React, { useEffect, useState } from 'react'
import LoginImage from '../assets/Productivity Planner.jpeg'
import { toast, Toaster } from 'sonner'
import Api from '../services/axios'
import {useDispatch} from 'react-redux'
import { setUserCredentials } from '../store/authSlice/AuthSlice'
import { useNavigate } from 'react-router-dom'
function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('') 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(()=>{

    },[])
    
  
    const loginSubmit = async (e)=>{
        try {
            e.preventDefault()
            const emailValidatingPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if(!emailValidatingPattern.test(email) && !password.trim()){
              return toast.error("Please fill all fields")
          }
          if( !emailValidatingPattern.test(email)){
              return toast.error("Email format is not correct,please enter a valid email")
          }
          if(!password.trim()){
              return toast.error("Can't include space")
          }
            const formData = {email,password}
            const response = await Api.post('/login',{formData})
            console.log("res",response)
            if(response.data.registered == false ){
                return toast.error("No user can be found,please register to get in to our website")
            }
            if(response.data.password == false){
                return toast.error("password in incorrect,please try again")
            }
            if(response.data.success){
              dispatch(setUserCredentials(response.data.accessToken))
              toast.success("Login successfull")
              setTimeout(()=>{
                navigate('/dashboard')
              },2000)

            }
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div className="flex h-screen bg-gray-200">
        <Toaster richColors position='bottom-right'/>
    <div className="m-auto bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full">
      <div className="flex flex-col md:flex-row">
        {/* Left side - Image and text */}
        <div className="bg-white text-white p-8 md:w-1/2 flex flex-col justify-center items-start">
          <p className="text-xl font-montserrat mb-2 ">SIGN IN</p>
          {/* <p className='text-xl font-bold'>MAGIC</p> */}
          {/* <p className="text-4xl font-extrabold">FOR FREE</p> */}
          <img
            src={LoginImage}
            alt="Person listening to music"
            className="mt-8 rounded-lg shadow-lg"
          />
        </div>

        {/* Right side - Sign up form */}
        <div className="pt-28 md:w-1/2">
          <h2 className="text-2xl font-serif text-start  text-yellow-950">Sign IN</h2>
          <form onSubmit={loginSubmit}  className="mt-10">
            <div className='pt-2 flex flex-col'>
              <label className='font-serif text-sm'   htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                  className='border text-xs border-slate-300 rounded-md mt-2 h-8 me-10 focus:outline-none ps-2'
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
          
              />
            </div>
            <div className='pt-2 flex flex-col'>
              <label className='font-serif text-sm' htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
               className='border text-xs border-slate-300 rounded-md mt-2 h-8 me-10 focus:outline-none ps-2'
               value={password}
               onChange={(e)=>setPassword(e.target.value)}
          
              />
            </div>

             
               <button className='h-10 rounded-full ms-44 w-20 mt-10  bg-yellow-950 text-white text-sm font-serif' type='submit'>Sign in</button>
          
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
           Don't have an account?{" "}
            <a href="/register" className="font-serif text-yellow-950 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login