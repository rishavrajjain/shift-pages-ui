import React, { useEffect,useState } from 'react';
import './pages.css';
import Navbar from '../layout/Navbar';
import {Link} from 'react-router-dom';
import Page from './Page';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ViewPage(props) {

    const id = props.match.params.id;
    const [contentTitle,setContentTitle]=useState("");
    const [isLoading,setIsLoading]=useState(false);

    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/page/${id}`).then((res)=>{
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
        <div>
        <Navbar/>

        <div className="container" style={{marginTop:'6rem'}}>

        

        <div className="row">
        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
          <img src="https://i.postimg.cc/8PvL90x1/Untitled-design-38.png" class="img-fluid animated" alt=""/>
        </div>
          
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12" style={{flex:1}}>
            <h1 style={{alignContent:'center',justifyContent:'center',textAlign:'center'}}>{contentTitle}</h1>
            <Link to={`/page/edit/${id}`} className="btn btn-lg" style={{backgroundColor:'#7059e2',color:'white',margin:'1.5rem',width:'18rem'}}><i className="fa fa-pencil"></i>{' '}Edit Page</Link>
            <Link to={`/page/${id}`} className="btn btn-lg" style={{backgroundColor:'#7059e2',color:'white',margin:'1.5rem',width:'18rem'}}><i className="fa fa-eye"></i>{' '}View Page</Link>
            <Link to={`/buyers/${id}`} className="btn btn-lg" style={{backgroundColor:'#7059e2',color:'white',margin:'1.5rem',width:'18rem'}}><i className="fa fa-file-text-o"></i>{' '}Buyers List</Link>
            
            </div>
        
        </div>
        <div className="row">
        
        
        
        
        </div>
        
        
        </div>
            
        </div>
    )
}
