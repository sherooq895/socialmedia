import React, { useEffect, useState, useRef } from 'react'
import './Centerbar.css'
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillChatLeftQuoteFill, BsFillArrowRightSquareFill } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";
import {format} from 'timeago.js'
import { io } from "socket.io-client"
import { useContext } from 'react';
// import {socket} from '../../context/socketcontext'
import {socket, Socketcontext} from '../../context/socketcontext';


function Centerbar() {

   
//    const socket = useContext(Socketcontext)


    let Navigate = useNavigate()
    // const socket = useRef();
 
    const token=localStorage.getItem('token')
    const [allpost, getallpost] = useState([])
    const [like, setlike] = useState()

    const userid = localStorage.getItem('userid')

    const [register, setregister] = useState({
        comment: ''
    })

    const [comment, setcomment] = useState({
        status: false,
        postId: ''
    })

    const [allcomment, setallcomment] = useState()
    const [commentresp, setcommentresp] = useState('')


    const handlesubmit = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setregister({
            ...register,
            [name]: value

        })

    }

    useEffect(
        () => {
            axios.get('https://postx.gq/api/app/getallpost',{
                headers: { token: `Bearer ${token}` },
              }).then((response) => {
                console.log(response);
                if (response.data.auth === false) {
                    Navigate('/')
                } else {
                    getallpost(response.data)
                }
            })
        } , [like, commentresp,allcomment])


    const postlike = (data,postuserr) => {
        const imageid = {
            postid: data,
            useridd: userid,
            postuser:postuserr,
            type:'1'
        }

        axios.post("https://postx.gq/api/app/postlike", imageid,{
            headers: { token: `Bearer ${token}` },
          }).then((response) => {
            socket.emit('send-notifications',{
                senderid:userid,
                reciverId:postuserr,
                type:'1'
            })
            setlike(response)
        })
    }

    const postdislike = (data) => {
        const imageid = {
            postid: data,
            useridd: userid
        }
        axios.post("https://postx.gq/api/app/postdislike", imageid,{
            headers: { token: `Bearer ${token}` },
          }).then((response) => {
            setlike(response)
        })
    }

    const commentsubmit = (user, postId,postuserr) => {
        const dataa = {
            comment: register.comment,
            userId: user,
            postId: postId,
            postuser:postuserr,
            type:'2'
        }

        axios.post('https://postx.gq/api/app/addcomment', dataa,{
            headers: { token: `Bearer ${token}` },
          }).then((response) => {
            socket.emit('send-notifications',{
                senderid:userid,
                reciverId:postuserr,
                type:'2'
            })
            setcommentresp(Math.random())
        })

    }

    const getallcomment = (data) => {
        setcomment({ postId: data, status: !comment.status })
        axios.post('https://postx.gq/api/app/getallcomment', { data },{
            headers: { token: `Bearer ${token}` },
          }).then((response) => {
            setallcomment(response.data.comment.comment)
            setcommentresp(Math.random())
        })
    }

    

    return (
        <>
            <div className='centerbar' >
                {
                    allpost?.map((data) => {
                        return (
                          

                            <div className='p-4 bg-white m-3 h-fit rounded-xl'>
                                < div >
                                    <div className='flex mb-3'>
                                        <div className='proimage'>
                                            <img src={`/images/${data?.userId?.profilepicture}`} alt="" />
                                        </div>
                                        <div>
                                            <div className='mt-6 ml-2 text-xl text-[#153f7c]'>{data?.userId?.fname}</div>
                                            <div className='mt-1 ml-2 text-sm text-[#6e6f72]'>{format(data?.date)}</div>

                                        </div>  

                                    </div>
                                    <div className='flex justify-center'>
                                        <div className='w-[80%]  mt-1 h-20 flex mb-1 rounded-xl p-1 pl-3'>
                                            <div className='text-[#0d0d0e] text-xl'>
                                                {data?.description}

                                            </div>

                                        </div>

                                    </div>
                                    <div className='flex justify-center'>
                                        <div><img className='picsize  align-middle w-full h-30 rounded-lg shadow-xl dark:shadow-gray-800' src={`/images/${data.image}`} alt="nnnnnn" /></div>
                                    </div>


                                    <div className='flex justify-center'>

                                        <div className='md:w-[80%]  mt-2 h-10 flex mb-5 rounded-xl p-2'>
                                            {data.like.includes(userid) ?
                                                <div className='text-3xl md:ml-9 flex'>
                                                    <div className='text-lg mr-1'>{data.like.length}</div>
                                                    <button onClick={() => postdislike(data._id,data.userId._id)} className='text-[#ff3b3b]'><AiOutlineHeart /></button>
                                                </div> :
                                                <div className='text-3xl ml-9 flex'>
                                                    <div className='text-lg mr-1'>{data.like.length}</div>
                                                    <button onClick={() => { postlike(data._id,data.userId._id)} } className='text-[#153f7c]'><AiOutlineHeart /></button>
                                                </div>

                                            }


                                            <div className='text-3xl  ml-9 flex'>
                                                <div className='text-lg mr-1'>{data.comment.length}</div>
                                                <button onClick={() => { getallcomment(data._id) }} className='text-[#153f7c]' ><BsFillChatLeftQuoteFill /></button>
                                            </div>

                                            <div className='text-3xl  ml-9'>
                                                <button className='text-[#153f7c]'><FaShare /></button>
                                            </div>

                                        </div>
                                    </div>
                                    <div>
                                        {comment.status && comment.postId == data._id ?


                                            <div className='flex justify-center'>


                                                <div className='bg- bg-[#ccc] w-[85%] rounded-lg'>
                                                    <div className=''>
                                                        <div className='flex justify-center pt-4 w-full mx-auto'>
                                                            <div className='mr-4  w-[80%]'>
                                                                <input
                                                                    name='comment'
                                                                    value={register.comment}
                                                                    onChange={handlesubmit}
                                                                    className='appearance-none  border border-black w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none' type="text" placeholder='enter your comments' />
                                                            </div>
                                                            <div onClick={() => { commentsubmit(userid, data._id, data.userId)}} className='text-3xl text-[#153f7c]'>
                                                                <div  ><BsFillArrowRightSquareFill /></div>
                                                            </div>

                                                        </div>
                                                        <div className='commentbox justify-center mt-3 mb-3'>
                                                            {
                                                                allcomment?.map((dataa) => {
                                                                    return (

                                                                        <div className='flex justify-center'>
                                                                            < div className='w-[80%] bg-slate-50 rounded-md mt-2 ' >
                                                                                
                                                                                    <div className='flex ml-5 mt-2'>

                                                                                        <div>
                                                                                            <img className='commentimage' src={`/images/${dataa?.userId?.profilepicture}`} alt="dddddd" />
                                                                                        </div>
                                                                                        <div className=''>
                                                                                        <div className=' ml-1 text-xl  text-[#153f7c]'>
                                                                                            {dataa?.userId?.fname}
                                                                                        </div>
                                                                                        <div className=' ml-1 text-sm mb-3 text-[#153f7c]'>
                                                                                           {format(dataa?.date)}
                                                                                        </div>

                                                                                        </div>
                                                                                       

                                                                                    </div>
                                                                                    <div className='flex justify-center mt-5'>
                                                                                        <div className='w-[90%] rounded-md flex justify-items-start mb-3 text-lg'>
                                                                                            <div>{dataa.comment}</div>

                                                                                        </div>
                                                                                        
                                                                                    </div>
                                                                               
                                                                            </div>
                                                                        </div>

                                                                    )

                                                                })
                                                            }

                                                        </div>
                                                    </div>


                                                </div>                                                                                                          
                                            </div>
                                            : null

                                        }

                                    </div>
                                </div>
                            </div>
                        )
                    })

                }

            </div>

        </>
    )

}

export default Centerbar