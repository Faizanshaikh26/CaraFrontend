import React from "react";
import Heroimg from "../Images/Hero.png";
import "../Styles/Hero.css";
import btncover from "../Images/Buttoncover.png"



function Hero() {
  return (
    <>
      <div

        className="Hero-section"
        style={{ backgroundImage: `url(${Heroimg})`}}
      >
        <h4>Trade-in-offer</h4>
  
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons & up to 70% off!</p>
        
        <button style={{backgroundImage:`url(${btncover})`}}>Shop More</button>
      </div>
    </>
  );
}
export default Hero;
