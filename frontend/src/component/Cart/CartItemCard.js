import React from 'react'
import './cartItemCard.css'
import {Link} from 'react-router-dom'

export const CartItemCard = ({item,deleteCartItems}) => {
  return (
    <div className='CartItemCard'>
       <img src={item.image} alt="img"/>
       <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price:Rs${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
       </div>
    </div>
  )
}
