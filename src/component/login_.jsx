import React, { Component } from 'react';
import './login.css';
import Joi from 'joi-browser';
import { Redirect } from "react-router-dom";

class Login_ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                login:"",
                password:""
            },
            error: {}
        }
        this.schema = {
            login: Joi.string().required().error(errors => {
                errors.forEach(err => {
                    switch (err.type) {
                        case "any.empty":
                            err.message = "Логин - обязательно к заполнению.";
                            break;
                        default:
                            break;
                    }
                });
                return errors;
            }),
            password: Joi.string().alphanum().min(3).max(8).required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    case "any.empty":
                        err.message = "Пароль - обязательно к заполнению.";
                        break;
                    case "string.min":
                        err.message = `Минимальная длина пароля ${err.context.limit} символов!`;
                        break;
                    case "string.max":
                        err.message = `Минимальная длина пароля ${err.context.limit} символов!`;
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
        const {data} = this.state;
        if(data.login !== 'admin' && data.password !== 'admin'){
            alert('Данные неверные!')
        } else {
            localStorage.setItem("token", "admin");
            this.props.onLogin();
            this.props.history.push("/main");
        }
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
    }

    render() {
        const { error } = this.state;
        const { user } = this.props;
        if (user) return <Redirect to="/main" />;
        return (
            <form className="form-signin shadow-lg p-3 mb-5 rounded" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="text" id="login" name="login" onChange={this.handleChange} className={this.handleClassError(error['login'])} placeholder="Логин"/>
                    {error['login'] && (
                        <div className="invalid-feedback">{error['login']}</div>
                    )}
                </div>
                <div className="form-group">
                    <input type="password" id="password" onChange={this.handleChange} name="password" className={this.handleClassError(error['password'])} placeholder="Пароль"/>
                    {error['password'] && (
                        <div className="invalid-feedback">{error['password']}</div>
                    )}
                </div>
                <button className="btn btn-lg btn-info btn-block" disabled={this.validate()}  type="submit">Войти</button>
            </form>
        );
    }
}

export default Login_;