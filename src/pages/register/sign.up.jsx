import React, { useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './sign.up.css'
import image from "./image9.png"
import vector from "./Vector.png"

function Register(params) {

    useEffect(()=>{
        document.title = 'Sign Up'
    }, [])

    return (
        <div className="register-app">
            <div>
                <div className="right-bg col-md-5">               
                    <img src={image} alt="pic" />
                    <div className="box">
                        <div className="message-box row">
                            <h3 id="h3">Welcom to Lectronic</h3>
                            <p>We are an e-commerce that is engaged in buying and<br/>selling electronic goods, get our special offer now!</p>
                        </div>              
                        <img className="vector" src={vector} alt="vector1" />
                    </div>
                </div>      

                <div className="form-container">
                    <button className="arrow-back">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 60 60" fill="none"><g filter="url(#filter0_b_701_161)"><rect width="60" height="60" rx="10" fill="#0300AD" fill-opacity="0.1"/></g><path d="M36 41L24 29.5L36 18" stroke="#0300AD" stroke-width="2" stroke-linecap="round"/><defs><filter id="filter0_b_701_161" x="-100" y="-100" width="260" height="260" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feGaussianBlur in="BackgroundImageFix" stdDeviation="50"/><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_701_161"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_701_161" result="shape"/></filter></defs></svg>
                    </button>

                    <form className="register-form">           
                        <h1 className="text-left mb-5">Welcome, Please<br/>Create an Account</h1>
                        <p>Please fill in your name, email, and password</p>
                        <div className="reg-form-group">
                            <input type="text" name="name" placeholder="What's your name?" required/>
                        </div>    
						<div className="reg-form-group">
                            <input type="text" name="username" placeholder="Your username?" required/>
                        </div>                
                        <div className="reg-form-group">
                            <input type="email" name="email" placeholder="Your e-mail address" required/>
                        </div>                
                        <div className="reg-form-group">
                            <input type="password" name="password" placeholder="Your password" required/>
                        </div>
                        <button type="submit" className="reg-button-REG">Register</button>
                    </form>
                </div>       
            </div>
        </div>
    )
}

export default Register