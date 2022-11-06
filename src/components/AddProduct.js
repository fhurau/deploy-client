import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useMutation } from "react-query";
import { API } from "../config/api";





const AddProduct = () => {
    const [preview, setPreview] = useState(null);

    const navigate = useNavigate ();
    const [form, setForm] = useState({
    image: "",
    name: "",
    price: 0,
    });

    const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
        let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
    }
    };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      console.log(handleSubmit);

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("name", form.name);
      formData.set("price", form.price);

      const data = await API.post("/product", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      navigate("/detail-menu");

    } catch (error) {
      console.log(error);
    }
  });




  return (
    <div>
        <Container className='w-75 margintop'>
            <h2 className=''>Add Product</h2>
            <form action="">
            {preview && (
                <div><img src={preview} style={{
                        maxWidth: "150px",
                        maxHeight: "150px",
                        objectFit: "cover",
                    }}
                    alt={preview}/>
                </div>
            )}
                <div className='d-flex mt-5 mb-3'>
                    <input type="text" className='w-75 me-3 labeladd' placeholder='   Title' name='name' onChange={handleChange}/>
                    <input type="file" className='w-25 labeladd' placeholder='  Attach File' name='image'onChange={handleChange}/>
                </div>
                <input type="number" className='w-100 labeladd' placeholder='   Price' name='price'onChange={handleChange}/>
                <div className='d-flex justify-content-end mt-3'>
                    <button className='w-25 fw-bold text-light rounded tombolsave' onClick={(e)=> handleSubmit.mutate(e)}>Save</button>
                </div>
            </form>
        </Container>
    </div>
    )
}

export default AddProduct