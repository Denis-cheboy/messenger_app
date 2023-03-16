import React from 'react'
import "./Home.css"
import {Link} from "react-router-dom"
import homeImg from "../../photos/home.jpg"

const Home = () => {
  return (
    <div className="homeContainer">
       <div className="homeLeft">
         <h1>
          Enjoy the new experience of chatting with global friends
         </h1>
         <span>
          Connect people around the world for free
         </span>
         <div className="homeButtom">
           <button><Link to="/messenger" style={{textDecoration:"none",color:"inherit"}}>Get Started</Link></button>
         </div>

       </div>
       <div className="homeRight">
           <img src={homeImg} alt="user" />
       </div>
    </div>
  )
    
}

export default Home
