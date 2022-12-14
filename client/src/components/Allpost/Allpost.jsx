import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'



function Allpost() {

  let Navigate = useNavigate()
  let token = localStorage.getItem('token')


  const userid = localStorage.getItem('userid')
  const [posts, getposts] = useState([])



  useEffect(() => {
    token &&
      axios.get('https://postx.gq/api/app/getpost', {
        params: {
          userid
        }
      }, {
        headers: { token: `Bearer ${token}` }
      }).then((response) => {
        console.log('sdsdsd');
        console.log(response);
        getposts(response.data)

      })

  }, [])

  const singlepost = (datas) => {
    const image = datas

    Navigate('/post', {
      state: {
        images: image
      }
    })

  }

  return (
    <div className='flex justify-center mt-4 '>
      <div className='w-[80%] bg-white rounded-xl'>
        <div className='mt-6 flex justify-center' >
          <div className='grid grid-cols-3 gap-4'>
            {
              posts.length==0?
              <div>No Posts Available</div>:
              posts.map((datas) =>
              (
                datas.block == false ?
                  <div ><img onClick={() => singlepost(datas.image)} className='postpic hover:scale-110' src={`/images/${datas.image}`} alt="jjjjjdfty" /></div> : ''
              )

              )

            }

          </div>

        </div>

      </div>
    </div>


  )
}

export default Allpost