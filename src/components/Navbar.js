import React, { useContext, useState } from 'react';
import {  Button, Alert } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Icon from "../components/Icon.png"
import "./Style.css"
import { useNavigate } from 'react-router-dom';
import keranjang from "../components/Dummy/keranjang.png"
import profilekecil from "../components/Dummy/profilekecil.png"
import user from "../components/Dummy/user.png"
import vector from "../components/Dummy/Vector.png"
import logout from "../components/Dummy/logout.png"
import adminkecil from "../components/Dummy/adminkecil.png"
import { Dropdown } from 'react-bootstrap';
import { UserContext } from './context/userContext';
import { useCart } from "react-use-cart";
import { useMutation } from 'react-query';
import { API } from '../config/api';



function NavbarComp() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    phone: '',
    role:'',
  });

  const {name , email, password, gender, phone, role} = form

  const [message, setMessage] = useState(null)


  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", form);

      const alert = (
        <Alert variant="success">Berhasil mendaftarkan akun!</Alert>
      );

      setMessage(alert);

      console.log("ini response register", response);
    } catch (e) {
      console.log(e);
      const alert = (
        <Alert variant="danger">Aduh gagal!</Alert>
      );

      setMessage(alert);
    }
  });
  const handleSubmitLogin = useMutation(async (e) => {
    try {
      e.preventDefault();

      const data = await API.post("/login", form);

      const alert = <Alert variant="success">Login berhasil!</Alert>;

      setMessage(alert);

      let payload = data.data.data;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });

      navigate("/");

      console.log("isi payload", payload);
      console.log("ini data login", data);
    } catch (err) {
      console.log(err);
      const alert = <Alert variant="danger">Email / password salah!</Alert>;

      setMessage(alert);
    }
  });
  const { totalItems } = useCart();
  const [state, dispatch] = useContext(UserContext)
  console.log(state);
  const navigate = useNavigate ();
  
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [showregister, setShowregister] = useState(false);
  
    const handleCloseregister = () => setShowregister(false);
    const handleShowregister = () => setShowregister(true);

    console.log(form);

    const logoutt = () => {
      console.log(state)
      dispatch({
          type: "LOGOUT"
      })
      navigate("/")
  }
  

  const handleOnChange =(e) =>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  return (
    <div>
    <Navbar expand="lg" className='colornav'>
      <Container>
        <Navbar.Brand onClick={()=> navigate('/')}><img src={Icon} alt="Wayfood" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            {state.user.role == "user" ?  
            <div className='d-flex'>
              <div className='iconkanan gap-4'>
              <button variant="transparent" className='text-decoration-none text-dark logout me-2' onClick={()=> navigate('/orders')}><img src={keranjang} alt="" className='keranjang'/><span className='badge bg-danger position-absolute rounded-circle'>{totalItems}</span></button>
              </div>
            <Dropdown>
              <Dropdown.Toggle variant="transparent" id="dropdown-basic" >
                <img style={{width:'40px'}}  src={profilekecil} alt="profile"  className=''/>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1"><button variant="transparent" className='text-decoration-none text-dark logout' onClick={()=> navigate('/profiles')}><img width={25} src={user} alt="" /> Profile</button></Dropdown.Item>
              <Dropdown.Divider />
                <Dropdown.Item eventKey="3"><img width={25} src={logout} alt=""/><button variant="transparent" className='text-decoration-none fw-bold text-dark logout' onClick={logoutt}>Log Out</button></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </div> : state.user.role == "admin" ?
            <Dropdown>
              <Dropdown.Toggle variant="transparent" id="dropdown-basic" >
                <img style={{width:'40px'}}  src={adminkecil} alt="profile"  className=''/>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1"><button variant="transparent" className='text-decoration-none text-dark logout' onClick={()=> navigate('/profile-partners')}><img width={25} src={user} alt="" /> Profile Partner</button></Dropdown.Item>
                <Dropdown.Item eventKey="2"><button variant="transparent" className='text-decoration-none text-dark logout' onClick={()=> navigate('/add-products')}><img width={25} src={vector} alt="" /> Add Product</button></Dropdown.Item>
              <Dropdown.Divider />
                <Dropdown.Item eventKey="3"><img width={25} src={logout} alt=""/><button variant="transparent" className='text-decoration-none fw-bold text-dark logout' onClick={logoutt}>Log Out</button></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            : <div className='d-flex'>
              <Button className='bg-button me-1 d-flex align-items-center justify-content-center fw-bolder'onClick={handleShowregister}>Register</Button>
              <Button className='bg-button  d-flex align-items-center justify-content-center fw-bolder'  onClick={handleShow}>Log In</Button>
            </div> }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
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
            <input type="password" class="form-control modalinputt" id="exampleInputPassword1" placeholder='Password' name='password' value={form.password} onChange={handleOnChange} />
          </div>
          <div className='d-flex justify-content-center '>
            <Button variant="primary" className="login m-4" onClick={
              (e) => {handleSubmitLogin.mutate(e) ; handleClose ()}
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
            <input type="email" class="form-control modalinputt" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email' onChange={handleOnChange} value={form.email} name="email"/>
          </div>
          <div class=" modalinput mx-auto">
            <label for="exampleInputEmail1" class="form-label"></label>
            <input type="password" class="form-control modalinputt" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Password' onChange={handleOnChange} value={form.password} name="password"/>
          </div>
          <div class=" modalinput mx-auto">
            <label for="exampleInputEmail1" class="form-label"></label>
            <input type="text" class="form-control modalinputt" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Full Name' onChange={handleOnChange} value={form.name} name="name"/>
          </div>
          <div class=" modalinput mx-auto">
            <label for="exampleInputEmail1" class="form-label"></label>
            <input type="text" class="form-control modalinputt" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Gender'onChange={handleOnChange} value={form.gender} name="gender"/>
          </div>
          <div class=" modalinput mx-auto mb-4">
            <label for="exampleInputEmail1" class="form-label"></label>
            <input type="number" class="form-control modalinputt" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Phone Number'onChange={handleOnChange} value={form.phone} name="phone"/>
          </div>
          <div class=" modalinput mx-auto mb-2">
          <select class="form-select modalinputt" aria-label="Default select example" onChange={handleOnChange} value={form.role} name="role">
            <option selected hidden>As Who ?</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          </div>
          <div className='d-flex justify-content-center '>
          <Button variant="primary" onClick={(e) => {handleSubmit.mutate(e) ; handleShow ()}} className="login m-4">Register</Button>
          </div>
          <div className='d-flex justify-content-center '>
            <p>Already have an account ? Klik <strong className='cursor' onClick={() =>{handleShow () ; handleCloseregister()}}>Here</strong></p>
          </div>
        </form>
        </Modal.Body>
      </Modal>
      
    </div>
    
  );
}


export default NavbarComp;

