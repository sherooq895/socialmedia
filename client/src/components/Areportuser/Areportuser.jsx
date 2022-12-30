import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Areportuser() {

    const token = localStorage.getItem('Atoken')
    const [user, setuser] = useState()
    const [ref, setref] = useState('')

    useEffect(
        () => {
            axios.get('https://postx.gq/api/admin/getallreportuser', {
                headers: { token: `Bearer ${token}` },
            }).then((response) => {
                setuser(response.data)
            })
        }, [ref]
    )

    const blockuser=(data)=>{
        axios.post('https://postx.gq/api/admin/blockuser', {data},{
            headers: { token: `Bearer ${token}` },
        }).then((response) => {
            alert('user blocked')
            setref(Math.random())
        })
    }

    const unblockuser=(data)=>{
        axios.post('https://postx.gq/api/admin/unblockuser', {data},{
            headers: { token: `Bearer ${token}` },
        }).then((response) => {
            alert('user unblocked')
            setref(Math.random())
        })

    }


    return (
        <div>
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                        <h1 className='ml-10 text-3xl mb-2'>Reported Users</h1>
                            <table class="min-w-full text-center">
                                <thead class="border-b">
                                    <tr>
                                        <th>
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-3 py-4">
                                            userId
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                            User Name
                                        </th>
                                       

                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                            Report Count
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        user?.map((dataa,index) =>
                                        (
                                            dataa?.report?.length!==0 ?

                                                <tr class="border-b bg-indigo-100 border-indigo-200">
                                                    <td class="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                       {index}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                      {dataa?._id}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                         {dataa?.fname}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                        {dataa?.report?.length}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                        {dataa?.blocked==true?
                                                        <button onClick={()=>unblockuser(dataa?._id)} type="button" class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-red-800  ">UNBLOCK</button>:
                                                        <button onClick={()=>blockuser(dataa?._id)} type="button" class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-red-800  ">BLOCK</button>
                                                        }
                                                    </td>
                                                </tr> : ''
                                        )
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Areportuser