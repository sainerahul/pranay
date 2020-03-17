import React, { Component } from 'react'
import axios from 'axios'
import CustomerOrderDetails from './customerOrderDetails';
import './css/medicineOrders.css'
import './css/orderDetailsTable.css'
class CustomerOrders extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Order_id: 0,
            Orders: [],
            Order_detail: []
        }
        this.showOrderDetails = this.showOrderDetails.bind(this)
    }

    componentDidMount() {
        this.renderOrders();
    }

    renderOrders = async () => {
        try {
            // fetcing the data
            let res = await axios.get(`http://localhost:8081/customer/${localStorage.getItem('customer_id')}/orders`, {
                headers: {

                    Authorization: 'Bearer ' + localStorage.getItem('customer_token')
                }
            });
            let medicines_data = res.data.data;
            console.log("Orders data ::" + JSON.stringify(medicines_data))
            // this will re render the view with new data
            this.setState({
                Orders: medicines_data,
            });
            console.log("Orders data ::" + this.state.Orders)
        } catch (err) {
            console.log(err);
        }
    }


    renderTableHeader() {
        if (!this.state.Orders[0]) { return null }
        else {
            let header =
                ["ORDER_ID", "STORE_ID", "EMPLOYEE_ID", , "AMOUNT",]
            // Object.keys(this.state.Orders[0])
            return header.map((key, index) => {
                return <th key={index}>{key.toUpperCase()}</th>
            })
        }
    }

    renderTableData() {
        return this.state.Orders.map((order) => {
            return (
                // {"order_id":9,"store_id":1,"employee_id":5,"customer_id":1,"amount":"3550","timestamp":"2020-02-07T09:29:43.641Z"}
                <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>{order.store_id}</td>
                    <td>{order.employee_id}</td>
                    <td>{order.amount}</td>
                    <button value={order.order_id.toString()} onClick={this.showOrderDetails}>View Order</button>
                </tr>
            )
        })
    }

    showOrderDetails = async (event) => {
        //  TODO: showOrderDetails.
        console.log("Clicked ::" + event.target.value)
        let eventTarget = event.target
        this.setState({
            // Updated the order_id
            Order_id: event.target.value
        }, async () => {
            try {
                // Got the data
                let res = await axios.get(`http://localhost:8081/customer/${localStorage.getItem('customer_id')}/orders/${eventTarget.value}}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('customer_token')
                    }
                });
                console.log("Results array ::" + JSON.stringify(res.data.data.order_details.rows));
                this.setState({
                    Order_detail: res.data.data.order_details.rows
                }, () => {
                    console.log("Order_detail array updated")
                    console.log("this.state.Order_detail ::" + JSON.stringify(this.state.Order_detail))
                })
            }
            catch (err) {
                console.log(err)
            }
        })
    }



    renderOrderDetails() {
        // if (!this.state.Order_detail["order_id"]) {
        //     console.log(this.state.Order_detail["order_id"])
        //     console.log("renderOrderDetails not executing!!")
        //     //cart is empty
        //     return null
        // } else {
        //     console.log("renderOrderDetails executing!!")
        //     //cart is not empty , render cart
        //     // this.props.changeCartState(this.state.Cart)
        //     // return <CustomerCart cart_data={this.state.Cart} med_data={this.state.Medicines} emptyCart={this.emptyCart} />
        //     return <CustomerOrderDetails order_data={this.state.Order_detail} />
        // }
        if (this.state.Order_id != 0) {
            // order clicked
            console.log("this.state.Oder_details ::custOrders :: " + JSON.stringify(this.state.Order_detail))
            return <CustomerOrderDetails order_data={this.state.Order_detail} />
        } else {
            // no order clicked
            return null
        }

    }

    render() {
        return (
            <div style={{marginTop:'2%'}}>
                <div style={{float: 'left',marginLeft:'2%',
                border:  '3px solid rgba(7, 53, 31, 0.801)',
                borderRadius: '30px',
                padding: '2%',}}>
                <h1 id='medicine_table_title'>Medicines Table</h1>
                <table align="left" id='medicines'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
                </div>
                <div style={{marginRight:'2%',float:'right'}} >{this.renderOrderDetails()}</div>
            </div>
        )
    }


}

export default CustomerOrders;