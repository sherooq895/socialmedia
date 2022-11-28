import React, { useEffect, useState } from 'react'
import './Rightbar.css'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

function Rightbar() {
    const token = localStorage.getItem('token')

    const Navigate = useNavigate()
    const user = localStorage.getItem('token')
    const userdata = jwt_decode(user)
    console.log(userdata.id);
    console.log('userdata');

    const [userprofile, setuserprofile] = useState([])
    const [userposts, setuserposts] = useState([])

    useEffect(
        () => {

            axios.get('http://localhost:4000/app/getusers', {
                headers: { token: `Bearer ${token}` },
            }).then((response) => {

                setuserprofile(response.data)
            })

        }, []
    )

    console.log(userprofile);
    console.log('userprofileeeeeee');


    const getuserprofile = (data) => {


        console.log(data);
        console.log('dataccxcxcxcxcxcxcxcxcxcxcxcxcxxxxcxcxxxcx');

        axios.post('http://localhost:4000/app/getuserprofile', { data }, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {

            axios.post('http://localhost:4000/app/getuserprofileposts', { data }, {
                headers: { token: `Bearer ${token}` },
            }).then((resp) => {
                setuserposts(resp.data)
                Navigate('/userprofile', {
                    state: {
                        datas: response.data.datas,
                        userposts: resp.data
                    }
                })
            })



        })





    }






    return (
        <div className='p-4 m-3 bg- bg-white rounded-lg'>
            <div className='text-[#153f7c] text-xl mb-5'>Suggetions For You</div>


            <div className='scoller-right-bar  '>
                {

                    userprofile.map((dataa) => {
                        return (

                            <div className='flex mb-3'>
                                <div className='rightbar' onClick={() => getuserprofile(dataa._id)}>
                                    <img src={`./images/${dataa.profilepicture}`} alt="" />
                                </div>
                                <div>
                                    <div className='mt-2 ml-2 text-lg text-[#12233d]'>{dataa.fname}</div>
                                    {dataa.following.includes( userdata.id ) ?

                                        <div><button className='bg-[#153f7c] hover:bg-[#041329] text-white font-bold py-1 px-8 ml-2 rounded'>Following</button></div> :
                                        <div><button className='bg-[#153f7c] hover:bg-[#041329] text-white font-bold py-1 px-8 ml-2 rounded'>Follow</button></div>
                                    }


                                </div>

                            </div>

                        )
                    })


                }


            </div>
        </div>
    )
}

export default Rightbar