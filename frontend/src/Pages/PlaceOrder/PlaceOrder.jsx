import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';


const PlaceOrder = () => {
  
  const {getTotalCartAmount, token, food_list, cartItem, url} = useContext(StoreContext);
  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    zipcode:"",
    state:"",
    country:"",
    phone:""
  })

   const onChangeHndler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
   }

    const PlaceOrder =async (event)=>{
      event.preventDefault();
      let  orderItem = [];
      food_list.map((item)=>{
        if (cartItem[item._id]>0) {
          let itemInfo = item;
          itemInfo["quantity"]= cartItem[item._id];
          orderItem.push(itemInfo)
        }
      })
      let orderData = {
        address:data,
        items:orderItem,
        amount:getTotalCartAmount()+2,
      }
      let response = await axios.post(url+"/api/order/place", orderData, {headers:{token}});
      if (response.data.success) {
        const {session_url} = response.data;
        window.location.replace(session_url)
      }else{
        alert("Error")
      }
    } 
const navigate = useNavigate();
    
    useEffect(()=>{
       if (!token) {
        navigate("/cart")
       }
       else if(getTotalCartAmount()===0){
          navigate("/cart")
       }
       }, [token])
       
  return (
    <form onSubmit={PlaceOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input required name='firstName' onChange={onChangeHndler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHndler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHndler} value={data.email} type="email" placeholder='email address' />
        <input required name='street' onChange={onChangeHndler} value={data.street} type="text" placeholder='street' />
     
      <div className="multi-field">
          <input required name='city' onChange={onChangeHndler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHndler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-field">
          <input required name='zipcode' onChange={onChangeHndler} value={data.zipcode} type="text" placeholder='Zipcode' />
          <input required name='country' onChange={onChangeHndler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHndler} value={data.phone} type="text"  placeholder='Phone number'/>
        </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Total Cart</h2>
          <div>
          <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
            </div>
            <button type='submit' >Proceed To Payment</button>
        </div>
          </div>
      </form>
      
    // </div>
  )
}

export default PlaceOrder
