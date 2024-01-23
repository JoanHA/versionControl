import React, { useEffect } from 'react'
import error from "../assets/IMG/Error404.jpg"
function Not_Found() {
    


  return (
    <div className=' w-100 h-100 d-flex align-items-center justify-content-center ' id='back'>
        <div>
            <img src={error} alt="" className='px-5 mx-auto ' width={600}  />
            <div className='text-center'><h2> <strong>Oops, No Deberias Estar Aqui...</strong></h2></div>
        </div>

    </div>
  )
}

export default Not_Found