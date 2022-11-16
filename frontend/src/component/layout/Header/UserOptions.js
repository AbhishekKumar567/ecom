import React, { useState } from 'react'
import {SpeedDial,SpeedDialAction} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt'
import {useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { logout } from '../../../actions/userAction';
import { Backdrop } from '@mui/material';
import './Header.css'

export const UserOptions = ({user}) => {

   const {cartItems} = useSelector(state=>state.cart)

  const [open, setOpen] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ShoppingCartIcon />, name: `Cart(${cartItems.length})`, func: cart },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];


  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
  }


  return (
    <>
    <Backdrop open={open} style={{zIndex:"10"}} />
    <SpeedDial
    ariaLabel="SpeedDial tooltip example"
    onClose = {()=>setOpen(false)}
    onOpen = {()=>setOpen(true)}
    open={open}
    direction="down"
    className='speedDial'
    icon = {
        <img
        className='speedDialIcon'
        src={user.avatar.url?user.avatar.url:"/logo192.png"}
        alt="Profile"
        />
    }
    >
  
    {
      options.map((item) => (
        <SpeedDialAction
        key={item.name}
        icon = {item.icon}
        tooltipTitle={item.name}
        onClick={item.func}
        />
      ))
    }

    </SpeedDial>
    </>
  )
}
