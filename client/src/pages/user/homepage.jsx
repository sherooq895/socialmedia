import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Leftbar/Leftbar'
import Rightbar from '../../components/Rightbar/Rightbar'
import Centerbar from '../../components/Centerbar/Centerbar'
import Story from '../../components/Story/story'


function homepage() {
    return (
        <div >

            <Navbar />
           
            <div className='flex bg-[#ccc] '>

                {/* <div> */}

                    <Sidebar  />
                {/* </div> */}

        
    
                <div className=' w-full md:w-[60%]  '>
              
                    <Centerbar />
                </div>
                <div className='w-[25%] hidden md:block'>
                    <Rightbar />
                </div>
            </div>
        </div>
    )
}

export default homepage