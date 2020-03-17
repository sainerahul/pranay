import React, { Component } from 'react'
import './css/orderDetailsTable.css'
class CustomerOrderDetails extends Component {
    constructor(props) {
        super(props)
    }

    display() {
        return Object.keys(this.props.order_data).map((order,i) => {
            return (
                <tr key={order.order_id}>
                    <td>{this.props.order_data[order].medicine_id}</td>
                    <td>{this.props.order_data[order].medicine_quantity}</td>
                    <td>{this.props.order_data[order].amount}</td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        if (!this.props.order_data[0]) { return null }
        else {
            let header =
                [ "Medicine_ID", "Medicine_quantity", , "Amount",]
            return header.map((key, index) => {
                return <th key={index}>{key}</th>
            })
        }
    }

    render() {
        return (
                <div>
                <table className="table">
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.display()}
                    </tbody>
                </table>
            </div >
           
        )
    }
}

export default CustomerOrderDetails
