
import axios from "axios"
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    CLEAR_ERRORS
} from "../constants/productConstants"

const URL = 'http://localhost:4000'

export const getProduct = (keyword="",currentPage=1,price=[0,25000],category,ratings=0) => async(dispatch) =>{

    try{
        dispatch({
            type:ALL_PRODUCT_REQUEST
        })

        let link = `${URL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
         
        if(category){
        link = `${URL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }

    const {data} = await axios.get(link)
       
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
    }

    catch(err){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:err.response.data.message,
        })
    }
}



export const getProductDetails = (id) => async(dispatch) =>{

    try{
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })

        const {data} = await axios.get(`${URL}/api/v1/product/${id}`)
        console.log(data)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })
    }

    catch(err){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:err.response.data.message,
        })
    }
}

//New Review
export const newReview = (reviewData) => async(dispatch) =>{

    try{
        dispatch({
            type: NEW_REVIEW_REQUEST
        })

        const config ={
            headers:{"Content-Type":"application/json"}
        }

        const {data} = await axios.put(`${URL}/api/v1/review`,reviewData,config)
        console.log(data)
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload:data.success
        })
    }

    catch(err){
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload:err.response.data.message,
        })
    }
}

export const clearErrors = () => async(dispatch) =>{
    dispatch({type:CLEAR_ERRORS})
}


