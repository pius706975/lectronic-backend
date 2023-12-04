import React, { useEffect, useState } from "react"
import './profile.css'
import {Button, Form, Image, Modal} from "react-bootstrap"
import backLogo from '../../images/back.png'
import Api from '../../helpers/api'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {BsGenderMale, BsGenderFemale} from 'react-icons/bs'
import CustomAlert from "../../components/alerts/custom-alert"
import Aos from "aos"
import 'aos/dist/aos.css'

function UserProfile() {

    const [errorMessage, setErrorMessage] = useState('')
    const [setErrorTimer] = useState(null)
    const clearErrorMessage = ()=>{
        setErrorMessage('')
        setErrorMessage(null)
    }

    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')
    // const progressRef = useRef(null)
    // const [uploadProgress, setUploadProgress] = useState(0)

    const api = Api()
    // const [user, setUser] = useState('')
    const {isAuth} = useSelector((state)=>state.users)
    const navigate = useNavigate()

    const [bg1, setBg1] = useState(true)
    const [bg2, setBg2] = useState(false)

    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState('')
    const [password, setPassword] = useState('')

    // const [imageData, setImageData] = useState([])

    const [data1, setData1] = useState('')
    const [data2, setData2] = useState('')
    const [data3, setData3] = useState('')
    const [data4, setData4] = useState('')
    const [data5, setData5] = useState('')
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

            const dob = new Date(data.date_of_birth)
            dob.setDate(dob.getDate()+1)
            const formattedDate = dob.toISOString().split('T')[0]

            setData5(formattedDate)
            setData6(data.gender)
            
            // console.log(data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const updateUser = ()=>{
        api.requests({
            method: 'PUT',
            url: '/user/edit-profile',
            headers: {'Content-Type': 'multipart/form-data'},
            data: {
                name: name,
                address: address,
                phone_number: phone,
                date_of_birth: birthday,
                gender: gender,
            }
        }).then((res)=>{
            setAlertMsg('Profile updated successfully')
            setShowAlert(true)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const updatePassword = ()=>{
        api.requests({
            method: 'PUT',
            url: '/user/password',
            data: {
                password: password
            }
        }).then((res)=>{
            setAlertMsg('Password updated successfully')
            setShowAlert(true)
        }).catch((error)=>{
            if (error.response && error.response.data) {
                const errorMsg = error.response.data.result[0].message
                setErrorMessage(errorMsg)
                setErrorTimer(setTimeout(clearErrorMessage, 5000))
                // console.log(errorMsg)
            } else {
                console.log('An error occurred: ', error.message);
            }
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
            setAlertMsg('Profile image changed successfully')
            setShowAlert(true)
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getUser()
        document.title = 'Profile'
    }, [])

    useEffect(()=>{
        if (name === '' && data2) {
            setName(data2)
        }
    }, [data2, name])

    useEffect(()=>{
        if (birthday === '' && data5) {
            setBirthday(data5)
        }
    })

    useEffect(()=>{
        handleGender()
    }, [data6])

    useEffect(()=>{
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false)
                getUser()
            }, 1000);

            return ()=> clearTimeout(timer)
        }
    }, [showAlert])

    const handleHistory = ()=>{
        navigate('/')
    }
   
    // password modal
    const [passwordModal, setPasswordModal] = useState(false)
    const showPasswordModal = ()=>{
        setPasswordModal(true)
    }
    const savePassword = ()=>{
        updatePassword()
        setPasswordModal(false)
    }
    const passwordCancel = ()=>{
        setPasswordModal(false)
    }

    // img modal
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

    useEffect(()=>{
        Aos.init()
    }, [])

    return (
        <div className="profile-app">
            {isAuth ? (
                <div className="user-profile">
                    <div data-aos='fade-right' data-aos-duration='600' data-aos-offset='100'>
                        <Button onClick={handleHistory} className="back-btn">
                            <Image src={backLogo} width={'30px'}/>
                        </Button>
                    </div>

                    <div className="profile-data">
                        <div data-aos='zoom-out' data-aos-duration='600' data-aos-offset='100' onClick={showImgModal} className="profile-pic">
                            <div>
                                <Image className="img" src={data1} alt="..."/>
                            </div>
                        </div>

                        <Modal show={imgModal} onHide={cancelChangeImg} aria-labelledby="contained-modal-title-vcenter" centered>
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
                                    Upload
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <div className="box">
                            <CustomAlert show={showAlert} setShow={setShowAlert} message={alertMsg}/>
                            <div data-aos='fade-right' data-aos-duration='600' data-aos-offset='100' className="row">
                                <h1 style={{fontWeight: 'bolder', textAlign: 'justify'}}>Edit your personal bio</h1>
                                <p style={{fontSize: '15px', textAlign: 'justify'}}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>

                                <p>&nbsp;</p>
                                
                                <Form className="data-form">
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{fontWeight: 'bolder'}}>Name</Form.Label>
                                        <Form.Control className="forms" type="text" placeholder="John Doe" defaultValue={data2} onChange={(e) => setName(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label style={{fontWeight: 'bolder'}}>Address</Form.Label>
                                        <Form.Control className="forms" type="text" placeholder="Your address" defaultValue={data3} onChange={(e)=>setAddress(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label style={{fontWeight: 'bolder'}}>Phone number</Form.Label>
                                        <Form.Control className="forms" type="text" placeholder="Your number" defaultValue={data4} onChange={(e)=>setPhone(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label style={{fontWeight: 'bolder'}}>Date of Birth</Form.Label>
                                        <Form.Control className="forms" type="date" defaultValue={data5} onChange={(e)=>setBirthday(e.target.value)}/>
                                    </Form.Group>

                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
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
                                                <Button onClick={showPasswordModal} style={{borderRadius: '20px'}} className="change-password-btn">Change</Button>
                                            </div>
                                        </Form.Group>

                                        <Modal show={passwordModal} onHide={passwordCancel} aria-labelledby="contained-modal-title-vcenter" centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Change Password</Modal.Title>
                                            </Modal.Header>
                                            
                                            <Modal.Body>
                                                <Form.Group className="mb-3">
                                                    <Form.Label style={{fontWeight: 'bolder'}}>New Password</Form.Label>
                                                    <Form.Control className="forms" type="password" placeholder="Your new password" onChange={(e)=>setPassword(e.target.value)}/>
                                                    
                                                    <div className="error-message">
                                                        {errorMessage && <p style={{color: 'red', fontSize: '15px'}} className="error-message">{errorMessage}</p>}
                                                    </div>
                                                </Form.Group>
                                            </Modal.Body>
                                            
                                            <Modal.Footer>
                                                <Button className="cancel-btn" onClick={passwordCancel}>Cancel</Button>

                                                <Button className="save-btn" onClick={savePassword}>Save</Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                    
                                    <Form.Group className="mb-3">
                                        <p>&nbsp;</p>
                                        <div>
                                            <Button onClick={updateUser} style={{width: '100%', borderRadius: '20px'}} className="change-password-btn">Submit</Button>
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