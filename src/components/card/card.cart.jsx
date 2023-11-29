import React from "react"
import './card.css'
import { Card } from "react-bootstrap"

function CardCart(props) {
    return(
        <div className="cart-card">
            <Card className="cart-card">
                <div className="d-flex flex-wrap">
                    <div>
                        <Form.Check style={{fontSize: '20px', fontWeight: 'bolder'}} inline label="Select All"/>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default CardCart