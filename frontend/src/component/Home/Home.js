import React, { useEffect } from 'react'
import { CgMouse } from 'react-icons/all'
import './Home.css'
import {Product} from './Product.js'
import {getProduct} from '../../actions/productAction'
import {useDispatch,useSelector} from "react-redux"
import {MetaData} from '../layout/MetaData'
import { Loader } from '../layout/loader/Loader'

export const Home = () => {

  const dispatch = useDispatch()
  const {loading,error,products,productsCount} = useSelector((state) => state.products.products)
/*
const product = [
  {
    prod1:{
      name:"ab",
      age:12,
    },
    prod2:{
      name:"bc",
      age:13,
    },
    prod3:{
      name:"yu",
      age:18,
    },
    prod4:{
      name:"cd",
      age:19,
    },
  }
]
*/

useEffect(()=>{

  dispatch(getProduct())
},[dispatch])


  return (
   <>
  
  {loading?<Loader />: 
  <>
   <MetaData title="ECOMMERCE"/>
   <div className='banner'>
       <p>Welcome to Ecommerce site</p>
       <h1>Find Amazing Products here</h1>

       <a href="#con">
           <button>
               Scroll <CgMouse/>
           </button>
       </a>
   </div> 

   <h2 className='homeHeading'>Featured Products</h2>

   <div className='container' id='container'>
     {
       products && products.map((product)=>(
      <Product product={product}/>
      ))
     }
     
   </div>

   </>
   }
   </>
  )
}
