import React, { useState } from "react"
import { Button, Modal } from "react-bootstrap";

function CustomAlert({show, setShow, message}) {

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered backdrop="static">
                <Modal.Body>
                    <h3 style={{color: 'green', fontWeight: 'bolder', textAlign: 'center'}}>{message}</h3>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CustomAlert