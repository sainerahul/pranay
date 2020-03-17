import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/employeeNavigation.css';
import authentication from './employeeAuthentication'

class Navigation extends Component {
    logout() {
        if (localStorage.getItem("employee_id") != null) {
            localStorage.removeItem("employee_id")
            localStorage.removeItem("employee_token")
            authentication.logout(() => {
                console.log("exec : employee authenticate.logout()")
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
                        {/* TODO :: put this in a conditional renderMethod for godsake */}
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