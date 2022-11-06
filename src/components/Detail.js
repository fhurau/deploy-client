import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { details } from './Dummy/Details'
import { useCart } from "react-use-cart";
import { useMutation, useQuery } from 'react-query';
import { API } from '../config/api';
import { Await, useParams } from 'react-router-dom';




function Detail () {

const { addItem } = useCart();



const [product, setProducts]= useState({
    product_id : 0,
    status:"",
    price:0,
})

console.log(product);

const getProduct = useMutation(async(e) => {
    try {
        const response= await API.post("/transactions", product)
        console.log("aaaaaaaaaaaaaaaa",response);
    } catch (error) {
        console.log(error);
    }
})


let {id} = useParams();
let { data: products } = useQuery("adminnCache", async () => {
    const response = await API.get("/products");
    const userss = response.data.data.filter ((e) => e.user_id == id) 
    return userss;
  });

    return(
        <>
    <Container>
        <div className='w-100 mx-auto mt-4'>
            <h2 className='mt-5 mb-3'>Menus</h2>
            <div className='d-flex flex-wrap gap-4'>
            {products?.map((item) => {
                return(
                    <div key={item.id} class="card" style={{width: "18rem"}}>
                    <img src={item.image} class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">{item.name}</h5>
                        <p class="card-text">{item.price}</p>
                        <button class="btn tombol" onClick={(e) => {setProducts({ product_id: item.id , price:item.price,  status:"terserah apa"}); ; getProduct.mutate(e)}}>Order</button>
                    </div>
                    </div>
                )
            })}
            </div>
        </div>
    </Container>
        </>
    );
}

export default Detail;
