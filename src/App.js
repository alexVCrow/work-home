import React, {Component} from 'react';
import Login from "./component/login_";
import { Route, Redirect, Switch } from "react-router-dom";
import Main from "./component/main";
import NavBar from './component/navbar';
import Users from "./component/users";
import Change from "./elements/modalChange";


class App extends Component {

    state={};

    componentDidMount() {
        const user = localStorage.getItem('token');
        this.setState({ user});
    }

    onLogin = () => {
        const user = localStorage.getItem('token');
        this.setState({ user });
    }

    render() {
        const { user } = this.state;
        return (
            <React.Fragment>
                <NavBar user={user}></NavBar>
                <main className="container">
                    <Switch>
                        <Route
                            path="/login"
                            render={props => <Login {...props} user={user} onLogin={this.onLogin} />}
                        />
                        <Route path='/main' component={Main}></Route>
                        <Route path='/users' exact component={Users}></Route>
                        <Route path='/change' component={Change}></Route>
                        <Redirect from="/" exact to="/login" />
                    </Switch>
                </main>
            </React.Fragment>
        )
    }
}

export default App;
