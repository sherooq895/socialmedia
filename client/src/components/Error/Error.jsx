import React from 'react'
import { Navigate, useNavigate } from "react-router-dom";

function Error() {
    let Navigate = useNavigate()

    const home=()=>{
        Navigate('/home')
    }


  return (
    <div className='flex align-middle'>
        <div className='flex justify-center'>
            <img className='ml-16' src="https://dealer.tradeinvalet.com/Content/Images/Error_Image.gif" alt="erroe500" />
            <div className='flex align-middle'>
                <button className='bg-[#153f7c] hover:bg-[#081f41] text-white font-bold py-1 px-4 rounded' onClick={home}>Back To Home</button>
            </div>
        </div>

    </div>

   
  )
}

export default Error