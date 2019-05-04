import React from 'react';
import Form from "./form";
import {fieldsValidationsFormLogin} from "../utils/fieldsValidations";


class LoginForm extends Form {

    state = {
        data: { login: "", password: "" },
        error: {}
    };

    schema = fieldsValidationsFormLogin();

    doSubmit = () => {
        const {data} = this.state;
        if(data.login !== 'admin' && data.password !== 'admin'){
            alert('Данные неверные!')
        } else {
            localStorage.setItem("token", "admin");
            this.props.onLogin();
            this.props.history.push("/main");
        }
    };

    render() {
        return (
                <form className="form-signin shadow-lg p-3 mb-5 rounded" onSubmit={this.handleSubmit}>
                    {this.renderInput("login", "Логин","text")}
                    {this.renderInput("password", "Пароль", "password")}
                    {this.renderButton("Войти","btn btn-lg btn-info btn-block")}
                </form>
        );
    }
}

export default LoginForm;