import React, { Component } from 'react'
import axios from 'axios'
// import './css/orderDetailsTable.css'

class OrderDetails extends Component {
    constructor(props) {
        super(props)
        this.state = { my_store: props.store_id }
        console.log("Data from parent props.store_id :: " + JSON.stringify(this.props.store_id))
        console.log("Data from parent props.store_id :: " + JSON.stringify(this.state.my_store))
        console.log("Data from parent props.store_medicines :: " + JSON.stringify(this.props.store_medicines))
    }

    FTC() {
        let FLAG = true
        // console.log("FTC ::"+JSON.stringify(this.props.store_medicines.data.data))
        // return null
        this.props.order_data.forEach((order_med) => {


            if (this.props.store_medicines.data.data.filter((med) => med.medicine_id === order_med.medicine_id)[0]["medicine_quantity"] < order_med.medicine_quantity) {
                FLAG = false
            }
        })
        if(FLAG){
            return(
                <tr>
                    <td><button>Accept</button></td>
                    <td><button>Reject</button></td>
                </tr>
            )
        }
        else{
            return(<tr>
                <td><button>Reject</button></td>
            </tr>)
        }
    }
    display() {
        // Rendering the Current OrderDetails
        console.log("Control in DIsplay")
        return Object.keys(this.props.order_data).map((order, i) => {
            return (
                <tr key={order.order_id}>
                    <td>{this.props.order_data[order].medicine_id}</td>
                    <td>{this.props.order_data[order].medicine_quantity}</td>
                    <td>{this.props.order_data[order].amount}</td>
                    <td>{(this.props.store_medicines.data.data.filter(medicine_details => medicine_details.medicine_id === this.props.order_data[order].medicine_id))[0]["medicine_quantity"]}</td>
                    <td>{((this.props.store_medicines.data.data.filter(medicine_details => medicine_details.medicine_id === this.props.order_data[order].medicine_id))[0]["medicine_quantity"] > (this.props.order_data[order].medicine_quantity)) ? "YES" : "NO"}</td>

                </tr>
            )
        })
    }

    renderTableHeader() {
        if (!this.props.order_data[0]) { return null }
        else {
            let header =
                ["Medicine_ID", "Medicine_quantity", , "Amount", "Available Stock", "Available"]
            return header.map((key, index) => {
                return <th key={index}>{key}</th>
            })
        }
    }

    confirmButtons() {
        return (
            <tr>
                <td><button>Accept</button></td>
                <td><button>Reject</button></td>
            </tr>
        )
    }

    render() {
        return (
            <div style={{ float: 'right', width: '500px' }}>
                <table>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.display()}
                        {this.FTC()}
                    </tbody>
                </table>

            </div >

        )
    }
}
export default OrderDetails


