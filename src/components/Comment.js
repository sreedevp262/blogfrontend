import React from 'react'
import axios from 'axios'
import { MdDelete } from 'react-icons/md'
import{URL} from '../url'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'



function Comment({c}) {

const {user}= useContext(UserContext)

const deleteComment = async(id)=>{
try{
await axios.delete(URL+"/api/comments/"+id,{withCredentials: true})
window.location.reload(true)
}
catch(err){
  console.log(err)
}


}


  return (
    <div className='px-2 py-2'>
      <div className='flex'>
      <h3 className='font-bold'>
        @{c.author}

      </h3>
    <div className='flex'>
    <p>
      {new Date(c.updatedAt).toString().slice(3,15)}
    </p>
    {
      user?._id === c?.userId? <div className='flex'>
        <p className='cursor-pointer' onClick={()=> deleteComment(c._id)}> <MdDelete/> </p>
       </div>:" "
    }
    </div>

      </div>
<p className='px-4 mt-2'> {c.comment} </p>

    </div>
  )
}

export default Comment