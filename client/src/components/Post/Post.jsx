import React, { useContext, useEffect, useState } from 'react'
import './Post.css'
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { BsFillChatLeftQuoteFill, BsFillArrowRightSquareFill } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import { FaShare } from "react-icons/fa";
import { Link, Navigate, useNavigate, useLocation, Form } from 'react-router-dom'
import axios from 'axios'


function Post() {
    const Location = useLocation()
    const userid = localStorage.getItem('userid')
     let token=localStorage.getItem('token')


    const [post, setpost] = useState([])
    const[slidecomment,setslidecomment]=useState()
    const [like, setlike] = useState()
    const [allcomment, setallcomment] = useState()
    const [comment, setcomment] = useState({
        status: false,
        postId: ''
    })
    const [register, setregister] = useState({
        comment:''
    })
    const [commentresp, setcommentresp] = useState('')

    const [popup, setPopup] = useState(false)
    const [editpopup, seteditpopup] = useState(false)
    const [alldata, setalldata] = useState()
  



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


    const handlesubmit = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setregister({
            ...register,
            [name]: value

        })

    }


    const handlesubmitedit=(e)=>{
        e.preventDefault()
        const {name,value}=e.target
        setalldata({
            ...alldata,
            [name]:value
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
            console.log(response);
            console.log('response');
            setcommentresp(Math.random())

        })

    }


    useEffect(
        () => {
            const image = {
                image: Location.state.images
            }

            axios.post('http://localhost:4000/app/singlepost', { image },{
                headers: { token: `Bearer ${token}` },
              }
            ).then((response) => {
                setpost(response.data)
                console.log(response.data);
                console.log('responseaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaazzz',);
                setslidecomment(response.data[0].comment)
                // console.log('responseaaaaaaaaaaaaaacommmnntttttttttttttttt');

            })


        }, [like, alldata,commentresp])

console.log(slidecomment);
console.log('slidecomment');

    const getallcomment = (data) => {
        console.log(data);
        console.log('data');
        setcomment({ postId: data, status: !comment.status })
        // axios.post('http://localhost:4000/app/getallcomment', { data }).then((response) => {
        //     console.log(response.data.comment.comment);
        //     console.log('getcomment');
        //     setallcomment(response.data.comment.comment)


        // }
        // )

        // console.log(allcomment);
        // console.log('allcommenttttttttttttttttttttttttttttttttt');

    }

// console.log(allcomment);
// console.log('allcomment');
// console.log(post);
// console.log('postxxxxxxxxxxxxxxxxxxx');
    const editdata = (data) => {

        console.log(data);
        console.log('dataidddddddd');
        axios.post('http://localhost:4000/app/geteditpostdata', { data },{
            headers: { token: `Bearer ${token}` },
          }).then((response) => {
            console.log(response);
            console.log('response');

            setalldata(response.data)
            seteditpopup(!editpopup)
            console.log(alldata);
            console.log('alldata');
        })

    }

    const editsubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/app/editpost', { alldata },{
            headers: { token: `Bearer ${token}` },
          }).then((response) => {
            console.log('updatedd');
            alert('edit succesfully')
            seteditpopup(!editpopup)




        })


    }

    const deletedata = (data) => {
        console.log(data);
        console.log('data');
        axios.post('http://localhost:4000/app/deletepost', { data },{
            headers: { token: `Bearer ${token}` },
          }).then((response) => {
            console.log('updatedd');
            alert('post removed successfully')

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
                                                <div className='text-[#6e6f72]  ml-3'>{data.date}</div>
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


                                    <div className='flex justify-center'>
                                        <div>

                                            <div className='w-[90%]  bg-neutral-800 mt-2 h-10 flex mb-5 rounded-xl p-2'>
                                                {data.like.includes(userid) ?
                                                    <div className='text-3xl ml-9'>
                                                        <button onClick={() => { postdislike(data._id) }} className='text-red-600'><AiOutlineHeart /></button>
                                                    </div> :
                                                    <div className='text-3xl ml-9'>
                                                        <button onClick={() => { postlike(data._id) }} className='text-yellow-600'><AiOutlineHeart /></button>
                                                    </div>

                                                }


                                                <div className='text-3xl  ml-9'>
                                                    <button onClick={() => { getallcomment(data._id) }} className='text-yellow-600' ><BsFillChatLeftQuoteFill /></button>
                                                </div>

                                                <div className='text-3xl  ml-9'>
                                                    <button className='text-yellow-600'><FaShare /></button>
                                                </div>

                                            </div>
                                            <div>
                                                {comment.status && comment.postId == data._id ?


                                                    <div className='flex justify-center'>


                                                        <div className='bg-neutral-800 w-[95%]'>
                                                            <div className=''>
                                                                <div className='flex justify-center pt-4'>
                                                                    <div className='mr-4 ml-8 '>
                                                                        <input
                                                                            name='comment'
                                                                            value={register.comment}
                                                                            onChange={handlesubmit}
                                                                            className='appearance-none  border border-black w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none' type="text" placeholder='enter your comments' />
                                                                    </div>
                                                                    <div onClick={() => { commentsubmit(userid, data._id) }} className='text-3xl text-yellow-500'>
                                                                        <div  ><BsFillArrowRightSquareFill /></div>
                                                                    </div>

                                                                </div>
                                                                <div className='commentbox justify-center mt-3 mb-3'>
                                                                    {
                                                                        slidecomment?.map((dataa) => {
                                                                            return (

                                                                                <div className='flex justify-center'>
                                                                                    < div className='w-[80%] bg-slate-700 rounded-md mt-2 ' >

                                                                                        <div className='flex ml-5 mt-2'>

                                                                                            <div>
                                                                                                <img className='commentimage' src={`/images/${data.image}`} alt="dddddd" />
                                                                                            </div>
                                                                                            <div className='mt-3 ml-1 text-white mb-3'>
                                                                                                {dataa._id}
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
