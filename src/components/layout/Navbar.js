import React,{ useContext,useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './navbar.css'













const Navbar = (props) => {

    
    const cookies=new Cookies();

    

    const [isAuthenticated,setIsAuthenticated]=useState(false);

    const token=localStorage.getItem('shift-pages-auth-token');

    useEffect(() => {
        if(token){
            setIsAuthenticated(true);
            return;
        }
        setIsAuthenticated(false);
        
    }, )

    

    


    
    

    

   

    

      

    const openRoutes=(
        <nav className="navbar navbar-expand-lg fixed-top text-light portfolio-navbar">
        <div className="container-fluid"><Link className="navbar-brand logo" href="/">Shift Pages</Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navbarNav"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"><i class="fa fa-bars" style={{color:'#fff'}}></i></span></button>
            <div className="collapse navbar-collapse"
                id="navbarNav">
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item" role="presentation"><a className="nav-link left" href="/">Home</a></li>
                    <li className="nav-item" role="presentation"><a className="nav-link left" href="/#features">Features</a></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link left" to="/login">Login</Link></li>
                    <li className="nav-item" role="presentation"><Link to="/signup" class="get-started-btn scrollto">Get Started</Link></li>
                    
                    
                    
                    

                    
                    
                    
                </ul>
            </div>
        </div>
    </nav>
    );

    var privateRoutes=(
        <nav className="navbar navbar-expand-lg fixed-top portfolio-navbar gradient" >
        <div className="container-fluid"><Link className="navbar-brand logo" href="/">Shift Pages</Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navbarNav"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse"
                id="navbarNav">
                <ul className="nav navbar-nav ml-auto">
                   
                    <li className="nav-item" role="presentation"><Link className="nav-link" to="/dashboard"><i className="icon" style={{marginRight:'5px'}} className="fa fa-bar-chart"></i>Dashboard</Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link" to="/pages"><i className="icon" style={{marginRight:'5px'}} className="fa fa-file-text-o"></i>Pages</Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link" to="/invoices"><i className="icon" style={{marginRight:'5px'}} className="fa fa-book"></i>Invoices</Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link" to="/wallet"><i className="icon" style={{marginRight:'5px'}} className="fa fa-credit-card-alt"></i>Wallet</Link></li>
                    <li className="nav-item" role="presentation"><Link className="nav-link" to="/account"><i className="icon" style={{marginRight:'5px'}} className="fa fa-address-card"></i>Account</Link></li>
                    
                    
                    
                    
                    
                    
                    
                    
                </ul>
                
            </div>
           
        </div>
    </nav>
    )
    return isAuthenticated?privateRoutes:openRoutes
}

export default Navbar;