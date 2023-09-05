import React, { useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './home.css'

function Home() {
    
    useEffect(()=>{
        document.title = 'Home'
    }, [])

    return (
        <div className="home-app">
            test
        </div>
    )
}

export default Home