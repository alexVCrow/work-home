import React from 'react';
import './login.css';
import { Redirect } from "react-router-dom";
import LoginForm from "../elements/loginform";

const Login_ = ({user,onLogin,...props}) => {
        if (user) return <Redirect to="/main" />;
        return <LoginForm {...props} onLogin={onLogin}/>;
};

export default Login_;