import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import {Routes, Route} from 'react-router-dom'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Home from './Pages/Home/Home'
import Footer from './Components/Footer/Footer'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import Verify from './Pages/verify/Verify'
import MyOrders from './Pages/myOrders/MyOrders'


const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup  setShowLogin={setShowLogin}/>:<> </>}
    <div className='app'>
     <Navbar setShowLogin={setShowLogin} />
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/order' element={<PlaceOrder/>}/>
      <Route path='/verify' element={<Verify />}/>
      <Route path='/myorders' element={<MyOrders />}/>
     </Routes>
    </div>
    <Footer />
    </>
    
  )
}

export default App
