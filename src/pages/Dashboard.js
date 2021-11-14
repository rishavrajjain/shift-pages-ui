import React from 'react';
import './dashboard.css'
import Navbar from '../components/layout/Navbar';
import { Link } from 'react-router-dom';

export default function Dashboard() {

    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    return (
        <div>
            <Navbar/>
        
        <div className="container" style={{marginTop:'5rem'}}>

        <div className="row">
            <div className="col-xl-7 col-lg-7 col-md-12">
            <div class="credit-card">
            
            <div className="numbers">{email}</div>
            <div class="name-and-expiry">
              <span>{name}</span>
              
            </div>
          </div>
            
            </div>

            <div className="col-xl-4 col-lg-4 col-md-12">
            
            <section id="features" class="features">
            <div class="container">
      
              <div class="section-title" data-aos="fade-up">
                <p>DASHBOARD</p>
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
                    <h3><Link to="/wallet">Wallet Balance</Link></h3>
                  </div>
                </div>
                <div class="col-lg-12 mt-4">
                  <div class="icon-box" data-aos="zoom-in" data-aos-delay="150">
                    <i class="fa fa-money" style={{color:'#1acc8d'}}></i>
                    <h3><Link to="/wallet">Transactions</Link></h3>
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
