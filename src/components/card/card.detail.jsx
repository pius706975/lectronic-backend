import React from "react"
import {BsStar} from 'react-icons/bs'
import { Card, Button } from "react-bootstrap"
import './card.css'
import { useNavigate } from "react-router-dom"
import currency from '../../helpers/format.currency'

function CardDetail(props) {

    const navigate = useNavigate()

    const detail = ()=>{
        navigate(`/product/detail/${props.id}`)
    }
    
    return (
        <div className="detail">
            
            <Card className="detail-card" style={{ width: '250px', height: '340px', borderRadius: '20px', padding: '10px', marginRight: '10px', marginBottom: '10px'}}>

                <Card.Title style={{fontWeight: '400', fontSize: '13px', overflow: 'hidden'}}>{props.name}</Card.Title>

                <div className="row">
                    <div className="col-6" style={{fontSize: '15px', fontWeight: 'bold', color: '#0300ad'}}>
                        {currency(props.price)}
                    </div>

                    <div className="col-6" style={{fontSize: '15px', color: '#0300ad', textAlign: 'right'}}>
                        <BsStar/> {props.rate}
                    </div>
                </div>

                <Card.Img style={{margin: 'auto', width: '50%', borderRadius: '10px'}} variant="top" src={props.image} />

                <div className="row" style={{padding: '0px 10px 0 10px'}}>
                    <Button className="detail-btn" style={{color: 'white', fontSize: '15px', fontWeight: '600', backgroundColor: '#0300ad', border: '1px solid #0300ad', borderRadius: '10px'}} onClick={detail}>Detail</Button>
                </div>

            </Card>
            
        </div>
    )
}

export default CardDetail