import React, { Component } from 'react';
import './css/employeeDashboard.css';
import CustomerOrders from './customerOrders';
import CustomerMedicine from './customerMedicine';
import Profile from './profile';
import CustomerNavigation from './customerNavigation';

class CustomerDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //By default medicines will render
            medicines: true,
            // cart: false,
            orders: false,
            profile: false,
            cart_data: {}
        }
        this.buttonClicked = this.buttonClicked.bind(this)
        // this.changeCartState = this.changeCartState.bind(this)
    }

    buttonClicked(event) {
        // console.log("buttonid : " + event.target.value)
        if (event.target.value == 1) {
            this.setState({
                cart: false,
                medicines: true,
                orders: false,
                profile: false
            })
        }
        else if (event.target.value == 2) {
            this.setState({
                cart: false,
                medicines: false,
                orders: true,
                profile: false
            }, () => {

                console.log(this.state.orders)
            })
        }
        else if (event.target.value == 3) {
            this.setState({
                cart: false,
                medicines: false,
                orders: false,
                profile: true
            })
        }
        else if (event.target.value == 4) {
            this.setState({
                cart: true,
                medicines: false,
                orders: false,
                profile: false
            })
        }
    }

    renderSelectedView() {
        // {/* when orders button is clicked in -> /customers/dashboard/*/ }
        if (this.state.orders === true) {
            return <CustomerOrders />
        }

        // {/* when profile button is clicked in -> /customers/dashboard/*/ }
        if (this.state.profile === true) {
            return <Profile />
        }

        // {/* when medicines button is clicked in -> /customers/dashboard/*/ }
        if (this.state.medicines === true) {
            return <CustomerMedicine />
        }
        return null;
    }

    render() {

        return (
            <div className="dashboard">
                {/* /customers/dashboard/ -- JSX  */}
                <div>
                    <CustomerNavigation />
                    <button value="1" onClick={this.buttonClicked} className="dashboardButton">Medicines</button>
                    <button value="2" onClick={this.buttonClicked} className="dashboardButton">Orders</button>
                    <button value="3" onClick={this.buttonClicked} className="dashboardButton">Profile</button>
                </div>
                {/* function call to the rendering function */}
                {this.renderSelectedView()}

            </div>

        )
    }
}
export default CustomerDashboard;