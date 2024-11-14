import React, { useEffect, useState } from 'react'
import UserNavBar from '../components/user/UserNavBar'
import UserSideBar from '../components/user/UserSideBar'
import { toast, Toaster } from 'sonner'
import Api from '../services/axios'


function Dashboard() {


    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [description,setDescription] = useState('')

    const reset = () =>{
        setTitle('')
        setAuthor('')
        setDescription('')
    }
    const addBook = async (e) =>{
        try {
        e.preventDefault()
            if(!title.trim() && !author.trim() && !description.trim()){
                return toast.error("Please fill all fields before submission")
            }
            if(!title.trim()){
                return toast.error("Title field can't be empty")
            }
            if(!author.trim()){
                return toast.error("Author name can't be empty")
            }
            if(!description.trim()){
                return toast.error("Description can't be empty")
            }
            const bookData = {
                title,
                author,
                description
            }

             reset()

            const response = await Api.post('/addbook',{bookData})
            if(response.data.existing){
                return toast.error("Book in same name already exists")
            }
            if(response.data.success){
                return toast.success("Book detials added successfully")
            }
        } catch (error) {
            console.error(error)
        }
    }
 



  return (
   <>
   <UserNavBar/>
   <UserSideBar/>
   <Toaster richColors position='bottom-right'/>
   <form className="mt-20 w-full max-w-lg mx-auto" >
    <div className="card font-montserrat text-sm mt-12 shadow-2xl bg-white p-6 rounded-lg">
        <div className="chat-header text-md font-semibold mb-4 text-yellow-900">ADD YOUR BOOK</div>

        <div className="flex flex-col mb-4">
            <label className="p-2 text-xs text-yellow-900" htmlFor="task name">Enter Title</label>
            <input 
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                className="focus:outline-none border text-xs p-2 h-10 rounded-md placeholder:text-xs" 
                placeholder="Book Name"
            />
        </div>

        <div className="flex flex-col text-xs mb-4">
            <label className="p-2 text-yellow-900" htmlFor="duedate">Add Author Name</label>
            <input 
              
                type="text" 
                value={author}
                onChange={(e)=>setAuthor(e.target.value)}
                 className="focus:outline-none border text-xs p-2 h-10 rounded-md placeholder:text-xs" 
                 placeholder="Author Name"
            />
        </div>

        <div className="flex flex-col mb-4">
            <label className="p-2 text-xs text-yellow-900" htmlFor="description">Add your description</label>
            <textarea 
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
                className="focus:outline-none border p-2 text-xs h-24 rounded-md resize-none placeholder:text-xs" 
                placeholder="Add your description here"
            />
        </div>

        <div className="flex justify-end">
            <button onClick={addBook} className="send-button bg-gradient-to-tr from-black to-yellow-900 hover:to-yellow-700 text-white py-2 px-4 rounded-md transition duration-500">
                Add Book
            </button>
        </div>
    </div>
</form>

   </>
  )
}

export default Dashboard