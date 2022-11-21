import React,{useState} from 'react'
import './Signup.css'
import axios from 'axios'
import {Navigate,useNavigate } from "react-router-dom";

function Signup() {

    let Navigate=useNavigate()

    const[file,setfile]=useState()

    const [register,setregister]=useState({
       fname:'' ,
       lname:'',
        email:'' ,
        number:'',
        password:'',
        cpassword:'',
        profilepicture:'',

      })

      
    

      const handlesubmit=(e)=>{
        e.preventDefault()
        const{name,value}=e.target 
     setregister({
        ...register,
        [name]:value
     })
    
   
    }

    const fileupload = (event) => {
        setfile(URL.createObjectURL(event.target.files[0]))
        setregister({
            ...register,
            profilepicture: event.target.files[0]
        })
    }
    console.log('name')
    console.log(register)
    console.log('registerrrrrrrr')
            

   

    const submit=(e)=>{
        e.preventDefault()

        const formdata = new FormData();
        for (let key in register) {
            formdata.append(key, register[key])
        }
        console.log(register);
        console.log('formdata');

        axios.post("http://localhost:4000/app/signup",formdata).then((response)=>{


            if(response.data.user){
                console.log(response.data.user)
                Navigate('/')

            }else if(response.data.emailerror){
                console.log(response.data.emailerror)
                Navigate('/signup')
                alert(response.data.emailerror)

            }

        }
      

        )

    }


    return (
        <div className="pic min-h-screen pt-8">
            <div className='w-full  m-auto bg-neutral-800 rounded-md shadow-md lg:max-w-xl pb-10'>
                <h1 className='text-left text-white pt-8 pl-10 text-6xl text-bold font-bold'> PostX</h1>
                <h1 className='text-left text-gray-200  pl-10 text-m text-medium font-bold'> Create the Vibe</h1>
                <div className="w-full ml-40 p-6 m-auto bg-neutral-600 rounded-md shadow-md lg:max-w-xl pb-6">
                    <h1 className="text-3xl font-semibold text-center text-white">
                        Create your Account
                    </h1>
                    <form className="mt-6 " onSubmit={submit} >
                        <div className='flex justify-center'>
                            <div className="mb-2">
                                <label
                                    for="email"
                                    className="block text-sm font-semibold text-white"
                                >
                                   First Name
                                </label>
                                <input
                                    type="text"
                                    name='fname'
                                    value={register.fname}
                                    onChange={handlesubmit}

                                    className="block w-full px-4 py-2 mt-3 bg-white border rounded-md focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2 ml-8">
                                <label
                                    for="lname"
                                    className="block text-sm font-semibold text-white"
                                >
                                   Last Name
                                </label>
                                <input
                                    type="text"
                                    name='lname'
                                    value={register.lname}
                                    onChange={handlesubmit}

                                    className="block w-full px-4 py-2 mt-3 bg-white border rounded-md focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                       
                        <div className='flex justify-center'>
                            <div className="mb-2">
                                <label
                                    for="email"
                                    className="block text-sm font-semibold text-white"
                                >
                                   Email
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    value={register.email}
                                    onChange={handlesubmit}

                                    className="block w-full px-4 py-2 mt-3 bg-white border rounded-md focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2 ml-8">
                                <label
                                    for="number"
                                    className="block text-sm font-semibold text-white"
                                >
                                  Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name='number'
                                    value={register.number}
                                    onChange={handlesubmit}

                                    className="block w-full px-4 py-2 mt-3 bg-white border rounded-md focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <div className="mb-2">
                                <label
                                    for="password"
                                    className="block text-sm font-semibold text-white"
                                >
                                  Password
                                </label>
                                <input
                                    type="password"
                                    name='password'
                                    value={register.password}
                                    onChange={handlesubmit}

                                    className="block w-full px-4 py-2 mt-3 bg-white border rounded-md focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2 ml-8">
                                <label
                                    for="cpassword"
                                    className="block text-sm font-semibold text-white"
                                >
                               Conform Password
                                </label>
                                <input
                                    type="password"
                                    name='cpassword'
                                    value={register.cpassword}
                                    onChange={handlesubmit}

                                    className="block w-full px-4 py-2 mt-3 bg-white border rounded-md focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        <div className='flex '>
                            <div>
                                
                            </div>
                        <label className='text-white ml-10'>Upload Your Profile Picture</label>
                        <div className='flex justify-center mt-4'>
                            
                                  <input 
                            type="file"
                            name='profilepicture'
                            onChange={fileupload}
                            />
                          </div>
                        </div>
                        

                        <div className="mt-6 flex justify-center">
                            <button className=" px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  bg-neutral-800 rounded-md hover:bg-black image.png focus:outline-none">
                              SignUp
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    )
}

export default Signup