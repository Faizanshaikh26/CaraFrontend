import React, { useState } from "react";
import "../Styles/Contact.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Banner7 from "../Images/Banner7.png";
import person1 from "../Images/People1.png";
import person2 from "../Images/People2.png";
import person3 from "../Images/People3.png";
const isAuthenticated = localStorage.getItem("auth-token");
const BASE_URL="https://carabackend.onrender.com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlecontact = async () => {
    if (isAuthenticated) {
      if (
        !formData.name ||
        !formData.email ||
        !formData.subject ||
        !formData.message
      ) {
        toast.error("Please fill in all fields.", {
          autoClose: 1000,
          className: "contacttoast",
        });
        return;
      }
  
      console.log(formData, "formdata");
      let responsedata;
      fetch(`${BASE_URL}/Contactform`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => (responsedata = data));
  
      toast.success("Message Send ", {
        className: "contacttoast",
        autoClose:1000,
        position:'top-center'
      });
  
      
    } else {
      toast.error("Please Login",{
        autoClose:1000,
        position:'top-center',
        className: "contacttoast"
      })
      
    }
    };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div
        className="Contact-section"
        style={{ backgroundImage: `url(${Banner7})` }}
      >
        <h2>#lets's_talk</h2>
        <p>LEAVE A MESSAGE.We love to hear from you !</p>
      </div>
      <div className="Contact-Details Padding-1">
        <div className="details">
          <span>GET IN TOUCH</span>
          <h2>Visit one of our agency locations or contact us today</h2>
          <h3>Head Office</h3>
          <div>
            <li>
              <i className="fa fa-map"></i>
              <p>54 Glassford Street Giagrow G1 10 New York</p>
            </li>
            <li>
              <i className="fa fa-envelope"></i>
              <p>Contact1@example.com</p>
            </li>
            <li>
              <i className="fa fa-phone"></i>
              <p>Contact2@example.com</p>
            </li>
            <li>
              <i className="fa fa-clock"></i>
              <p>Monday to Saturday 9.00am to 10pm</p>
            </li>
          </div>
        </div>
        <div className="Map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1096387.4887706682!2d-74.0371901409936!3d40.439173083796135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1708765415101!5m2!1sen!2sin"
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="form-details">
        <form onSubmit={(e) => e.preventDefault()}>
          <span>LEAVE A MESSAGE</span>
          <h2>We love to hear from you</h2>
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
          />
          <textarea
            cols="30"
            rows="10"
            placeholder="Your Message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
          <button onClick={handlecontact}>Submit</button>
        </form>

        <div className="people">
          <div>
            <img src={person1}  />
            <p>
              <span>Jhone Doe</span> Senior Marketing Manager <br />
              Phone : +0099886655 <br />
              Email: ex@gmail.com
            </p>
          </div>
          <div>
            <img src={person2}  />
            <p>
              <span>Willaim Smithe</span> Senior Marketing Manager <br />
              Phone : +0099886655 <br />
              Email: ex@gmail.com
            </p>
          </div>
          <div>
            <img src={person3}  />
            <p>
              <span>kevin Peter</span> Senior Marketing Manager <br />
              Phone : +0099886655 <br />
              Email: ex@gmail.com
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
