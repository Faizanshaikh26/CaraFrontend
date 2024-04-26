import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../Styles/ResetPassword.css";
import Navbar from "../Components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
const BASE_URL="https://carabackend.onrender.com";

function ResetPassword() {
  const { token } = useParams(); 
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPasswords, setShowPasswords] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false); // State to track loading state

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading state to true when resetting password

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false); // Reset loading state
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setMessage(data.message);
      window.location.replace('/login')
      setLoading(false); // Reset loading state
    } catch (error) {
      console.error("Reset password error:", error.message);
      setMessage(error.message || "An error occurred while resetting password");
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <div className="container">
      <h2 className="title">Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <div className="form-group">
          <input
            type={showPasswords ? "text" : "password"}
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type={showPasswords ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="show-password">
          <label htmlFor="showPasswords">Show Passwords</label>
          <input
            id="showPasswords"
            type="checkbox"
            checked={showPasswords}
            onChange={() => setShowPasswords(!showPasswords)}
          />
        </div>
        <button type="submit" className="button" disabled={loading}>
          {loading ? (
            <>
            
              <ClipLoader
                color={"#ffffff"}
                loading={true}
                css={override}
                size={25}
              />
            </>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
      <p className={`message ${message ? 'show' : ''}`}>{message}</p>
      <p className="login-link">
        Remember your password? <Link to="/login">Login</Link>
      </p>
    </div>
    </>
  );
}

export default ResetPassword;

const override = css`
  display: inline-block;
  vertical-align: middle;
`;
