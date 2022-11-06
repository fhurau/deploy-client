import React from 'react'
import Rectangle from "../components/Rectangle.png"
import g10 from "../components/g10.png"


const Hero = () => {
  return (
    <div className='d-flex align-item-center  hero-color height'>
        <div className='container align-self-center'>
        <div className='row d-flex align-item-center pt-5'>
            <div className='col-lg-7 order-lg-1 order-1'>
                <div className="">
                <p className='bg-hero text-xl-start text-center'>Are You Hunggry?</p>
                <p className='bg-hero text-xl-start text-center'>Express Home Delivery</p>
                </div>
                <div className='row'>
                  <div className='col-lg-6'>
                    <div className='me-3'>
                    <img src={Rectangle} alt="" className='garis w-100' />
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <p className='lorem text-xl-start text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                  </div>
                </div>
            </div>
            <div className='col-lg-5 order-lg-2 order-2'>
                <img src={g10} alt="" className='w-100'/>
            </div>    
        </div>
        </div>
    </div>
  )
}

export default Hero