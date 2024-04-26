import "../Styles/Navbar.css";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../Images/Logo.png";
import { usecart } from "../Context/CartContext";


function Navbar() {
  const [Openmenu, setOpenmenu] = useState(false);
  const { cartItems } = usecart();
  const Menuopen = () => {
    setOpenmenu(!Openmenu);
  };
useEffect(()=>{
  if (Openmenu) {
    document.body.classList.add('Navbar-Active');
  } else {
    document.body.classList.remove('Navbar-Active');
  }

  return () => {
    document.body.classList.remove('Navbar-Active');
  };

},[Openmenu])
  return (
   <>
  
    <div className="Header">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <div>
        <ul id="Navbar" className={Openmenu ? "Active-Menu" : ""}>
          <i
            id="X-Bar"
            onClick={Menuopen}
            className="fa-sharp  fa-solid fa-xmark"
          ></i>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/blog">Blog</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
          <Link to="/cart">
          <i className="fa-solid fa-bag-shopping shopping"></i>
          {cartItems.length > 0 && (
            <span className="cart-item-count Mobile">{cartItems.length}</span>
          )}
        </Link>
          </li>
          
          <li>
            {localStorage.getItem("auth-token") ? (
              <button 
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  localStorage.removeItem("cartItems");
                  window.location.replace("/");
                  
                }}
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button>login</button>
              </Link>
            )}
          </li>
        </ul>
      </div>

      <div id="Mobile">
        <Link to="/cart">
          <i className="fa-solid fa-bag-shopping shopping"></i>

          {cartItems.length > 0 && (
            <span className="cart-item-count Mobile">{cartItems.length}</span>
          )}
        </Link>
        <i
          id="Bar"
          className="fa-sharp  fa-solid fa-bars"
          onClick={Menuopen}
        ></i>
      </div>
    </div>
   
   </>
  );
}

export default Navbar;
