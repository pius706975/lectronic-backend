import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './navbar.css'
import { Button, Dropdown, Image, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import BrandLogo from '../../images/logoHeader.png'
import toggleImage from '../../images/Logo.png'
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse"
import { useDispatch, useSelector } from "react-redux"
import Api from '../../helpers/api'
import {logout} from '../../store/reducer/user'

function NavbarCom() {

    const dispatch = useDispatch()
    const {isAuth} = useSelector((state)=>state.users)
    const api = Api()
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

    useEffect(()=>{
        if (isAuth) {
            getUser()
        }
    }, [isAuth])

    return (
        <div className="nav-app">

            <Navbar expand="lg" className="navbar" style={{maxWidth: '1350px', margin: 'auto'}}>
                
                <Navbar.Brand className="nav-brand" as={Link} to="/" >
                    <img src={BrandLogo} alt="Brand" width="150" height="auto" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <NavbarCollapse id="basic-navbar-nav" >

                    <Nav className="mx-auto drop" ></Nav>
                    <Nav className="mx-auto drop" ></Nav>

                    <Nav className="mx-auto drop">
                        <Nav.Link className="nav-link" href="/">Home</Nav.Link>
                        <Nav.Link className="nav-link" href="/product">Product</Nav.Link>
                        <Nav.Link className="nav-link" href="/community">Community</Nav.Link>
                        <Nav.Link className="nav-about" href="/about">About</Nav.Link>
                    </Nav>

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

                                        <Dropdown.Item className="dd-item" href="/history" >History</Dropdown.Item>

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

                </NavbarCollapse>

            </Navbar>

        </div>
    )
}

export default NavbarCom