import React, { useState } from "react"
import {FaStar} from 'react-icons/fa'

function Rate() {

    const [rating, setRating] = useState(null)
    const [rateColor, setRateColor] = useState(null)

    return(
        <>
            {[...Array(5)].map((star, index) => {

                const currentRate = index + 1

                return(

                    <>
                        <label>

                            <input style={{display: 'none'}} type="radio" name="rate" value={currentRate} onClick={()=> setRating(currentRate)}/>
    
                            <FaStar color={currentRate <= (rateColor || rating) ? '#0300ad' : 'grey'}/>
                        </label>
                    </>
                )
            })}
        </>
    )
}

export default Rate