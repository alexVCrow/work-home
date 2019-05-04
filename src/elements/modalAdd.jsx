import React, { Component } from 'react';
import Joi from 'joi-browser';
import ModalMain from "./modalMain";
import { fieldsValidationsChangeModal, fieldsValidationsAddModal } from "../utils/fieldsValidations";

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
        };
        this.schema = fieldsValidationsAddModal();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    componentDidMount() {
        const {modal} = this.props;
        if(modal.typeModal === 'changeModal') {
            this.schema = fieldsValidationsChangeModal();
            this.setState({data: modal.people});
        }
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
        const {modal} = this.props;
        modal.successModal(data);
    }

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        // if (!error) return null;
        //
        // const errors = {};
        // for (let item of error.details) errors[item.path[0]] = item.message;
        return error;
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
    };

    render() {
        const {show, modal} = this.props;
        const {error, fields, data} = this.state;
        return (
            <ModalMain show={show}
                       modalAddClose={modal.closeModal}
                       fields={fields}
                       textTitle={modal.textTitle}
                             textButton={modal.textButton}
                             handleChange={this.handleChange}
                             handleClassError={this.handleClassError}
                             error={error}
                             data={data}
                             typeModal={modal.typeModal}
                             validate={this.validate()}
                             handleSubmit={this.handleSubmit}/>
        );
    }
}

export default ModalAdd;