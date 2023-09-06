import React, { useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './home.css'
import NavbarCom from "../../components/navbar/navbar"
import FooterCom from "../../components/footer/footer"

function Home() {
    
    useEffect(()=>{
        document.title = 'Home'
    }, [])

    return (
        <div className="home-app">
            <NavbarCom/>
            
            <FooterCom/>
        </div>
    )
}

export default Home