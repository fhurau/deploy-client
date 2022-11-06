import React, { useContext, useState, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {useCart} from 'react-use-cart'
import toRupiah from '@develoka/angka-rupiah-js';
import { API } from '../config/api';
import { useMutation,useQuery } from 'react-query';
import {UserContext} from "./context/userContext"
import trash from "./Dummy/Trash.png"
import Modal from 'react-bootstrap/Modal';
import maps from "../components/Dummy/maps.png"
import mapkecil from "../components/Dummy/mapkecil.png"


function Order(props) {
    
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate ();

    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        }
      }
    
      const [mapLong, setMapLong] = useState();
      const [mapLat, setMapLat] = useState();
    
      function showPosition(position) {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        setMapLong(long);
        setMapLat(lat);
      }
    
      const mapLongLat = `${mapLong}, ${mapLat}`;

  const [state] = useContext(UserContext)
    

    let {id} = useParams();
    let { data: products, refetch } = useQuery("transactionCache", async () => {
    const response = await API.get("/transaction");
    return response.data.data;
    
  });

    console.log("produuct",products);

//   const deletee = async (id) => {
//     try {
//     await API.delete(`/transaction/${id}`)
//     refetch();
//     } catch (error) {
//     }
//   }

  const [order, setOrder] = useState()
    const getData = async () => {
        try {
            const response = await API.get("/transaction");
            setOrder(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (state.user)
            getData()
    }, [state])

    const deleteById = useMutation(async (id) => {
        try {
            await API.delete(`/transaction/${id}`);
            getData()
        } catch (error) {
            console.log(error);
        }
    });

    const HandleAdd = async (qty, id) => {
        try {
            await API.patch(`/transaction/${id}`, { qty: qty })
            getData()
        } catch (error) {
            console.log(error);
        }
    }
    const HandleLess = async (qty, id) => {
        try {
            if (qty === 0) {
                deleteById.mutate(id)
            } else {
                await API.patch(`/transaction/${id}`, { qty: qty })
                getData()
            }
        } catch (error) {
            console.log(error);
        }

    }
    const filter = order?.filter(p => p.buyer_id == id)
    const sum = order?.map(p => p.product.price * p.qty).reduce((a, b) => a += b, 0)
    const qty = order?.map(p => p.qty).reduce((a, b) => a += b, 0)

    const click = async (e) => {
        e.preventDefault()
        navigate("/profiles")
    }

//   const totalqty = products.reduce((a,b) => {
//       return a+b.qty
      
//   },0)
//   console.log(totalqty);
//   const totalprice = products.reduce((a,b) => {
//       return a+b.price
      
//   },0)
//   console.log(totalprice)

  let ongkir = 10000

//   const total = totalprice + ongkir
//   console.log(total);
  

  return (
    <div style={{backgroundColor:"#FFFFF", height:"100vh"}}>
        {filter?.length ?(
        <div className='container p-5'>  
            <div>
            <h2 className='mb-5'>Geprek Ways</h2>
            <p className='fs-4'>Delivery Location</p>
            <div  className='d-flex align-items-center'>
                <input className='rounded me-auto w-100' style={{padding:"7px", width:"80%"}} type="text" value={mapLongLat}></input>
                <button class=" labeladd rounded-end labeledit fw-bolder w-50" type="button" onClick={() => { handleShow(); getLocation();}}>Select On Map <img src={mapkecil} alt="" /></button>
                        <Modal show={show} onHide={() => setShow(false)} size="xl" className=' d-flex justify-content-center align-items-center' backdrop="static">
                            <Modal.Body>
                            <iframe
            width="100%"
            height="400px"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=Dumbways%20&t=&z=17&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            title="myFrame"></iframe>
                            </Modal.Body>
                        </Modal>
            </div>
            <div>
                <p className='fs-4 mt-3 container'>Review Your Order</p>
                <div className='d-flex w-100 container'>
                    <div style={{width:"60%", maxHeight:"200px"}} className='container overflow-auto'>
                        <hr style={{width:"100%", height:"2px",backgroundColor:"black", opacity:"100%" }} />
                        {products?.map((item) => (
                            item.user_id == state?.user.id?  
                        <div >
                            
                            <div  className='mt-4'>
                                <div className='d-flex'>
                                    <img className='w-25 me-3' src={`http://localhost:5000/uploads/${item.product?.image}`} alt=''/>
                                        <div key={item.id}  className='d-flex w-100 mt-3'>
                                            <div className='me-auto'>
                                                <div>
                                                <p>{item.product?.name}</p>
                                                </div>
                                                <div className='d-flex' style={{height:"30px", boxSizing:"border-box"}}>
                                                <button className='me-2 btn py-0' onClick={() => HandleLess(Math.max(0, item.qty -= 1), item.id)}>-</button>
                                                <p className='me-2 py-1'>{item.qty}</p>
                                                <button className='me-2 btn py-0' onClick={() => HandleAdd(item.qty += 1, item.id)}>+</button>
                                                </div>

                                            </div>
                                            <div>
                                            <div className='container' >
                                                <p>{toRupiah(item.qty * item.product.price,{dot: '.', floatingPoint:0})} </p>
                                                </div>
                                                <div className='ps-1'>
                                                <img src={trash} onClick={() => { deleteById.mutate(item.id) }} className='ms-5' alt="a"/>
                                                </div> 
                                            </div>
                                        </div>
                                        
                                        
                                </div>
                            <hr style={{width:"100%", height:"2px",backgroundColor:"black", opacity:"100%", marginTop:"39px" }} />
                        </div>
                        </div>:null
                            )
                        )}
                    </div>
                    
                        
                    <div className='col-md-6' style={{width:"40%", overflow:"hidden"}}>
                        <hr className=' ms-3 me-3' style={{width:"100%", height:"2px",backgroundColor:"black", opacity:"100%" }} />
                            <div>
                                <div className='d-flex ms-3'>
                                    <p className='me-auto'>Subtotal</p>
                                    <p>{toRupiah(sum)}</p>
                                </div>
                                <div className='d-flex ms-3'>
                                    <p className='me-auto'>Qty</p>
                                    <p>{qty}</p>
                                </div>
                                <div className='d-flex ms-3'>
                                    <p className='me-auto'>Ongkir</p>
                                    <p>{toRupiah(ongkir)}</p>
                                </div>

                            <hr className=' ms-3 me-3 ' style={{width:"100%", height:"2px",backgroundColor:"black", opacity:"100%" }} />
                            <div className='d-flex ms-3'>
                               <p className='me-auto'>Total :</p> 
                               <p>{toRupiah(sum + 10000)}</p> 
                            </div>
                            </div>
                            
                    </div>
                    
                </div>
                <div className='w-100 text-end mt-4 '>
                <button className=' orderbtn text-white text-decoration-none rounded' style={{padding:"10px 100px "}} onClick={click}> Order</button>    
                </div>
            </div>
        </div>
          
        </div>
    ) : null }
    </div>
  )
}

export default Order