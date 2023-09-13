import React from "react"
import { Card} from "react-bootstrap"
import './card.css'
import { useNavigate } from "react-router-dom"
import currency from '../../helpers/format.currency'

function CardHome(props) {

    const navigate = useNavigate()

    const detail = ()=>{
        navigate(`/products/detail/${props.id}`)
    }
    
    return (
        <div className="detail">
            
            <Card onClick={detail} className="detail-card" style={{ width: '336px', height: '441px', borderRadius: '20px', padding: '30px'}}>

                <Card.Title style={{fontWeight: '400', fontSize: '18px'}}>{props.name}</Card.Title>

                <div className="row">
                    <div className="col-6" style={{fontSize: '26px', fontWeight: '800', marginBottom: '5px', color: '#0300ad'}}>
                        {currency(props.price)}
                    </div>
                </div>

                <Card.Img style={{margin: 'auto', width: '200px', height: '300px'}} variant="top" src={props.image} />

            </Card>
            
        </div>
    )
}

export default CardHome