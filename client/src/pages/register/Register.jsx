import React from 'react'
import registerImg from "../../photos/register.jpg"
import bot from "../../photos/botPhoto.jpg"
import Add from "@mui/icons-material/Add"
import { Button, TextField } from '@mui/material'
import axios from "axios"
import { Link } from 'react-router-dom'
import "./Register.css"
import { useState } from 'react'
import { useRegisterMutation } from '../../appApi/apiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context'

const Register = () => {
  const [register,{isLoading}]=useRegisterMutation()
  const {socket}=useApp()
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const [registerUser,setRegisterUser]=useState({
    username:"",
    password:"",
    profilePic:"",
    email:""
  })
  const [image,setImage]=useState("")
  const [imagePreview,setImagePreview]=useState("")
  const [uploading,setUploading]=useState(false)

  const addPhoto=(e)=>{
     const file=e.target.files[0]
     if(file.size>=1048769){
      alert("File must be less or equal to 1mb")
     }
     else{
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
     }
  }

  const uploadImg=async(image)=>{
     const data=new FormData()
     data.append("file",image)
     data.append("upload_preset","Deno@1")
     try{
        setUploading(true)
        const res=await axios.post("https://api.cloudinary.com/v1_1/dwzcawi1h/image/upload",data)
        console.log(res.data.url)
        return res.data.url
     }
     catch(err){
      setUploading(false)
      console.log(err)
     }
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const url=await uploadImg(image)
      const data={...registerUser,profilePic:url}
  
      const res=await register(data)
      dispatch(setCredentials(res.data))
      socket.emit("new-user")
      navigate("/messenger",{replace:true}) 
    }
    catch(err){
       console.log(err)
    }
  }

  const handleChange=(e)=>{
    setRegisterUser(user=>({...user,[e.target.name]:e.target.value}))
  }


  return (
   <div className="registerContainer">
      <div className="registerLeft">
        <img src={registerImg} alt="" />
      </div>
      <div className="registerRight">
        <h1>Register</h1>
        <form action="#" onSubmit={handleSubmit}>
          <div className="profile">
            <img src={imagePreview?imagePreview:bot} alt="" />
            <label htmlFor='profile'><Add sx={{color:"white",fontSize:"16px",zIndex:"2"}}/></label>
            <input type="file" hidden accept='image/jpg image/jpeg image/png' id="profile" onChange={addPhoto}/>
          </div>
          <TextField placeholder='Username' sx={{width:"50%"}} value={registerUser.username} onChange={handleChange} name="username"/>
          <TextField placeholder='Email' sx={{width:"50%"}} value={registerUser.email} onChange={handleChange} name="email"/>
          <TextField placeholder='Password' sx={{width:"50%"}} value={registerUser.password} onChange={handleChange} name="password"/>
          <Button type="submit" color="primary" variant="contained">{isLoading?"registering":"Register"}</Button>
          <p>Already have an account?<Link to="/login" >Login</Link></p>
        </form>
      </div>
   </div>
  )
}

export default Register
