import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/employeeNavigation.css';
import customerAuthentication from './customerAuthentication'
class Navigation extends Component {
    logout() {
        if (localStorage.getItem("customer_id") != null) {
            localStorage.removeItem("customer_id")
            localStorage.removeItem("customer_token")
            customerAuthentication.logout(() => {
                console.log("exec :customer authenticate.logout()")
            })
        }
    }
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
                        <Link style={navStyle} to="/" onClick={this.logout}>
                            <li>Logout</li>
                        </Link>
                    </ul>
                </nav>
            </div>
        )
    }
}
export default Navigation;