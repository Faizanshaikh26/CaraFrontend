import React from "react";
import "../Styles/Banner.css";
import Bannerimg from "../Images/Banner1.jpg";

function Banner() {
  return (
    <>
      <div
        className="Banner"
        style={{
          backgroundImage: `url(${Bannerimg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <h4>Repair Services</h4>
        <h2>
          Up to <span> 70% off</span> All t-Shirts and Accesories
        </h2>
        <button>Explore More</button>
      </div>
    </>
  );
}

export default Banner;
