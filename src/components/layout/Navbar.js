import React from 'react'
import {Link } from 'react-router-dom'

const Navbar = ({icon,title}) =>  {
    return (
        <nav className="navbar bg-primary">
            <Link to="/">
                <h1>
                    <i className={icon}/> {title}
                </h1>
            </Link>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>   
        </nav>
        
    );
}

Navbar.defaultProps = {
    title:"Github finder",
    icon:"fab fa-github"
};
 
export default Navbar;