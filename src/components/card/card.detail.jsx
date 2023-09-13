import React from "react"
import {BsCart, BsStar} from 'react-icons/bs'
import { Card, Button } from "react-bootstrap"
import './card.css'
import { useNavigate } from "react-router-dom"
import currency from '../../helpers/format.currency'

function CardDetail(props) {

    const navigate = useNavigate()

    const detail = ()=>{
        navigate(`/products/detail/${props.id}`)
    }

    const addToCart = ()=>{
        navigate(`/cart/${props.id}`)
    }
    
    return (
        <div className="detail">
            
            <Card className="detail-card" style={{ width: '336px', height: '520px', borderRadius: '20px', padding: '30px'}}>

                <Card.Title style={{fontWeight: '400', fontSize: '18px'}}>{props.name}</Card.Title>

                <div className="row">
                    <div className="col-6" style={{fontSize: '26px', fontWeight: '800', marginBottom: '5px', color: '#0300ad'}}>
                        {currency(props.price)}
                    </div>

                    <div className="col-6" style={{fontSize: '20px', color: '#0300ad', textAlign: 'right'}}>
                        <BsStar/> {props.rate}
                    </div>
                </div>

                <Card.Img style={{margin: 'auto', width: '200px', height: '300px'}} variant="top" src={props.image} />

                <div className="row">
                    <Button className="detail-btn" style={{color: 'white', fontSize: '18px', fontWeight: '600', width: '222px', backgroundColor: '#0300ad', border: '1px solid #0300ad', borderRadius: '10px'}} onClick={detail}>Detail</Button>

                    <Button className="cart-btn" style={{width: '50px', borderRadius: '10px', border: '1px solid #0300ad', backgroundColor: 'white', color: '#0300ad', marginLeft: 'auto'}} onClick={addToCart}><BsCart/></Button>
                </div>

            </Card>
            
        </div>
    )
}

export default CardDetail