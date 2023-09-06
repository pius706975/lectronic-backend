import React from "react"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/home/home"
import Login from './pages/login/login'
import Register from "./pages/register/sign.up"

function TheRouter() {
    return (
        <Router>

            <Routes>

                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Register/>} />

            </Routes>

        </Router>
    )
}

export default TheRouter