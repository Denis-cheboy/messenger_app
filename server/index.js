const cors=require("cors")
const cookieParser=require("cookie-parser")
const express=require("express")
const User=require("./models/User")
const mongoose=require("mongoose")
const connectDB=require("./dbConnection")
const errorHandler = require("./errorHandler/errorHandler")
const Message=require("./models/Message")
const roomsRoute=require("./routes/rooms")
const authRoute=require("./routes/auth")
const userRoute=require("./routes/users")
const logoutRoute=require("./routes/logout")
require("dotenv").config()


connectDB()

const PORT=process.env.PORT || 3500

const app=express()

const server=require("http").createServer(app)

const io=require("socket.io")(server,{
    cors:{
        origin:["https://messenger-app-2jss.onrender.com"]
    }
})

// inbuilt middlewares
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:["https://messenger-app-2jss.onrender.com"]
}))
app.use(express.json())
app.use(cookieParser())

// routes middleware
app.use("/auth",authRoute)
app.use("/rooms",roomsRoute)
app.use("/users",userRoute)
app.use("/logout",logoutRoute)
app.use(errorHandler)

// socket io server

const getLastMessagesFromRoom=async(room)=>{
    const roomMessages=await Message.aggregate([
        {$match:{to:room}},
        {$group:{_id:"$date",messagesByDate:{$push:"$$ROOT"}}}
    ])
    return roomMessages
}

const sortMessagesByDate=(messages)=>{
    return messages.sort((a,b)=>{
        let date1=a._id.split("/")
        let date2=b._id.split("/")
        
        date1=date1[2] + date1[0] + date1[1]
        date2=date2[2] +date2[0]+date2[1]
        return date1>date2?1:-1
    })
}

io.on("connection",(socket)=>{

   socket.on("new-user",async()=>{
        const users=await User.find()
        io.emit("new-user",users)
   })

   socket.on("join-room",async(room)=>{
        socket.join(room)
        let roomMessages=await getLastMessagesFromRoom(room)
        roomMessages=sortMessagesByDate(roomMessages)
        io.to(room).emit("room-messages",roomMessages)
       
   })
   socket.on("room-message",async(data)=>{
      const newMessage=await Message.create({
        to:data.to,
        from:data.from,
        content:data.content,
        date:data.date,
        time:data.time
      })
      let roomMessages=await getLastMessagesFromRoom(data.to)
      roomMessages=sortMessagesByDate(roomMessages)
      io.to(data.to).emit("room-messages",roomMessages)
      socket.broadcast.emit("notifications",data.to)
   })
})

// db connection
mongoose.connection.once("connected",()=>{
    console.log("Connected to mongo db")
    server.listen(PORT,()=>console.log("Application running on port",PORT))
})

