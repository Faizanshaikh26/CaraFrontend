import React from "react";
import "../Styles/Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Components/Navbar'
const BASE_URL="https://carabackend.onrender.com";

function Login() {
  const [formdata, setformdata] = useState({
    Email: "",
    password: "",
    showPassword: false
  });

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const togglePasswordVisibility = () => {
    setformdata({ ...formdata, showPassword: !formdata.showPassword });
  };

  const login = async () => {
  if (!formdata.Email || !formdata.password) {
   toast.error('Please provide email and password',{
    autoClose:1000,
    className:"logintoast"
   })
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("auth-token", data.token);
      window.location.replace("/");
      toast.success('Login Successful..', {
        autoClose:1000,
        className: "toast-media"
      });
    } else {
      toast.warning(data.error,{
        autoClose:1000,
        className:'logintoast'
      });
    }
  } catch (error) {
    console.error("Login failed:", error.message);
    toast.error("Login failed. Please try again later.",{
      autoClose:1000,
      className:'logintoast',
      position:"top-center"
    });
  }
};


  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <div className="login-container">
  <div className="Form-details">
    <span className="login-title">Login</span>
    <h2>To Cara Ecomerce</h2>

    <input
      className="login-input"
      type="email"
      placeholder="Enter Your E-mail"
      name="Email"
      value={formdata.Email}
      onChange={handlechange}
    />
    <div className="password-input-container">
      <input
        className="login-input"
        type={formdata.showPassword ? "text" : "password"}
        placeholder="Enter Your Password"
        name="password"
        value={formdata.password}
        onChange={handlechange}
      />
      <i
        className={`password-toggle-icon ${
          formdata.showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
        }`}
        onClick={togglePasswordVisibility}
      ></i>
    </div>
    <div className="login-links">
  
       <Link to='/forgotpass'>
       <div>
       <p>Forgot password..</p>
       </div>
       </Link>
      
      <div>
        <p>
          Create an account...
          <Link to="/signup" className="signup-link">
            click here
          </Link>
        </p>
      </div>
    </div>
    <button className="login-button" onClick={login}>
      Login
    </button>
  </div>
</div>

    </>
  );
}

export default Login
