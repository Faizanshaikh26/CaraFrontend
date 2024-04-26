import React, { useEffect, useState } from "react";
import "../Styles/Proced.css";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { usecart } from "../Context/CartContext";
const BASE_URL="https://carabackend.onrender.com";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

function Proced() {
  const { cartItems, cartTotal, setCartTotal, removeFromCart } = usecart();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    aptSuite: "",
    postalCode: "",
    city: "",
    telephone: "",
    country: "US",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      const itemPrice =
        typeof item.price === "string"
          ? parseFloat(item.price.replace("$", ""))
          : item.price;
      const itemQuantity = parseInt(item.quantity, 10);

      if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
        return sum + itemPrice * itemQuantity;
      }
      return sum;
    }, 0);

    setCartTotal(total);
  }, [cartItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!userData.email) {
      errors.email = "Email is required.";
    } else if (!validateEmail(userData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!userData.firstName) {
      errors.firstName = "First name is required.";
    }

    if (!userData.lastName) {
      errors.lastName = "Last name is required.";
    }

    if (!userData.address) {
      errors.address = "Address is required.";
    }

    if (!userData.postalCode) {
      errors.postalCode = "Postal code is required.";
    }

    if (!userData.city) {
      errors.city = "City is required.";
    }

    if (!userData.telephone) {
      errors.telephone = "Telephone is required.";
    } else if (!validatePhoneNumber(userData.telephone)) {
      errors.telephone = "Please enter a valid phone number.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const validatePhoneNumber = (phoneNumber) => {
    
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateEmail = (email) => {
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const makePayment = async () => {
    if (!validateForm()) {
      return;
    }

    localStorage.setItem("userData", JSON.stringify(userData));
    const stripe = await loadStripe(
      "pk_test_51P3CGpSICUDPT1mUeEL2BbPVngh32BfWfSLY3SKtfHhzkbtFoGxU0e1L1y2MdaJ2s0RhYmggoj5IchxG7ySoJ46D00xZMbIWXX"
    );

    const body = {
      products: cartItems,
      userData: userData,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(`${BASE_URL}/create-checkout-session`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();
      const result = stripe.redirectToCheckout({ sessionId: session.id });
      // console.log(result);
    } catch (error) {
      // console.error("Error making payment:", error);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    const response = await fetch(`${BASE_URL}/user-Address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

   
      

    await makePayment(); 
  };

  return (
    <>
      <Navbar />
      <div className="proced-container">
        <div className="user-details">
          <form onSubmit={handleSubmit}>
            <div className="User-info">
              <h3>Customer Info</h3>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleInputChange}
                className={formErrors.email ? "input-error" : ""}
              />
              {formErrors.email && <div className="error-message">{formErrors.email}</div>}
            </div>

            <div className="user-address-details">
              <h3>Shipping Details</h3>
              <div className="personal-details">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  className={formErrors.firstName ? "input-error" : ""}
                />
                {formErrors.firstName && <div className="error-message">{formErrors.firstName}</div>}
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  className={formErrors.lastName ? "input-error" : ""}
                />
                {formErrors.lastName && <div className="error-message">{formErrors.lastName}</div>}
              </div>
              <div className="address-field">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={userData.address}
                  onChange={handleInputChange}
                  className={formErrors.address ? "input-error" : ""}
                />
                {formErrors.address && <div className="error-message">{formErrors.address}</div>}
                <input
                  type="text"
                  name="aptSuite"
                  placeholder="Apt,Suite"
                  value={userData.aptSuite}
                  onChange={handleInputChange}
                />
              </div>
              <div className="address-personal-field">
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal code"
                  value={userData.postalCode}
                  onChange={handleInputChange}
                  className={formErrors.postalCode ? "input-error" : ""}
                />
                {formErrors.postalCode && <div className="error-message">{formErrors.postalCode}</div>}
                <div className="address-picode-tele">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={userData.city}
                    onChange={handleInputChange}
                    className={formErrors.city ? "input-error" : ""}
                  />
                  {formErrors.city && <div className="error-message">{formErrors.city}</div>}
                  <input
                    type="number"
                    name="telephone"
                    placeholder="Telephone"
                    value={userData.telephone}
                    onChange={handleInputChange}
                    className={formErrors.telephone ? "input-error" : ""}
                  />
                  {formErrors.telephone && <div className="error-message">{formErrors.telephone}</div>}
                </div>
              </div>

              <div className="address-field">
                <select
                  name="country"
                  value={userData.country}
                  onChange={handleInputChange}
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                  <option value="IN">India</option>
                </select>
              </div>
            </div>

            <p>Return to cart</p>
            <button type="submit">Continue To Payment</button>
            <button type="submit"  disabled={loading}>
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
              "Continue to Payment"
            )}
          </button>
          </form>
        </div>

        <div className="cart-details">
          <h4>Your Cart</h4>

          {cartItems.map((item) => (
            <div className="cart-item-info" key={item.id}>
              <div className="cart-img">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="cart-item">
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>QTY.{item.quantity}</p>
              </div>
              <i
                className="fa fa-times circle remove"
                onClick={() => removeFromCart(item.id)}
              ></i>
            </div>
          ))}

          <div className="discount-coupon">
            <input type="text" placeholder="Discount code" />
            <button>Apply</button>
          </div>
          <div className="cart-total">
            <p>
              Item subtotal <span>${cartTotal}</span>
            </p>
            <p>
              Shipping <span>{cartTotal > 20 ? "Free" : "$10"}</span>
            </p>
            <hr />
            <p>
              Total{" "}
              <span>
                ${cartTotal > 20 ? cartTotal.toFixed(2) : cartTotal + 10}
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Proced;
