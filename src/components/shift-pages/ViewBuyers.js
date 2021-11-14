
import axios from 'axios';
import React, { useEffect,useState } from 'react';
import Navbar from '../layout/Navbar';
import { toast } from 'react-toastify';

export default function ViewBuyers(props) {
    const [isLoading,setIsLoading]=useState(true);
    const [buyers,setBuyers]=useState([]);
    const [modal,setModal]=useState({
        name:'',
        address:'',
        email:'',
        amount:'',
        quantity:'',
        pincode:'',
        delivered:'',
        phoneNumber:'',
        paymentStatus:''
    });

    useEffect(()=>{
        const id = props.match.params.id;
        
        const token= localStorage.getItem('shift-pages-auth-token');
        const config = {
            headers: { 'Authorization': `Bearer ${token}`,
            'Content-type':'application/json'
        }
        };

        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/buyers/${id}`,{},config).then(res=>{
            console.log(res);
            setBuyers(res.data.data)

            if(res.data.data.data.length == 0){
                toast.warning('No buyers', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            props.history.pop();
            setModal(res.data.data[0])
            setIsLoading(false);
        }).catch(err=>{
            console.log(err);
            setIsLoading(false);
        })
    },[])

    const viewData = (index) =>{
        const data = buyers[index];
        setModal(data);
    }

    const completeOrder = (data)=>{
        const token= localStorage.getItem('shift-pages-auth-token');
        const config = {
            headers: { 'Authorization': `Bearer ${token}`,
            'Content-type':'application/json'
        }
        };
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/order/complete/${data._id}`,{},config).then(res=>{
            console.log(res);
            toast.success('🦄 Order marked as completed !', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }).catch(err=>{
            console.log(err);
            setIsLoading(false);
        })
    }
    return isLoading?(
        <div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

            <div class="col-sm-6 text-center"><p>Loading ...</p>
                <div class="loader4"></div>

            </div>

        </div>
    ):(
        <div>
        <Navbar/>
            
<div class="container table-responsive py-5" style={{marginTop:'4rem'}}> 
<table class="table table-bordered table-hover">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Payment Status</th>
      <th scope="col">View</th>
    </tr>
  </thead>
  <tbody>
  {
      buyers.map((buyer,index)=>{
        return(
            <tr>
                <th scope="row">{index+1}</th>
                <td>{buyer.name}</td>
                <td>{buyer.email}</td>
                <td>{buyer.paymentStatus === 'COMPLETED'?
                    (
                        <h6 className="badge badge-success"><i className="fa fa-check"></i>{' '}SUCCESS</h6>
                        
                    ):(
                        <h6 className="badge badge-warning"><i classname="fa fa-exclamation-triangle"></i>INITIATED</h6>
                        
                    )}</td>
                <td><button className="btn btn-block btn-dark" onClick={()=>viewData(index)} data-toggle="modal" data-target="#exampleModalCenter">View</button></td>
            </tr>
        )
      })
  }
    
    
  </tbody>
</table>
</div>
{
    modal !== null ?(
        
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLongTitle">Buyer Details</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <label>Name</label>
      <input disabled className="form-control" value={modal.name}></input>
      <label>Email</label>
      <input value={modal.email} className="form-control" disabled></input>
      <label>Amount</label>
      <input value={modal.amount} className="form-control" disabled></input>
      <label>Quantity</label>
      <input className="form-control" value={modal.quantity} disabled></input>
      <hr></hr>
      <h6>Payment Status{' '}</h6>
      
      {modal.paymentStatus === 'COMPLETED'?
                  (
                      <h6 className="badge badge-success"><i className="fa fa-check"></i>{' '}SUCCESS</h6>
                      
                  ):(
                      <h6 className="badge badge-warning"><i classname="fa fa-exclamation-triangle"></i>INITIATED</h6>
                      
                  )}
      <hr></hr>
      <h6>Order Status{' '}</h6>
      
      {modal.delivered === 'DELIVERED'?
                  (
                      <h6 className="badge badge-success"><i className="fa fa-check"></i>{' '}Delivered</h6>
                      
                  ):(
                      <h6 className="badge badge-warning"><i classname="fa fa-exclamation-triangle"></i>Not Delivered</h6>
                      
                  )}
                  <br></br>
                  <hr></hr>
      <label>Address</label>
      <br></br>
      <textarea rows="4" disabled value={modal.address} className="form-control"></textarea>
      <br></br>
      <label>Pincode</label>
      <input disabled className="form-control" value={modal.pincode}></input>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      <a class="btn btn-success" href={`mailto:${modal.email}`}>Mail</a>
      <button type="button" class="btn btn-primary" onClick={()=>completeOrder(modal)}>Completed</button>
    </div>
  </div>
</div>
</div>
    ):(
        <div>No buyers</div>
    )
}


        </div>
    )
}
