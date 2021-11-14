import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

import Navbar from '../components/layout/Navbar'

export default function Home() {
    return (
        <div>
            <Navbar/>
        
        
        <section id="hero" class="d-flex align-items-center">

        <div class="container-fluid" data-aos="fade-up">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 pt-3 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1>Shift Pages</h1>
              <h2>Shift Pages is a seamless way to accept payments with a custom-branded online store,Take your store online instantly with zero coding.Tranfer money to other people and also create invoices for your business.</h2>
              <br></br>
              <h6 style={{color:'white'}}>Powered by Red Hat Openshift</h6>
              <div><Link to="/signup" class="btn-get-started scrollto">Get Started</Link></div>
            </div>
            <div class="col-xl-4 col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="150">
              <img src="https://i.postimg.cc/Mpn5YbSB/hero-img.png" class="img-fluid animated" alt=""/>
            </div>
          </div>
        </div>
    
      </section>
      <section id="features" class="features-home">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <p>Features</p>
        </div>

        <div class="row">
          <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column ">
            <div class="icon-box-home mt-5 mt-lg-0" data-aos="fade-up" data-aos-delay="100">
              <i class="fa fa-archive"></i>
              <h4>Easy online Store and checkout</h4>
              <p>Create an online store in minutes and start selling</p>
            </div>
            <div class="icon-box-home mt-5" data-aos="fade-up" data-aos-delay="200">
              <i class="fa fa-cubes"></i>
              <h4>Blazing fast and smooth Invoices</h4>
              <p>Create invoices for your customer and get paid instantly</p>
            </div>
            <div class="icon-box-home mt-5" data-aos="fade-up" data-aos-delay="300">
              <i class="fa fa-money"></i>
              <h4>Easy Money Transfer</h4>
              <p>Transfer money to other people on our platform or to any bank account with ease</p>
            </div>
            <div class="icon-box-home mt-5" data-aos="fade-up" data-aos-delay="400">
              <i class="fa fa-shield"></i>
              <h4>Easy to user and Secure</h4>
              <p>User friendly app and Payment security by shift</p>
            </div>
          </div>
          <div class="image col-lg-6 order-1 order-lg-2 " data-aos="zoom-in" data-aos-delay="100">
            <img src="https://i.postimg.cc/KYSZGfcr/features.png" alt="" class="img-fluid"/>
          </div>
        </div>

      </div>
    </section>
      </div>
        
    )
}
