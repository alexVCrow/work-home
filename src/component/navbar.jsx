import React from 'react';
import {NavLink} from "react-router-dom";

const NavBar = ({user}) => {
    if(!user) return null;
    return (<React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                        aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/main">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/users">
                                Users
                            </NavLink>
                        </li>
                    </ul>
                    <span className="navbar-text mr-2">
                      <i className="fa fa-1x fa-user"> {user}</i>
                    </span>
                </div>
            </nav>
        </React.Fragment>)

}

export default NavBar;