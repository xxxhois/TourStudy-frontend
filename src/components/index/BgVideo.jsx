// import React from "react"
import view from "../../assets/view.mp4"
import "./index.css"
import { useNavigate } from "react-router-dom"

function BgVideo(){
    const navigate = useNavigate()
    return(
        <div className="bgContainer">
            <div className="overlay"></div>
            <video src={view} autoPlay loop muted />
                <div className="buttonContainer">
                    <button id="about" onClick={()=>{navigate('/about')}}>About</button>
                    <button id="login" onClick={()=>{navigate('/login')}}>Login</button>
                    <button id="register" onClick={()=>{navigate('/register')}}>Signup</button>
                </div>
                <div className="index-container">
                    <h2 className="wlc">WELCOME</h2>
                    <h1 className="title">TRAVELLING AROUND THE WORLD</h1>
                </div>
        </div>
    )
}

export default BgVideo