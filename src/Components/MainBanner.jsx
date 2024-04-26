import React from "react";
import "../Styles/MainBanner.css";

import Banner1 from "../Images/Banner2.jpg";
import Banner2 from "../Images/Banner3.jpg";
import Banner3 from "../Images/Banner4.jpg";
import Banner4 from "../Images/Banner5.jpg";
import Banner5 from "../Images/Banner6.jpg";

function MainBanner() {
  return (
    <>
      <div className="M-Banner">
        <div
          className="Banner-Box"
          style={{ backgroundImage: `url(${Banner1})` }}
        >
          <h4>Crazy Deals</h4>
          <h2>Buy 1 get 1 free</h2>
          <span>The best classic Dress is on a sale at cara</span>
          <button>Learn More</button>
        </div>
        <div
          className="Banner-Box2"
          style={{ backgroundImage: `url(${Banner2})` }}
        >
          <h4>Spring/Summer</h4>
          <h2>Upcoming Season</h2>
          <span>The best classic Dress is on a sale at cara</span>
          <button>Lear n More</button>
        </div>
      </div>

      <div className="BM-Banner">
        <div className="BM-box1" style={{ backgroundImage: `url(${Banner3})` }}>
          <h2>SEASON SALE</h2>
          <h3>Winter Collection -50% OFF</h3>
        </div>
        <div className="BM-box2" style={{ backgroundImage: `url(${Banner4})` }}>
          <h2>NEW FOOTWEAR Sale</h2>
          <h3>Spring/Summer Collection </h3>
        </div>
        <div className="BM-box3" style={{ backgroundImage: `url(${Banner5})` }}>
          <h2>Seasonal Sale</h2>
          <h3>Winter Collection -50% OFF</h3>
        </div>
      </div>
    </>
  );
}

export default MainBanner;
