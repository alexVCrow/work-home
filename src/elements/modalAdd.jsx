import React, { Component } from 'react';
import { Modal, Container, Row } from 'react-bootstrap';
import Joi from 'joi-browser';


class ModalAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [
                {placeholder: 'Фамилия', field: 'lastName', key: 1},
                {placeholder: 'Имя', field: 'firstName', key: 2 },
                {placeholder: 'Отчество', field: 'middleName', key: 3}
                ],
            data: {
                lastName: "",
                firstName: "",
                middleName: ""
            },
            error: {}
        }
        this.schema = {
            lastName: Joi.string().required().error(errors => {
                errors.forEach(err => {
                    switch (err.type) {
                        case "any.empty":
                            err.message = "Фамилия - обязательна к заполнению.";
                            break;
                        default:
                            break;
                    }
                });
                return errors;
            }),
            firstName: Joi.string().required().error(errors => {
                errors.forEach(err => {
                    switch (err.type) {
                        case "any.empty":
                            err.message = "Имя - обязательно к заполнению.";
                            break;
                        default:
                            break;
                    }
                });
                return errors;
            })
            ,
            middleName: Joi.string().required().error(errors => {
                errors.forEach(err => {
                    switch (err.type) {
                        case "any.empty":
                            err.message = "Отчество - обязательно к заполнению.";
                            break;
                        default:
                            break;
                    }
                });
                return errors;
            })
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    handleValidation({name, value}){
        const options = { abortEarly: false };
        const obj = {[name]: value};
        const schema = { [name]: this.schema[name] };
        const {error} = Joi.validate(obj, schema, options);
        return error ? error.details[0].message : null;
    }

    handleSubmit(event){
        event.preventDefault();
        const {data} = this.state;
        const {modalAddSuccess} = this.props;
        modalAddSuccess(data);
    }

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    handleChange({currentTarget: input}) {
        const error = { ...this.state.error };
        const errorTextMessage = this.handleValidation(input);
        if (errorTextMessage) error[input.name] = errorTextMessage;
        else delete error[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, error });
    }

    handleClassError = err => {
        return !err ? 'form-control':'form-control is-invalid';
    }

    render() {
        const {show, modalAddClose} = this.props;
        const {error, fields} = this.state;
        return (
            <Modal size="md" centered show={show} onHide={modalAddClose}>
                <Modal.Header className = "justify-content-center">
                    <Modal.Title>Добавление агента</Modal.Title>
                </Modal.Header>
                <Modal.Footer style={{display: 0}}>
                    <Container>
                        <Row className="show-grid justify-content-center">
                            <div className="col-sm-12 col-md-12">
                                <form onSubmit={this.handleSubmit}>
                                    {fields.map(f => (
                                        <div className="form-group" key={f.key}>
                                            <input type="text" className="form-control" name={f.field} onChange={this.handleChange} className={this.handleClassError(error[f.field])} placeholder={f.placeholder}/>
                                            {error[f.field] && (
                                                <div className="invalid-feedback">{error[f.field]}</div>
                                            )}
                                        </div>
                                    ))}
                                    <button className="btn btn-lg btn-info btn-block" disabled={this.validate()} type="submit">Добавить</button>
                                </form>
                            </div>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalAdd;