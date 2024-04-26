import React from "react";
import Navbar from "../Components/Navbar";
import "../Styles/Shop.css";
import Footer from "../Components/Footer";
import Banner9 from "../Images/Banner9.jpg";
import Featuresproduct from "../Components/Featuresproduct";
import Arrivalproduct from "../Components/Arrivalproduct";

function Shop() {
  return (
    <>
      <Navbar />

      <div
        className="Shop-section"
        style={{ backgroundImage: `url(${Banner9})` }}
      >
        <h2>#stayhome</h2>
        <p>Save more with coupons & up to 70% off!</p>
      </div>

      <Featuresproduct/>

<Arrivalproduct/>
      <Footer />
    </>
  );
}

export default Shop;
