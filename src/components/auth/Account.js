import React from 'react';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

export default function Account(props) {

    const logout = async (e)=>{
        const token= localStorage.getItem('shift-pages-auth-token');
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/user/logout`,{},config);
        toast.success('Logout successfull', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        props.history.push('/')
        localStorage.removeItem('name');
        localStorage.removeItem('shift-pages-auth-token');
        localStorage.removeItem('email');
    }catch(err){
        props.history.push('/')
        localStorage.removeItem('name');
        localStorage.removeItem('shift-pages-auth-token');
        localStorage.removeItem('email');
    }
        
    }
    return (
        <div>
        <Navbar/>
        <div className="container" style={{marginTop:'4rem',justifyContent:'center',alignContent:'center',alignItems:'center'}}>

            <div className="row">
                <div className="col-xl-8 col-lg-6 col-md-12 col-sm-12" style={{marginTop:'3rem'}}>
                <center>
                     <div class="card" style={{width:'18rem'}}>
                <img class="card-img-top" src="https://i.postimg.cc/13P7n4zk/Untitled-design-39.png" alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">{localStorage.getItem('name')}</h5>
                    <p class="card-text">{localStorage.getItem('email')}</p>
                    <button className="btn btn-block btn-dark" onClick={logout}>Logout</button>
                </div>
                </div>
                </center>
                
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                <section id="features" class="features">
                <div class="container">
          
                  <div class="section-title" data-aos="fade-up">
                    <p>ACCOUNT</p>
                  </div>
          
                  <div class="row" data-aos="fade-left">
                    <div class="col-lg-12">
                      <div class="icon-box" data-aos="zoom-in" data-aos-delay="50">
                        <i class="fa fa-file-text-o" style={{"color": "#ffbb2c"}}></i>
                        <h3><Link to="/pages">Pages</Link></h3>
                      </div>
                    </div>
                    <div class="col-lg-12 mt-4 ">
                      <div class="icon-box" data-aos="zoom-in" data-aos-delay="100">
                        <i class="fa fa-credit-card-alt" ></i>
                        <h3><Link to="/wallet" href="">Wallet</Link></h3>
                      </div>
                    </div>
                    <div class="col-lg-12 mt-4">
                      <div class="icon-box" data-aos="zoom-in" data-aos-delay="150">
                        <i class="fa fa-money" style={{color:'#1acc8d'}}></i>
                        <h3><Link to="/wallet" href="">Transactions</Link></h3>
                      </div>
                    </div>
                    
                    <div class="col-lg-12 mt-4">
                      <div class="icon-box" data-aos="zoom-in" data-aos-delay="250">
                        <i class="fa fa-book" style={{color:'#e361ff;'}} ></i>
                        <h3><Link to="/invoices">Invoices</Link></h3>
                      </div>
                    </div>
                    
                    
                   
                    
                    
                    
                  </div>
          
                </div>
              </section>
                </div>
            
            
            </div>
            
            
        
        
        </div>
            
        </div>
    )
}
