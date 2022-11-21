import React,{useState} from 'react'
import './Adminnavbar.css'
import { BiBell,BiConversation,BiCircle } from "react-icons/bi";
import {Navigate,useNavigate} from 'react-router-dom'

function Adminnavbar() {


  
  let Navigate=useNavigate()

  const[popup,setPopup]=useState(false)

  return (
    <div>
        <nav className=" bg-neutral-800 ">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">

                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <p className='text-4xl  text-white'> Admin PostX</p>


                    </div>
                    <div className="  absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                       
                        
                        <div className='pr-3 flex'>
                            <div> 
                                <button>
                            <p className='text-yellow-300 text-4xl'><BiCircle/></p>
                        
                            </button>
                            </div>
                            <div onClick={()=>{setPopup(!popup)}}>
                              
                            <p className='text-white mt-5'>Admin</p>
                            </div>
                       
                        </div> 
                           

                     
                    </div>
                </div>
            </div>

            <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>

                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>

                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>

                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
                </div>
            </div>
        </nav>


       { popup?
       <div className='p-8  bg-neutral-300 w-[10%] absolute right-[4rem] top-[4rem] z-50'>
        <ul>
            <li><button>Profile</button></li>
            <br />
            
            <li><button>Setting</button></li>
            <br />

            <li><button >LogOut</button></li>

        </ul>
        </div> :null
        }
        </div>
    
  )
}

export default Adminnavbar
