import React, { useState } from 'react'
import RegisterImage from '../assets/A Journal for Busy People_ My Life in Chapters.jpeg'
import { Toaster,toast } from 'sonner'
import Api from '../services/axios'
import { useNavigate } from 'react-router-dom'
function Register() {

    const navigate = useNavigate()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const submitFormData = async (e) =>{
        try {
            e.preventDefault()
            const nameValidatingPattern = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/
            const emailValidatingPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if(!nameValidatingPattern.test(name) && !emailValidatingPattern.test(email) && !password.trim() && !confirmPassword.trim()){
                return toast.error("Please fill all fields")
            }
            if(!nameValidatingPattern.test(name)){
                return toast.error("Name cant include number or simply space,please enter a valid name")
            }
            if( !emailValidatingPattern.test(email)){
                return toast.error("Email format is not correct,please enter a valid email")
            }
            if(password.length < 8 ){
                return toast.error("password must have characters")
            }
            if(confirmPassword.length < 8 ){
                return toast.error("confirm password must have characters")
            }
            if(password != confirmPassword){
                return toast.error("Password does'nt matches")
            }
            const formData = {
                name,email,password,confirmPassword
            }

            const response = await Api.post('/register',{formData})
            if(response.data.success){
                 toast.success("Registration completed,you can login now")
                setTimeout(()=>{
                    navigate('/login')
                },2000)
            }else if(response.data.success == false){
                return toast.error("User Registration failed, user already exists")
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
            <p className="text-xl font-montserrat mb-2 ">SIGN UP</p>
            {/* <p className='text-xl font-bold'>MAGIC</p> */}
            {/* <p className="text-4xl font-extrabold">FOR FREE</p> */}
            <img
              src={RegisterImage}
              alt="Person listening to music"
              className="mt-8 rounded-lg shadow-lg"
            />
          </div>
          <div className="pt-28 md:w-1/2">
            <h2 className="text-2xl font-serif text-start  text-yellow-950">Sign up</h2>
            <form  className="mt-6" onSubmit={submitFormData}>
                <div className="pt-2 flex flex-col">
                  <label className='font-serif text-sm' htmlFor="firstName"> Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    className='border border-slate-300 text-xs font-serif rounded-md mt-2 h-8 me-10  focus:outline-none ps-2'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
               
                  />
                </div>
              <div className='pt-2 flex flex-col'>
                <label className='font-serif text-sm'   htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                    className='border border-slate-300 text-xs font-montserrat rounded-md mt-2 h-8 me-10 focus:outline-none ps-2'
          
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
                 className='border border-slate-300 text-xs rounded-md mt-2 h-8 me-10 focus:outline-none ps-2'
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
            
                />
              </div>
              <div className='pt-2 flex flex-col'>
                <label className='font-serif text-sm' htmlFor="reEnterPassword">Re-enter password</label>
                <input
                  id="reEnterPassword"
                  name="reEnterPassword"
                  type="password"
               className='border border-slate-300 text-xs rounded-md mt-2 h-8 me-10 focus:outline-none ps-2'
               value={confirmPassword}
               onChange={(e)=>setConfirmPassword(e.target.value)}
           
                />
              </div>
              <div className='pt-2 flex flex-col'>
               
               <button className='h-10 rounded-full ms-44 w-20  bg-yellow-950 text-white text-sm font-serif' type='submit'>Sign up</button>
              </div>
              <div className="flex items-center space-x-2">
            
              </div>
            
            </form>
            <p className="mt-4 mb-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="font-serif text-yellow-950 hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register