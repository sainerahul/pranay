import React, { Component } from 'react';
import DisplayTable from './diplayTable'
import Profile from './profile';
import './css/employeeDashboard.css';
import EmployeeNavigation from './employeeNavigation';

class EmployeeDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medicines: false,
            orders: true,
            profile: false
        }
        this.buttonClicked = this.buttonClicked.bind(this)

    }
    buttonClicked(event) {
        // console.log("buttonid : " + event.target.value)
        if (event.target.value == 1) {
            this.setState({
                orders: false,
                profile: true
            })
        }
        else if (event.target.value == 2) {
            this.setState({
                orders: true,
                profile: false
            })
            //console.log(this.state.orders)
        }
    }

    renderSelectedView() {
        //alert(";hi")
        if (this.state.orders == true) {
            return <DisplayTable />
        }
        if (this.state.profile == true) {
            return <Profile />
        }
    }
    render() {
        return (
            <div className="dashboard">
                <div>
                    <EmployeeNavigation />
                    <button value="1" onClick={this.buttonClicked} className="dashboardButton">Profile</button>
                    <button value="2" onClick={this.buttonClicked} className="dashboardButton">Orders</button>
                </div>
                {this.renderSelectedView()}

            </div>

        )
    }
}
export default EmployeeDashboard;