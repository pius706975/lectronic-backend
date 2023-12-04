import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './navbar.css'
import { Button, Dropdown, Image, Nav, Navbar } from "react-bootstrap"
import Api from "../../helpers/api"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import toggleImage from '../../images/Logo.png'
import { logout } from "../../store/reducer/user"
import { FaHome } from "react-icons/fa"

function NavbarCom2() {

    const dispatch = useDispatch()
    const {isAuth} = useSelector((state)=>state.users)
    const api = Api()
    const navigate = useNavigate()
    const [user, setUser] = useState('')

    const getUser = ()=>{
        api.requests({
            method: 'GET',
            url: '/user/profile'
        }).then((res)=>{
            const data = res.data.result[0]
            setUser(data)
            // console.log(data)
        }).catch((err)=>{
            console.log(err.message)
        })
    }

    const handleHistory = ()=>{
        navigate('/')
    }

    useEffect(()=>{
        if (isAuth) {
            getUser()
        }
    }, [isAuth])



    return (
        <div className="nav-app2"> 
            <Navbar expand="lg" className="navbar" style={{maxWidth: '1350px', margin: 'auto'}}>
                
                <Navbar.Brand as={Link} to="/" >
                    <button className="log-arrow-back" onClick={handleHistory} style={{padding: '10px'}}>
                        <FaHome/>
                    </button>
                </Navbar.Brand>

                    <Nav className="mx-auto drop" ></Nav>
                    <Nav className="mx-auto drop" ></Nav>

                    <Nav>
                        {isAuth ? (
                            <div className="dropdown-container">
                                <Dropdown align="end">
                                    <Dropdown.Toggle className="toggle-menu" variant="link">
                                        <Image src={toggleImage} width={"50px"}/>            
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="profile-menu">
                                        <div className="text-center">
                                            <Image src={user.image} roundedCircle style={{width: '50px', border: '1px solid #f2f4fb'}}/>
                                        </div>

                                        <div style={{marginLeft: '15px', marginRight: '15px'}}>
                                            <Dropdown.Divider/>
                                        </div>

                                        <Dropdown.Item className="dd-item" href="/cart" >Cart</Dropdown.Item>

                                        <Dropdown.Item className="dd-item" href="#history" >History</Dropdown.Item>

                                        <Dropdown.Item className="dd-item" href="/profile" >Profile</Dropdown.Item>

                                        <Dropdown.Item className="dd-logout" onClick={()=>dispatch(logout())}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        ):(
                            <div>
                                <Button className="nav-btn login-btn" href="/login">Sign in</Button>
                            </div>
                        )}
                    </Nav>  

            </Navbar>
        </div>
    )
}

export default NavbarCom2