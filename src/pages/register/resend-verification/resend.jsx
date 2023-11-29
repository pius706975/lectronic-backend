import React, { useEffect } from "react"
import './resend.css'
import { useState } from "react"
import Api from "../../../helpers/api"
import CustomAlert from "../../../components/alerts/custom-alert"
import { useParams } from "react-router-dom"
import Aos from "aos"
import 'aos/dist/aos.css'

function ResendVerification() {

    const {email} = useParams()
    const api = Api()
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    const resendVerification = async () => {
        try {
            await api.requests({
                method: 'GET',
                url: '/auth/resend',
                params: { email }
            })

            setShowAlert(true)
            setAlertMessage('Verification email has been resent')
            setTimeout(() => {
                setShowAlert(false)
            }, 1000)
        } catch (error) {
            console.log(`An error occurred: ${error.message}`)
            setShowAlert(true)
            setAlertMessage('Your email has been verified')
            setTimeout(() => {
                setShowAlert(false)
            }, 1000)
        }
    }

    useEffect(()=>{
        document.title = 'Verification'
        Aos.init()
    })

    return (
        <div className='resend-app' data-aos='fade-down' data-aos-duration='600' data-aos-offset='100'>
            <h1 style={{color: 'blue'}}>Resend Verification</h1>
            <p>If you didn't get an email verification yet, click the button below to resend the email verification.</p>
            <button className="resend" onClick={resendVerification}>Resend Verification Email</button>

            <p>&nbsp;</p>

            <p>If you have verified your account, leave this page by clicking the button below.</p>
            <button className="leave" onClick={()=>window.location.href='/login'} >Leave</button>

            <CustomAlert
                show={showAlert}
                onClose={() => setShowAlert(false)}
                message={alertMessage}
            />
        </div>
    )
}

export default ResendVerification
