import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing";
import NavbarComp from "./components/Navbar";
import Order from "../src/components/Order"
import IncomeTransactions from "./pages/IncomeTransactions"
import EditProfile from "./pages/EditProfiles"
import AddProduct from "./pages/AddProducts"
import Profiles from "./components/Profiles";
import ProfilePartners from "./pages/ProfilePartners";
import EditProfilePartners from "./pages/EditProfilePartners";
import Detail from "../src/components/Detail";
import { useState } from "react"
import { useCart } from "react-use-cart";
import { useContext, useEffect } from "react";
import { UserContext } from "./components/context/userContext";
import { API, setAuthToken } from "./config/api";



function App() {


  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  },[])


    const checkUser = async () => {
      try {
        const response = await API.get("/check-auth");
        console.log(response);
  
        if (response.status === 404) {
          return dispatch({
            type: "AUTH_ERROR",
          });
        }
  
        let payload = response.data.data;
        payload.token = localStorage.token;
  
        dispatch({
          type: "USER_SUCCESS",
          payload,
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      checkUser();
    }, []);

  const {
    totalItems,
    addItem,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal, 
    isEmpty
  } = useCart();
  

  return (
    <>
      <NavbarComp state = {state} useState = {useState} totalItems={totalItems}/>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/detail-menu/:id" element={<Detail addItem={addItem}/>} />
        <Route exact path="/orders" element={<Order addLess={updateItemQuantity} cartTotal={cartTotal} totalItems={totalItems} items={items} empty={isEmpty} removeItem={removeItem}/>} />
        <Route exact path="/income-transactions" element={<IncomeTransactions />} />
        <Route exact path="/edit-profiles" element={<EditProfile />} />
        <Route exact path="/edit-profile-Partners" element={<EditProfilePartners />} />
        <Route exact path="/add-products" element={<AddProduct />} />
        <Route exact path="/profiles" element={<Profiles />} />
        <Route exact path="/profile-partners" element={<ProfilePartners />} />
      </Routes>
    </>
  );
}


export default App;





