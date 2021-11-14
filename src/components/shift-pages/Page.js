import axios from 'axios';
import React,{useEffect, useState} from 'react'
import './pages.css'
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

export default function Page(props) {
    const [page,setPage]=useState(null);
    const id = props.match.params.id;

    const [content,setContent]=useState("");
    const [contentTitle,setContentTitle]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const [loading,setLoading]=useState(false);
    

    const [quantity,setQuantity]=useState(0);
    const [price,setPrice]=useState(0);

    const [details,setDetails]=useState({
        name:'',
        address:'',
        phoneNumber:'',
        selectedQuantity:1,
        pincode:'',
        email:''

    })

    const onChange = e => setDetails({ ...details, [e.target.name]: e.target.value });

    const submit = (e)=>{
        e.preventDefault();

        const {name,email,address,phoneNumber,pincode,selectedQuantity}=details;

        if(selectedQuantity <1){
            toast.error('Quantity cannot be less than 1', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                return;
        }

        if(name ==='' || address === '' || pincode === '' || phoneNumber ==='' || email === ''){
            toast.error('Please fill all the details', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                return;
        }

        const body = {
            name,
            pincode,
            address,
            email,
            quantity:selectedQuantity,
            amount:selectedQuantity*price,
        }
        setLoading(true);

        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/createBuyer/${id}`,body).then((res)=>{
            console.log(res);
            window.location.href = res.data.data.redirect_url
        }).catch(err=>{
            console.log(err);
            toast.error('Something went wrong', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                setLoading(false);
        })
    }

    

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/page/${id}`).then((res)=>{
            setContent(res.data.data.content);
            setQuantity(res.data.data.quantity);
            setPrice(res.data.data.price);
            setContentTitle(res.data.data.title);
            setIsLoading(false);
        }).catch(err=>{
            toast.error('Something went wrong.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                setIsLoading(false);
        })
    },[])
    return isLoading ?(
        <div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

            <div class="col-sm-6 text-center"><p>Loading ...</p>
                <div class="loader4"></div>

            </div>

        </div>
    ):(
        <LoadingOverlay
            active={loading}
            spinner
            text='Loading ...'
            >
        <div>
            
<div class="wrapper">
<div class="card-page">
  <div class="card__header">
    <div class="toolbar">
      <div class="toolbar__item toolbar__item--close"></div>
      <div class="toolbar__item toolbar__item--min"></div>
      <div class="toolbar__item toolbar__item--max"></div>
    </div><a href="#">About</a>
  </div>
  <div class="card__body">
    <div class="container-page container">
      <div class="grid">
        <h1>{contentTitle}</h1>
      </div>
    </div>
    <div class="container-page">
      <div class="grid grid--half">
        
        <div className="content" dangerouslySetInnerHTML={{ __html: content }}></div>
        
        
        
       
        
        
        
        
        
        
      </div>
      <div class="grid grid--half">
        <h3>Buyer Details</h3>
        <p> Price per item : {price}</p>
        <div className="form-group">
        <label class="form-item__label" style={{color:'white'}}>Quantity</label>
            <input type="number" className="form-control" name="selectedQuantity" onChange={onChange} value={details.selectedQuantity}></input>
        </div>
        <div className="form-group">
        <label class="form-item__label" style={{color:'white'}} >Name</label>
            <input type="text" className="form-control" name="name" onChange={onChange}></input>
        </div>
        <div className="form-group">
        <label class="form-item__label" style={{color:'white'}} >Email</label>
            <input type="text" className="form-control" name="email" onChange={onChange}></input>
        </div>
        <div className="form-group">
        <label class="form-item__label" style={{color:'white'}} >Phone Number</label>
            <input type="text" className="form-control" name="phoneNumber" onChange={onChange}></input>
        </div>
        <div className="form-group">
        <label class="form-item__label" style={{color:'white'}} >Address</label>
            <textarea className="form-control" rows="10" name="address" onChange={onChange}></textarea>
        </div>
        <div className="form-group">
        <label class="form-item__label" style={{color:'white'}} >Pincode</label>
            <input type="text" className="form-control" name="pincode" onChange={onChange}></input>
        </div>

        <h6>Amount : {details.selectedQuantity*price}</h6>

        <button className="btn btn-light btn-block" onClick={submit}>Buy</button>
        
        
        
        
        
      </div>
    </div>
  </div>
</div>
</div>
        </div>
        </LoadingOverlay>
    )
}
