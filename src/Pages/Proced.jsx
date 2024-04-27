import React, { useEffect, useState } from "react";
import "../Styles/Proced.css";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { usecart } from "../Context/CartContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from "react-spinners";

const BASE_URL="https://carabackend.onrender.com";

function Proced() {
  const { cartItems, cartTotal, setCartTotal, removeFromCart } = usecart();
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
  const [loading, setLoading] = useState(false); // State to track loading state

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      const itemPrice = typeof item.price === "string"
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
    setUserData({ ...userData, [name]: value });
    if (name === 'telephone') {
      validateTelephone(value);
    }
  };

  const validateTelephone = (telephone) => {
    const isValidTelephone = /^\d{10}$/.test(telephone);
    setFormErrors((prevErrors) => ({ ...prevErrors, telephone: !isValidTelephone }));
  };

  const makePayment = async () => {
    setLoading(true); // Set loading state to true when making payment
    localStorage.setItem("userData", JSON.stringify(userData));
    const stripe = await loadStripe(
      "pk_test_51P3CGpSICUDPT1mUeEL2BbPVngh32BfWfSLY3SKtfHhzkbtFoGxU0e1L1y2MdaJ2s0RhYmggoj5IchxG7ySoJ46D00xZMbIWXX"
    );

    const body = { products: cartItems, userData: userData };
    const headers = { "Content-Type": "application/json" };

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
    } catch (error) {
      console.error("Error making payment:", error);
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const errors = {};
    for (const key in userData) {
      if (!userData[key]) {
        errors[key] = true;
      }
    }
  
    // Validate telephone number
    if (!userData.telephone || !/^\d{10}$/.test(userData.telephone)) {
      errors['telephone'] = true;
    }
  
    setFormErrors(errors);
  
    if (Object.keys(errors).length > 0) {
      toast.error("Please fill in all the fields correctly.", {
        autoClose: 1000,
        position: 'top-center',
        className: "procedtoast"
      });
      return;
    }
  
    // If all fields are filled and telephone is valid, proceed with submission and payment
    try {
      const response = await fetch(`${BASE_URL}/user-Address`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
  
      await makePayment();
    } catch (error) {
      console.error("Error submitting form or making payment:", error);
    }
  };

  return (
    <>
      <ToastContainer />
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
                className={formErrors.email ? "error" : ""}
              />
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
                  className={formErrors.firstName ? "error" : ""}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  className={formErrors.lastName ? "error" : ""}
                />
              </div>
              <div className="address-field">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={userData.address}
                  onChange={handleInputChange}
                  className={formErrors.address ? "error" : ""}
                />
                <input
                  type="text"
                  name="aptSuite"
                  placeholder="Apt,Suite"
                  value={userData.aptSuite}
                  onChange={handleInputChange}
                  className={formErrors.aptSuite ? "error" : ""}
                />
              </div>
              <div className="address-personal-field">
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal code"
                  value={userData.postalCode}
                  onChange={handleInputChange}
                  className={formErrors.postalCode ? "error" : ""}
                />
                <div className="address-picode-tele">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={userData.city}
                    onChange={handleInputChange}
                    className={formErrors.city ? "error" : ""}
                  />
                  <input
                    type="text"
                    name="telephone"
                    placeholder="Telephone"
                    value={userData.telephone}
                    onChange={handleInputChange}
                    className={formErrors.telephone ? "error" : ""}
                  />
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
            <button type="submit" disabled={loading}>
              {loading ? <ClipLoader color={"#ffffff"} loading={true} size={25} /> : "Continue To Payment"}
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


