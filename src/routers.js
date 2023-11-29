import React from "react"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/home/home"
import Login from './pages/login/login'
import Register from "./pages/register/sign.up"
import UserProfile from "./pages/profile/profile"
import Product from "./pages/product/product"
import ProductDetail from "./pages/product/product.detail"
import Cart from "./pages/cart/cart"

function TheRouter() {
    return (
        <Router>

            <Routes>

                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Register/>} />
                <Route path="/profile" element={<UserProfile/>} />
                <Route path="/product" element={<Product/>} />
                <Route path="/product/detail/:id" element={<ProductDetail/>} />
                <Route path="/cart" element={<Cart/>} />
                

            </Routes>

        </Router>
    )
}

export default TheRouter