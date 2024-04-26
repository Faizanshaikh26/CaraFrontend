import React from "react";
import "../Styles/FeatureProducts.css";
import FeatureProduct from "../Hardcoredata/FeaturedProduct";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

function Featureproducts() {
  return (
    <>
      <div className="Featureproducts Padding-1">
        <h2>Feature Products</h2>
        <p>Summer Collection New Mordern Design</p>
        <div className="Product-Cointainer">
        {FeatureProduct.map((product) => {
  return ( 
    <div className="Products-List" key={product.Id}>
      <Link to={`/singleproduct/${product.Id}`}>
        <img src={product.IMG} alt="Product-Image" />
        <div className="description">
          <span>{product.Brand}</span>
          <h5>{product.Name}</h5>
          <div className="Stars">
            <span>
              {<StarRating rating={product.StarRating} />}
            </span>
          </div>

          <h4>{product.Price}</h4>
        </div>
      </Link>
      <i className="fa-sharp fa-solid fa-cart-shopping cart"></i>
    </div>
  );
})}

        </div>
      </div>
    </>
  );
}

export default Featureproducts;
