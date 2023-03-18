import React from 'react'
import photo1 from "../../photos/profile4.jpg"
import bot from "../../photos/botPhoto.jpg"
import "./Navbar.css"
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectCurrentUser } from '../../features/authSlice'
import axios from 'axios'
const Navbar = () => {
  const user=useSelector(selectCurrentUser)
  console.log(user)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handlelogout=async()=>{
      await axios.get(`https://messenger-app-api.onrender.com/logout/${user._id}`)
      dispatch(logout())
      navigate("/",{replace:true})
  }
  return (
    <div className="container">
      <div className="logo">
        <img src={bot} alt="" />
        <Link to="/" style={{textDecoration:"none",color:"inherit"}}><span>Conn<span className="changeColor">ect</span></span></Link>
      </div>
      <div className="right">
        {
          !user &&
          <div className="navLinks">
            <div className="loginLink">
              <Link to="/register" style={{textDecoration:"none",color:"white"}}>
                  <span>Register</span>
              </Link>
            </div>
            <div className="signupLink">
              <Link to="/login" style={{textDecoration:"none",color:"white"}}>
                <span>Login</span>
              </Link>
            </div>
          </div>
        }
        <span className="chatLink">
          <Link to="/messenger" style={{textDecoration:"none",color:"white"}}>
                <span>Chat</span>
          </Link>
        </span>
        {user &&
          <span className="chatLink" onClick={async()=>await handlelogout()}>
              Logout
          </span>
        }
        {user &&
        <div className="user">
          <img src={user?.profilePic?user.profilePic:photo1} alt="" />
          <span>{user?.username}</span>
        </div>
        }
      </div>
    </div>
  )
}

export default Navbar
