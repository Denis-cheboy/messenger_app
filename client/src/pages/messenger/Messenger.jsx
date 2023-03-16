import React, { useEffect, useRef } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Send from "@mui/icons-material/SendOutlined"
import {Button} from '@mui/material'
import { useSelector } from 'react-redux'
import "./Messenger.css"
import { useApp } from '../../context'
import { useState } from 'react'
import { selectCurrentUser } from '../../features/authSlice'
import bot from "../../photos/botPhoto.jpg"
import { Alert, Avatar } from '@mui/material'
import axios from 'axios'
const Messenger = () => {
  const {socket,messages,currentRoom,privateMemberMsg}=useApp()
  const [member,setMember]=useState(null)
  const messageRef=useRef()
  const user=useSelector(selectCurrentUser)
  const [message,setMessage]=useState("")

  let findMember;
  if(privateMemberMsg){
    const list=privateMemberMsg.split("-")
    const memberId=list.find(member=>member!==user?._id)
    findMember=memberId
  }
  useEffect(()=>{
    const fetchMember=async()=>{
      try{
        const res=await axios.get(`http://localhost:3500/api/users/${findMember}`)
        setMember(res.data)
      }
      catch(err){
        console.log(err.message)
      }
    }
    fetchMember()
  },[findMember])

  useEffect(()=>{
    messageRef.current?.scrollIntoView({behaviour:"smooth"})
  },[messages])
  
  const getFormattedDate=()=>{
    let date=new Date()
    let year=date.getFullYear()
    let month=(1+date.getMonth()).toString()
    month=month.length>1?month:"0"+month
    let day=date.getDate().toString()

    day=day.length>1?day:"0"+day
    return month+"/"+day +"/" + year

  }



  const sendMessage=()=>{
    const date=getFormattedDate()
    const today=new Date()
    const minutes=today.getMinutes()<10?"0"+today.getMinutes():today.getMinutes()
    const time=today.getHours()+":"+minutes
    const data={
        to:currentRoom,
        from:user,
        content:message,
        date:date,
        time:time
    }
    socket.emit("room-message",data)
  }

  return (
    <div className="messengerContainer">
      <div className="sidebar">
        <Sidebar/>
      </div>
      <div className="messageContainer">
         <div className="messageBox">
          {!user && <Alert severity='error'>Please login</Alert>}
          {user && currentRoom && !privateMemberMsg && <Alert severity='success' sx={{display:"flex",justifyContent:"center"}}>You are in the {currentRoom} room</Alert>}
          {user && currentRoom && privateMemberMsg && <Alert severity='success' sx={{display:"flex",justifyContent:"center"}}>Your conversation with {member?.username}</Alert>}
          {
           user && currentRoom && messages.map(({_id:date,messagesByDate})=>(
               <div className="message" key={date}>
                   <>
                    <p className="date">{date}</p>
                    {messagesByDate?.map(message=>(
                      <div className={user?._id===message?.from?._id?"msg":"singleMsg"}>
                        <div className="message-inner">
                            <div className="top">
                              <Avatar src={message?.from?.profilePic?message?.from?.profilePic:bot} sx={{height:"35px",width:"35px"}}/>
                              <span>{message?.from?.username}</span>
                            </div>
                            <div className="content">{message?.content}</div>
                            <span className="msgDate">{message?.time}</span>
                        </div>
                      </div>
                    ))}
                    <div ref={messageRef}></div>
                  </>
                 
               </div>
            ))
          }
         </div>
         <div className="messageBottom">
           <input placeholder='Write your message' disabled={!user} className="messageInput" value={message} onChange={(e)=>setMessage(e.target.value)}/>
           <Button className="send" disabled={!user}>
             <Send sx={{color:"teal",cursor:"pointer"}} onClick={sendMessage}/>
           </Button>
         </div>
      </div>
    </div>
  )
}

export default Messenger
