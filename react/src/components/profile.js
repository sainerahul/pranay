import React, { Component } from 'react';
import axios from 'axios';
import './css/profile.css';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            email: '',
            phone: '',
            address: '',
            branch_id: '',
            branch_name: '',
            result:'',
            customer:0
        }
    }

    componentDidMount() {
        this.renderProfile();
    }

    renderProfile = async () => {
        try {
            let url, token;
            if (window.location.href.includes('customers')) {
                url = `http://localhost:8081/customer/${localStorage.getItem('customer_id')}`;
                token = `Bearer ${localStorage.getItem('customer_token')}`;
                this.setState({customer:1})
                let res = await axios.get(url, { headers: { Authorization: token } });
                this.customerProfile(res)
            }
            if (window.location.href.includes('employees')) {
                url = `http://localhost:8081/employee/${parseInt(localStorage.getItem('employee_id'))}`;
                token = `Bearer ${localStorage.getItem('employee_token')}`;
                this.setState({customer:0})
                let res = await axios.get(url, { headers: { Authorization: token } });
                this.employeeProfile(res)
            }
            // this.setState({
            //     id: res.data[0].employee_id,
            //     name: res.data[0].employee_name,
            //     email: res.data[0].employee_mail,
            //     phone: res.data[0].employee_phone,
            //     address: res.data[0].employee_address,
            //     branch_id: res.data[0].employee_store_id,
            //     branch_name: res.data[0].store_branch
            // });
        }
        catch (error) {
            console.log(error);
        }
    }

    customerProfile(res){
        let customer=res.data[0]
        this.setState({
            result:customer
        })
        console.log(this.state.result)
    }

    employeeProfile(res){
        console.log("inside empProfile(res)")
        console.log("emp data :: "+JSON.stringify(res.data))
        let employee=res.data[0] 
        this.setState({
            result:employee
        })
        console.log(this.state.result)
    }
    
    renderCustomerTable(){
        return(
           <div>
                <tr className="row">
                        <td className="column">ID </td>
                         <td className="column">{this.state.result.customer_id}</td>
                    </tr>
                    <tr className="row">
                        <td className="column">Name </td>
                         <td className="column">{this.state.result.customer_name}</td>
                    </tr>
                    <tr className="row">
                        <td className="column">Email </td>
                        <td className="column">{this.state.result.customer_email}</td>
                     </tr>
                    <tr className="row">
                        <td className="column">phone </td>
                        <td className="column">{this.state.result.customer_phone}</td>
                     </tr>
                    <tr className="row">
                        <td className="column">Address </td>
                         <td className="column">{this.state.result.customer_address}</td>
                    </tr>  
                    </div>
            
        )
    }

    renderEmployeeTable(){
        console.log("inside renserEmpTable")
        console.log("result ::"+JSON.stringify(this.state.result))
        return(
            <div>
                <tr className="row">
                        <td className="column">ID </td>
                        <td className="column">{ this.state.result.employee_id}</td>
                    </tr>
                    <tr className="row">
                        <td className="column">Name </td>
                        <td className="column">{this.state.result.employee_name}</td>
                    </tr>
                    <tr className="row">
                        <td className="column">Email </td>
                        <td className="column">{this.state.result.employee_mail}</td>
                    </tr>
                    <tr className="row">
                        <td className="column">phone </td>
                        <td className="column">{this.state.result.employee_phone}</td>
                    </tr>
                    <tr className="row">
                        <td className="column">Address </td>
                         <td className="column">{this.state.result.employee_address}</td>
                    </tr>
                    <tr className="row">
                        <td className="column">Branch ID </td>
                        <td className="column">{this.state.result.employee_store_id}</td>
                    </tr>
                    <tr className="row">
                        <td className="column">Branch Name </td>
                        <td className="column">{this.state.result.store_branch}</td>
                    </tr>
            </div>
        )
    }
    render() {
        return (
            <div className="profile">
              { this.state.customer==1 && (<table className="details">
              {this.renderCustomerTable()}
                </table>)
            }
            { this.state.customer==0 && (<table className="details">
              {this.renderEmployeeTable()}
                </table>)
            }
            </div>
        )
    }
}
export default Profile;