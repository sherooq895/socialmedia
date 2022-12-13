import React, { useEffect, useState } from 'react'
import './Userpost.css'
import { SlOptions } from "react-icons/sl";
import { useLocation } from 'react-router-dom'
import { BsFillChatLeftQuoteFill, BsFillArrowRightSquareFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import axios from 'axios'
import {format} from 'timeago.js'

function Userpost() {
    const Location = useLocation()
    const userid = localStorage.getItem('userid')
    let token = localStorage.getItem('token')


    const [popup, setpopup] = useState(false)
    const [commentpopup, setcommentpopup] = useState(false)
    const [post, setpost] = useState([])
    const [like, setlike] = useState()
    const [comment, setcomment] = useState({
        status: false,
        postId: ''
    })
    const [slidecomment, setslidecomment] = useState()
    const [register, setregister] = useState({
        comment: ''
    })
    const [commentresp, setcommentresp] = useState('')

    useEffect(
        () => {
            const imgId = {
                id: Location.state.postId
            }
            axios.post('http://localhost:4000/app/getuserpicture', { imgId }, {
                headers: { token: `Bearer ${token}` },
            }).then((response) => {
                setpost(response.data)
                setslidecomment(response.data.comment)
            })
        }, [like, commentresp]
    )

    const postlike = (data,postuserr) => {
        const imageid = {
            postid: data,
            useridd: userid,
            postuser:postuserr,
            type:'1'
        }
        axios.post("http://localhost:4000/app/postlike", imageid, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {
            setlike(response)
        })

        axios.post("http://localhost:4000/app/sendnotification",imageid, {
            headers: { token: `Bearer ${token}` },
          }).then((response)=>{
            console.log(response);

          })
    }

    const postdislike = (data) => {
        const imageid = {
            postid: data,
            useridd: userid
        }
        axios.post("http://localhost:4000/app/postdislike", imageid, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {
            setlike(response)
        })
    }

    const getallcomment = (data) => {
        setcomment({ postId: data, status: !comment.status })
        setcommentpopup(!commentpopup)
    }

    const handlesubmit = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setregister({
            ...register,
            [name]: value
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
        axios.post('http://localhost:4000/app/addcomment', dataa, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {
            setcommentresp(Math.random())

        })

        axios.post("http://localhost:4000/app/sendnotification",dataa, {
            headers: { token: `Bearer ${token}` },
          }).then((response)=>{
            console.log(response);

          })

    }

    const reportpost=(dataa)=>{
        const data={
            postId:dataa,
            userId:userid
        }
        axios.post('http://localhost:4000/app/reportpost',data, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {
            console.log(response);
            console.log('response');
            if(response.data.report){
                alert('Post Reported')
                setpopup(!popup)
            }else{
                console.log('dsds');
            }
           

        })
    }

    return (
        <div className=' m-auto w-[60%] bg-white rounded-xl'>

            <div >
                <div className='mt-6 flex justify-items-start' >
                    <div className='flex ml-32 mt-5'>
                        <div>

                            <div className='post-item'>
                                <img src={`./images/${post?.userId?.profilepicture}`} alt="kjjk" />
                            </div>
                        </div>
                        <div>
                            <div className='text-[#153f7c] text-2xl mt-4 ml-3'>{post?.userId?.fname}</div>
                            <div className='text-[#6e6f72]  ml-3'>{format(post?.date)}</div>
                        </div>
                    </div>


                </div>
                <div className='flex justify-center'>
                    <div className='w-[70%]  mt-2 h-20  mb-1 rounded-xl p-2 pl-5 flex '>
                        <div className='text-[#153f7c]'>
                            {post?.description}
                        </div>
                    </div>
                    <div className='mb-2'>

                        <button onClick={() => setpopup(!popup)}  ><SlOptions /></button>

                    </div>

                    {popup ?
                        <div className='p-8 mt-5 bg-neutral-300 w-[7%] absolute right-[18rem]  flex justify-end  '>
                            <ul>
                                <li><button onClick={()=>reportpost(post._id)} >Report</button></li>
                            </ul>
                        </div> : null
                    }

                </div>

                <div className='flex justify-center'>
                    <div className='postpicsingle mt-1 '>
                        <img src={`./images/${post?.image}`} alt="kjjk" />
                    </div>

                </div>
                <div>
                    <div className='mx-auto w-[64%]  bg-white mt-2 h-10 flex mb-5 rounded-xl p-2'>
                        {post?.like?.includes(userid) ?
                            <div className='text-3xl ml-9 flex'>
                                <div className='text-lg'>{post?.like?.length}</div>
                                <button onClick={() => postdislike(post?._id)} className='text-red-600'><AiOutlineHeart /></button>
                            </div> :
                            <div className='text-3xl ml-9 flex'>
                                <div className='text-lg'>{post?.like?.length}</div>
                                <button onClick={() => postlike(post?._id,post?.userId._id)} className='text-[#153f7c]'><AiOutlineHeart /></button>
                            </div>

                        }


                        <div className='text-3xl  ml-9 flex'>
                        <div className='text-lg'>{post?.comment?.length}</div>
                            <button onClick={() => { getallcomment(post?._id) }} className='text-[#153f7c]' ><BsFillChatLeftQuoteFill /></button>
                        </div>

                        <div className='text-3xl  ml-9'>
                            <button className='text-[#153f7c]'><FaShare /></button>
                        </div>

                    </div>
                    <div>
                        {commentpopup ?


                            <div className='flex justify-center mb-5'>


                                <div className=' bg-[#ccc] w-[64%] '>
                                    <div className=''>
                                        <div className='flex justify-center pt-4 w-full mx-auto'>
                                            <div className='mr-4  w-[80%]'>
                                                <input
                                                    name='comment'
                                                    value={register.comment}
                                                    onChange={handlesubmit}
                                                    className='appearance-none w-full border border-black text-black mr-3 py-1 px-2 leading-tight focus:outline-none' type="text" placeholder='enter your comments' />
                                            </div>
                                            <div className='text-3xl text-[#153f7c]'>
                                                <div onClick={() => { commentsubmit(userid, post._id,post.userId) }}  ><BsFillArrowRightSquareFill /></div>
                                            </div>

                                        </div>
                                        <div className='commentbox justify-center mt-3 mb-3'>
                                            {
                                                slidecomment?.map((dataa) => {
                                                    return (

                                                        <div className='flex justify-center'>
                                                            < div className='w-[95%] bg-white rounded-md mt-2 mb-3' >

                                                                <div className='flex ml-5 mt-2'>

                                                                    <div>
                                                                        <img src={`./images/${dataa?.userId.profilepicture}`} className='commentimage' alt="dddddd" />
                                                                    </div>
                                                                    <div className='flex items-center gap-5'>
                                                                        <div className='text-xl ml-1 text-[#153f7c]'>
                                                                            {dataa?.userId.fname}
                                                                        </div>
                                                                        <div className='text-xs ml-1 text-[#153f7c]'>
                                                                            {dataa?.date}
                                                                        </div>

                                                                    </div>


                                                                </div>
                                                                <div className='flex justify-center mt-3'>
                                                                    <div className='w-[90%] bg-slate-100 rounded-md flex justify-center mb-3'>
                                                                        <div>{dataa.comment}</div>

                                                                    </div>
                                                                    <  hr />
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
        </div>

    )
}

export default Userpost