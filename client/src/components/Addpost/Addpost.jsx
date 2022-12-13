import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate, useLocation } from "react-router-dom";

function Addpost() {

    let token = localStorage.getItem('token')

    const Navigate = useNavigate()




    const useridd = localStorage.getItem('userid')
    const date = new Date()

    const [register, setregister] = useState({
        image: null,
        description: null,

    })
    const [file, setFile] = useState({
        file: '',
        fileURL: ''
    });




    const fileupload = (event) => {
        setFile({
            ...file,
            file: event.target.files[0],
            fileURL: URL.createObjectURL(event.target.files[0])
        })
        setregister({
            ...register,
            image: event.target.files[0]
        })

    }






    const formsubmit = (event) => {
        event.preventDefault()
        const { name, value } = event.target
        setregister({
            ...register,
            [name]: value
        })

    }



    const submit = (e) => {
        e.preventDefault()
        const useridd = localStorage.getItem('userid')
        const date = new Date()

        if (register?.image===null || register?.description === null) {
            alert('fill the details properly..')
        } else {
            const formdata = new FormData();
            for (let key in register) {
                formdata.append(key, register[key])
            }
            axios.post("http://localhost:4000/app/addpost", formdata, {
                params: {
                    useridd,
                    date
                }
            }, {
                headers: { token: `Bearer ${token}` },
            }).then((response) => {
                Navigate('/profile')
            })


        }





    }

    console.log(file);
    console.log('fileccccc')








    return (
        <div>
            <div className=' bg-white h-screen pt-20 pl-28 '>
                <div className='w-[80%] h-96 bg-[#ccc] rounded-xl '>
                    <div className='flex justify-center mt-8'>
                        <div className='text-[#153f7c] text-3xl  mt-8'>Add Post</div>
                    </div>
                    <form onSubmit={submit}>
                        <div className='flex'>


                            <div>
                                <div className='flex mt-5' >
                                    <div className='text-[#153f7c] text-xl ml-6'>
                                        <label>
                                            Upload Your Photo

                                        </label>
                                    </div>
                                    <div className='ml-7 mt-10 bg-slate-400'>
                                        <input type="file"
                                            accept="image/*"
                                            name='image'
                                            onChange={fileupload}
                                        />


                                    </div>



                                </div>
                                <div className='flex mt-5 ' >
                                    <div className='text-[#153f7c] text-xl ml-6'>
                                        <label>
                                            Type Your Description
                                        </label>
                                    </div>
                                    <div className='ml-7 mt-10 bg-slate-400'>
                                        <input className='w-[30%' type="text-area"
                                            name='description'
                                            value={register.description}
                                            onChange={formsubmit}>
                                        </input>

                                    </div>



                                </div>
                                <div className='flex justify-center mt-7'>
                                    <div >
                                        <button className='bg-[#153f7c] hover:bg-[#0c2244] text-white font-bold py-2 px-9 rounded'>Submit</button>
                                    </div>


                                </div>

                            </div>
                            <div className='ml-14 mt-2 bg-[#a7a3a3c2]'>
                                <div>
                                    {
                                        file.file ?
                                            <img
                                                style={{
                                                    width: "250px",
                                                    height: "250px",
                                                    border: 0,
                                                    outline: 0,
                                                    borderRadius: 12,
                                                }}
                                                src={file.fileURL}
                                            /> :
                                            <div className='flex justify-center'>
                                                <div className='text-xl mt-8 ml-8 pr-8'>
                                                    upload your image here..
                                                </div></div>
                                    }


                                </div>

                            </div>
                        </div>

                    </form>


                </div>


            </div>

        </div>
    )
}

export default Addpost