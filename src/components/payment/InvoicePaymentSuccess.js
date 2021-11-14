import React, { useEffect, useState } from 'react'
import './payment.css';

import Navbar from '../layout/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function InvoicePaymentSuccess(props) {

    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const id = props.match.params.id;
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/${id}/invoice/complete`).then((res)=>{
            toast.success('Payment Successfull 🚀.Please check your mail', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                setLoading(false);
        }).catch(err=>{
            toast.success('Something went wrong .Please try again', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
    },[])
    return loading ? (
        <div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

            <div class="col-sm-6 text-center"><p>Loading ...</p>
                <div class="loader4"></div>

            </div>

        </div>
    ):(
        <div >
        <Navbar/>
        <section id="login-page">
        
        
        
        <div className="container login-page" >
        <div className="row">
            
                
                <div class="form">
                    
                    <div class="form-panel one">
                    <div class="form-header">
                            <h1> Payment Succesfull 🚀</h1>
                            <h6>Please check your mail</h6>
                        </div>
                    <img src="https://i.postimg.cc/Mpn5YbSB/hero-img.png" class="img-fluid animated" alt=""/>
                        
                        <div class="form-content">
                        <div class="form-header">
                            
                        </div>
                           
                        </div>
                    </div>
            
                </div>
            
            

        
            
        
        
      </div>
      
        
       
        
        </div>
        </section>
        </div>
    )
}
