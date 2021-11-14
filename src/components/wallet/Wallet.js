import React, { useEffect,useState } from 'react';
import './wallet.css'
import Navbar from '../layout/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Wallet() {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');


    const [balance,setBalance]=useState(0);
    const [transactions,setTransactions]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const token= localStorage.getItem('shift-pages-auth-token');
        const config = {
            headers: { 'Authorization': `Bearer ${token}`,
            'Content-type':'application/json'
        }
        };

        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/wallet/balance`,{},config).then((res)=>{
            console.log(res)
            setBalance(res.data.data[0].balance)
        }).catch(err=>{
            console.log(err);
        })
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/wallet/transactions`,{},config).then((res)=>{
            console.log(res)
            setTransactions(res.data.data)
            setLoading(false);
        }).catch(err=>{
            console.log(err);
        })
    },[])
    return loading ? (<div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

    <div class="col-sm-6 text-center"><p>Loading ...</p>
        <div class="loader4"></div>

    </div>

</div>
):(
        <div>
            <Navbar/>
        
        <div className="container" style={{marginTop:'5rem'}}>

        <div className="row">
            <div className="col-xl-7 col-lg-7 col-md-12">
            <div class="credit-card">
            <img src="https://i.postimg.cc/hjnFzgN0/shift-Logo-Black-Transparent-Background.png" class="logo"/>
            <div className="numbers">{email}</div>
            <div class="name-and-expiry">
              <span>{name}</span>
              <span>{balance} INR</span>
            </div>
          </div>
            
            </div>

            <div className="col-xl-4 col-lg-4 col-md-12">
            
            <section id="features" class="features">
            <div class="container">
      
              <div class="section-title" data-aos="fade-up">
                <p>WALLET</p>
              </div>
      
              <div class="row" data-aos="fade-left">
                
                <div class="col-lg-12 mt-4 ">
                  <div class="icon-box" data-aos="zoom-in" data-aos-delay="100">
                    <i class="fa fa-credit-card-alt" ></i>
                    <h3><Link to="/transfer">Transfer</Link></h3>
                  </div>
                </div>
                <div class="col-lg-12 mt-4">
                  <div class="icon-box" data-aos="zoom-in" data-aos-delay="150">
                    <i class="fa fa-money" style={{color:'#1acc8d'}}></i>
                    <h3><Link to="/settle">Settle</Link></h3>
                  </div>
                </div>
                
                
                
                
               
                
                
                
              </div>
      
            </div>
          </section>
            </div>
        
        
        </div>

        
        
    
        <div class="container table-responsive py-5" style={{marginTop:'4rem'}}> 
        <div class="section-title" data-aos="fade-up">
                <p>transactions</p>
        </div>
        <table class="table table-bordered table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Amount</th>
              <th scope="col">Type</th>
              <th scope="col">Closing Balance</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
          {
              transactions.map((transaction,index)=>{
                return(
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>{Math.abs(transaction.amount)}</td>
                        <td>{transaction.type =='payment_funds_in' ?(
                            <h6 className="badge badge-success">CREDIT</h6>
                        ):(
                            <h6 className="badge badge-danger">DEBIT</h6>
                        )}</td>
                        <td>{transaction.balance}</td>
                        <td><h6 className="badge badge-primary">{transaction.status}</h6></td>
                    </tr>
                )
              })
          }
            
            
          </tbody>
        </table>
        </div>
            
        </div>
        </div>
    )
}
