import React from "react"
import { Card} from "react-bootstrap"
import './card.css'
import { useNavigate } from "react-router-dom"
import currency from '../../helpers/format.currency'

function CardHome(props) {

    const navigate = useNavigate()

    const detail = ()=>{
        navigate(`/product/detail/${props.id}`)
    }
    
    return (
        <div className="detail">
            
            <Card onClick={detail} className="detail-card" style={{ width: '250px', height: '340px', borderRadius: '20px', padding: '10px', marginRight: '10px'}}>

                <Card.Title style={{fontWeight: '400', fontSize: '13px'}}>{props.name}</Card.Title>

                <div className="row">
                    <div className="col-6" style={{fontSize: '15px', fontWeight: 'bold', marginBottom: '5px', color: '#0300ad'}}>
                        {currency(props.price)}
                    </div>
                </div>

                <Card.Img style={{margin: 'auto', width: '50%', borderRadius: '10px'}} variant="top" src={props.image} />

            </Card>
            
        </div>
    )
}

export default CardHome