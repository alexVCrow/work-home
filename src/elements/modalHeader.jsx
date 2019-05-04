import React from 'react';
import {Modal} from "react-bootstrap";

const ModalHeader = ({textTitle}) => {

    return (
        <Modal.Header className = "justify-content-center">
            <Modal.Title>{textTitle}</Modal.Title>
        </Modal.Header>
    );

};

export default ModalHeader;