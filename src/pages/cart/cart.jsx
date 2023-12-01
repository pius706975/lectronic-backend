import React, { useEffect, useState} from "react"
import './cart.css'
import Api from "../../helpers/api"
import { useSelector } from "react-redux"
import NavbarCom2 from "../../components/navbar/navbar2"
import { Button, Form, FormControl, Image, InputGroup } from "react-bootstrap"
import { BsSearch } from "react-icons/bs"
import formatCurrency from "../../helpers/format.currency"
import { RiDeleteBin6Line } from "react-icons/ri"
import Aos from "aos"
import 'aos/dist/aos.css'
import CustomAlert from "../../components/alerts/custom-alert"
import DangerAlert from "../../components/alerts/danger-alert"

function Cart() {
    const api = Api()
    const {isAuth} = useSelector((state)=>state.users)
    const [cartItem, setCartItem] = useState([])
    const [showItem, setShowItem] = useState(false)

    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [showDangerAlert, setShowDangerAlert] = useState(false)
    const [dangerMessage, setDangerMessage] = useState('')
    
    const [searchResults, setSearchResults] = useState([])
    const [keyword, setKeyword] = useState('')
    const [query, setQuery] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const getUser = ()=>{
        api.requests({
            method: 'GET',
            url: '/user/profile'
        }).then((res)=>{
            // const data = res.data.result[0]
            // console.log(data)
        }).catch((err)=>{
            console.log(err.message)
        })
    }

    const getAllItems = async ()=>{
        try {
            api.requests({
                method: 'GET',
                url: '/cart'
            }).then((res)=>{
                const data = res.data.result
                setCartItem(data)
                setShowItem(true)
                // console.log(data)
            }).catch((error)=>{
                if (error.response && error.response.data) {
                    const errorMessage = error.response.data.result[0].message
                    setErrorMessage(errorMessage)
                    setShowItem(false)
                    // console.log(errorMessage)
                } else {
                    console.log(`An error occurred: ${error.message}`)
                }
            })
        } catch (error) {
            console.log(`An error occurred: ${error.message}`)   
        }
    }

    const searchItem = ()=>{
        try {
            api.requests({
                method: 'GET',
                url: `/cart/search?product_name=${keyword}`
            }).then((res)=>{
                const data = res.data.result
                setSearchResults(data)
                // console.log(data)
            }).catch((error)=>{
                if (error.response && error.response.data) {
                    const errorMessage = error.response.data.result[0].message
                    setShowDangerAlert(true)
                    setDangerMessage(errorMessage)
                    setTimeout(() => {
                        setShowDangerAlert(false)
                    }, 1500)
                    // console.log(errorMessage)
                } else {
                    console.log(`An error occurred: ${error.message}`)
                }
            })
        } catch (error) {
            console.log(`An error occurred: ${error.message}`)
        }
    }

    const deleteItem = (id)=>{
        api.requests({
            method: 'DELETE',
            url: `/cart/id=${id}`
        }).then((res)=>{
            setShowAlert(true)
            setAlertMessage('Item deleted')
            setTimeout(() => {
                setShowAlert(false)
            }, 1000)
            getAllItems()
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        if (isAuth) {
            getUser()
        }
    }, [isAuth])

    useEffect(()=>{
        getAllItems()
    }, [])

    useEffect(()=>{
        searchItem()
    }, [keyword])

    const searchData = (e)=>{
        e.preventDefault()

        setKeyword(query)
    }

    useEffect(()=>{
        document.title = 'Cart'
        Aos.init()
    }, [])

    const displayItems = query ? searchResults : cartItem

    const increaseQTY = (id)=>{
        const getStocks = displayItems.find((data)=>data.cart_id === id)

        if (getStocks.qty < getStocks.product_data.stock) {
            api.requests({
                method: 'PUT',
                url: `/cart/increase=${id}`
            }).then((res)=>{
                getAllItems()
            }).catch((err)=>{
                console.log(err)
            })
        } else {
            setShowAlert(true)
            setAlertMessage('You add more than the stocks')
            setTimeout(() => {
                setShowAlert(false)
            }, 1000)
        }
    }

    const decreaseQTY = (id)=>{
        const getStocks = displayItems.find((data)=>data.cart_id === id)
        
        if (getStocks.qty - 1 !== 0) {
            api.requests({
                method: 'PUT',
                url: `/cart/decrease=${id}`
            }).then((res)=>{
                getAllItems()
            }).catch((err)=>{
                console.log(err)
            })
        } else {
            setShowAlert(true)
            setAlertMessage('Minimum item is 1')
            setTimeout(() => {
                setShowAlert(false)
            }, 1000)
        }
    }

    const [selectAll, setSelectAll] = useState(false)

    const handleCheckbox = (index)=>{
        const updatedItem = [...displayItems]
        updatedItem[index].selected = !updatedItem[index].selected
        setCartItem(updatedItem)

        const allSelected = updatedItem.every((item)=>item.selected)
        setSelectAll(allSelected)
    }

    const handleSelectAll = ()=>{
        setSelectAll(!selectAll)

        const updatedItem = displayItems.map((data)=>({
            ...data,
            selected: !selectAll
        }))

        setCartItem(updatedItem)
    }

    const getItemPrice = ()=>{
        return displayItems.reduce((total, item)=>{
            if (item.selected || selectAll) {
                return total + item.product_data.price
            }
            return total
        }, 0)
    }

    const getTotalItems = ()=>{
        const totalItems =  displayItems.reduce((total, item)=>{
            if (item.selected || selectAll) {
                return total + item.qty
            }
            return total
        }, 0)

        return totalItems === 0 ? `${totalItems}` : totalItems === 1 ? `${totalItems} item` : `${totalItems} items`
    }

    const getBill = ()=>{
        return displayItems.reduce((total, item)=>{
            if (item.selected || selectAll) {
                return total + item.product_data.price * item.qty
            }
            return total
        }, 0)
    }

    return (
        <div className="cart-app" data-aos='fade-down' data-aos-duration='600' data-aos-offset='100'>
            <NavbarCom2/>

            {isAuth ? (
                <div className="cart">
                    <div className="search" style={{margin: '0px auto', background: 'linear-gradient(to bottom, #f2f4fb 0%, #f2f4fb 50%, #ffffff00 50%, #ffffff00 100%)'}} data-aos='fade-down' data-aos-duration='600' data-aos-offset='100'>
                        <div style={{borderRadius: "20px", maxWidth: '1100px', margin: 'auto', display: 'flex'}}>
                            <InputGroup>
                                <FormControl 
                                    type="text"
                                    className="product-search" 
                                    placeholder="Tap To Search For Something" 
                                    aria-label="Type to search" 
                                    aria-describedby="basic-addon2"
                                    value={query}
                                    onChange={(e)=>{
                                        setQuery(e.target.value)
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault()
                                            setKeyword(query)
                                        }
                                    }}
                                />

                                <Button type="submit" className="search-btn-product" onClick={searchData}><BsSearch/></Button>
                            </InputGroup>
                        </div>
                    </div>

                    <div className="item-list" data-aos='fade-right' data-aos-duration='600' data-aos-offset='100'>
                        <p></p>

                        <h1>Cart</h1>

                        <p>&nbsp;</p>

                        <Form.Check style={{fontSize: '30px', fontWeight: 'bolder'}} inline label="Select All" checked={selectAll} onChange={handleSelectAll}/>
                    </div>

                    <div className="items">
                        {showItem ? (
                            <div className="left-item">
                                <div data-aos='zoom-in-right' data-aos-duration='600' data-aos-offset='100'>
                                    {
                                        displayItems.map((data, index)=>{
                                            return(
                                                <div className="main-item-card" key={index}>
                                                    <div style={{margin: 'auto'}}>
                                                        <Form.Check style={{fontSize: '20px', fontWeight: 'bolder'}} inline checked={selectAll || data.selected} onChange={()=>handleCheckbox(index)}/>
                                                    </div>
                                                    
                                                    <div className="left-item-card">

                                                        <div style={{margin: 'auto'}}>
                                                            <Image className="cart-img" src={data.product_data.image}/>
                                                        </div>

                                                        <div style={{marginTop: 'auto'}}>
                                                            <p className="text-dark" style={{overflow: 'hidden', fontSize: '15px'}}>{data.product_data.name}</p>

                                                            <p className="text-light" style={{fontSize: '10px', padding: '5px', backgroundColor: '#4f4dc6', width: 'max-content', borderRadius: '10px'}}>{data.product_data.category_name}</p>

                                                            <p style={{fontSize: '15px', color: 'blue', fontWeight: 'bold'}}>{formatCurrency(data.product_data.price)}</p>
                                                        </div>
                                                    </div>

                                                    <div className="right-item-card" style={{marginTop: 'auto'}}>
                                                        <div className="item-delete-btn">
                                                            <p onClick={()=>deleteItem(data.cart_id)}><RiDeleteBin6Line/></p>
                                                        </div>

                                                        <CustomAlert
                                                            show={showAlert}
                                                            onClose={()=>setShowAlert(false)}
                                                            message={alertMessage}
                                                        />
                                                        
                                                        <DangerAlert
                                                            show={showDangerAlert}
                                                            onClose={()=>setShowDangerAlert(false)}
                                                            message={dangerMessage}
                                                        />

                                                        <p>&nbsp;</p>

                                                        <div>
                                                            <div className="input-qty">
                                                                <button type="button" className="input-group-qty"><span style={{color: '#0300ad', fontWeight: 'bolder'}} onClick={()=>decreaseQTY(data.cart_id)}>-</span></button>

                                                                <div className="form-control text-center" style={{border: 'none'}}>
                                                                    <span style={{fontWeight: 'bold'}}>{data.qty}</span>
                                                                </div>

                                                                <button type="button" className="input-group-qty"><span style={{color: '#0300ad', fontWeight: 'bolder'}} onClick={()=>increaseQTY(data.cart_id)}>+</span></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        ):(
                            <div className="error-message">
                                <p style={{color: 'red'}}>{errorMessage}</p>
                            </div>
                        )}

                        <div className="box">
                            <div className="row">
                                <div className="detail-price" data-aos='zoom-in-down' data-aos-duration='600' data-aos-offset='100'>
                                    <h3 style={{fontWeight: 'bolder'}}>Total</h3>

                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <p className="text-dark">Item price</p>
                                        <p>&nbsp;</p>
                                        <p>{formatCurrency(getItemPrice())}</p>
                                    </div>

                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <p className="text-dark">Total items</p>
                                        <p>&nbsp;</p>
                                        <p>{getTotalItems()}</p>
                                    </div>

                                    <p style={{borderBottom: '1px solid black', width: '100%'}}></p>

                                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', fontWeight: 'bold'}}>
                                        <p className="text-dark">Bill</p>
                                        <p>&nbsp;</p>
                                        <p className="text-dark">{formatCurrency(getBill())}</p>
                                    </div>

                                    <div>
                                        <Button className="cart-checkout-btn">Checkout</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ) : (
                <div style={{margin: 'auto', marginTop: '25%', textAlign: 'center'}}>
                    <h1 style={{color: 'red'}}>Oops!</h1>
                    <h3 className="text-danger">You need to login first!</h3>
                </div>
            )}
        </div>
    )
}

export default Cart