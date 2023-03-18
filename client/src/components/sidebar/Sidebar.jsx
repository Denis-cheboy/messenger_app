import { Badge, IconButton } from '@mui/material'
import axios from 'axios'
import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useApp } from '../../context'
import { resetNotification, selectCurrentUser,addNotifications } from '../../features/authSlice'
import "./Sidebar.css"

const Sidebar = () => {
  const {rooms,setRooms,socket,members,setMembers,setMessages,setPrivateMemberMsg,setCurrentRoom,currentRoom}=useApp()
  const user=useSelector(selectCurrentUser)
 const dispatch=useDispatch()
  
  useEffect(()=>{
    user && socket.emit("new-user")
  },[])

  socket.off("new-user").on("new-user",(users)=>{
    setMembers(users)
  })
  
  const joinRoom=(room,isPublic=true)=>{
      socket.emit("join-room",room)
      setCurrentRoom(room)
      if(isPublic){
        setPrivateMemberMsg(null)
      }
      else{
        setPrivateMemberMsg(room)
      }
      socket.on("room-messages",(messages)=>{
        setMessages(messages)
      })
      // dispatch for notifications
      dispatch(resetNotification(room))
      socket.off("notifications").on("notifications",(room)=>{
         if(currentRoom!== room) dispatch(addNotifications(room))  
      })
  }

  const orderId=(memberId,userId)=>{
    return memberId>userId?userId + "-" + memberId:memberId+"-"+userId
  }

  const privateRoom=(memberId,userId)=>{
      const roomId=orderId(memberId,userId)
      joinRoom(roomId,false)
  }

  useEffect(()=>{
    joinRoom("general")
    const fetchRooms=async()=>{
        try{
            const res=await axios.get("https://messenger-app-api.onrender.com/rooms")
            setRooms(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    fetchRooms()
  },[])

  
  return (
    <div className="sidebarContainer">
      <h3>Available Rooms</h3>
      {
        rooms?.map((room,idx)=>(
          <div className="room" key={idx} onClick={()=>joinRoom(room)}>
            {room} <Badge badgeContent={user?.notifications[room]} color="primary"></Badge>
          </div>
        ))
      }
      <h3>Members</h3>
      {user && 
       
        <div className="members">
            {
            members.map(member=>(
              <div className="member" key={member?._id} onClick={()=>privateRoom(member?._id,user?._id)} disabled={member?._id===user?._id?true:false}>
                <div className="imageWrapper">
                  <img src={member?.profilePic} alt="" />
                  <div className={member?.status==="online"?"status":"status offline"}></div>
                </div>
                <span>{member?.username}</span>
                <Badge badgeContent={user?.notifications[orderId(member?._id,user?._id)]} color="primary"></Badge>
                {
                  member?.status==="offline" && <span>(offline)</span>
                }
                
                {
                  member?._id===user?._id && <span>(You)</span>
                }
              </div>
            ))
          }
        </div>
        }
    </div>
  )
}

export default Sidebar
