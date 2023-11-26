import React, { useEffect, useState } from "react"
import './cart.css'
import NavbarCom3 from "../../components/navbar/navbar3"
import Api from "../../helpers/api"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function Cart() {
    const api = Api()
    const {isAuth} = useSelector((state)=>state.users)
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false)

    const getUser = ()=>{
        api.requests({
            method: 'GET',
            url: '/user/profile'
        }).then((res)=>{
            const data = res.data.result[0]
            console.log(data)
        }).catch((err)=>{
            console.log(err.message)
        })
    }

    useEffect(()=>{
        if (isAuth) {
            getUser()
        }
    }, [isAuth])

    useEffect(()=>{
        document.title = 'Cart'
    }, [])

    return (
        <div className="cart-app">
            {isAuth ? (
                <div>
                    <NavbarCom3/>
                    <h1 className="p-5 text-center">This is cart</h1>
                </div>
            ) : (
                window.location.reload(navigate('/login'))
            )}
        </div>
    )
}

export default Cart