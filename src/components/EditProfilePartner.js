import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import maps from "../components/Dummy/maps.png"
import mapkecil from "../components/Dummy/mapkecil.png"
import { useNavigate } from 'react-router-dom';
import { useParams} from 'react-router-dom';
import { useQuery} from "react-query";
import { API } from "../config/api";
import { UserContext } from '../components/context/userContext';


const EditProfilePartner = () => {
  const [state, dispatch] = useContext(UserContext)

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


    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate ();

    const [form, setForm] = useState({
        image: "",
        name: "",
        phone: "",
        location: "",
    });

    let { data: user } = useQuery("userCache", async () => {
        const response = await API.get("/user/" + state.user.id);
        console.log("aaaa",response);
        return response.data.data;
    });

    useEffect(() => {
        if (user) {
            setForm({
            ...form,
            name: user.name,
            image: user.image,
            phone: user.phone,
            location: user.location,
            });
        }
    },[user]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
            e.target.type === "file" ? e.target.files : e.target.value,
        });
    
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        try {

            console.log(handleSubmit);
            e.preventDefault();
    
            const formData = new FormData();
            if (form.image) {
            formData.set("image", form?.image[0], form?.image[0]?.name);
            }
                formData.set("name", form.name);
                formData.set("email", form.email);
                formData.set("phone", form.phone);
                formData.set("location", form.location);
    
            const response = await API.patch("/user/" + user.id , formData);
    
            console.log(response.data);
    
            navigate("/profile-partners");
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div>
        <Container className='w-75 margintop'>
            <h2 className=''>Edit Profile Partner</h2>
            <form action="">
                <div className='d-flex mt-5 mb-3'>
                    <input type="text" className='w-75 me-3 labeladd' placeholder='   Name' name='name' onChange={handleChange} />
                    <div class="input-group mb-3 w-25">
                        <label class="input-group-text labeladd rounded-end fw-bolder" for="inputGroupFile01">Attach File</label>
                        <input type="file" class="form-control" id="inputGroupFile01" hidden name='image' onChange={handleChange}/>
                    </div>
                </div>
                <input type="email" className='w-100 labeladd mb-2' placeholder='   Email' name='email' onChange={handleChange}/>
                <input type="number" className='w-100 labeladd mt-2' placeholder='   Phone'name='phone' onChange={handleChange}/>
                <div className='d-flex my-3'>
                    <input type="text" className='w-75 me-3 labeladd' placeholder='   Adress' name='location' onChange={handleChange} value={mapLongLat}/>
                    <div class="input-group mb-3 w-25">
                        <button class=" labeladd rounded-end labeledit fw-bolder" type="button" onClick={() => { handleShow(); getLocation();}}>Select On Map <img src={mapkecil} alt="" /></button>
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
                                title="myFrame">
                            </iframe>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
                <div className='d-flex justify-content-end mt-3'>
                    <button className='w-25 fw-bold text-light rounded tombolsave' onClick={(e)=> handleSubmit(e)}>Save</button>
                </div>
            </form>
        </Container>
        <>
        </>
    </div>
  )
}

export default EditProfilePartner