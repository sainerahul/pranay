import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/navigation.css';
class Navigation extends Component {

    render() {
        const navStyle = {
            color: 'white',
            textDecoration: 'none'
        }
        return (
            <div>
                <nav className="navigation">
                    <Link style={navStyle} to="/">
                        <h2>MEDPLUS</h2>
                    </Link>
                    <ul className="nav-links">
                        <li>About</li>
                        <li>Contact Us</li>
                        <Link style={navStyle} to="/">
                            <li>Login</li>
                        </Link>
                    </ul>
                </nav>
            </div>
        )
    }
}
export default Navigation;