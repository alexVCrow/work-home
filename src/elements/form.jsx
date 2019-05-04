import React, { Component } from 'react';
import Joi from "joi-browser";


class Form extends Component {

    constructor(props) {
        super(props);
        this.state = { data: {}, error: {} };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
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

    handleSubmit(event){
        event.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    }

    handleValidation({name, value}){
        const options = { abortEarly: false };
        const obj = {[name]: value};
        const schema = { [name]: this.schema[name] };
        const {error} = Joi.validate(obj, schema, options);
        return error ? error.details[0].message : null;
    }

    handleClassError = err => {
        return !err ? 'form-control':'form-control is-invalid';
    };

    renderButton(label, className) {
        return (
            <button disabled={this.validate()} className={className}>
                {label}
            </button>
        );
    }

    renderInput(name, placeholder, type = "text") {
        const { error } = this.state;
        return (
            <div className="form-group">
                <input type={type} name={name} onChange={this.handleChange} className={this.handleClassError(error[name])} placeholder={placeholder}/>
                {error[name] && (
                    <div className="invalid-feedback">{error[name]}</div>
                )}
            </div>
        );
    }
}

export default Form;