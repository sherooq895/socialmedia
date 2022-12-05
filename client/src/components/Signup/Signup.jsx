import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'

function Signup() {

    let Navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [file, setfile] = useState()
    const [popup, setpopup] = useState(false)

    const [registerData, setRegisterData] = useState({
        fname: '',
        lname: '',
        email: '',
        number: '',
        password: '',
        cpassword: '',
        profilepicture: '',

    })

    const [otp,setotp]=useState({
        otp:'',
        id:''
    })

     const otphandlechange=(e)=>{
        e.preventDefault()
        const{name,value}=e.target
        setotp({
            ...otp,
            [name]:value
        })
    }

  


    const handleChange = (e) => {
        console.log('e.target.value');
        console.log(e.target.value);
        e.preventDefault()
        const { name, value } = e.target
        setRegisterData({
            ...registerData,
            [name]: value
        })
        console.log(registerData);
        console.log('registerData');


    }

    const fileupload = (event) => {
        setfile(URL.createObjectURL(event.target.files[0]))
        setRegisterData({
            ...registerData,
            profilepicture: event.target.files[0]
        })
    }



    const submit = (e) => {
     

        const formdata = new FormData();
        for (let key in registerData) {
            formdata.append(key, registerData[key])
        }
       

        axios.post("http://localhost:4000/app/signup", formdata).then((response) => {
          
            if (response.data.user) {
                setotp({id:response.data.id})
                setpopup(!popup)
              
               
            } else if (response.data.emailerror) {
                Navigate('/signup')
                alert(response.data.emailerror)

            }

        }


        )

    }

    const verifyotp=(e)=>{
        e.preventDefault()
        const otpp={
           otpp: otp.otp,
           id:otp.id

        }
        axios.post('http://localhost:4000/app/verifyotp',{otpp}).then((response)=>{
            
            setpopup(!popup)
            if(response.data.error){
                alert(response.data.error)
                Navigate('/signup')

            }else{
                alert('Email Verification Successfully')
                Navigate('/')
                

            }
        })

        
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
                    <form className="mt-6 " onSubmit={handleSubmit(submit)} >
                        <div className='flex justify-center'>
                            <div className="mb-2">
                                <label
                                    htmlFor="fname"
                                    className="block text-sm font-semibold text-white"
                                >
                                    First Name
                                </label>
                                <input type="text" {...register("fname", {required: true})} value={registerData?.fname}  onChange={handleChange} className="block w-full px-4 py-2 mt-3 bg-white border rounded-md focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                {errors.fname && <p className='text-red-500 font-[8px] mb-3 pl-3'>Please check your name</p>}
                            </div>
                            <div className="mb-2 ml-8">
                                <label for="lname" className="block text-sm font-semibold text-white">
                                    Last Name
                                </label>
                                <input type="text"  {...register("lname", {required: true, pattern: /^[a-zA-Z]+$/, maxLength: 100})} value={registerData.lname} onChange={handleChange}
                                    className="block w-full px-4 py-2 mt-3 bg-white border rounded-md focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                {errors.lname && <p className='text-red-500 font-[8px] mb-3 pl-3'>Please check your name</p>}

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
                                <input  type="email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} value={registerData.email} onChange={handleChange}
                                    className="block w-full px-4 py-2 mt-3 bg-white border rounded-md focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                            </div>
                            <div className="mb-2 ml-8">
                                <label
                                    for="number"
                                    className="block text-sm font-semibold text-white"
                                >
                                    Phone Number
                                </label>
                                <input type="tel" {...register("number", {required: true, pattern:/^[0-9+-]+$/, minLength: 6, maxLength: 12})}   value={registerData.number} 
                                    onChange={handleChange} className="block w-full px-4 py-2 mt-3 bg-white border rounded-md focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                {errors.number && <p className='text-red-500 font-[8px] mb-3 pl-3'>Please check your number</p>}
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
                                    value={registerData.password}
                                    onChange={handleChange}

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
                                    value={registerData.cpassword}
                                    onChange={handleChange}

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
            {
                popup ?
                    <>
                        <div className='w-full h-fulll bg-[#666666d5] left-0 right-0 z-10 top-0 bottom-0 fixed'></div>
                        <div className='w-[50%] h-64 bg-slate-100 fixed left-[25%] z-20 top-[30%] p-5'>
                            <div className=''>
                                <div className='flex justify-center'>
                                    <div className='text-black text-2xl'>OTP VERIFICATION</div>
                                </div>
                                <form  onSubmit={verifyotp}>
                                    <div className="mb-2">
                                        <label
                                            for="description"
                                            className="block text-sm font-semibold text-black"
                                        >
                                            Enter the valued OTP from your EMAIL
                                        </label>
                                        <input
                                            type="text"
                                            name='otp'
                                            value={setotp.otp}
                                            onChange={otphandlechange}

                                            className="block w-full px-4 py-2 mt-3 bg-white border rounded-md focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                    <div>
                                        <div className="mt-6 flex justify-center">
                                            <button className=" px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  bg-neutral-800 rounded-md hover:bg-black image.png focus:outline-none">
                                                Submit
                                            </button>
                                        </div>
                                    </div>


                                </form>



                            </div>

                        </div>
                    </>
                    : null

            }

        </div>
    )
}

export default Signup