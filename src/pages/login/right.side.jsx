import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './login.css'
import { Image } from "react-bootstrap"
import image from './image.png'

function LoginRightSide() {
    return (
        <div className="right-login" style={{textAlign: "right", margin: "10px"}}>
            <Image src={image} thumbnail style={{border: "none", width: "90vh"}}/>
        </div>
    )
}

export default LoginRightSide