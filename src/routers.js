import React from "react"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/home/home"
import Login from './pages/login/login'

function TheRouter() {
    return (
        <Router>

            <Routes>

                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />

            </Routes>

        </Router>
    )
}

export default TheRouter