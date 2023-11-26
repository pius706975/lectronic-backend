import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './footer.css'
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit'
import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa'
import logo from './logofooter.png'
import Api from "../../helpers/api"
import Aos from "aos"
import 'aos/dist/aos.css'

function FooterCom() {

    const currentYear = new Date().getFullYear()

    const api = Api()
    const [categories, setCategories] = useState([])

    const getCategories = async ()=>{
        api.requests({
            method: 'GET',
            url: '/category'
        }).then((res)=>{
            const data = res.data.result
            setCategories(data)
            console.log(data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getCategories()
    }, [])

    useEffect(()=>{
        Aos.init()
    }, [])

    return (
        <MDBFooter className='text-center text-lg-start text-muted footer-app'>

            <section className='d-flex justify-content-center justify-content-lg-between p-4'></section>

            <section className=''>

                <MDBContainer className='text-center text-md-start mt-5'>

                    <MDBRow className='mt-3'>
                        <MDBCol data-aos='zoom-in-right' data-aos-duration='600' data-aos-offset='100' md="3" lg="4" xl="3" className='mx-auto mb-4 text-dark'>
                            <img style={{cursor: 'pointer'}} onClick={()=>window.location.href='#home'} src={logo} alt="logo" width={50} />
                            <p></p>
                            <p>91 Spring Dr. Hudsonville, MI 49426</p>
                            <p></p>
                            <h4>
                                <a href="https://id-id.facebook.com/" target="blank"><FaFacebook/></a> <a href="https://www.instagram.com/" target="blank"><FaInstagram/></a> <a href="https://twitter.com/?lang=en" target="blank"><FaTwitter/></a>
                            </h4>
                        </MDBCol>

                        <MDBCol data-aos='zoom-in-right' data-aos-duration='600' data-aos-offset='100' md="2" lg="2" xl="2" className='mx-auto mb-4 text-dark'>
                            <h6 className='text-uppercase fw-bold mb-4'>How it works</h6>
                            <p><a className="footer-menu1" href="#howitworks">Select Product</a></p>
                            <p><a className="footer-menu1" href="#howitworks">Make Payment</a></p>
                            <p><a className="footer-menu1" href="#howitworks">Receive Product</a></p>
                        </MDBCol>

                        <MDBCol data-aos='zoom-in-right' data-aos-duration='600' data-aos-offset='100' md="3" lg="2" xl="2" className='mx-auto mb-md-0 mb-4 product'>
                            <h6 className='text-uppercase fw-bold mb-4 text-dark'>Product</h6>
                            {
                                categories.map((data)=>{
                                    return (
                                        <p><a href='/product' className='footer-menu2'>{data.category_name}</a></p>
                                    )
                                })
                            }
                        </MDBCol>

                        <MDBCol data-aos='zoom-in-right' data-aos-duration='600' data-aos-offset='100' md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4 help text-dark'>
                            <h6 className='text-uppercase fw-bold mb-4'>Help</h6>
                            <p><a className="footer-menu3" href="#about">About</a></p>
                            <p><a className="footer-menu3" href="#contact-us">Contact Us</a></p>
                            <p><a className="footer-menu3" href="#download-app">Download App</a></p>
                            <p><a className="footer-menu3" href="#faqs">FAQs</a></p>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
            </section>

            <div data-aos='zoom-in-up' data-aos-duration='600' data-aos-offset='0' className='text-center p-3 mt-3 copyright'>
                <h5><a href="https://pius-restiantoro.netlify.app" style={{textDecoration: 'none', color: 'rgb(66, 66, 66)'}} target="blank">Pius Restiantoro</a> &copy; {currentYear} </h5>
            </div>
        </MDBFooter>
    )
}

export default FooterCom
