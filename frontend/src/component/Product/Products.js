import React, { useEffect,useState } from 'react'
import './Products.css'
import {useSelector,useDispatch} from 'react-redux'
import { getProduct } from '../../actions/productAction'
import { Product } from '../Home/Product'
import { Loader } from '../layout/loader/Loader'
import { useParams } from 'react-router-dom'
import Pagination from "react-js-pagination"
import { Typography,Slider} from '@mui/material'


const categories =[
    "Laptop",
    "Footwear",
    "Bottom",
    "Shoes",
    "Attire",
]

export const Products = () => {

    const dispatch= useDispatch()

    const [currentPage,setCurrentPage] = useState(1)
    const [price,setPrice] = useState([0,25000])
    const [category,setCategory] = useState("")
    const [ratings,setRatings] = useState(0)
    

    const {products,loading,error,productsCount,resultPerPage,filteredProductsCount} = useSelector((state)=>state.products.products)
 
    const {keyword} = useParams()

    const priceHandler = (e,newPrice)=>{
         setPrice(newPrice)
    }
    
    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)
    }

useEffect(()=>{

    dispatch(getProduct(keyword,currentPage,price,category,ratings))
},[dispatch,keyword,currentPage,price,category,ratings])

let count = filteredProductsCount

  return (
    <>
    {
        loading ? <Loader/>:
        <>
        <h2 className='productsHeading'>Products</h2>

        <div className='products'>
            {
                products && products.map((product)=>(
                    <Product key={product._id} product={product}/>
                ))
            }
        </div>

        <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

          <Typography>Categories</Typography>

          <ul className='categoryBox'>
           {
            categories.map((category)=>(
                <li
                className='category-link'
                key={category}
                onClick={()=>setCategory(category)}
                >
                {category}
                </li>
            ))
           }
          </ul>

          <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

        <div className='paginationBox'>

            {
                resultPerPage < count &&
                (
            <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
            />

                )
            }
        </div>

        </>
    }
    </>
  )
}


