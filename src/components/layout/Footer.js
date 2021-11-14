import React from 'react'
import { Link } from 'react-router-dom';
import './footer.css'

export default function Footer() {
    return (
        <footer id="footer" style={{marginTop:'3rem'}}>

    <div class="footer-top">
      <div class="container">
        <div class="row">

          <div class="col-lg-3 col-md-6 footer-contact">
            <h3>shift Pages</h3>
            <p>
              
            </p>
          </div>

          <div class="col-lg-2 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i class="bx bx-chevron-right"></i> <Link to="/">Home</Link></li>
              <li><i class="bx bx-chevron-right"></i> <Link to="/login">Login</Link></li>
              <li><i class="bx bx-chevron-right"></i> <Link to="/signup">Sign up</Link></li>
              
            </ul>
          </div>

          

          

        </div>
      </div>
    </div>

    <div class="container">

      <div class="copyright-wrap d-md-flex py-4">
        <div class="mr-md-auto text-center text-md-left">
          <div class="copyright">
            &copy; Copyright <strong><span>shift Pages</span></strong>. All Rights Reserved
          </div>
          
        </div>
        
      </div>

    </div>
  </footer>
    )
}
