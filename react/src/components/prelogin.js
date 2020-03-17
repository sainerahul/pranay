import React, { Component } from 'react';
import './css/preLogin.css';
import Navigation from './navigation';
import customerAuthentication from './customerAuthentication';
import employeeAuthentication from './employeeAuthentication';
class PreLogin extends Component {
    constructor(props) {
        super(props)
        this.props = props;
        console.log("this.props ::" + JSON.stringify(this.props))
        this.customerButton = this.customerButton.bind(this);
        this.employeeButton = this.employeeButton.bind(this);
    }

    customerButton() {
        console.log("cus clicked ")
        if (customerAuthentication.isAuthenticated()) {
            this.props.history.push("customers/dashboard")
        } else {
            this.props.history.push('customers/login')
        }
    }

    employeeButton() {
        console.log("emp clicked ")
        if (employeeAuthentication.isAuthenticated()) {
            this.props.history.push("employees/dashboard")
        } else {
            this.props.history.push("employees/login")
        }
    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="preLogin">
                    {/* <Link to="/customers/login" className="btn">Customer</Link> */}
                    <button className="btn" onClick={() => this.customerButton()}>Customer</button>
                    <button className="btn" onClick={() => this.employeeButton()}>employee</button>
                    {/* <Link to="/employees/login" className="btn">Employee</Link> */}
                </div>
            </div>
        )
    }
}
export default PreLogin;