import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from './context/userContext';
import { cards } from './Dummy/Card'
import { useState } from 'react';
import {  Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { API } from '../config/api';
import { useQuery } from 'react-query';



export const Restaurant = () => {
  const navigate = useNavigate ();

  const [dataUser, setLogin] = useContext(UserContext)
  
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showregister, setShowregister] = useState(false);

  const handleCloseregister = () => setShowregister(false);
  const handleShowregister = () => setShowregister(true);

  const[form, setForm] = useState({
    email:"",
  })
  const handleOnChange =(e) =>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    
    if(form.email === "admin@mail.com"){
      setLogin({
        type: "LOGIN_ADMIN"
      })
      handleClose()
      navigate('/Profile-Partners')
  } else if (form.email === "user@mail.com"){
    setLogin({
      type: "LOGIN_USER"
    })
    handleClose()
  }
  else {
    alert("Masukan Email yang benar")
  }
}

const [state, dispatch] = useContext(UserContext)

let { data: users } = useQuery("adminCache", async () => {
  const response = await API.get("/users");
  const userss = response.data.data.filter ((e) => e.role == "admin") 
  return userss;
});

console.log(users);

  return (
    <div className='w-75 mx-auto gap-5 mt-5 mb-5'>
        <div className='d-flex justify-content-start'>
            <h2>Restaurant Near You</h2>
        </div>
        <div className='d-flex justify-content-between flex-wrap mx-auto mt-5' >
          
        {dataUser.isLogin || dataUser.isLoginAdmin ?
        <div className='d-flex justify-content-evenly w-100 flex-wrap mx-auto mt-5'>

          {users?.map((item) => {
            return(
            <div class="card cursor" style={{width: "18rem"}} onClick={() => navigate(`/detail-menu/${item.id}`)}>
            <img class="card-img-top detailfoto" src={item.image} alt="Card image cap" style={{objectFit:"cover"}} />
            <div class="card-body">
              <h5 class="card-title d-flex justify-content-start" >{item.name}</h5>
              <p class="card-text d-flex justify-content-start">10 KM</p>
            </div>
          </div>
            ) 
        })} 
        </div> :
        <div className='d-flex justify-content-evenly w-100 flex-wrap mx-auto mt-5'>

          {cards.map((item) => {
              return(
              <div class="card cursor" style={{width: "18rem"}} onClick={handleShow}>
              <img class="card-img-top detailfoto" src={item.image} alt="Card image cap" style={{objectFit:"cover"}}/>
              <div class="card-body">
                <h5 class="card-title d-flex justify-content-start" >{item.nama}</h5>
                <p class="card-text d-flex justify-content-start">{item.jarak}</p>
              </div>
            </div>
              ) 
          })}
        </div>
        }
        </div>
        <Modal show={show} onHide={handleClose} className=' d-flex flex-column justify-content-center align-items-center'>
        <Modal.Body>
        <form>
          <div className='modalbody'>
          <h2>Login</h2>
          </div>
          <div class=" modalinput mx-auto">
            <label for="exampleInputEmail1" class="form-label"></label>
            <input name="email" type="email" class="form-control modalinputt" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email' value={form.email} onChange={handleOnChange}/>
          </div>
          <div class=" modalinput mx-auto mb-4">
            <label for="exampleInputPassword1" class="form-label"></label>
            <input type="password" class="form-control modalinputt" id="exampleInputPassword1" placeholder='Password' />
          </div>
          <div className='d-flex justify-content-center '>
            <Button variant="primary" className="login m-4" onClick={
              handleOnSubmit
            } >Log In</Button>
          </div>
          <div className='d-flex justify-content-center '>
            <p>Don't have an account ? Klik {" "} <strong className='cursor' onClick={() =>{handleClose () ; handleShowregister()}}>Here</strong></p>
          </div>
        </form>
        </Modal.Body>
      </Modal>
      <Modal show={ showregister } onHide={handleCloseregister} className=' d-flex flex-column justify-content-center align-items-center'>
        <Modal.Body>
        <form>
          <div className='modalbody mt-3'>
          <h2 className=''>Register</h2>
          </div>
          <div class=" modalinput mx-auto">
            <label for="exampleInputEmail1" class="form-label"></label>
            <input type="email" class="form-control modalinputt" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email'/>
          </div>
          <div class=" modalinput mx-auto">
            <label for="exampleInputEmail1" class="form-label"></label>
            <input type="password" class="form-control modalinputt" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Password'/>
          </div>
          <div class=" modalinput mx-auto">
            <label for="exampleInputEmail1" class="form-label"></label>
            <input type="text" class="form-control modalinputt" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Full Name'/>
          </div>
          <div class=" modalinput mx-auto">
            <label for="exampleInputEmail1" class="form-label"></label>
            <input type="text" class="form-control modalinputt" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Gender'/>
          </div>
          <div class=" modalinput mx-auto mb-4">
            <label for="exampleInputEmail1" class="form-label"></label>
            <input type="number" class="form-control modalinputt" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Phone Number'/>
          </div>
          <div class=" modalinput mx-auto mb-2">
          <select class="form-select modalinputt" aria-label="Default select example">
            <option selected hidden>As Who ?</option>
            <option value="1">User</option>
            <option value="2">Admin</option>
          </select>
          </div>
          <div className='d-flex justify-content-center '>
          <Button variant="primary" onClick={handleCloseregister} className="login m-4">Register</Button>
          </div>
          <div className='d-flex justify-content-center '>
            <p>Already have an account ? Klik <strong className='cursor' onClick={() =>{handleShow () ; handleCloseregister()}}>Here</strong></p>
          </div>
        </form>
        </Modal.Body>
      </Modal>
      
    </div>
  )
}

