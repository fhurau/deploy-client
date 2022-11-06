import React from 'react'
import { popularc } from './Dummy/Popular'

export const Category = () => {
  return (
    <div className='w-75 mx-auto mt-5'>
        <div className='d-flex justify-content-start'>
            <h2>POPULAR RESTAURANT</h2>
        </div>
        <div className='row mt-4'>
        {popularc.map ((item) => {
            return(
              <div className='col-lg-3 col-md-6 col-12 mb-lg-0 mb-3'>
                <div className='d-flex border p-3 boxpop'>
                <img src={item.image} alt="" className='me-2' />
                <h1>{item.nama}</h1>
                </div>
              </div>
                
            )
        })}
        </div>
    </div>
    
  )
}
