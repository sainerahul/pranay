import React, { Component } from 'react'
import axios from 'axios'
import CustomerCart from './customerCart'
import './css/medicineCart.css'
class CustomerMedicine extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Medicines: [],
            Counter: [],
            MaxSize: 0,
            Cart: {

                cart_medicine_ids: [], // contains all medicine id's which counter[i]>0 
                cart_data: [
                    {

                    }
                ]
            }
        }
        this.decrementQuantity = this.decrementQuantity.bind(this)
        this.incrementQunatity = this.incrementQunatity.bind(this)
        this.emptyCart = this.emptyCart.bind(this)
    }

    componentDidMount() {
        this.renderMedicines();
    }

    renderMedicines = async () => {
        try {
            // fetcing the data
            let res = await axios.get('http://localhost:8081/medicine');
            let medicines_data = res.data.rows;

            // this will re render the view with new data
            this.setState({
                Medicines: medicines_data,
            },
                () => {
                    let Med_ids = []
                    this.state.Medicines.forEach((item) => {
                        Med_ids.push(parseInt(item.medicine_id))
                    })
                    // we got the size of the counter array to be

                    this.setState({
                        MaxSize: Math.max(...Med_ids)
                    },
                        () => {
                            //we fill the counter array with new size and fill with 0
                            this.setState({
                                Counter: new Array(this.state.MaxSize + 1).fill(0)
                            })
                        })
                });

        } catch (err) {
            console.log(err);
        }
    }

    decrementQuantity(event) {
        let eventTarget = event.target
        let temp_counter = this.state.Counter

        if (parseInt(temp_counter[parseInt(event.target.value)]) > 0) {
            temp_counter[parseInt(event.target.value)] = temp_counter[parseInt(event.target.value)] - 1
            this.setState({
                Counter: temp_counter
            },
                () => {
                    // if the cart_data.eventTarge.value.quantity ==1
                    // then decrease the value and remove the eventTarget.value from cart_med_ids
                    if (this.state.Cart.cart_data[0][eventTarget.value].quantity === 1) {
                        let temp_cart = this.state.Cart
                        //the quantity needs to be removed from cart completely
                        temp_cart.cart_medicine_ids =
                            this.state.Cart.cart_medicine_ids.filter((e) => { return e !== eventTarget.value })

                        this.setState({
                            Cart: temp_cart
                        })
                    }
                    //decrease the this.state.Cart.cart_data[0][eventTarget.value].quantity by 1
                    let temp_cart = this.state.Cart
                    temp_cart.cart_data[0][eventTarget.value].quantity = temp_cart.cart_data[0][eventTarget.value].quantity - 1
                    this.setState({
                        Cart: temp_cart
                    })

                    console.log("From decrement_quant :: " + JSON.stringify(this.state.Cart))
                }
            )
        }
    }

    incrementQunatity(event) {
        let eventTarget = event.target
        let temp_counter = this.state.Counter
        temp_counter[parseInt(event.target.value)] = temp_counter[parseInt(event.target.value)] + 1
        this.setState({
            Counter: temp_counter
        },
            () => {
                //if the event.target.value is present in this.state.Cart.cart_medicine_ids
                //then modify the this.state.Cart.cart_data[0].event.target.value

                if (this.state.Cart.cart_medicine_ids.includes(eventTarget.value)) {
                    //clicked med is already present in cart so increase the quantity of the med
                    let cart_temp = this.state.Cart
                    // Incrementing the quantity of the already present med
                    cart_temp.cart_data[0][eventTarget.value].quantity = cart_temp.cart_data[0][eventTarget.value].quantity + 1
                    this.setState({
                        Cart: cart_temp
                    })
                }
                else {
                    // adding med for the first time to cart
                    let temp_cart = this.state.Cart
                    // add it to the cart_med_ids
                    temp_cart.cart_medicine_ids.push(eventTarget.value)
                    // add it to the cart_data for the 1st time
                    temp_cart.cart_data[0][eventTarget.value] = { quantity: 1 }
                    this.setState({
                        Cart: temp_cart
                    }, () => {
                        console.log("A new med added to the cart :From increment_quantity")
                    })
                }
                console.log("From increment_quantity ::" + JSON.stringify(this.state.Cart))
            })
    }

    renderTableData() {
        return this.state.Medicines.map((med, index) => {
            return (
                <tr key={med.medicine_id}>
                    <td>{med.medicine_id}</td>
                    <td>{med.medicine_name}</td>
                    <td>{med.medicine_manufacturer}</td>
                    <td>{med.medicine_price}</td>
                    <button value={med.medicine_id.toString()} onClick={this.decrementQuantity}>-</button>
                    {this.state.Counter[med.medicine_id]}
                    <button value={med.medicine_id.toString()} onClick={this.incrementQunatity}>+</button>
                </tr>
            )
        })
    }

    renderTableHeader() {
        if (!this.state.Medicines[0]) { return null }
        else {
            let header = Object.keys(this.state.Medicines[0])
            //  ["Medicine Id", "Medicine Name", "Medicine Manufacturer","Medicine Price"]
            return header.map((key, index) => {
                return <th key={index}>{key.toUpperCase()}</th>
            })
        }
    }

    renderCart() {
        if (this.state.Cart.cart_medicine_ids.length === 0) {
            //cart is empty
            return null
        } else {
            //cart is not empty , render cart
            // this.props.changeCartState(this.state.Cart)
            return <CustomerCart cart_data={this.state.Cart} med_data={this.state.Medicines} emptyCart={this.emptyCart} />
        }
    }

    emptyCart() {
        let temp_Counter = new Array(this.state.MaxSize + 1).fill(0)
        this.setState({
            Cart: { cart_medicine_ids: [], cart_data: [{}] },
            Counter : temp_Counter
        }, () => {
            console.log("Cart Emptied!!")
        })
    }

    render() {
        return (
            <div className="mainContainer">
                <div className="medicines">
                <h1 id='medicine_table_title'>Medicines Table</h1>
                <hr/>
                <table className="cus_med_table"  id='medicines'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
                
                </div>
                {this.renderCart()}
            </div>
        )
    }
}

export default CustomerMedicine