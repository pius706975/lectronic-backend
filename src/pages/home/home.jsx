import React, { useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './home.css'
import navbar from '../../components/navbar/navbar'
import footer from '../../components/footer/footer'

function Home() {
    
    useEffect(()=>{
        document.title = 'Home'
    }, [])

    return (
        <div className="home-app">
            <navbar/>
            <footer/>
        </div>
    )
}

export default Home