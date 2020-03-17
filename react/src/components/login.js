import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import jwt from 'jsonwebtoken';
import './css/login.css';
import authenticate from './employeeAuthentication'
import customerAuthentication from './customerAuthentication'

class Login extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            msg: "",
            authenticated: false
        }
        this.authenticate = this.authenticate.bind(this);
        this.signUp = this.signUp.bind(this);
    }
    authenticate(event) {
        event.preventDefault();
        let credentials = {};
        let url = '';
        if (window.location.href.includes('customers')) {
            credentials.customer_email = this.refs.email.value;
            credentials.password = this.refs.password.value;
            url = 'http://localhost:8081/customer/login';
        }
        if (window.location.href.includes('employees')) {
            credentials.employee_email = this.refs.email.value;
            credentials.password = this.refs.password.value;
            url = 'http://localhost:8081/employee/login'
        }
        var request = new Request(url, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(credentials)
        });
        let that = this;
        // console.log()
        fetch(request)
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        if (data.status == 100) {
                            that.setState({
                                msg: "",
                                authenticated: true
                            });
                            let { id, role } = JSON.parse(JSON.stringify(jwt.decode(data.Token)));
                            if (role === "customer") {
                                console.log("customer login")
                                localStorage.setItem('customer_id', id)
                                localStorage.setItem('customer_token', data.Token)
                                customerAuthentication.login(() => {
                                    console.log("exec : customer authenticate.login()")
                                })
                            }
                            else if (role === "employee") {
                                localStorage.setItem('employee_id', id)
                                localStorage.setItem('employee_token', data.Token)
                                console.log("employee login")
                                authenticate.login(() => {
                                    console.log("exec : employee authenticate.login()")
                                })
                            }
                            that.props.history.push('dashboard')
                        }
                        else {
                            that.setState({
                                msg: "* Invalid login credentials *",
                                authenticated: false
                            });
                            localStorage.clear(); //TODO:: handle this
                        }
                    })
            })
            .catch((error) => {
                alert("Error while fetching")
                console.log("Error while fetching ")
            })
    }
    signUp(event) {
        event.preventDefault()
        this.props.history.push('signUp')
        // return <InsertCustomer/>
    }

    mainRender() {
        return (
            <div className="login">
                <form onSubmit={this.authenticate}>
                    {/* <form> */}
                    <table cellPadding="10%">
                        <tr>
                            <td><label for="Username">Username</label></td>
                            <td><input type="text" ref="email" className="inputs" /></td>
                        </tr>
                        <tr>
                            <td><label for="Password">Password</label></td>
                            <td><input type="password" ref="password" className="inputs" /></td>
                        </tr>
                    </table>
                    <p className="message">{this.state.msg}</p>
                    <div className="loginButtons">
                        <button type="submit" className="button" onCLick={this.authenticate}>Login</button>
                        {window.location.href.includes('customers') && (<button type="submit" className="button" onClick={this.signUp} >Signup</button>)}
                    </div>
                </form>

            </div>
        )
    }

    render() {
        return (
            <div>
                {this.mainRender()}
            </div>
        )

    }
}
export default withRouter(Login);