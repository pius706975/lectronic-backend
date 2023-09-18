import React, { useEffect, useState } from "react"
import './profile.css'
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap"
import backLogo from '../../images/back.png'
import Api from '../../helpers/api'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {BsGenderMale, BsGenderFemale} from 'react-icons/bs'

function UserProfile() {

    const [errorMessage, setErrorMessage] = useState('')
    const [errorTimer, setErrorTimer] = useState(null)
    const clearErrorMessage = ()=>{
        setErrorMessage('')
        setErrorMessage(null)
    }

    const api = Api()
    const [user, setUser] = useState('')
    const {isAuth} = useSelector((state)=>state.users)
    const navigate = useNavigate()

    const [bg1, setBg1] = useState(true)
    const [bg2, setBg2] = useState(false)
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [birthday, setBirthday] = useState(new Date())
    const [gender, setGender] = useState('')
    const [password, setPassword] = useState('')

    const [imageData, setImageData] = useState([])

    const [data1, setData1] = useState('')
    const [data2, setData2] = useState('')
    const [data3, setData3] = useState('')
    const [data4, setData4] = useState('')
    const [data5, setData5] = useState(new Date())
    const [data6, setData6] = useState('')
    
    const handleBg1 = ()=>{
        setBg1(true)
        setBg2(false)
        setGender('male')
    }

    const handleBg2 = ()=>{
        setBg1(false)
        setBg2(true)
        setGender('female')
    }

    const handleGender = ()=>{
        if (data6 === 'male') {
            setBg1(true)
            setBg2(false)
        } else if (data6 === 'female') {
            setBg1(false)
            setBg2(true)
        }
    }

    const getUser = ()=>{
        api.requests({
            url: '/user/profile'
        }).then((res)=>{
            const data = res.data.result[0]
            setData1(data.image)
            setData2(data.name)
            setData3(data.address)
            setData4(data.phone_number)
            setData5(data.date_of_birth)
            setData6(data.gender)
            
            console.log(data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const changeImage = ()=>{
        api.requests({
            method: 'PUT',
            url: '/user/profile-picture',
            headers: {'Content-Type': 'multipart/form-data'},
            data: {
                image: image
            }
        }).then((res)=>{
            alert('Profile picture updated')
            window.location.reload(navigate('/profiile'))
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getUser()
        document.title = 'Profile'
    }, [])

    useEffect(()=>{
        handleGender()
    }, [data6])

    const handleHistory = ()=>{
        navigate(-1)
    }

    const [imgModal, setImgModal] = useState(false)
    const showImgModal = ()=>{
        setImgModal(true)
    }
    const saveImg = ()=>{
        changeImage()
        setImgModal(false)        
    }
    const cancelChangeImg = ()=>{
        setImgModal(false)
    }

    return (
        <div className="profile-app">
            {isAuth ? (
                <div className="user-profile">
                    <div>
                        <Button onClick={handleHistory} className="back-btn">
                            <Image src={backLogo} width={'30px'}/>
                        </Button>
                    </div>
                    <div className="profile-data">
                        <div onClick={showImgModal} className="profile-pic">
                            <Image className="img" src={data1} alt="..."/>
                        </div>

                        <Modal show={imgModal} onHide={cancelChangeImg}>
                            <Modal.Header closeButton>
                            
                            <Modal.Title style={{fontWeight: 'bolder'}}>Change picture</Modal.Title>
                            </Modal.Header>
                            
                            <Modal.Body>
                                <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                            </Modal.Body>
                            
                            <Modal.Footer>
                                <Button className="cancel-btn" onClick={cancelChangeImg}>
                                    Cancel
                                </Button>
                                <Button className="save-btn" onClick={saveImg}>
                                    Save
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <div className="box">
                            <div className="row">
                                <h1 style={{fontWeight: 'bolder'}}>Edit your personal bio</h1>
                                <p style={{fontSize: '15px'}}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>

                                <p>&nbsp;</p>
                                
                                <Form className="data-form">
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{fontWeight: 'bolder'}}>Name</Form.Label>
                                        <Form.Control className="forms" type="text" placeholder="John Doe" defaultValue={data2}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label style={{fontWeight: 'bolder'}}>Address</Form.Label>
                                        <Form.Control className="forms" type="text" placeholder="Your address" defaultValue={data3}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label style={{fontWeight: 'bolder'}}>Phone number</Form.Label>
                                        <Form.Control className="forms" type="text" placeholder="Your number" defaultValue={data4}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label style={{fontWeight: 'bolder'}}>Date of Birth</Form.Label>
                                        <Form.Control className="forms" type="date" placeholder="John Doe" defaultValue={data5}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label style={{fontWeight: 'bolder'}}>Gender</Form.Label>
                                        
                                        <div className="d-flex gender-form">
                                            <div className={bg1 ? "gender-btn gender-bg" : "gender-btn"} onClick={handleBg1}>
                                                <div className="gender-style" style={{cursor: "pointer"}}>
                                                    <p className={bg1 ? "gender-white" : "gender-style2"}>
                                                        <span className={bg1 ? "gender-white" : "gender-style2"}><BsGenderMale/></span>
                                                        &nbsp; Male
                                                    </p>
                                                </div>
                                            </div>

                                            <div className={bg2 ? "gender-btn gender-bg" : "gender-btn"} onClick={handleBg2}>
                                                <div className="gender-style" style={{cursor: "pointer"}}>
                                                    <p className={bg2 ? "gender-white" : "gender-style2"}>
                                                        <span className={bg2 ? "gender-white" : "gender-style2"} ><BsGenderFemale/></span>
                                                        &nbsp; Female
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label style={{fontWeight: 'bolder'}}>Password</Form.Label>
                                        <div>
                                            <Button className="change-password-btn">Change Password</Button>
                                        </div>
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            ):(
                window.location.reload(navigate('/'))
            )}
        </div>
    )
}

export default UserProfile