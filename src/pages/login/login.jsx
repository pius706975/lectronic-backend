import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './login.css'
import image from './image18.png'
import vector from './Vector.png'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Api from '../../helpers/api'
import {login} from '../../store/reducer/user'

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
    const [errorTimer, setErrorTimer] = useState(null)
    
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
            console.log('An error occurred: ', error.message);
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

    return (
        <div className="login-app">
            <div className="log-content">
                <div className="log-right-bg col-md-5">            
                    <img src={image} alt="pic"/>
                    <div>
                        <div className="log-message-box row">
                            <h3 id="log-h3">Welcom to Lectronic</h3>
                            <p>We are an e-commerce that is engaged in buying and<br/>selling electronic goods, get our special offer now!</p>
                        </div>                     
                        <img className="log-vector" src={vector} alt="vector1" />
                    </div>
                </div>         
                <div className="log-form-container">
                    <button className="log-arrow-back" onClick={handleHistory}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 60 60" fill="none"><g filter="url(#filter0_b_701_161)"><rect width="60" height="60" rx="10" fill="#0300AD" fill-opacity="0.1"/></g><path d="M36 41L24 29.5L36 18" stroke="#0300AD" stroke-width="2" stroke-linecap="round"/><defs><filter id="filter0_b_701_161" x="-100" y="-100" width="260" height="260" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feGaussianBlur in="BackgroundImageFix" stdDeviation="50"/><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_701_161"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_701_161" result="shape"/></filter></defs></svg>
                    </button>
                    <form className="login-form">                  
                        <h1 className="text-left mb-5">Welcome Back!</h1>
                        <p>Steps to get started, find the best stuff</p>                  
                        <div className="log-form-group">
                            <input onChange={inputHandler} type="email" name="email" placeholder="Your e-mail address" required/>
                        </div>                 
                        <div className="log-form-group">
                            <input onChange={inputHandler} type="password" name="password" placeholder="Your password" required/>
                        </div>

                        <div className="error-message">
                            {errorMessage && <p style={{color: 'red', fontSize: '15px'}} className="error-message">{errorMessage}</p>}
                        </div>

                        <a className="forgot-password" href="#">Forgot Password?</a>
                        <button onClick={loginHandler} type="submit" className="log-button-REG">Login</button>
                        <div className="not-register">
                            <p>Not register yet? <Link className="create-acc" to={"/signup"}>Create an Account</Link></p>
                        </div>
                    </form>
                </div>         
            </div>
        </div>
    )
}

export default Login