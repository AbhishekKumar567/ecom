import React from 'react'
import './Cart.css'
import { CartItemCard } from './CartItemCard.js'
import { useDispatch, useSelector } from 'react-redux'
import {addItemToCart,removeItemFromCart} from '../../actions/cartAction'
import { useNavigate } from 'react-router-dom'

export const Cart = () => {

  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.cart)
  const navigate= useNavigate()

  const increaseQuantity = (id,quantity,stock) => {
    const newQty = quantity+1
    if(stock<=quantity)
    {
      return
    }
    dispatch(addItemToCart(id,newQty))
  }

  const decreaseQuantity = (id,quantity) => {
    const newQty = quantity-1
    if(quantity<=1)
    {
      return
    }
    dispatch(addItemToCart(id,newQty))
  }

  const deleteCartItems = (id) => {
    dispatch(removeItemFromCart(id))
  }


  const checkoutHandler = () => {
    navigate("/shipping")
  }

  return (
    <>
      <div className='cartPage'>
        <div className='cartHeader'>
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>

        {
          cartItems && cartItems.map((item) => (

            <div className='cartContainer'>
              <CartItemCard item={item} deleteCartItems={deleteCartItems}/>
              <div className='cartInput'>
                <button onClick={()=> decreaseQuantity(item.product,item.quantity,item.stock)}>-</button>
                <input type="number" value={item.quantity} readOnly />
                <button onClick={()=> increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
              </div>
              <p className='cartSubtotal'>{`Rs${item.price * item.quantity}`}</p>
            </div>

          ))
        }


        <div className='cartGrossProfit'>
          <div className='cartGrossProfitBox'>
            <p>Gross Total</p>
            <p>{`Rs${cartItems.reduce((acc,item) => acc+item.quantity*item.price,0)}`}</p>
          </div>
          <div className='checkOutBtn'>
            <button onClick={checkoutHandler}>Check Out</button>
          </div>
        </div>
      </div>
    </>
  )
}

