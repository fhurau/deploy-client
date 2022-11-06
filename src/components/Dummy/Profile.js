import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import profil from "../Dummy/profil.png"
import Icon from "../Icon.png"
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { API } from '../../config/api';
import { useQuery} from "react-query";




const Profile = () => {
  const navigate = useNavigate ();

  const [state, dispatch] = useContext(UserContext)

  let { data: transactions } = useQuery("transactionssCache", async () => {
    const response = await API.get("/transaction");
    const response2 = response.data.data.filter(
      (p) => p.buyer_id == state.user.id
    );
    return response2;
  });

  

  return (
    <div className='margintop'>
        <Container className='w-75 mx-auto'>
        <div className='d-flex w-100'>
            <div className='w-50'>
                <h1 className='fontgede'>My Profile</h1>
                <div className='d-flex'>
                    <div className='me-3'>
                        <div>
                        <img src={`http://localhost:5000/uploads/${state.user.image}`} alt="" />
                        </div>
                        <button className='mt-3 tomboledit' onClick={()=> navigate('/edit-profiles')}>Edit Profile</button>
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
                {transactions?.map((item) => (
                <Container className='border d-flex'>
                    <div className='m-2 w-75'>
                        <h5>{item.product.name}</h5>
                        <p>{item.date}</p>
                        <p className='text-danger'>Total : {item.price}</p>
                    </div>
                    <div className='w-25'>
                        <div>
                        <img src={Icon} alt="" className='mt-2'/>
                        </div>
                        <button className='mt-3 ms-5 finish rounded'>Finished</button>
                    </div>
                </Container>
                ))}
            </div>
        </div>
        
        </Container>
    </div>
  )
}

export default Profile