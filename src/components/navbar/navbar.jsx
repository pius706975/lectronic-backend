import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './navbar.css'
import { Button, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import BrandLogo from '../../images/logoHeader.png'
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse"

function NavbarCom() {
    return (
        <div className="nav-app">

            <Navbar expand="lg" className="navbar" >
                
                <Navbar.Brand className="nav-brand" as={Link} to="/" >
                    <img src={BrandLogo} alt="Brand" width="150" height="auto" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <NavbarCollapse id="basic-navbar-nav" >

                    <Nav className="mx-auto drop" ></Nav>
                    <Nav className="mx-auto drop" ></Nav>

                    <Nav className="mx-auto drop" >
                        <Nav.Link className="nav-link" href="/">Home</Nav.Link>
                        <Nav.Link className="nav-link" href="/product">Product</Nav.Link>
                        <Nav.Link className="nav-link" href="/community">Community</Nav.Link>
                        <Nav.Link className="nav-link" href="/about">About</Nav.Link>
                    </Nav>

                    <Nav>
                        <div>
                            <Button className="nav-btn register-btn" >Sign up</Button>
                        </div>
                    </Nav>

                </NavbarCollapse>

            </Navbar>

        </div>
    )
}

export default NavbarCom