import React, { Component } from 'react'
import axios from 'axios'
import CustomerMedicine from './customerMedicine'
import CustomerOrders from './customerOrders'
import './css/medicineCart.css'
import { json } from 'body-parser'
class CustomerCart extends Component {
    constructor(props) {
        super(props)
        // this.total_amt = []

        this.state = {
            Cart_data: this.props.cart_data,
            Medicine_data: this.props.med_data,
            Net_amount: [],
            Stores: [],
            StoreId: '--select--'

            // Total_amount: 0
        }
        console.log("Cart obj  from cart comp ::" + JSON.stringify(this.state.Cart_data))
        console.log("Med obj  from cart comp ::" + JSON.stringify(this.state.Medicine_data))
        this.storeSelected = this.storeSelected.bind(this)
    }

    getMedicineName() {
        return this.state.Cart_data.cart_medicine_ids.map((med_id, index) => {


            for (var i = 0; i < this.state.Medicine_data.length; i++) {
                // look for the entry with a matching `code` value
                console.log("inside for i:: " + i + " data :" + JSON.stringify(this.state.Medicine_data[i].medicine_id))
                if ((this.state.Medicine_data[i].medicine_id) == med_id) {
                    // we found it
                    // total_amt = this.state.Total_amount
                    // this.total_amt = this.state.Net_amount
                    // this.total_amt.push(
                    //     this.state.Medicine_data[i].medicine_price * this.state.Cart_data.cart_data[0][med_id]["quantity"]
                    // )
                    return (<tr key={med_id}>
                        <td>{this.state.Medicine_data[i].medicine_name}</td>
                        <td>{this.state.Medicine_data[i].medicine_price}</td>
                        <td>{this.state.Cart_data.cart_data[0][med_id]["quantity"]}</td>
                        <td>{this.state.Medicine_data[i].medicine_price * this.state.Cart_data.cart_data[0][med_id]["quantity"]}</td>
                    </tr>)
                }
            }

        })
    }

    renderTableHeader() {
        // return null
        let header = ["Medicine Name", "Medicine Price", "Net Price"]
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }



    confirmOrder = async () => {
        console.log("Confirm order clicked !! Ohla Order Confirmed")
        let medicines = []
        for (let i = 0; i < this.state.Cart_data.cart_medicine_ids.length; i++) {
            medicines.push({
                "medicine_id":
                    this.state.Cart_data.cart_medicine_ids[i],
                "quantity":
                    this.state.Cart_data.cart_data[0][this.state.Cart_data.cart_medicine_ids[i]]["quantity"]
            })
        }
        console.log("dynamic medicines obj ::" + JSON.stringify(medicines))
        let results = await axios.post(
            'http://localhost:8081/order',
            {
                "employee_id": null,
                "store_id": this.state.StoreId,
                "customer_id": localStorage.getItem('customer_id'),
                "medicines": medicines
            }
        )
        console.log("Response :" + JSON.stringify(results))
        alert(JSON.stringify(results.data))
        this.props.emptyCart()

    }

    // calTotal_amount() {
    //     let sum = this.total_amt.reduce((a, b) => a + b)
    //     this.setState({
    //         Total_amount: sum
    //     }, () => {
    //         return (<td>{this.setState.Total_amount}</td>)
    //     })
    // }

    componentDidMount() {
        this.renderStore();
    }

    renderStore = async () => {
        try {
            let stores = await axios.get("http://localhost:8081/store")
            console.log("Stores ::" + JSON.stringify(stores["data"]))
            this.setState({
                Stores: stores["data"].map((store) => (
                    <option value={store.store_id} >{store.store_branch}</option>
                ))
            });
        } catch (err) {
            console.log(err);
        }
    }


    storeSelected(event) {
        console.log("THe selected vlaue is :: " + event.target.value)
        this.setState({
            StoreId: event.target.value
        })
    }

    renderConfirmButton() {
        //show this button when cart is loaded
        if (this.state.StoreId === '--select--') {
            return null
        }
        else {
            return <button onClick={() => { this.confirmOrder() }}>Confirm Order</button>
        }
    }

    render() {
        return (
            <div className='cart_table'>
                <h1 id='cart_table_title'>Medicines Cart</h1>
                <hr />
                <table className="med_table_cart" id='cart_table'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.getMedicineName()}

                    </tbody>
                    <tbody>{this.renderConfirmButton()}</tbody>
                </table>
                <select onChange={this.storeSelected} >
                    <option value='--select--'>--select--</option>
                    {this.state.Stores}
                </select>
                {/* <h1>Total Amount :{this.calTotal_amount}</h1> */}
            </div>



        )
    }
}

export default CustomerCart
