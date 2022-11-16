import './App.css';
import {Header} from "./component/layout/Header/Header.js"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import WebFont from "webfontloader"
import { useEffect,useState } from 'react';
import { Footer } from './component/layout/Footer/Footer.js';
import {Home} from "./component/Home/Home.js"
import {ProductDetails} from './component/Product/ProductDetails.js'
import {Products} from "./component/Product/Products.js"
import { Search } from "./component/Product/Search.js"
import { SignUpLogin } from './component/User/SignUpLogin';
import {store} from "./store"
import { loadUser } from './actions/userAction';
import {UserOptions} from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import { Profile } from './component/User/Profile';
import {Cart} from './component/Cart/Cart.js'
import {Shipping} from './component/Cart/Shipping.js'
import {ConfirmOrder} from './component/Cart/ConfirmOrder.js'
import {Payment} from './component/Cart/Payment.js'
import { ProtectedRoute } from './component/Route/ProtectedRoute';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';

const URL = 'http://localhost:4000'

export const App = () => {

  const {isAuthenticated,user} = useSelector(state => state.user)

  const [stripeApiKey,setStripeApiKey] = useState("")

  async function getStripeApiKey()
  {
    const {data} = await axios.get(`${URL}/api/v1/stripeapikey`)
    setStripeApiKey(data.stripeApiKey)
  }


useEffect(()=>{
  WebFont.load({
   google:{
     families:["Roboto","Droid Sans","Chilanka"]
   }
  })
   
    store.dispatch(loadUser());
    getStripeApiKey();
    
 },[])

  return (
    <Router>
      {isAuthenticated && <UserOptions user = {user} />}
      <Header />

      <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/product/:id" element={<ProductDetails/>} />
      <Route exact path="/products" element={<Products/>} />
      <Route path="/products/:keyword" element={<Products/>} />
      <Route exact path="/search" element={<Search/>} /> 
      <Route exact path="/login" element={<SignUpLogin/>} /> 
      {isAuthenticated && <Route exact path="/account" element={<Profile/>}/>}
      <Route exact path="/cart" element={<Cart/>} /> 
      {isAuthenticated && <Route exact path="/shipping" element={<Shipping/>}/>}
      {isAuthenticated && <Route exact path="/order/confirm" element={<ConfirmOrder/>}/>}
     
          
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
           {isAuthenticated &&<Route exact path="/process/payment" element={<Payment/>}/>}
        </Elements>
      )}

      </Routes>      
      <Footer />
    </Router>
  )
}

