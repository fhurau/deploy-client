import React, {useContext} from 'react'
import { Container } from 'react-bootstrap'
import Icon from "./Icon.png"
import profilepartner from "./Dummy/profilepartner.png"
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../components/context/userContext";



const Profile = () => {
  const navigate = useNavigate ();

  const [state, dispatch] = useContext(UserContext)

  return (
    <div className='margintop'>
        <Container className='w-75 mx-auto'>
        <div className='d-flex w-100'>
            <div className='w-50'>
                <h1 className='fontgede'>Profile Partner</h1>
                <div className='d-flex'>
                    <div className='me-3'>
                        <div>
                        <img src={profilepartner} alt="" />
                        </div>
                        <button className='mt-3 tomboledit' onClick={()=> navigate('/edit-profile-partners')}>Edit Profile</button>
                    </div>
                    <div className='ms-3'>
                        <div>
                        <h3 className='fontkecil'>Full Name</h3>
                        <p className='fontkecil'>{state.user.name}</p>
                        </div>
                        <div>
                        <h3 className='fontkecil'>Email</h3>
                        <p className='fontkecil'>{state.user.email}</p>
                        </div>
                        <div>
                        <h3 className='fontkecil'>Phone</h3>
                        <p className='fontkecil'>{state.user.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-50'>
                <h1 className='fontgede'>History transaction</h1>
                <Container className='border d-flex'>
                    <div className='m-2 w-75'>
                        <h5>Geprek Bensu</h5>
                        <p><strong>Saturday</strong>, 12 March 2021</p>
                        <p className='text-danger'>Total : Rp 45.000</p>
                    </div>
                    <div className='w-25'>
                        <div>
                        <img src={Icon} alt="" className='mt-2'/>
                        </div>
                        <button className='mt-3 ms-5 finish rounded' onClick={()=> navigate('/income-transactions')}>Finished</button>
                    </div>
                </Container>
            </div>
        </div>
        
        </Container>
    </div>
  )
}

export default Profile