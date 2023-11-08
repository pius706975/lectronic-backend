import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './product.css'
import NavbarCom2 from "../../components/navbar/navbar2"
import Api from "../../helpers/api"
import { Button, FormControl, InputGroup } from "react-bootstrap"
import CardDetail from '../../components/card/card.detail'
import Pagination from "../../components/pagination/pagination"
import { BsCart, BsSearch } from "react-icons/bs"
import { BiFilterAlt } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

function Product() {

    const navigate = useNavigate()
    const api = Api()

    const [categories, setCategories] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    const [searchResults, setSearchResults] = useState([])

    const [keyword, setKeyword] = useState('')
    const [query, setQuery] = useState('')

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(12)
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

    const filterProductsByCategory = async ()=>{
        try {
            if (selectedCategory) {
                const response = await api.requests({
                    method: 'GET',
                    url: `/product/category?category_name=${selectedCategory}&page=${page}&limit=${limit}`
                })

                const data = response.data.result
                setFilteredProducts(data[0].result)
                setPages(data[0].totalPages)
                setRows(data[0].totalRows)
                // console.log(data)
                // console.log(filteredProducts)
                // console.log(selectedCategory)
            }
        } catch (error) {
            console.log(error)
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
        searchProduct()
    }, [page, keyword])

    const searchData = (e)=>{
        e.preventDefault()
        
        setKeyword(query)
    }

    useEffect(()=>{
        getCategories()
    }, [])

    useEffect(()=>{
        filterProductsByCategory()
    }, [page, selectedCategory])

    const handlePageClick = (pageNum)=>{
        setPage(pageNum)
    }

    const toCartPage = ()=>{
        navigate('/cart')
    }

    useEffect(()=>{
        document.title = 'Products'
    }, [])

    const displayProducts = query ? searchResults : filteredProducts

    return (
        <div className="product-app">
            <NavbarCom2/>
            
            <div className="search" style={{margin: '0px auto',     background: 'linear-gradient(to bottom, #f2f4fb 0%, #f2f4fb 50%, #ffffff00 50%, #ffffff00 100%)'}}>
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
                                setPage(1)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    setKeyword(query);
                                }
                            }}
                        />

                        <Button type="submit" className="search-btn-product" onClick={searchData}><BsSearch/></Button>
                    </InputGroup>

                    <Button style={{visibility: 'hidden'}}></Button>

                    <Button onClick={toCartPage} className="additional-product-btn">
                        <BsCart/>
                    </Button>

                    <Button style={{visibility: 'hidden'}}></Button>

                    <Button className="additional-product-btn">
                        <BiFilterAlt/>
                    </Button>
                </div>
            </div>

            <div className="product-list">
                <div className="product-category-btn" style={{display: 'flex', flexWrap: 'wrap'}}>
                    {categories.map((data)=>{
                        return (
                            <Button 
                                key={data.category_name}
                                className={`tab-category-btn ${selectedCategory === data.category_name ? 'active' : ''}`} 
                                style={{marginLeft: '10px', borderRadius: '10px '}} 
                                onClick={()=>{
                                    setSelectedCategory(data.category_name)
                                    setPage(1)
                                    }}>
                                {data.category_name}
                            </Button>
                        )
                    })}
                </div>

                <p></p>

                <div className="filtered-category-list" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', justifyItems: 'left', maxWidth: '1100px', marginBottom: '50px'}}>                    
                    {displayProducts.map((data)=>{
                        return (
                            <div key={data.product_id}>
                                <CardDetail 
                                    id={data.product_id}
                                    name={data.name}
                                    price={data.price}
                                    rate={data.rating}
                                    image={data.image}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="footer-pagination">
                <Pagination
                    key={`${page}-${selectedCategory}`}
                    currentPage={page} 
                    totalPages={pages} 
                    onPageChange={handlePageClick}
                /> 
            </div>
        </div>
    )
}

export default Product