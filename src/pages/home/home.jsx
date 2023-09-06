import React, { useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './home.css'
import NavbarCom from "../../components/navbar/navbar"
import FooterCom from "../../components/footer/footer"
import img from './image.png'
import { Button, Image } from "react-bootstrap"
import {BsBag, BsHandbag} from 'react-icons/bs'

function Home() {
    
    useEffect(()=>{
        document.title = 'Home'
    }, [])

    return (
        <div className="home-app">
            <NavbarCom/>

            <div className="home-banner d-flex">
                <div className="home-banner-container">
                    <div className="home-banner-content">
                        <div className="home-banner-left-side">
                            <h1 className="banner-title" style={{fontSize: "50px"}}>Take Your Time And <span style={{color: "#0020b2"}}>Shop</span> Anywhere</h1>

                            <p className="banner-paragraph">Find stuff what you want easily</p>

                            <div className="banner-btn d-flex">
                                <Button className="banner-shop-btn"><BsBag/> Shop now</Button>
                                <Button style={{visibility: "hidden"}}></Button>
                                <Button className="banner-offer-btn"><BsHandbag/> Be a seller</Button>
                            </div>
                        </div>

                        <div className="box">
                            <div className="row">
                                <Image className="home-img" src={img} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="home-second-container">
                <div>
                    <p style={{color: "#0020b2"}}>How it works</p>
                </div>
            </div>
            
            <FooterCom/>
        </div>
    )
}

export default Home