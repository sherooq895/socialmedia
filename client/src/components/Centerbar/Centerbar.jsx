import React, { useEffect, useState } from 'react'
import './Centerbar.css'
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillChatLeftQuoteFill, BsFillArrowRightSquareFill } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";


function Centerbar() {
    let Navigate = useNavigate()

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
    // console.log(comment);
    console.log('aaaaaaa',commentresp);


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
            axios.get('http://localhost:4000/app/getallpost',{
                headers: { token: `Bearer ${token}` },
              }).then((response) => {
                console.log(response);
                if (response.data.auth === false) {
                    Navigate('/')
                } else {
                    getallpost(response.data)
                }
               
            })
           
        }
        , [like, commentresp, allcomment])


    const postlike = (data) => {
        const imageid = {
            postid: data,
            useridd: userid
        }

        axios.post("http://localhost:4000/app/postlike", imageid,{
            headers: { token: `Bearer ${token}` },
          }).then((response) => {
            setlike(response)
        })
    }

    const postdislike = (data) => {
        const imageid = {
            postid: data,
            useridd: userid
        }
        axios.post("http://localhost:4000/app/postdislike", imageid,{
            headers: { token: `Bearer ${token}` },
          }).then((response) => {
            setlike(response)
        })
    }




    const commentsubmit = (user, postId) => {
        const dataa = {
            comment: register.comment,
            userId: user,
            postId: postId
        }
        console.log(dataa);
        console.log('aaaaaaaaaaaaaaaaaaa');
        axios.post('http://localhost:4000/app/addcomment', dataa,{
            headers: { token: `Bearer ${token}` },
          }).then((response) => {
           
            console.log('kjasdfhladsjflksdjflsdajfl',response);
            setcommentresp(Math.random())

        })

    }

    const getallcomment = (data) => {
        console.log(data);
        console.log('data');
        setcomment({ postId: data, status: !comment.status })
        axios.post('http://localhost:4000/app/getallcomment', { data },{
            headers: { token: `Bearer ${token}` },
          }).then((response) => {
           
            console.log(response.data.comment.comment);
            console.log('getcomment');
            setallcomment(response.data.comment.comment)


        })

        console.log(allcomment);
        console.log('allcommenttttttttttttttttttttttttttttttttt');

    }
    console.log(allpost);
    console.log('allpost');


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
                                            <img src={`/images/${data.userId.profilepicture}`} alt="" />
                                        </div>
                                        <div>
                                            <div className='mt-6 ml-2 text-xl text-[#153f7c]'>{data.userId.fname}</div>
                                            <div className='mt-1 ml-2 text-sm text-[#6e6f72]'>{data.date}</div>

                                        </div>  

                                    </div>
                                    <div className='flex justify-center'>
                                        <div className='w-[80%]  mt-1 h-20 flex mb-1 rounded-xl p-1 pl-3'>
                                            <div className='text-[#0d0d0e] text-xl'>
                                                {data.description}

                                            </div>

                                        </div>

                                    </div>
                                    <div className='flex justify-center'>
                                        <div><img className='picsize  align-middle max-w-xl h-30 rounded-lg shadow-xl dark:shadow-gray-800' src={`/images/${data.image}`} alt="nnnnnn" /></div>
                                    </div>


                                    <div className='flex justify-center'>

                                        <div className='w-[80%]  mt-2 h-10 flex mb-5 rounded-xl p-2'>
                                            {data.like.includes(userid) ?
                                                <div className='text-3xl ml-9'>
                                                    <button onClick={() => { postdislike(data._id) }} className='text-[#ff3b3b]'><AiOutlineHeart /></button>
                                                </div> :
                                                <div className='text-3xl ml-9'>
                                                    <button onClick={() => { postlike(data._id) }} className='text-[#153f7c]'><AiOutlineHeart /></button>
                                                </div>

                                            }


                                            <div className='text-3xl  ml-9'>
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
                                                        <div className='flex justify-center pt-4'>
                                                            <div className='mr-4 ml-8 '>
                                                                <input
                                                                    name='comment'
                                                                    value={register.comment}
                                                                    onChange={handlesubmit}
                                                                    className='appearance-none  border border-black w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none' type="text" placeholder='enter your comments' />
                                                            </div>
                                                            <div onClick={() => { commentsubmit(userid, data._id) }} className='text-3xl text-[#153f7c]'>
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
                                                                                            <img className='commentimage' src={`/images/${data.image}`} alt="dddddd" />
                                                                                        </div>
                                                                                        <div className='mt-3 ml-1 text- mb-3 text-[#153f7c]'>
                                                                                            {dataa._id}
                                                                                        </div>

                                                                                    </div>
                                                                                    <div className='flex justify-center mt-5'>
                                                                                        <div className='w-[90%] rounded-md flex justify-items-start mb-3 text-lg'>
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
                        )
                    })

                }

            </div>

        </>
    )

}

export default Centerbar