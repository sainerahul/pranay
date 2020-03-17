import React,{Component} from 'react'
// import './SearchOrderEmp.css'
class SearchOrder extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            orderid:" ",
            id:" ",
            tot_amount:" ",
            medicines:[],
            flag:0
            
        }
        this.getDetailsByOrder= this.getDetailsByOrder.bind(this);
        //this.getDetailsByEmp= this.getDetailsByEmp.bind(this);
    }
    getDetailsByOrder(event)
    {
        event.preventDefault()
       
         let orders={
             order_id:this.refs.orderid.value
         }
        var url = "http://localhost:8081/order/"+orders.order_id;
        var request=new Request(url,{
        method:'GET',
        headers:new Headers({"content-type":"application/json"}),
        });
        var that = this;
        fetch(request)
        .then(function(response){
            response.json()
            .then(function(data){
                alert(JSON.stringify(data))
                that.setState({
                    medicines: data.Medicines,
                    tot_amount:data.Total_Amount,
                    orderid:that.refs.orderid.value,
                    flag:1
                })
              
            })
        })
    }
    
    //  getDetailsByEmp(event)
    //   {
    //      event.preventDefault()
        
    //     let ord={
    //       emp_id:this.refs.id.value
    //      }
    //      var url="http://localhost:8081/employee/"+ord.emp_id+"/orders"
    //     var request=new Request(url,{
    //         method:'GET',
    //          headers:new Headers({"content-type":"application/json"}),
    //      })
    //      fetch(request)
    //     .then(function(response){
    //         response.json()
    //          .then(function(data){
    //            console.log(JSON.stringify(data))
    //          })
    //      })
    //  }
    render()
    {
        return(
            <div>
            <div className="login">
                {/* <form>
                    <label>OrderId:</label>
                    <input type="text" ref="orderid" />
                    <button onClick={this.getDetailsByOrder} type="submit" className="button1">Get Details</button>
                   <br/>
                    <label>View by EmpId:</label>
                    <input type="text" ref="id" onChange={this.txt}/>
                    <button onClick={this.getDetailsByEmp} type="submit" className="button1">Get Details</button>
                </form> */}

                </div>
                    {this.state.flag==1 && (<table border="1" width="100">
                        <tr>
                            <td colSpan={this.state.medicines.length+1}>
                                Order id:{this.state.orderid}
                            </td>
                        </tr>
                            {this.state.medicines.map(med=>
                            <tr>
                                <td>
                                    {(med.medicine_id)}
                                </td>
                                <td>
                                    {(med.medicine_name)}
                                </td>
                                <td>
                                    {(med.medicine_quantity)}
                                </td>
                                <td>
                                    {(med.amount)}
                                </td>
                               
                            </tr>
                            )}
                            <tr>
                                <td colSpan={this.state.medicines.length+1}>Total Amount :{(this.state.tot_amount)}</td>
                            </tr>       
                    </table>
   ) }
           </div>     
            
        )
    }
}
export default SearchOrder