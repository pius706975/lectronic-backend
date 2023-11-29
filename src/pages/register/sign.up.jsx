import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './sign.up.css'
import {useNavigate} from 'react-router-dom'
import backLogo from '../../images/back.png'
import {Image} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import Api from "../../helpers/api"
import { addUsers } from "../../store/reducer/user"
import image from './image-9.png'
import logo from '../../images/Logo.png'
import Aos from "aos"
import 'aos/dist/aos.css'
import CustomAlert from "../../components/alerts/custom-alert"

function Register() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const api = Api()
    // const {isAuth} = useSelector((state)=>state.users)
    const [users, setUsers] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user'
    })

    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [errorTimer, setErrorTimer] = useState(null)
    const clearErrorMessage = ()=>{
        setErrorMessage('')
        setErrorTimer(null)
    }

    const onChangeInput = (e)=>{
        e.preventDefault()
        const data = {...users}
        data[e.target.name] = e.target.value
        setUsers(data)
    }

    const register = async (e)=>{
        e.preventDefault()

        try {
            api.requests({
                method: 'POST',
                url: '/auth/register',
                data: users
            }).then((res)=>{
                const data = res.data
                dispatch(addUsers(data))
                setAlertMessage('Email verification has been sent to your email')
                setTimeout(() => {
                    setShowAlert(false)
                }, 1000)
                navigate('/resend-verification')
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

    useEffect(()=>{
        Aos.init()
        document.title = 'Sign Up'
    }, [])

    const handleHistory = ()=>{
        navigate(-1)
    }

    const [isMobile, setIsMobile] = useState(false)

    useEffect(()=>{
        const handleResize = ()=>{
            setIsMobile(window.innerWidth <= 1000)
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return ()=> window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="register-app">            
            <div className="register-container">
                <div className="register-content">
                    <div className="register-left-side">
                        <div data-aos='zoom-in-right' data-aos-duration='600' data-aos-offset='100'>
                            <button className="log-arrow-back" onClick={handleHistory}>
                                <Image src={backLogo}/>
                            </button>
                        </div>

                        <form data-aos='fade-right' data-aos-duration='600' data-aos-offset='100' className="register-form">           
                            <h1 className="text-left mb-5">Welcome, Please<br/>Create an Account</h1>
                            <p>Please fill in your name, email, and password</p>
                
                            <div className="reg-form-group">
                                <input type="text" name="name" placeholder="What's your name?" onChange={onChangeInput} required/>
                            </div>    
                                            
                            <div className="reg-form-group">
                                <input type="email" name="email" placeholder="Your e-mail address" onChange={onChangeInput} required/>
                            </div>                
                                
                            <div className="reg-form-group">
                                <input type="password" name="password" placeholder="Your password" onChange={onChangeInput} required/>
                            </div>

                            <div className="error-message">
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                            </div>

                            <button type="submit" className="reg-button-REG" onClick={register}>Register</button>

                            <CustomAlert
                                show={showAlert}
                                onClose={()=>setShowAlert(false)}
                                message={alertMessage}
                            />
                        </form>
                    </div>

                    <div className="box">
                        <div data-aos='fade-left' data-aos-duration='600' data-aos-offset='100' className="row">
                            {!isMobile && (
                                <div className="right-bg">
                                    <Image src={image} className="right-img"/>
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

export default Register