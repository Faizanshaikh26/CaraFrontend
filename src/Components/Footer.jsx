import React from "react";
import "../Styles/Footer.css";
import appimg from "../Images/app.jpg";
import playimg from "../Images/play.jpg";
import payimg from "../Images/pay.png";
import logo from "../Images/Logo.png";


import Banner8 from "../Images/Banner8.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="News-letters">
        <div
          className="news-text"
          style={{ backgroundImage: `url(${Banner8})` }}
        >
          <h4>Sign up For Newsletters</h4>
          <p>
            Get E-mail updates about our latest shop and{" "}
            <span>Special Ofer</span>
          </p>
        </div>
        <div className="news-form">
          <input type="text" placeholder="Your Emial address" />
          <button>Sign Up</button>
        </div>
      </div>

      <footer>
        <div className="col">
          <img className="Logo" src={logo}  />
          <h4>Contact</h4>
          <p>
            <strong>Address:</strong>52 WELLINGTONR ROAD,Street 32, San
            Fransascisco
          </p>
          <p>
            <strong>Phone:</strong>+01 2222 365 (+91 2345667)
          </p>
          <p>
            <strong>Hours:</strong> 10:00 to 11:00 Mon-Sat
          </p>
          <div className="follow">
            <h4>Follow us</h4>
            <div className="icon">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-youtube"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-pinterest"></i>
            </div>
          </div>
        </div>
        <div className="col">
          <h4>About</h4>
          <ul>
            <Link to='/about'><li>About us</li></Link>
            <Link to='/order'> <li>Delivery Information</li></Link>
    
            <li>Privacy Policy</li>
            <li>Terms and Condition</li>
            <Link to='contact'> <li>Contact Us</li></Link>

           
          </ul>
        </div>
        <div className="col">
          <h4>My Account</h4>
          <ul>
           <Link to='/login'> <li>Sign In </li></Link>
            <Link to='/cart'><li>View Cart</li></Link>
            <li>my Wishlist</li>
            <li>Trach my Order</li>
           <Link to='/contact'> <li>Help</li></Link>
          </ul>
        </div>
        <div className="col">
          <h4>Install App</h4>
          <p>From App Store And Google play</p>
          <div className="row">
            <img src={appimg}  />
            <img src={playimg}  />
          </div>
          <p>Secured Payment Gateway</p>
          <img src={payimg}  />
        </div>
        <div className="Copyright">
          <p>
            @ Created With <i className="fa-solid fa-heart"></i> by Faizan
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
