import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './login.css'
import image from './image18.png'
import logo from '../../images/Logo.png'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Api from '../../helpers/api'
import {login} from '../../store/reducer/user'
import { Image } from "react-bootstrap"
import backLogo from '../../images/back.png'
import Aos from "aos"
import 'aos/dist/aos.css'

function Login() {

    const navigate = useNavigate()
    const {isAuth} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const api = Api()
    const [users, setUsers] = useState({
        email: '',
        password: ''
    })

    const [errorMessage, setErrorMessage] = useState('')
    const [setErrorTimer] = useState(null)
    
    const clearErrorMessage = ()=>{
        setErrorMessage('')
        setErrorTimer(null)
    }

    const inputHandler = (e)=>{
        e.preventDefault()
        const data = {...users}
        data[e.target.name] = e.target.value
        setUsers(data)
    }

    const loginHandler = async (e)=>{
        e.preventDefault()

        try {
            api.requests({
                method: 'POST',
                url: '/auth/login',
                data: users
            }).then((res)=>{
                const data = res.data
                dispatch(login(data.result[0].token))
                navigate('/')
                // console.log(data)
            }).catch((error)=>{
                if (error.response && error.response.data) {
                    const errorMessage = error.response.data.result[0].message
                    setErrorMessage(errorMessage)
                    setErrorTimer(setTimeout(clearErrorMessage, 5000))
                    // console.log(errorMessage)
                } else {
                    console.log('An error occurred: ', error.message)
                }
            })
        } catch (error) {
            console.log('An error occurred: ', error.message)
        }
    }

    const handleHistory = ()=>{
        navigate(-1)
    }

    useEffect(()=>{
        if (isAuth) {
            navigate('/')
        }
        document.title = 'Login'
    }, [isAuth])

    const [isMobile, setIsMobile] = useState(false)

    useEffect(()=>{
        const handleResize = ()=>{
            setIsMobile(window.innerWidth <= 1000)
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return ()=> window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(()=>{
        Aos.init()
    }, [])

    return (
        <div className="login-app">            
            <div className="login-container">
                <div className="login-content">
                    <div className="login-left-side">
                        <div data-aos='zoom-in-right' data-aos-duration='600' data-aos-offset='100'>
                            <button className="log-arrow-back" onClick={handleHistory}>
                                <Image src={backLogo}/>
                            </button>
                        </div>
                            
                        <form data-aos='fade-right' data-aos-duration='600' data-aos-offset='100' className="login-form">           
                            <h1 className="text-left mb-5">Welcome, Please<br/>Create an Account</h1>
                            <p>Please fill in your name, email, and password</p>  
                                            
                            <div className="log-form-group">
                                <input type="email" name="email" placeholder="Your e-mail address" onChange={inputHandler} required/>
                            </div>                
                                
                            <div className="log-form-group">
                                <input type="password" name="password" placeholder="Your password" onChange={inputHandler} required/>
                            </div>

                            <div className="error-message">
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                            </div>

                            <div className="log-flex">
                                <a href="#forgot-password" className="forgot-password">Forgot Password?</a>
                                <button type="submit" className="log-button-LOG" onClick={loginHandler}>Login</button>
                            </div>

                            <div className="log-form-group">
                                <p className="to-reg">Not registered yet? <a href="/signup">Create an Account</a></p>
                            </div>
                        </form>
                    </div>

                    <div className="box">
                        <div data-aos='fade-left' data-aos-duration='600' data-aos-offset='100' className="row">
                            {!isMobile && (
                                <div className="right-bg">
                                    <Image src={image} className="right-img-log"/>
                                    <div className="text-box">
                                        <div className="message-box">
                                            <Image src={logo} className="message-logo"/>

                                            <p>&nbsp;</p>

                                            <h3 id="h3">Welcome to Lectronic</h3>
                                            
                                            <p>We are an e-commerce that is engaged in buying and selling electronic goods, get our special offer now!</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>       
        </div>
    )
}

export default Login