"use client"

import {RingLoader} from 'react-spinners'

const Loader = () =>{
    return(
        <div className='mt-28'>
            <RingLoader
            size={100}
            color='red'
            />
        </div>
    )
}

export default Loader