import React from 'react';
import {NavLink} from "react-router-dom";

const NavBar = ({user}) => {
    if(!user) return null;
    const listMenu = [{link:'/main',label:'Home'},{link:'/users',label:'Users'}];
    return (<React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                        aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        {listMenu.map(lm => (
                            <li className="nav-item" key={lm.label}>
                                <NavLink className="nav-link" to={lm.link}>
                                    {lm.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <span className="navbar-text mr-2">
                      <i className="fa fa-1x fa-user"> {user}</i>
                    </span>
                </div>
            </nav>
        </React.Fragment>)
};

export default NavBar;