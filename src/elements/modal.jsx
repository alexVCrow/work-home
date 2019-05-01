import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';


class ModalMy extends Component {
    render() {
        const {show, modalDeleteClose, modalSuccess} = this.props;
        return (
                <Modal size="md" centered show={show} onHide={modalDeleteClose}>
                    <Modal.Header className = "justify-content-center">
                        <Modal.Title>Подтвердите удаление</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer style={{display: 0}}>
                            <Button variant="danger" onClick={modalDeleteClose}>
                                Отменить
                            </Button>
                            <Button variant="secondary" onClick={modalSuccess}>
                                Подтвердить
                            </Button>
                    </Modal.Footer>
                </Modal>
        );
    }
}

export default ModalMy;