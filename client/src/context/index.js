import { createContext, useContext, useState } from "react";
import io from "socket.io-client"

const socket=io("http://localhost:3500")
const AppContext=createContext()

export const AppContextProvider=({children})=>{
    const [messages,setMessages]=useState([])
    const [currentRoom,setCurrentRoom]=useState(null)
    const [conversations,setConversations]=useState(null)
    const [members,setMembers]=useState([])
    const [privateMemberMsg,setPrivateMemberMsg]=useState(null)
    const [rooms,setRooms]=useState(null)

    return (
        <AppContext.Provider value={{
            messages,setMessages,
            currentRoom,setCurrentRoom,
            conversations,setConversations,
            members,setMembers,
            privateMemberMsg,setPrivateMemberMsg,
            rooms,setRooms,socket
        }}>
            {children}

        </AppContext.Provider>
    )
}

export const useApp=()=>{
    return useContext(AppContext)
}