import React, {Component} from 'react';
import Login from "./component/login_";
import { Route, Redirect, Switch } from "react-router-dom";
import Main from "./component/main";
import NavBar from './component/navbar';
import Users from "./component/users";


class App extends Component {

    state={};

    componentDidMount() {
        const user = localStorage.getItem('token');
        this.setState({ user});
    }

    onLogin = () => {
        const user = localStorage.getItem('token');
        this.setState({ user });
    };

    render() {
        const { user } = this.state;
        return (
            <React.Fragment>
                <NavBar user={user}/>
                <main className="container">
                    <Switch>
                        <Route
                            path="/login"
                            render={props => <Login {...props} user={user} onLogin={this.onLogin} />}
                        />
                        <Route path='/main' component={Main}/>
                        <Route path='/users' exact component={Users}/>
                        <Redirect from="/" exact to="/login" />
                    </Switch>
                </main>
            </React.Fragment>
        )
    }
}

export default App;
