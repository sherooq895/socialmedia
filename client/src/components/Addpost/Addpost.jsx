import React, { useState } from 'react'
import axios from 'axios'

function Addpost() {
    
    let token=localStorage.getItem('token')
   



    const useridd=localStorage.getItem('userid')
   const date=new Date()

    const [register, setregister] = useState({
        image: '',
        description: '',
       
    })
    const [file, setFile] = useState();

      


    const fileupload = (event) => {
        setFile(URL.createObjectURL(event.target.files[0]))
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
        const useridd=localStorage.getItem('userid')
        const date=new Date()
     
        const formdata = new FormData();
        for (let key in register) {
            formdata.append(key, register[key])
        }

        axios.post("http://localhost:4000/app/addpost", formdata,{
            params:{
                useridd,
                date
            }
        }, {
            headers: { token: `Bearer ${token}` },
          }).then((response) => {
            console.log(response);
            console.log('response');

        })


    }
    console.log(register);
    console.log('registerrrrr');






    return (
        <div>
            <div className=' bg-white h-screen pt-20 pl-28 '>
                <div className='w-[80%] h-96 bg-[#ccc] rounded-xl '>
                    <div className='flex justify-center mt-8'>
                        <div className='text-[#153f7c] text-3xl  mt-8'>Add Post</div>
                    </div>
                    <form onSubmit={submit}>
                        <div>
                            <div className='flex mt-5' >
                                <div className='text-[#153f7c] text-xl ml-6'>
                                    <label>
                                        Upload Your Photo

                                    </label>
                                </div>
                                <div className='ml-7 mt-10 bg-slate-400'>
                                    <input type="file" 
                                        name='image'
                                        onChange={fileupload}
                                        />


                                </div>
                              


                            </div>
                            <div className='flex mt-5' >
                                <div className='text-[#153f7c] text-xl ml-6'>
                                    <label>
                                        Type Your Description
                                    </label>
                                </div>
                                <div className='ml-7 mt-10 bg-slate-400'>
                                    <input type="text-area"
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

                    </form>


                </div>


            </div>

        </div>
    )
}

export default Addpost