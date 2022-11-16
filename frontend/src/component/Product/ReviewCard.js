import React from 'react'
import ReactStars from 'react-rating-stars-component';
import Profile from '../../images/Profile.png'
import { Rating } from '@mui/material'

export const ReviewCard = ({review}) => {

const options = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className='reviewCard'>
    <img src={Profile} alt="User"/>
    <p>{review.name}</p>
    <Rating {...options}/>
    <span className='reviewCardComment'>{review.comment}</span>
    </div>
  )
}
