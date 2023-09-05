import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

function Api(urls = '') {
    
    const { token } = useSelector((state) => state.users)
    
    const [requests, setRequests] = useState({
        baseURL: process.env.REACT_APP_BASEURL || urls,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`
        }
    })

    const setConfig = () => {
        setRequests({
            ...requests,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            }
        })
    }

    useEffect(() => {
        setConfig()
    }, [])

    return { requests: axios.create(requests) }
}

export default Api