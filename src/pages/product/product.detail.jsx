import React, { useEffect, useState } from "react"
import './product.css'
import { useParams } from "react-router-dom"
import Api from "../../helpers/api"
import NavbarCom3 from "../../components/navbar/navbar3"
import {BsCart, BsPencil, BsStar} from 'react-icons/bs'
import currency from '../../helpers/format.currency'
import { Button, Nav, Row, Tab } from "react-bootstrap"
import Rate from "../../components/rate/rate"
import Aos from "aos"
import 'aos/dist/aos.css'

function ProductDetail() {
    
    const [product, setProduct] = useState({})
    const [total, setTotal] = useState(0)
    const params = useParams()
    const api = Api()
    const [qty, setQty] = useState(0)

    const getProduct = ()=>{
        api.requests({
            method: 'GET',
            url: `/product/id=${params.id}`
        }).then((res)=>{
            const data = res.data.result[0]
            setProduct(data)
            console.log(data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const handleDecrement = ()=>{
        if (qty > 0) {
            setQty(prevCount => prevCount - 1)
            setTotal( prevTotal => prevTotal - product.price)
        }

    }

    const handleIncrement = ()=>{
        if (qty < product.stock) {
            setQty(prevCount => prevCount + 1)
            setTotal( prevTotal => prevTotal + product.price)
        }
    }

    useEffect(()=>{
        getProduct()
    }, [])

    useEffect(()=>{
        Aos.init()
    }, [])

    return(
        <div className="product-detail-app">
            <NavbarCom3/>

            <div className="product-detail">
                <div className="details">
                    <div className="left-detail">
                        <div data-aos='zoom-in' data-aos-duration='600' data-aos-offset='100' className="big-img">
                            <img src={product.image} alt="Product_image" />
                        </div>

                        <div data-aos='zoom-in' data-aos-duration='600' data-aos-offset='100'  className="details-menu">
                            <h5 className="text-center" style={{fontWeight: 'bolder'}}>Details</h5>

                            <div className="row" style={{padding: '0px 10px 0 10px', fontWeight: 'bold', marginBottom: '10px'}}>
                                <div className="inc-dec-amount col-6">
                                    <div className="input-group">
                                        <button type="button" onClick={handleDecrement} className="input-group-text"><span style={{color: '#6160cc', fontWeight: 'bolder'}}>-</span></button>

                                        <div className="form-control text-center" style={{border: 'none'}}>
                                            <span style={{fontWeight: 'bold'}}>{qty}</span>
                                        </div>

                                        <button type="button" onClick={handleIncrement} className="input-group-text"><span style={{color: '#6160cc', fontWeight: 'bolder'}}>+</span></button>
                                    </div>
                                </div>

                                <div className="stock col-6" style={{fontSize: '20px', textAlign: 'right', margin: 'auto'}}>
                                    <span style={{color: '#777777'}}>Stock</span> {product.stock}
                                </div>
                            </div>

                            <div>
                                <p style={{fontSize: '13px', fontWeight: 'bold', color: '#6160cc', cursor: 'pointer'}}><BsPencil/> Add notes</p>
                            </div>

                            <div className="row" style={{padding: '0px 10px 0 10px', fontWeight: 'bold', marginBottom: '10px'}}>
                                <div className="col-6" style={{margin: 'auto'}}>
                                    <p style={{fontSize: '10px', fontWeight: 'bold', color: '#777777'}}>Sub-Total</p>
                                </div>

                                <div className="col-6" style={{fontSize: '20px', textAlign: 'right'}}>
                                    <p>{currency(total)}</p>
                                </div>
                            </div>

                            <div className="row" style={{padding: '0px 10px 0 10px', fontWeight: 'bold', marginBottom: '10px'}}>
                                <div className="col-6" style={{margin: 'auto'}}>
                                    <Button className="checkout-btn">Checkout</Button>
                                </div>

                                <div className="col-6" style={{fontSize: '20px', textAlign: 'right'}}>
                                    <Button className="detail-cart-btn"><BsCart/></Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="box">
                        <div data-aos='fade-right' data-aos-duration='600' data-aos-offset='100'  className="row">
                            <h1>{product.name}</h1>

                            <p style={{fontSize: '15px', fontWeight: 'bold'}}>
                                Sold <span style={{color: '#0300ad'}}>{product.sold}</span> | <BsStar style={{color: '#0300ad', fontSize:'13px'}}/> <span style={{color: '#0300ad'}}>{product.rating}</span>
                            </p>

                            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                <Row>
                                    <>
                                        <Nav variant="underline" style={{marginBottom: '10px'}}>
                                            <Nav.Item className="d-flex">
                                                <Nav.Link eventKey="first">Details</Nav.Link>

                                                <Nav.Link eventKey="second">Review</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </>

                                    <>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="first">
                                                <p style={{fontSize: '17px', textAlign: 'justify', backgroundColor: 'white', borderRadius: '10px'}}>{product.description}</p>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                <div className="review-tab" style={{backgroundColor: 'white'}}>
                                                    <div className="row" style={{padding: '0px 10px 0 10px', marginBottom: '10px'}}>
                                
                                                        <div className="col-6" style={{margin: 'auto'}}>
                                                            <p style={{fontSize: '17px', fontWeight: 'bolder'}}>{product.name}</p>
                                                        </div>

                                                        <div className="col-6" style={{fontSize: '20px', textAlign: 'right'}}>
                                                            <p><Rate/></p>
                                                        </div>
                                                    </div>

                                                    <div >
                                                        <textarea rows={4} style={{width: '100%', padding: '10px', borderRadius: '10px', border: 'none', boxShadow: '0 0 5px #00000030'}}/>
                                                    </div>

                                                    <div style={{textAlign: "right"}}>
                                                        <Button className="review-submit-btn">Submit</Button>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </>
                                </Row>
                            </Tab.Container>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail