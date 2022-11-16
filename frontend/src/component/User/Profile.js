
import React,{useEffect} from 'react'
import {Loader} from '../layout/loader/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import './Profile.css'

export const Profile = () => {

    const { user, loading, isAuthenticated } = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(()=>{
        if(isAuthenticated === false){
            navigate("/login")
        }
    },[navigate,isAuthenticated])

    return (

        <>
            {loading ? (
                <Loader />
            ) :
                (
                    <>
                        <div className='profileContainer'>
                            <div>
                            <h1>My Profile</h1>
                            <img src={user.avatar.url} alt={user.name} />
                            <Link to='/my/update'>Edit Profile</Link>
                          </div>
                    
                    <div>
                        <div>
                            <h4>Full Name</h4>
                            <p>{user.name}</p>
                        </div>

                        <div>
                            <h4>Email</h4>
                            <p>{user.email}</p>
                        </div>

                        <div>
                            <Link to="/orders">My Orders</Link>
                            <Link to="/password/update">Change Password</Link>
                        </div>
                    </div>
                    </div>
                    </>
                )
            }
        </>

    )
}
