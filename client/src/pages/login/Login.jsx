import React, { useState } from 'react'
import loginImg from "../../photos/login.jpg"
import {TextField, Button} from "@mui/material"
import {Link, useNavigate} from "react-router-dom"
import "./Login.css"
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../appApi/apiSlice'
import { setCredentials } from '../../features/authSlice'
import { useApp } from '../../context'
const Login = () => {
  const [login,{isLoading}]=useLoginMutation()
  const {socket}=useApp()
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const [loginUser,setloginUser]=useState({
    email:"",
    password:""
  })

  const handleChange=(e)=>{
    setloginUser(user=>({...user,[e.target.name]:e.target.value}))
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
      try{
        const res= await login(loginUser) 
        dispatch(setCredentials(res.data)) 
        socket.emit("new-user")
        navigate("/messenger",{replace:true})
      }
      catch(err){
        console.log(err)
      }
  }


  return (
    <div className="loginContainer">
      <div className="loginLeft">
         <form action="" onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <TextField placeholder='Email' sx={{margin:"15px 0px"}} onChange={handleChange} value={loginUser.email} name="email"/>
            <TextField placeholder='Password' sx={{margin:"15px 0px"}} onChange={handleChange} value={loginUser.password} name="password"/>
            <Button type="submit" color="primary" variant="contained" sx={{width:"30%",justifySelf:"center"}}>{isLoading?"Logging":"Login"}</Button>
         </form>
         <p>Dont have an account?<Link to="/register" >Register</Link></p>
      </div>
      <div className="loginRight">
        <div className="loginImage">
          <img src={loginImg} alt="user" />
        </div>
      </div>
    </div>
  )
}

export default Login
