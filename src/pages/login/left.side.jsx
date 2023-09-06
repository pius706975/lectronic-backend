import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './login.css'
import Form from 'react-bootstrap/Form'
import { Button, Col, Row } from "react-bootstrap"

function LoginLeftSide() {
    return (
        <div className="left-login">
            <button className="back-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 60 60" fill="none"><g filter="url(#filter0_b_701_161)"><rect width="60" height="60" rx="10" fill="#0300AD" fill-opacity="0.1"/></g><path d="M36 41L24 29.5L36 18" stroke="#0300AD" stroke-width="2" stroke-linecap="round"/><defs><filter id="filter0_b_701_161" x="-100" y="-100" width="260" height="260" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feGaussianBlur in="BackgroundImageFix" stdDeviation="50"/><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_701_161"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_701_161" result="shape"/></filter></defs></svg>
            </button>
            
            <Form style={{width: "80%", margin: "10% auto"}}>

                <p style={{fontSize: "35px", fontWeight: "bold"}}>Welcome Back!</p>

                <p className="text-secondary">Steps to get started, find the best stuff.</p>

                <p></p>

                <Form.Group>
                    <Form.Control placeholder="Your e-mail address"/>
                </Form.Group>

                <Form.Group><p style={{visibility: "hidden"}}></p></Form.Group>

                <Form.Group>
                    <Form.Control type="password" placeholder="Your password"/>
                </Form.Group>

                <Form.Group><p style={{visibility: "hidden"}}></p></Form.Group>

                <div className="">
                    <Row>
                        <Col><p>Forgot password?</p></Col>

                        <Col style={{textAlign: "right"}}><Button className="login-btn" type="submit">Login</Button></Col>     
                    </Row>                
                </div>  

            </Form>
        </div>
    )
}

export default LoginLeftSide