import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './css/insertCustomer.css'
import axios from 'axios'
import eye from './eye.png'
class InsertCustomer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: "password",
            counter: 0
        }
        this.buttonClicked = this.buttonClicked.bind(this)
        this.passwordStateChange = this.passwordStateChange.bind(this)
    }
    buttonClicked(event) {
        event.preventDefault()
        var data = {
            customer_name: this.refs.name.value,
            customer_email: this.refs.email.value,
            customer_phone: this.refs.phone.value,
            customer_address: this.refs.address.value,
            customer_password: this.refs.password.value
        }

        console.log(" Data is ::" + JSON.stringify(data))

        axios.post('http://localhost:8081/customer', data)
            .then((resp) => {
                console.log("Inside then :: " + JSON.stringify(resp))
                if (resp.data.status_code == 103) { // user created successfully
                    alert("User created successfully")
                    this.props.history.push('login')
                }
                else if (resp.data.status_code == 102) {
                    alert("User already exists")
                    this.props.history.push('login')
                }
            })
            .catch((error) => {
                console.log("Inside the catch :: " + JSON.stringify(error))
                alert("Error encountered!!")
                this.props.history.push('login')
            })
    }

    passwordStateChange(event) {
        event.preventDefault();
        //alert(event.target.type)
        let count = this.state.counter
        count = count + 1
        if (count % 2 == 0) {
            this.setState({
                type: "password",
                counter: count
            })
        }
        else {
            this.setState({
                type: "text",
                counter: count
            })
        }
    }

    render() {
        return (
            <div className="signUp">
                <table align="center" className="signup">
                    <tr>
                        <td><label>Name:</label></td>
                        <td> <input type="text" ref="name" className="txtbox" /></td>
                    </tr>
                    <tr>
                        <td> <label>Email:</label></td>
                        <td><input type="text" ref="email" className="txtbox" /></td>
                    </tr>
                    <tr>
                        <td><label>Phone:</label></td>
                        <td><input type="text" ref="phone" className="txtbox" /></td>
                    </tr>
                    <tr>
                        <td><label>Address:</label></td>
                        <td><input type="text" ref="address" className="txtbox" /></td>
                    </tr>
                    <tr>
                        <td><label>Password:</label></td>
                        <td><input type={this.state.type} ref="password" className="txtbox" /></td>
                        <td ><img onClick={this.passwordStateChange} src={eye} height="42" width="42" /></td>
                    </tr>
                </table>
                <button type="submit" className="button" align="center" onClick={this.buttonClicked}>submit</button>
            </div>
        )
    }
}
export default withRouter(InsertCustomer);