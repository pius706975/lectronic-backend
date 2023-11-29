import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './home.css'
import NavbarCom from "../../components/navbar/navbar"
import FooterCom from "../../components/footer/footer"
import img from './image.png'
import { Button, Image, FormControl, InputGroup } from "react-bootstrap"
import {BsBag, BsHandbag, BsBox, BsSearch} from 'react-icons/bs'
import {PiShoppingBag} from 'react-icons/pi'
import {FaMoneyBillWave} from 'react-icons/fa'
import Api from "../../helpers/api"
import CardHome from "../../components/card/card.home"
import Aos from "aos"
import 'aos/dist/aos.css'

function Home() {

    const api = Api()

    const [categories, setCategories] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [searchResults, setSearchResults] = useState([])
    const [keyword, setKeyword] = useState('')
    const [query, setQuery] = useState('')

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(4)
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState(0)
    

    const getCategories = async ()=>{
        api.requests({
            method: 'GET',
            url: '/category'
        }).then((res)=>{
            const data = res.data.result
            setCategories(data)

            if (data.length > 0) {
                setSelectedCategory(data[0].category_name)
            }

            // console.log(data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const filterByCategory = async ()=>{
        try {
            if (selectedCategory) {
                const res = await api.requests({
                    method: 'GET',
                    url: `product/category?category_name=${selectedCategory}&page=${page}&limit=${limit}` 
                })

                const data = res.data.result
                setFilteredProducts(data[0].result)
                setPages(data[0].totalPages)
                setRows(data[0].totalRows)

                // console.log(data)
                // console.log(filteredProducts)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const searchProduct = async ()=>{
        api.requests({
            method: 'GET',
            url: `/product/name?name=${keyword}&page=${page}&limit=${limit}`
        }).then((res)=>{
            const data = res.data.result
            setSearchResults(data[0].result)
            setPages(data[0].totalPages)
            setRows(data[0].totalRows)
            // console.log(data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getCategories()
    }, [])

    useEffect(()=>{
        filterByCategory()
    }, [page, selectedCategory])

    useEffect(()=>{
        searchProduct()
    }, [page, keyword])

    const searchData = (e)=>{
        e.preventDefault()
        setKeyword(query)
    }

    useEffect(()=>{
        Aos.init()
    }, [])

    
    useEffect(()=>{
        document.title = 'Home'
    }, [])

    const displayProducts = query ? searchResults : filteredProducts

    return (
        <div className="home-app">
            <NavbarCom/>

            {/* Section 1 */}
            <div id="home" className="home-banner d-flex">
                <div className="home-banner-container">
                    <div className="home-banner-content">
                        <div className="home-banner-left-side">
                            <h1 data-aos='fade-right' data-aos-duration='600' data-aos-offset='100' className="banner-title" style={{fontSize: "50px", fontWeight: "bolder"}}>Take Your Time And <span style={{color: "#0020b2"}}>Shop</span> Anywhere</h1>

                            <p data-aos='fade-right' data-aos-duration='800' data-aos-offset='100' className="banner-paragraph">Find stuff what you want easily</p>

                            <div className="banner-btn d-flex">
                                <div style={{padding: '0'}} data-aos='fade-down' data-aos-duration='600' data-aos-offset='100'>
                                    <Button href="#our-products" className="banner-shop-btn"><BsBag/> Shop now</Button>
                                </div>

                                <Button style={{visibility: "hidden"}}></Button>
                                
                                <div data-aos='fade-down' data-aos-duration='600' data-aos-offset='100' style={{padding: '0'}}>
                                    <Button className="banner-offer-btn"><BsHandbag/> Be a seller</Button>
                                </div>
                            </div>
                        </div>

                        <div className="box">
                            <div className="row">
                                <Image data-aos='zoom-in' data-aos-duration='600' data-aos-offset='100' className="home-img" src={img} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2 */}
            <div id="howitworks" className="home-second-container" style={{marginTop: "120px"}}>
                <div data-aos='zoom-in-down' data-aos-duration='600' data-aos-offset='100' style={{backgroundColor: "#f2f4fb", width: "150px", margin: "auto", borderRadius: "20px"}}>
                    <p style={{color: "#0020b2", textAlign: "center", padding: "10px"}}>How it works</p>
                </div>

                <p></p>

                <div data-aos='zoom-in' data-aos-duration='600' data-aos-offset='100' style={{width: "300px", margin: "auto", borderRadius: "20px"}}>
                    <h1 style={{fontWeight: "bold", textAlign: "center", padding: "10px"}}>Make An Order Easily</h1>
                </div>

                <div>
                    <div className="d-flex">
                        <div style={{maxWidth: "1700px", width: "100%", margin: "50px auto", padding: "10px"}}>
                            
                            <div style={{display: "flex", justifyContent: "space-around", flexWrap: "wrap", padding: "30px 0"}}>
                                <div data-aos='zoom-in-down' data-aos-duration='600' data-aos-offset='100' className="steps" style={{marginBottom: "15px", maxWidth: "250px", border: "solid 1px #0020b2", borderRadius: "10px", textAlign: "justify", padding: "25px"}}>
                                    <p className="icon" style={{margin: "auto", padding: "10px", backgroundColor: "#f1f1f1", width: "50px", borderRadius: "100%", textAlign: "center"}}><PiShoppingBag/></p>
                                    <p></p>
                                    <h5 style={{fontWeight: "bold"}}>Select Products</h5>
                                    <p style={{fontSize: "15px"}}>Select one or more products that you want and you have 2 choices to buy directly or save products into cart.</p> 
                                </div>

                                <div data-aos='zoom-in-down' data-aos-duration='600' data-aos-offset='100' className="steps" style={{marginBottom: "15px", maxWidth: "250px", border: "solid 1px #0020b2", borderRadius: "10px", textAlign: "justify", padding: "25px"}}>
                                    <p className="icon" style={{margin: "auto", padding: "10px", backgroundColor: "#f1f1f1", width: "50px", borderRadius: "100%", textAlign: "center"}}><FaMoneyBillWave/></p>
                                    <p></p>
                                    <h5 style={{fontWeight: "bold"}}>Make Payment</h5>
                                    <p style={{fontSize: "15px"}}>Select payment method after considering what product do you want to get.</p>
                                </div>

                                <div data-aos='zoom-in-down' data-aos-duration='600' data-aos-offset='100' className="steps" style={{marginBottom: "15px", maxWidth: "250px", border: "solid 1px #0020b2", borderRadius: "10px", textAlign: "justify", padding: "25px"}}>
                                    <p className="icon" style={{margin: "auto", padding: "10px", backgroundColor: "#f1f1f1", width: "50px", borderRadius: "100%", textAlign: "center"}}><BsBox/></p>
                                    <p></p>
                                    <h5 style={{fontWeight: "bold"}}>Receive Products</h5>
                                    <p style={{fontSize: "15px"}}>The products is in shipping process. Just wait for a few days until the ordered product arrives at your home.</p> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Section 3 */}
            <div id="our-products" className="home-third-container" style={{marginTop: "30px", marginBottom: '100px'}}>
                <div data-aos='zoom-in-down' data-aos-duration='600' data-aos-offset='100' style={{backgroundColor: "#f2f4fb", width: "150px", margin: "auto", borderRadius: "20px"}}>
                    <p style={{color: "#0020b2", textAlign: "center", padding: "10px"}}>Our Products</p>
                </div>

                <p></p>

                <div data-aos='zoom-in' data-aos-duration='600' data-aos-offset='100' style={{width: "300px", margin: "auto", borderRadius: "20px"}}>
                    <h3 style={{fontWeight: "bolder", textAlign: "center", padding: "10px"}}>The Best Product By Lectronic</h3>
                </div>

                <div>
                    <div className="d-flex">
                        <div style={{maxWidth: "1700px", width: "100%", margin: "auto"}}>
                            
                            <div data-aos='zoom-in-right' data-aos-duration='600' data-aos-offset='100' style={{maxWidth: '1400px', margin:'auto', display: "flex", justifyContent: "space-around", flexWrap: "wrap", padding: "30px 0"}}>
                                {
                                    categories.map((data)=>{
                                        return (
                                            <div className="d-flex" style={{display: "flex", flexWrap: "wrap"}} >
                                                <div style={{margin: "auto", borderRadius: "20px"}}>
                                                    <Button
                                                        style={{width: "160px", border: "none"}}
                                                        key={data.category_name}
                                                        className={`product-btn ${selectedCategory === data.category_name ? 'active' : ''}`}
                                                        onClick={()=>{
                                                            setSelectedCategory(data.category_name)
                                                            setPage(1)
                                                        }}
                                                        >{data.category_name}</Button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                                <div style={{borderRadius: "10px", border: "1px solid #0020b2"}}>
                                    <InputGroup>
                                        <FormControl 
                                            type="text"
                                            className="input-search" 
                                            placeholder="Search" 
                                            aria-label="Type to search" 
                                            aria-describedby="basic-addon2"
                                            value={query}
                                            onChange={(e)=>{
                                                setQuery(e.target.value)
                                                setPage(1)
                                            }}
                                            onKeyDown={(e)=>{
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    setKeyword(query)
                                                }
                                            }}
                                        />

                                        <button type="submit" className="sec3-search-btn" onClick={searchData}><BsSearch/></button>
                                    </InputGroup>
                                </div>
                            </div>

                            <p></p>

                            <div data-aos='zoom-in' data-aos-duration='600' data-aos-offset='100'>
                                <div className="filtered-category-list" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', justifyItems: 'left', maxWidth: '1100px', margin: 'auto', marginBottom: '50px'}}>
                                    {
                                        displayProducts.map((data)=>{
                                            return (
                                                <div key={data.product_id}>
                                                    <CardHome
                                                        id={data.product_id}
                                                        price={data.price}
                                                        image={data.image} 
                                                        name={data.name}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div data-aos='zoom-in' data-aos-duration='600' data-aos-offset='100'>
                                <div className="text-center">
                                    <Button href="/product" className="view-all-btn" style={{border: '1px solid 0020b2', borderRadius: '10px', fontWeight: '800'}}>View All</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <FooterCom/>
        </div>
    )
}

export default Home