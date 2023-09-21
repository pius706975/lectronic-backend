import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './product.css'
import NavbarCom2 from "../../components/navbar/navbar2"
import Api from "../../helpers/api"
import { Button } from "react-bootstrap"

function Product() {

    const api = Api()
    const [categories, setCategories] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    const getCategories = async ()=>{
        api.requests({
            method: 'GET',
            url: '/category'
        }).then((res)=>{
            const data = res.data.result
            setCategories(data)
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
                    url: `/product/category?category_name=${selectedCategory}`
                });

                const data = response.data.result[0].result
                setFilteredProducts(data)
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getCategories()
    }, [])

    useEffect(()=>{
        filterProductsByCategory()
    }, [selectedCategory])
    
    return (
        <div className="product-app">
            <NavbarCom2/>

            <div className="product-list">
                <div className="product-category-btn" style={{display: 'flex', flexWrap: 'wrap'}}>
                    {categories.map((data)=>{
                        return (
                            <Button 
                                key={data.category_name}
                                className={`tab-category-btn ${selectedCategory === data.category_name ? 'active' : ''}`} 
                                style={{marginLeft: '10px', borderRadius: '10px '}} 
                                onClick={()=>setSelectedCategory(data.category_name)}>
                                {data.category_name}
                            </Button>
                        )
                    })}
                </div>


            </div>
        </div>
    )
}

export default Product