import React from "react"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/home/home"
import Login from './pages/login/login'
import Register from "./pages/register/sign.up"
import UserProfile from "./pages/profile/profile"
import Product from "./pages/product/product"

function TheRouter() {
    return (
        <Router>

            <Routes>

                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Register/>} />
                <Route path="/profile" element={<UserProfile/>} />
                <Route path="/product" element={<Product/>} />

            </Routes>

        </Router>
    )
}

export default TheRouter