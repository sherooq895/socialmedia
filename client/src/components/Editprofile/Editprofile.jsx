import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";


function Editprofile() {
  let  Navigate=useNavigate()
  const token=localStorage.getItem('token')

    const userid = localStorage.getItem('userid')
    const [register,setregister]=useState({
        discription:'',
        profilepicture:''
    })

    const [update,setupdate]=useState()
    const fileupload = (event) => {
        setregister({
            ...register,
            profilepicture: event.target.files[0]
        })
    }

    useEffect(
        ()=>{
            axios.post('http://localhost:4000/app/userdata',{userid}).then((response)=>{
                setregister(response.data.userdata)
            })
        },[update]

    )

    const handlesubmit = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setregister({
            ...register,
            [name]: value

        })
    }

    const formsubmit=(e)=>{
        e.preventDefault()
        const formdata = new FormData();
        for (let key in register) {
            formdata.append(key, register[key])
        }

        axios.post('http://localhost:4000/app/editprofile',formdata,{
            headers: { token: `Bearer ${token}` },
          }).then((response)=>{
            setupdate(response)

            if(response.data.error){
                alert('email is already exist,please try anotherone')
            }else{
                alert('profile updated')
                Navigate('/profile')
            }
        })
    }
   





  return (
    <div className='bg-white h-screen '>
        <div className='flex align-middle justify-center'>
            <div>
            <div className="w-full  p-6 m-auto bg-[#ccc] rounded-md shadow-md lg:max-w-xl pb-6 mt-4">
                    <h1 className="text-3xl font-semibold text-center text-[#153f7c]">
                        Edit Profile
                    </h1>
                    <form className="mt-6 " onSubmit={formsubmit}>
                        <div className='flex justify-center'>
                            <div className="mb-2">
                                <label
                                    for="email"
                                    className="block text-sm font-semibold text-[#153f7c]"
                                >
                                   First Name
                                </label>
                                <input
                                    type="text"
                                    name='fname'
                                    value={register?.fname}
                                    onChange={handlesubmit}

                                    className="block w-full px-4 py-2 mt-3 bg-white border rounded-md focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2 ml-8">
                                <label
                                    for="lname"
                                    className="block text-sm font-semibold text-[#153f7c]"
                                >
                                   Last Name
                                </label>
                                <input
                                    type="text"
                                    name='lname'
                                    value={register?.lname}
                                    onChange={handlesubmit}

                                    className="block w-full px-4 py-2 mt-3 bg-white border rounded-md focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                       
                        <div className='flex justify-center'>
                            <div className="mb-2">
                                <label
                                    for="email"
                                    className="block text-sm font-semibold text-[#153f7c]"
                                >
                                   Email
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    value={register?.email}
                                    onChange={handlesubmit}

                                    className="block w-full px-4 py-2 mt-3 bg-white border rounded-md focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2 ml-8">
                                <label
                                    for="number"
                                    className="block text-sm font-semibold text-[#153f7c]"
                                >
                                  Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name='number'
                                    value={register?.number}
                                    onChange={handlesubmit}

                                    className="block w-full px-4 py-2 mt-3 bg-white border rounded-md focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <div className="mb-2">
                                <label
                                    for="discription"
                                    className="block text-sm font-semibold text-[#153f7c]"
                                >
                                Description
                                </label>
                                <input
                                    type="text"
                                    name='discription'
                                    value={register?.discription}
                                    onChange={handlesubmit}

                                    className="block w-full px-4 py-2 mt-3 bg-white border rounded-md focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2 ml-8">
                                <label
                                    for="password"
                                    className="block text-sm font-semibold text-[#153f7c]"
                                >
                                  Password
                                </label>
                                <input
                                    type="password"
                                    name='password'
                                    value={register?.number}
                                    onChange={handlesubmit}

                                    className="block w-full px-4 py-2 mt-3 bg-white border rounded-md focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                       
                           
                        <div className='flex '>
                            <div>
                                
                            </div>
                        <label className='text-[#153f7c] ml-10'>Upload Your Profile Picture</label>
                        <div className='flex justify-center mt-4'>
                            
                                  <input 
                            type="file"
                            name='profilepicture'
                            // value={register?.profilepicture}
                            onChange={fileupload} 
                            />
                          </div>
                        </div>
                        

                        <div className="mt-6 flex justify-center">
                            <button className=" px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  bg-[#153f7c] rounded-md hover:bg-black image.png focus:outline-none">
                            Save
                            </button>
                        </div>
                    </form>


                </div>

            </div>
           

        </div>

    </div>
  )
}

export default Editprofile