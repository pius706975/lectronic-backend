import React, { useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './home.css'
import NavbarCom from "../../components/navbar/navbar"
import FooterCom from "../../components/footer/footer"
import img from './image.png'
import { Button, Image, FormControl, InputGroup } from "react-bootstrap"
import {BsBag, BsHandbag, BsBox, BsSearch} from 'react-icons/bs'
import {PiShoppingBag} from 'react-icons/pi'
import {FaMoneyBillWave} from 'react-icons/fa'

function Home() {
    
    useEffect(()=>{
        document.title = 'Home'
    }, [])

    return (
        <div className="home-app">
            <NavbarCom/>

            {/* Section 1 */}
            <div className="home-banner d-flex">
                <div className="home-banner-container">
                    <div className="home-banner-content">
                        <div className="home-banner-left-side">
                            <h1 className="banner-title" style={{fontSize: "50px", fontWeight: "bolder"}}>Take Your Time And <span style={{color: "#0020b2"}}>Shop</span> Anywhere</h1>

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

            {/* Section 2 */}
            <div className="home-second-container" style={{marginTop: "120px"}}>
                <div style={{backgroundColor: "#f2f4fb", width: "150px", margin: "auto", borderRadius: "20px"}}>
                    <p style={{color: "#0020b2", textAlign: "center", padding: "10px"}}>How it works</p>
                </div>

                <p></p>

                <div style={{width: "300px", margin: "auto", borderRadius: "20px"}}>
                    <h1 style={{fontWeight: "bold", textAlign: "center", padding: "10px"}}>Make An Order Easily</h1>
                </div>

                <div>
                    <div className="d-flex">
                        <div style={{maxWidth: "1700px", width: "100%", margin: "50px auto", padding: "10px"}}>
                            
                            <div style={{display: "flex", justifyContent: "space-around", flexWrap: "wrap", padding: "30px 0"}}>
                                <div className="steps" style={{marginBottom: "15px", maxWidth: "250px", border: "solid 1px #0020b2", borderRadius: "10px", textAlign: "justify", padding: "25px"}}>
                                    <p className="icon" style={{margin: "auto", padding: "10px", backgroundColor: "#f1f1f1", width: "50px", borderRadius: "100%", textAlign: "center"}}><PiShoppingBag/></p>
                                    <p></p>
                                    <h5 style={{fontWeight: "bold"}}>Select Products</h5>
                                    <p style={{fontSize: "15px"}}>Select one or more products that you want and you have 2 choices to buy directly or save products into cart.</p> 
                                </div>

                                <div className="steps" style={{marginBottom: "15px", maxWidth: "250px", border: "solid 1px #0020b2", borderRadius: "10px", textAlign: "justify", padding: "25px"}}>
                                    <p className="icon" style={{margin: "auto", padding: "10px", backgroundColor: "#f1f1f1", width: "50px", borderRadius: "100%", textAlign: "center"}}><FaMoneyBillWave/></p>
                                    <p></p>
                                    <h5 style={{fontWeight: "bold"}}>Make Payment</h5>
                                    <p style={{fontSize: "15px"}}>Select payment method after considering what product do you want to get.</p>
                                </div>

                                <div className="steps" style={{marginBottom: "15px", maxWidth: "250px", border: "solid 1px #0020b2", borderRadius: "10px", textAlign: "justify", padding: "25px"}}>
                                    <p className="icon" style={{margin: "auto", padding: "10px", backgroundColor: "#f1f1f1", width: "50px", borderRadius: "100%", textAlign: "center"}}><BsBox/></p>
                                    <p></p>
                                    <h5 style={{fontWeight: "bold"}}>Receive Products</h5>
                                    <p style={{fontSize: "15px"}}>The products is in shipping process. Just wait for a few days until the ordered product arrives at your home.</p> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Section 3 */}
            <div className="home-third-container" style={{marginTop: "30px", marginBottom: '100px'}}>
                <div style={{backgroundColor: "#f2f4fb", width: "150px", margin: "auto", borderRadius: "20px"}}>
                    <p style={{color: "#0020b2", textAlign: "center", padding: "10px"}}>Our Products</p>
                </div>

                <p></p>

                <div style={{width: "300px", margin: "auto", borderRadius: "20px"}}>
                    <h3 style={{fontWeight: "bolder", textAlign: "center", padding: "10px"}}>The Best Product By Lectronic</h3>
                </div>

                <div>
                    <div className="d-flex">
                        <div style={{maxWidth: "1700px", width: "100%", margin: "auto"}}>
                            
                            <div style={{display: "flex", justifyContent: "space-around", flexWrap: "wrap", padding: "30px 0"}}>
                                <div className="d-flex" style={{display: "flex", flexWrap: "wrap"}} >
                                    <div style={{ margin: "auto", borderRadius: "20px"}}>
                                        <Button className="product-btn" style={{width: "160px", border: "none"}}>Headphones</Button>
                                    </div>

                                    <div style={{ margin: "auto", borderRadius: "20px"}}>
                                        <Button className="product-btn" style={{width: "160px", border: "none"}}>Audio Interfaces</Button>
                                    </div>

                                    <div style={{ margin: "auto", borderRadius: "20px"}}>
                                        <Button className="product-btn" style={{width: "160px", border: "none"}}>Audio Mixers</Button>
                                    </div>

                                    <div style={{ margin: "auto", borderRadius: "20px"}}>
                                        <Button className="product-btn" style={{width: "160px", border: "none"}}>Speakers</Button>
                                    </div>

                                    <div style={{ margin: "auto", borderRadius: "20px"}}>
                                        <Button className="product-btn" style={{width: "160px", border: "none"}}>Audio Equipments</Button>
                                    </div>
                                </div>

                                <div style={{ margin: "", borderRadius: "20px"}}>
                                    <InputGroup>
                                        <FormControl 
                                            type="text"
                                            className="input-search" 
                                            placeholder="Search" 
                                            aria-label="Type to search" 
                                            aria-describedby="basic-addon2" 
                                        />

                                        <Button type="submit" className="search-btn-home" ><BsSearch/></Button>
                                    </InputGroup>
                                </div>
                            </div>

                            <div className="text-center">
                                <Button className="view-all-btn" style={{border: '1px solid 0020b2', borderRadius: '10px', fontWeight: '800'}}>View All</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <FooterCom/>
        </div>
    )
}

export default Home