import React, { Component } from 'react';
import {Modal, Container, Row, Button} from 'react-bootstrap';

class ModalFooter extends Component {

    state = {
        isChange: false
    };

    getValue = field => {
        const {data, typeModal} = this.props;
        return typeModal === 'addModal' && !this.state.isChange ? "" : data[field];
    };

    onChange = event => {
        const {handleChange} = this.props;
        this.setState({isChange: true});
        handleChange(event);
    };

    getFooterContainer = () => {
        const {fields, textButton,
            handleClassError, error, validate, handleSubmit} = this.props;
        return (
            <Container>
                <Row className="show-grid justify-content-center">
                    <div className="col-sm-12 col-md-12">
                        <form onSubmit={handleSubmit}>
                            {fields.map(f => (
                                <div className="form-group" key={f.key}>
                                    <input type="text" name={f.field}
                                           value={this.getValue(f.field)}
                                           onChange={this.onChange}
                                           className={handleClassError(error[f.field])}
                                           placeholder={f.placeholder}/>
                                    {error[f.field] && (
                                        <div className="invalid-feedback">{error[f.field]}</div>
                                    )}
                                </div>
                            ))}
                            <button className="btn btn-lg btn-info btn-block" disabled={validate} type="submit">{textButton}</button>
                        </form>
                    </div>
                </Row>
            </Container>
        )
    };

    getFooterContainerButtons = () => {
        const {modalAddClose, handleSubmit} = this.props;
        return (
            <React.Fragment>
                <Button variant="danger" onClick={modalAddClose}>
                    Отменить
                </Button>
                <Button variant="secondary" onClick={handleSubmit}>
                Подтвердить
                </Button>
            </React.Fragment>
        )
    };

    render() {
        const {typeModal} = this.props;
        return (
            <Modal.Footer style={{display: 0}}>
                {typeModal === 'confirmModal' ? this.getFooterContainerButtons() : this.getFooterContainer()}
            </Modal.Footer>
        )
    }
}

export default ModalFooter;

