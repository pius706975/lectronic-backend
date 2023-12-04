import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import './card.css';
import { useNavigate } from "react-router-dom";
import currency from '../../helpers/format.currency';

function CardHome(props) {
    const navigate = useNavigate();
    const [cardWidth, setCardWidth] = useState(250);
    const [fontSize, setFontSize] = useState({ title: 13, price: 15 });

    useEffect(() => {
        const handleResize = () => {
            const newCardWidth = window.innerWidth >= 768 ? 250 : window.innerWidth - 210;
            setCardWidth(newCardWidth);

            const newFontSize = window.innerWidth >= 768 ? { title: 13, price: 15 } : { title: 16, price: 14 };
            setFontSize(newFontSize);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const detail = () => {
        navigate(`/product/detail/${props.id}`);
    };

    return (
        <div className="detail">
            <Card onClick={detail} className="detail-card" style={{ width: `${cardWidth}px`, height: '340px', borderRadius: '20px', padding: '10px', marginRight: '10px', marginBottom: '10px' }}>

                <Card.Title style={{ fontWeight: '400', fontSize: `${fontSize.title}px` }}>{props.name}</Card.Title>

                <div className="row">
                    <div className="col-6" style={{ fontSize: `${fontSize.price}px`, fontWeight: 'bold', marginBottom: '5px', color: '#0300ad' }}>
                        {currency(props.price)}
                    </div>
                </div>

                <Card.Img style={{ margin: 'auto', width: '50%', borderRadius: '10px' }} variant="top" src={props.image} />

            </Card>
        </div>
    );
}

export default CardHome;
