import React, { useEffect, useState } from 'react'
import Api from '../services/axios'
import UserNavBar from '../components/user/UserNavBar'
import UserSideBar from '../components/user/UserSideBar'
import { toast, Toaster } from 'sonner'
import { useNavigate } from 'react-router-dom'

function Books() {

    const [books,setBooks] = useState([])
    const [refresh,setRefresh] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        const  getAllBooks = async ()=>{
            try {
                const response = await Api.get('/books')
                console.log(response.data.books)
                if(response.data.success){
                    setBooks(response.data.books)
                }
            } catch (error) {
                console.error(error)
            }
        } 
        getAllBooks()
        return ()=>{
            setRefresh(false)
        }
    },[refresh])

    const DeleteBook = async (bookId) =>{
        try {
            const response = await Api.post('/deleteBook',{bookId})
            if(response.data.success){
                toast.success('Book deleted')
                setRefresh(true)
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
  
    <div classNameName="custom-card font-montserrat ms-96 text-sm mt-14 border">
    <div className="max-w-[720px] mx-auto">
    
    <div className="block mt-16 mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px]">
       <a className='block w-full px-4 py-2 text-center text-yellow-900 transition-all '>
               Check up on your   <b>shared Books</b>.
           </a>
   </div>

   <div className="relative flex flex-col w-[860px] h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
       <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
           <div className="flex items-center justify-between ">
               <div>
                   <h3 className="text-lg font-semibold text-yellow-900">Books </h3>
                   <p className="text-yellow-900">Review Each Book </p>
               </div>
           <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
            
               <button
               onClick={()=>navigate('/dashboard')}
               className="flex select-none items-center gap-2 rounded bg-yellow-900 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-yellow-900/10 transition-all hover:shadow-lg hover:shadow-yellow-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
               type="button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 9.75l-3.75 3.75-1.5-1.5M20.25 6.75h-16.5A2.25 2.25 0 001.5 9v12.75A2.25 2.25 0 003.75 24h16.5A2.25 2.25 0 0022.5 21.75V9A2.25 2.25 0 0020.25 6.75zM20.25 3h-3a.75.75 0 010-1.5h3a.75.75 0 010 1.5z" />
</svg>

               Add Book
               </button>
           </div>
           </div>
       
       </div>
       <div className="p-0 ">
           <table className="w-full mt-4 text-left table-auto ">
           <thead>
               <tr>
               <th
                   className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                   <p
                   className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-yellow-900">
                    Title
                   </p>
               </th>
               <th
                   className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                   <p
                   className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-yellow-900">
                    Author
                   </p>
               </th>
            
               <th
                   className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                   <p
                   className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-yellow-900">
                   description
                 
                   </p>
               </th>
             
              
               <th
                   className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                   <p
                   className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-yellow-900">
                    Delete Book
                   </p>
               </th>
               </tr>
           </thead>
           <tbody>
           {
            books.length > 0 ? books.map((book)=>(
                <tr>
               <td className="p-4 border-b border-slate-200">
                   <div className="flex items-center gap-3">
                 
                   <div className="flex flex-col">
                       <p className="text-sm font-semibold text-black">
                       {book.title}
                       </p>
                      
                   </div>
                   </div>
               </td>

               <td className="p-4 border-b border-slate-200">
                   <div className="flex items-center gap-3">
                 
                   <div className="flex flex-col">
                       <p className="text-sm font-semibold text-black">
                       {book.author}
                       </p>
                      
                   </div>
                   </div>
               </td>
              
               
               <td className="p-4 border-b border-slate-200">
                   <p className="text-sm text-black">
                  {book.description.substring(0,10)}...
                   </p>
               </td>
             
               
               <td className="p-4 border-b border-slate-200">
                   <button
                   onClick={()=>DeleteBook(book._id)}
                   className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                   type="button">
                   <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
  <path d="M6 7h12v12.75A2.25 2.25 0 0115.75 22H8.25A2.25 2.25 0 016 19.75V7zm13.5-2.25V5H4.5v-.25A.75.75 0 015.25 4h13.5a.75.75 0 01.75.75zM9 2.25A.75.75 0 009.75 2h4.5a.75.75 0 01.75.75V3H9v-.75zM7.5 9.75a.75.75 0 011.5 0v8.25a.75.75 0 01-1.5 0V9.75zm7.5 0a.75.75 0 011.5 0v8.25a.75.75 0 01-1.5 0V9.75z" />
</svg>

                   </span>
                   </button>
               </td>
              
               </tr>
            )):(<></>)
           }
                    

           </tbody>
           </table>
       </div>
       </div>
    
</div>


    </div>

    </>
  )
}

export default Books