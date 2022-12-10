import React,{useState} from 'react'
import './Adminnavbar.css'
import { BiBell,BiConversation,BiCircle } from "react-icons/bi";
import {Navigate,useNavigate} from 'react-router-dom'

function Adminnavbar() {


  
  let Navigate=useNavigate()

  const[popup,setPopup]=useState(false)

 
  const logout = (e) => {
    localStorage.removeItem('Atoken')
    Navigate('/adminlogin')
}

  return (
    <div>
        <nav className=" bg-[#153f7c]">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">

                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <p className='text-4xl  text-white'> PostX</p>


                    </div>
                    <div className="  absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                       
                        
                        <div className='pr-3 flex'>
                          
                            <div onClick={()=>{setPopup(!popup)}}>
                              
                            <p className='text-white mt-5'>Admin</p>
                            </div>
                       
                        </div> 
                           

                     
                    </div>
                </div>
            </div>

           
        </nav>


       { popup?
       <div className='p-8  bg-neutral-300 w-[10%] absolute right-[4rem] top-[4rem] z-50'>
        <ul>
           
            <li><button onClick={logout}>LogOut</button></li>

        </ul>
        </div> :null
        }
        </div>
    
  )
}

export default Adminnavbar
