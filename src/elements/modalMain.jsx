import React from 'react';
import { Modal} from 'react-bootstrap';
import ModalHeader from "./modalHeader";
import ModalFooter from "./modalFooter";

const ModalMain = ({show, modalAddClose, error, fields, data,textTitle,textButton,
                       handleChange,handleClassError,validate,handleSubmit,typeModal}) => {
        return (
            <Modal size="md" centered show={show} onHide={modalAddClose}>
                <ModalHeader textTitle={textTitle}/>
                <ModalFooter fields={fields}
                             textButton={textButton}
                             handleChange={handleChange}
                             handleClassError={handleClassError}
                             error={error}
                             data={data}
                             typeModal={typeModal}
                             validate={validate}
                             modalAddClose={modalAddClose}
                             handleSubmit={handleSubmit}/>
            </Modal>
        );
};

export default ModalMain;