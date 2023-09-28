import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './footer.css'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit'
import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa'
import logo from './logofooter.png'

function FooterCom() {

    const currentYear = new Date().getFullYear()

    return (
        <MDBFooter className='text-center text-lg-start text-muted footer-app'>

            <section className='d-flex justify-content-center justify-content-lg-between p-4'></section>

            <section className=''>

                <MDBContainer className='text-center text-md-start mt-5'>

                    <MDBRow className='mt-3'>
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4 text-dark'>
                            <img src={logo} alt="logo" width={50} />
                            <p></p>
                            <p>91 Spring Dr. Hudsonville, MI 49426</p>
                            <p></p>
                            <h4><FaFacebook/>     <FaInstagram/>     <FaTwitter/></h4>
                        </MDBCol>

                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4 text-dark'>
                            <h6 className='text-uppercase fw-bold mb-4'>How it works</h6>
                            <p>Select Product</p>
                            <p>Make Payment</p>
                            <p>Receive Product</p>
                        </MDBCol>

                        <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-md-0 mb-4 product'>
                            <h6 className='text-uppercase fw-bold mb-4 text-dark'>Product</h6>
                            <p><a href='/headphone' className='text-reset'>Headphone</a></p>
                            <p><a href='/speaker' className='text-reset'>Speaker</a></p>
                            <p><a href='/audio-interface' className='text-reset'>Audio Interface</a></p>
                            <p><a href='/audio-mixer' className='text-reset'>Audio Mixer</a></p>
                            <p><a href='/additional-equipment' className='text-reset'>Additional Equipment</a></p>
                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4 help text-dark'>
                            <h6 className='text-uppercase fw-bold mb-4'>Help</h6>
                            <p><a href="#">About</a></p>
                            <p><a href="#">Contact Us</a></p>
                            <p><a href="#">Download App</a></p>
                            <p><a href="#">FAQs</a></p>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
            </section>

            <div className='text-center p-3 mt-3 copyright'>
                <h5><a href="https://pius-restiantoro.netlify.app" style={{textDecoration: 'none', color: 'rgb(66, 66, 66)'}} target="blank">Pius Restiantoro</a> &copy; 2023 - {currentYear} </h5>
            </div>
        </MDBFooter>
    )
}

export default FooterCom
