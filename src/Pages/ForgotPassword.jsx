import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/ForgotPassword.css";
import Navbar from "../Components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BASE_URL="https://carabackend.onrender.com";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleForgotPassword = async (e) => {
    e.preventDefault();

  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setErrorMessage("Invalid email format");
      return;
    }
   

    try {
      let resData;
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error); 
      }
      
      console.log(resData);
      toast.success("A reset link has been sent to your email",{
        autoClose:1000,
        className:"forgottoast",
        position:"top-center"
        
      })
      setErrorMessage(null)
    } catch (error) {
      console.log("Error in ForgotPassword:", error);
      setErrorMessage(error.message); 
      toast.error(error,{
        autoClose:1000,
        className:'forgottoast'
      })
    }
  };

  return (
    <>
    <ToastContainer/>
      <Navbar />
      <div className="forgot-password-container">
        <h2 className="forgot-password-title">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="forgot-password-form">
          <input
            type="email"
            placeholder="Enter Your E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="forgot-password-input"
            required
            
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="forgot-password-button">
            Reset Password
          </button>
        </form>
        
        <p className="forgot-password-login">
          Remember your password? <Link to="/login">Login</Link>
        </p>
      </div>
    </>
  );
}

export default ForgotPassword;
