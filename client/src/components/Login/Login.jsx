

import React, { useState, useEffect } from 'react'
import './Login.css'
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";

function Login() {

    let Navigate = useNavigate()


    const [register, setregister] = useState({
        email: '',
        password: ''
    })

    const handlesubmit = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setregister({
            ...register,
            [name]: value

        })
        console.log(register)
        console.log('register')
    }

    useEffect(() => {
        console.log('tokenjasi');

        axios.get('http://localhost:4000/app/isauth', {

            headers: {
                token: `Bearer ${localStorage.getItem('token')}`
            }


        }).then((response) => {

            console.log(response);
            console.log('response');
            if (response.data.auth === false) {
                Navigate('/')
            } else {
                Navigate('/home')
            }

        })

    },[])

    const formsubmit = (e) => {
        e.preventDefault()

        const form = {
            email: register.email,
            password: register.password
        }
        try {
            axios.post("http://localhost:4000/app/login", form).then(response => {
            console.log(response);
            console.log('response');
            if (response.data.user) {
                localStorage.setItem('token', response.data.token)

                Navigate('/home')
            } else {

                console.log('ddddd');
                console.log(response.data.loginerror);
                alert('invalid email and password')

            }
        }
        )
        } catch (error) {
          console.log(error.message);  
        }
        


    }


    return (
        <div className="pic min-h-screen pt-8">
            <div className='w-full  m-auto bg-neutral-800 rounded-md shadow-md lg:max-w-xl pb-10'>
                <h1 className='text-left text-white pt-8 pl-10 text-6xl text-bold font-bold'> PostX</h1>
                <h1 className='text-left text-gray-200  pl-10 text-m text-medium font-bold'> Create the Vibe</h1>
                <div className="w-full ml-40 p-6 m-auto bg-neutral-600 rounded-md shadow-md lg:max-w-xl pb-6">
                    <h1 className="text-3xl font-semibold text-center text-white">
                        Sign in
                    </h1>
                    <div></div>
                    <form className="mt-6" on onSubmit={formsubmit}>
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
                        <div className="mb-2">
                            <label
                                for="password"
                                name='password'
                                className="block text-sm font-semibold text-white"
                            >
                                Password
                            </label>
                            <input
                                name='password'
                                value={register.password}
                                onChange={handlesubmit}

                                type="password"
                                className="block w-full px-4 py-2 mt-3 bg-white border rounded-md focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>

                        <div className="mt-6 flex justify-center">
                            <button className=" px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-neutral-800 rounded-md hover:bg-neutral-800 focus:outline-none">
                                Login
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-m font-light text-center  text-white ">

                        Don't have an account?
                        <a
                            href="/signup"
                            className="font-medium text-red-600 hover:underline"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login