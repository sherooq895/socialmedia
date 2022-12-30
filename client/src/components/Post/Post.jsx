import React, { useContext, useEffect, useState } from 'react'
import './Post.css'
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { BsFillChatLeftQuoteFill, BsFillArrowRightSquareFill } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import { FaShare } from "react-icons/fa";
import { Link, Navigate, useNavigate, useLocation, Form } from 'react-router-dom'
import axios from 'axios'
import {format} from 'timeago.js'


function Post() {
    const Location = useLocation()
    const userid = localStorage.getItem('userid')
    let token = localStorage.getItem('token')


    const [post, setpost] = useState([])
    const [slidecomment, setslidecomment] = useState()
    const [like, setlike] = useState()
    const [allcomment, setallcomment] = useState()
    const [comment, setcomment] = useState({
        status: false,
        postId: ''
    })
    const [register, setregister] = useState({
        comment: ''
    })
    const [commentresp, setcommentresp] = useState('')

    const [popup, setPopup] = useState(false)
    const [editpopup, seteditpopup] = useState(false)
    const [alldata, setalldata] = useState()




    const postlike = (data,postuserr) => {
        const imageid = {
            postid: data,
            useridd: userid,
            postuser:postuserr,
            type:'1'
        }

        axios.post("https://postx.gq/api/app/postlike", imageid, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {
            setlike(response)
        })

        axios.post("https://postx.gq/api/app/sendnotification",imageid, {
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
        axios.post("https://postx.gq/api/app/postdislike", imageid, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {
            setlike(response)
        })
    }


    const handlesubmit = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setregister({
            ...register,
            [name]: value

        })

    }


    const handlesubmitedit = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setalldata({
            ...alldata,
            [name]: value
        })
    }

    const commentsubmit = (user, postId,postuserr) => {

        // postid: data,
        // useridd: userid,
        // postuser:postuserr,
        // type:'1'

        const dataa = {
            comment: register.comment,
            userId: user,
            postId: postId,
            postuser:postuserr,
            type:'2'
        }
        console.log(dataa);
        console.log('aaaaaaaaaaaaaaaaaaa');
        axios.post('https://postx.gq/api/app/addcomment', dataa, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {
            console.log(response);
            console.log('response');
            setcommentresp(Math.random())

        })

        axios.post("https://postx.gq/api/app/sendnotification",dataa, {
            headers: { token: `Bearer ${token}` },
          }).then((response)=>{
            console.log(response);

          })

    }


    useEffect(
        () => {
            const image = {
                image: Location?.state?.images
            }

            axios.post('https://postx.gq/api/app/singlepost', { image }, {
                headers: { token: `Bearer ${token}` },
            }
            ).then((response) => {
                setpost(response.data)
                setslidecomment(response.data[0].comment)
            })


        }, [like, alldata, commentresp])


    const getallcomment = (data) => {

        setcomment({ postId: data, status: !comment.status })

    }


    const editdata = (data) => {

        console.log(data);
        console.log('dataidddddddd');
        axios.post('https://postx.gq/api/app/geteditpostdata', { data }, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {

            setalldata(response.data)
            seteditpopup(!editpopup)

        })

    }

    const editsubmit = (e) => {
        e.preventDefault()
        axios.post('https://postx.gq/api/app/editpost', { alldata }, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {
            alert('edit succesfully')
            seteditpopup(!editpopup)
            setcommentresp(Math.random())
        })
    }

    const deletedata = (data) => {
        axios.post('https://postx.gq/api/app/deletepost', { data }, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {
            console.log('updatedd');
            alert('post removed successfully')
            setcommentresp(response)
        })
    }



    return (
        <div className=' postscoller'>


            <div className='flex justify-center mt-4 '>
                {

                    post.map((data) => {
                        return (


                            <div className='w-[60%] bg-white rounded-xl'>

                                <div >
                                    <div className='mt-6 flex justify-items-start' >
                                        <div className='flex ml-32'>
                                            <div>

                                                <div className='post-item'>
                                                    <img src={`/images/${data.userId.profilepicture}`} alt="kjjk" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className='text-[#153f7c] text-2xl mt-4 ml-3'>{data.userId.fname}</div>
                                                <div className='text-[#6e6f72]  ml-3'>{format(data?.date)}</div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className='flex justify-center'>
                                        <div className='w-[70%]  mt-2 h-20  mb-1 rounded-xl p-2 pl-5 flex '>
                                            <div className='text-[#153f7c]'>
                                                {data.description}

                                            </div>

                                        </div>
                                        <div className='mb-4'>

                                            <button onClick={() => setPopup(!popup)} ><SlOptions /></button>

                                        </div>

                                        {popup ?
                                            <div className='p-8  bg-neutral-300 w-[8%] absolute right-[18rem]  flex justify-end  '>
                                                <ul>

                                                    <li><button onClick={() => editdata(data._id)}>Edit</button></li>
                                                    <br />

                                                    <li><button onClick={() => deletedata(data._id)} >Delete</button></li>

                                                </ul>
                                            </div> : null
                                        }

                                    </div>

                                    <div className='flex justify-center'>
                                        <div className='postpicsingle mt-2 '>
                                            <img src={`./images/${data.image}`} alt="kjjk" />
                                        </div>

                                    </div>


                                    <div className=''>
                                        <div>

                                            <div className='mx-auto w-[64%]  bg-white mt-2 h-10 flex mb-5 rounded-xl p-2'>
                                                {data.like.includes(userid) ?
                                                    <div className='text-3xl ml-9 flex'>
                                                        <div className='text-lg mr-1'>{data?.like?.length}</div>
                                                        <button onClick={() => { postdislike(data._id) }} className='text-red-600'><AiOutlineHeart /></button>

                                                    </div> :
                                                    <div className='text-3xl ml-9 flex'>
                                                        <div className='text-lg mr-1'>{data?.like?.length}</div>
                                                        <button onClick={() => { postlike(data._id,data.userId._id) }} className='text-[#153f7c]'><AiOutlineHeart /></button>
                                                    </div>

                                                }


                                                <div className='text-3xl  ml-9 flex'>
                                                    <div className='text-lg mr-1'>{data?.comment?.length}</div>
                                                    <button onClick={() => { getallcomment(data._id) }} className='text-[#153f7c]' ><BsFillChatLeftQuoteFill /></button>
                                                </div>

                                                <div className='text-3xl  ml-9'>
                                                    <button className='text-[#153f7c]'><FaShare /></button>
                                                </div>

                                            </div>
                                            <div>
                                                {comment.status && comment.postId == data._id ?


                                                    <div className='flex justify-center'>


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
                                                                    <div onClick={() => { commentsubmit(userid, data._id ,data.userId) }} className='text-3xl text-[#153f7c]'>
                                                                        <div  ><BsFillArrowRightSquareFill /></div>
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
                                                                                                <img className='commentimage' src={`/images/${data.image}`} alt="dddddd" />
                                                                                            </div>
                                                                                            <div className='flex items-center gap-5'>
                                                                                                <div className='text-xl ml-1 text-[#153f7c]'>
                                                                                                    {dataa.userId.fname}
                                                                                                </div>
                                                                                                <div className='text-xs ml-1 text-[#153f7c]'>
                                                                                                   
                                                                                                   { format(dataa.date)}
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
                            </div>
                        )

                    })

                }

                {
                    editpopup ?
                        <>
                            <div className='w-full h-fulll bg-[#666666d5] left-0 right-0 z-10 top-0 bottom-0 fixed'></div>
                            <div className='w-[50%] h-64 bg-slate-100 fixed left-[25%] z-20 top-[30%] p-5'>
                                <div className=''>
                                    <div className='flex justify-center'>
                                        <div className='text-black text-2xl'>Edit Post</div>
                                    </div>
                                    <form onSubmit={editsubmit}>
                                        <div className="mb-2">
                                            <label
                                                for="description"
                                                className="block text-sm font-semibold text-black"
                                            >
                                                Discription
                                            </label>
                                            <input
                                                type="text"
                                                name='description'
                                                value={alldata?.description}
                                                onChange={handlesubmitedit}

                                                className="block w-full px-4 py-2 mt-3 bg-white border rounded-md focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            />
                                        </div>
                                        <div>
                                            <div className="mt-6 flex justify-center">
                                                <button className=" px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  bg-neutral-800 rounded-md hover:bg-black image.png focus:outline-none">
                                                    Save
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


        </div>


    )
}

export default Post
