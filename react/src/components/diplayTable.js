import React, { Component } from 'react'
import axios from 'axios'
import OrderDetails from './orderDetails'
import './displayTable.css'
class DisplayTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderdetail: [],
            order_id: 0,
            order_data: [],
            StoreId: -1,
            Store_Medicines: {}

        }
        this.renderOrders = this.renderOrders.bind(this)
    }
    componentDidMount() {
        this.renderOrders();
    }

    renderOrderDetails = async (event) => {
        this.setState({
            order_id: event.target.value
        })
        try {
            let res = await axios.get(`http://localhost:8081/employee/${localStorage.getItem('employee_id')}/orders/${event.target.value}}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('employee_token')
                }
            });
            this.setState({
                orderdetail: JSON.parse(JSON.stringify(res.data.data.rows))
            })
        }
        catch (err) {
            console.log(err)
        }
    }


    renderOrders = async () => {
        try {
            let res = await axios.get(`http://localhost:8081/employee/${localStorage.getItem('employee_id')}/orders`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('employee_token')
                }
            });
            console.log("res :: " + JSON.stringify(res.data.data[0].store_id))
            let med_data = await axios.get(`http://localhost:8081/store/${res.data.data[0].store_id}/medicines`)
            console.log("Medicine is ::" + JSON.stringify(med_data))

            let orders_data = res.data.data;
            console.log("Total response :::" + JSON.stringify(res.data.data));
            console.log("Total response['store_id'] :::" + JSON.stringify(res.data.data[0].store_id));
            this.setState({
                order_data: orders_data.map((ord) => (
                    <React.Fragment className="table">
                    
                       
                        <tr>
                            <td>
                                {(ord.order_id)}
                            </td>
                            <td>
                                {(ord.store_id)}
                            </td>
                            <td>
                                {(ord.employee_id)}
                            </td>
                            <td>
                                {(ord.customer_id)}
                            </td>
                            <td>
                                {(ord.amount)}
                            </td>
                            <td>
                                <button  value={(ord.order_id)} onClick={this.renderOrderDetails}>View Order</button>
                            </td>
                        </tr>
                    
                    </React.Fragment>
                ))
            });
        } catch (err) {
            console.log(err);
        }
    }

    showOrderDetails() {
        if (this.state.order_id > 0) {
            return <OrderDetails order_data={this.state.orderdetail} store_id={this.state.StoreId} store_medicines={this.state.Store_Medicines} />
        }
    }


    render() {
        return (
            <div>
                <div style={{}}>
                <ul>
                <table align="left"  className="display" rules="all" style={{width:'50%'}}>
                <tr>
                            <th>
                                OrderId
                            </th>
                            <th>
                                StoreId
                            </th>
                            <th>
                                EmpId
                            </th>
                            <th>
                                CusId
                            </th>
                            <th>
                                Amount
                            </th>
                            <th>
                                click
                            </th>
                        </tr>
                {this.state.order_data}
                </table>
                </ul>
                </div>
                {this.showOrderDetails()}
            </div>
        )

    }
    
}
export default DisplayTable



