import React, { useEffect, useState } from "react"
import { BsStar } from 'react-icons/bs'
import { Card, Button } from "react-bootstrap"
import './card.css'
import { useNavigate } from "react-router-dom"
import currency from '../../helpers/format.currency'

function CardDetail(props) {
    
    const navigate = useNavigate()
    const [cardWidth, setCardWidth] = useState(250)
    const [fontSize, setFontSize] = useState({ title: 13, price: 15, rating: 15, button: 15 })
    const [imageWidth, setImageWidth] = useState(50)

    useEffect(() => {
        const handleResize = () => {
            const newCardWidth = window.innerWidth >= 768 ? 250 : window.innerWidth - 210
            setCardWidth(newCardWidth)

            const newFontSize = window.innerWidth >= 768 ? { title: 13, price: 15, rating: 15, button: 15 } : { title: 16, price: 14, rating: 14, button: 14 }
            setFontSize(newFontSize)

            const newImageWidth = window.innerWidth >= 768 ? 50 : 50
            setImageWidth(newImageWidth)
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const detail = () => {
        navigate(`/product/detail/${props.id}`)
    }

    return (
        <div className="detail">
            <Card className="detail-card" style={{ width: `${cardWidth}px`, height: '340px', borderRadius: '20px', padding: '10px', marginRight: '10px', marginBottom: '10px' }}>
                <Card.Title style={{ fontWeight: '400', fontSize: `${fontSize.title}px`, overflow: 'hidden' }}>{props.name}</Card.Title>
                <div className="row">
                    <div className="col-6" style={{ fontSize: `${fontSize.price}px`, fontWeight: 'bold', color: '#0300ad' }}>
                        {currency(props.price)}
                    </div>
                    <div className="col-6" style={{ fontSize: `${fontSize.rating}px`, color: '#0300ad', textAlign: 'right' }}>
                        <BsStar /> {props.rate}
                    </div>
                </div>
                <Card.Img style={{ margin: 'auto', width: `${imageWidth}%`, borderRadius: '10px' }} variant="top" src={props.image} />
                <div className="row" style={{ padding: '0px 10px 0 10px' }}>
                    <Button className="detail-btn" style={{ color: 'white', fontSize: `${fontSize.button}px`, fontWeight: '600', backgroundColor: '#0300ad', border: '1px solid #0300ad', borderRadius: '10px' }} onClick={detail}>Detail</Button>
                </div>
            </Card>
        </div>
    )
}

export default CardDetail
