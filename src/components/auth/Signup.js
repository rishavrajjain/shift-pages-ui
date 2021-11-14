import React, { useEffect,useState } from 'react';
import './auth.css'
import { toast } from 'react-toastify';
import Navbar from '../layout/Navbar';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';




const countries = require('../../data/countries.json');

export default function Signup(props) {

  useEffect(()=>{
    console.log(countries)
  },[])
  const [value, setValue] = useState();
  const [user, setUser] = useState({
    name:'',
    email: '',
    password: '',
    cnfpassword:'',
    country:'AF',

  });

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const [loading,setLoading]=useState(false);

  const submit = async(e)=>{
    e.preventDefault();
    const {email,password,country,cnfpassword,name}=user;

    try{

      if(country.length >2 ){
        toast.error('Please choose Country without autofill', {
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
      if(email === '' || password === '' ||  cnfpassword ==='' || country ==='' || name === ''){
        toast.error('All fields are required.Please fill all', {
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

      if(password !== cnfpassword){
        toast.error('Passwords do not match', {
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

      const data = {
        email:email,
        password:password,
        name:name,
        nationality:country,
        country:country,
        phoneNumber:value,
      }
      setLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/user/signup`,data);
      toast.success(' 🚀 Signup Successfull', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        setLoading(false);
        props.history.push('/signup/complete')
        
    }catch(err){
      setLoading(false);
      if(err.response.status == 409){
        toast.error('User already exists.Please check your mail.If you have not recieved mail,try resending mail option', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }else{
        toast.error('Something went wrong.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    }
    
  }
  
    return (
      <LoadingOverlay
            active={loading}
            spinner
            text='Loading ...'
            >
        <div >
        <Navbar/>
        <section id="login-page">
        
        
        
        <div className="container login-page" >
        <div className="row" style={{margin:10}}>
        
        <div class="form">
        <div class="form-toggle"></div>
        <div class="form-panel one">
          <div class="form-header">
            <h1>Account Signup</h1>
          </div>
          <div class="form-content">
            <form onSubmit={submit}>
            <div class="form-group"><label for="name">Name</label><input onChange={onChange} type="text" id="name" name="name" required="required" /></div>
              <div class="form-group"><label for="email">Email</label><input onChange={onChange} type="text" id="email" name="email" required="required" /></div>
              <div class="form-group"><label for="password">Password</label><input onChange={onChange} type="password" id="password" name="password" required="required" /></div>
              <div class="form-group"><label for="password">Confirm Password</label><input onChange={onChange} type="password" id="password" name="cnfpassword" required="required" /></div>
              <div className="form-group">
              <label for="password">Country</label>
              <select class="form-control" name="country" onChange={onChange}>
                {
                  countries.map((country)=>{
                    return(
                      <option value={country.Code}>{country.Name}</option>
                    )
                  })
                }
                
              </select>
              
              
              
              </div>
              <div className="form-group">
              <label for="password">Phone Number</label>
                <PhoneInput
                className="form-control"
                placeholder="Enter phone number without code"
                value={value}
                onChange={setValue}
                
                />
              
              </div>
              

              
                
                
                
                

                
              
              
              
              
              
              
              
              
              
              <div class="form-group"><button type="submit" >Sign up</button></div>
            </form>
          </div>
        </div>
        <div class="form-panel two">
          
        </div>
        </div>
        
      </div>
        
       
        
        </div>
        </section>
        </div>
        </LoadingOverlay>
    )
}
