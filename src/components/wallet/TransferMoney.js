import axios from 'axios';
import React,{useState} from 'react';
import Navbar from '../layout/Navbar';
import { toast } from 'react-toastify';

export default function Transfer(props) {

    const [details, setDetails] = useState({
        email:'',
        amount:''
    
      });
    
      const onChange = e => setDetails({ ...details, [e.target.name]: e.target.value });

      const submit = (e)=>{
          e.preventDefault();
          const token= localStorage.getItem('shift-pages-auth-token');
          const config = {
              headers: { 'Authorization': `Bearer ${token}`,
              'Content-type':'application/json'
          }
          };

          const {email,amount}=details;

          if(amount < 150 ){
            toast.error('Amount cannot be less than 150.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                return;
          }

          axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/wallet/balance`,{},config).then((res)=>{
            console.log(res)
            if(res.data.data[0].balance < amount){
                toast.error('Insuffiecient Balance', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    return;
            }else{
                axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/transfer`,{
                    email,
                    amount
                },config).then((res)=>{
                    console.log(res);
                    toast.success('Transfer Successfull', {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      });
                      props.history.push('/wallet')
                }).catch(err=>{

                    if(err.response.status === 404){
                        toast.error('User does not have a shift Pages Wallet', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });
                            return;
                    }
                    console.log(err);
                    toast.error('Something went wrong', {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      });
                      return;
                })
            }
        }).catch(err=>{
            console.log(err);
            toast.error('Something went wrong', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                return;
        })

          

      }
    return (
        <div>
        <Navbar/>
        
        
        <div className="container" style={{marginTop:'4rem'}}>
        <div class="section-title" data-aos="fade-up">
                <p>Transfer Money from your shift Pages Wallet to other user</p>
              </div>
        
        
            <div className="card">
            <div className="card-header">
                <center><p>Minimum Amount : 150 INR</p></center>
                
            </div>
                <div className="card-body">
                <form>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" required placeholder="email" onChange={onChange} name="email"></input>
                
                </div>
                <div className="form-group">
                    <label>Amount</label>
                    <input type="text" required placeholder="amount" onChange={onChange} name="amount"></input>
                
                </div>
                
                <div class="form-group"><button onClick={submit}>Transfer Money</button></div>
                
            
            </form>
                
                </div>
            
            </div>
        </div>
        </div>
    )
}
