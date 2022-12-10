import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Adminreport() {
    const token = localStorage.getItem('Atoken')
    const [data, setdata] = useState()
    const [ref, setref] = useState('')

    useEffect(

        () => {
            axios.get('http://localhost:4000/admin/getallreportpost', {
                headers: { token: `Bearer ${token}` },
            }).then((response) => {
                console.log(response);
                console.log('response');
                setdata(response.data)
            })
        }, [ref])

    const postblock = (dataa) => {
        const postId = dataa
        axios.post('http://localhost:4000/admin/postblock', { postId }, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {
           
                alert('post blocked successfully')
                setref(Math.random())
           
        })
    }
    const postunblock = (dataa) => {
        const postId = dataa
        axios.post('http://localhost:4000/admin/postunblock', { postId }, {
            headers: { token: `Bearer ${token}` },
        }).then((response) => {
                alert('post unblocked successfully')
                setref(Math.random())
        })
    }


    return (
        <div>
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
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
                                            Post Id
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
                                        data?.map((dataa) =>
                                        (
                                            dataa?.report.length !== 0 ?
                                                <tr class="border-b bg-indigo-100 border-indigo-200">
                                                    <td class="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                        {dataa?.userId?._id}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                        {dataa?.userId?.fname}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                        {dataa?._id}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                        {dataa?.report.length}
                                                    </td>
                                                    <td class="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                        {
                                                            dataa?.block==true ?
                                                            <button onClick={() => postunblock(dataa?._id)} type="button" class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-red-800  ">UNBLOCK</button>:
                                                            <button onClick={() => postblock(dataa?._id)} type="button" class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-red-800  ">BLOCK</button>
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

export default Adminreport