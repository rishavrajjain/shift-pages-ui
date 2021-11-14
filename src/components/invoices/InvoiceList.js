import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';

export default function InvoiceList(props) {
    const [isLoading,setIsLoading]=useState(true);
    const [invoices,setInvoices]=useState([]);
    const [modal,setModal]=useState({
        name:' ',
        address:' ',
        email:' ',
        amount:' ',
        quantity:' ',
        pincode:' ',
        delivered:' ',
        phoneNumber:' ',
        paymentStatus:' ',
        details:' '
    });

    useEffect(()=>{
        
        const token= localStorage.getItem('shift-pages-auth-token');
        const config = {
            headers: { 'Authorization': `Bearer ${token}`,
            'Content-type':'application/json'
        }
        };

        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/user/invoices`,{},config).then(res=>{
            console.log(res);
            setInvoices(res.data.data)
            setIsLoading(false);
        }).catch(err=>{
            console.log(err);
            setIsLoading(false);
        })
    },[])

    const viewData = (index) =>{
        const data = invoices[index];
        setModal(data);
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
<div className="row">
      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
      <Link className="btn btn-dark" style={{marginBottom:'2rem'}} to="/invoice/create"><i className="fa fa-upload"></i>{'  '}Create Invoice</Link>
      </div>

      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
      <section id="features" class="features">
           
      
      <div class="row" data-aos="fade-left">
        <div class="col-lg-12">
          <div class="icon-bx" data-aos="zoom-in" data-aos-delay="50" >
            <i class="fa fa-file-text-o" style={{"color": "#ffbb2c"}}></i>
            <h3><Link to="/pages">Pages</Link></h3>
          </div>
        </div>
        <div class="col-lg-12 mt-4 ">
          <div class="icon-bx" data-aos="zoom-in" data-aos-delay="100" >
            <i class="fa fa-credit-card-alt" ></i>
            <h3><Link to="/wallet">Wallet Balance</Link></h3>
          </div>
        </div>
        <div class="col-lg-12 mt-4">
          <div class="icon-bx" data-aos="zoom-in" data-aos-delay="150" >
            <i class="fa fa-money" style={{color:'#1acc8d'}}></i>
            <h3><Link to="/wallet">Transactions</Link></h3>
          </div>
        </div>
        
        <div class="col-lg-12 mt-4">
          <div class="icon-bx" data-aos="zoom-in" data-aos-delay="250" >
            <i class="fa fa-book" style={{color:'#e361ff;'}} ></i>
            <h3><Link to="/invoices">Invoices</Link></h3>
          </div>
        </div>
        
        
       
        
        
        
      

    </div>
  </section>
      
      </div>
</div>
<div class="section-title" data-aos="fade-up">
                <p>Invoices</p>
              </div>

<table class="table table-bordered table-hover">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Billed to</th>
      <th scope="col">Email</th>
      <th scope="col">Payment Status</th>
      <th scope="col">View</th>
    </tr>
  </thead>
  <tbody>
  {
      invoices.map((buyer,index)=>{
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
  modal !==null ?(
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Invoice Details</h5>
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
        
        <hr></hr>
        <h6>Payment Status{' '}</h6>
        
        {modal.paymentStatus === 'COMPLETED'?
                    (
                        <h6 className="badge badge-success"><i className="fa fa-check"></i>{' '}SUCCESS</h6>
                        
                    ):(
                        <h6 className="badge badge-warning"><i classname="fa fa-exclamation-triangle"></i>INITIATED</h6>
                        
                    )}
        <hr></hr>
        
        <label>Address</label>
        <br></br>
        <textarea rows="4" disabled value={modal.address} className="form-control"></textarea>
        <br></br>
        <div className="content" dangerouslySetInnerHTML={{ __html: modal.details }}></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <a class="btn btn-success" href={`mailto:${modal.email}`}>Mail</a>
        
      </div>
    </div>
  </div>
</div>
  ):(
    <div>No Invoices</div>
  )
}


        </div>)
}
