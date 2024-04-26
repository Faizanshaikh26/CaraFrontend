import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../Styles/Signup.css';
import Navbar from "../Components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
const BASE_URL="https://carabackend.onrender.com";

function Signup() {
  const [formdata, setdata] = useState({
    Username: "",
    Email: "",
    password: "",
    showPassword: false
  });
  const [loading, setLoading] = useState(false); // State to track loading state

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when signup process starts
    if (!formdata.password) {
      toast.error("Please enter a password", { autoClose: 1000, className: "logintoast" ,   position:"top-center"});
      setLoading(false); // Reset loading state
      return;
    }
    if(!formdata.Username){
      toast.error("Please enter a username",{
        autoClose:1000,
        className:"signuptoast",
        position:"top-center"
      });
      setLoading(false); // Reset loading state
      return;
    }
    if(!formdata.Email){
      toast.error("Please enter an email",{
        autoClose:1000,
        className:"logintoast",
        position:"top-center"
      });
      setLoading(false); // Reset loading state
      return;
    }
    let responsedata;
    await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.json())
      .then((data) => (responsedata = data));
    if (responsedata.success) {
      localStorage.setItem("auth-token", responsedata.token);
      window.location.replace("/");
    }
    else {
      toast.error(responsedata.error, { autoClose: 1000, className: "logintoast" });
    }
    setLoading(false); // Reset loading state after signup process completes
  };

  const handlechange = (e) => {
    setdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const togglePasswordVisibility = () => {
    setdata({ ...formdata, showPassword: !formdata.showPassword });
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="signup-container">
        
        <div className="Form-details">
          <form onSubmit={(e) => e.preventDefault()}>
            <span className="signup-title">Sign Up</span>
            <h2>To Cara Ecommerce</h2>
            <input
              type="text"
              placeholder="Enter Your Username"
              name="Username"
              value={formdata.Username}
              onChange={handlechange}
            />
            <input
              type="email"
              placeholder=" Enter Your E-mail"
              name="Email"
              value={formdata.Email}
              onChange={handlechange}
            />
            <div className="password-input-container">
              <input
                className="signup-input"
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
            <p>
              Already have an account...
              <Link to="/login">
                <span>Login here</span>
              </Link>
            </p>
            <button className='signup-button' onClick={signup} disabled={loading}>
              {loading ? (
                <ClipLoader color={"#ffffff"} loading={true} css={override} size={25} />
              ) : (
                "Signup"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;

const override = css`
  display: inline-block;
  vertical-align: middle;
`;
