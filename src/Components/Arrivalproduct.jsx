import React from "react";
import "../Styles/Arrivalproduct.css";
import NewArrivalproduct from "../Hardcoredata/NewArrivalProduct";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

function NewArrival() {
  return (
    <>
      <div className="Arrival-products Padding-1">
        <h2>New Arrivals </h2>
        <p>Summer Collection New Mordern Design</p>
        <div className="Product-Cointainer">
          {NewArrivalproduct.map((product) => {
            return (
              <div className="Products-List" key={product.Id}>
                <Link to={`/${product.Id}`}>
                  <img src={product.IMG} alt="Product-Image" />
                  <div className="description">
                    <span>{product.Brand}</span>
                    <h5>{product.Name}</h5>
                    <div className="Stars">
                      <span>
                        <StarRating rating={product.StarRating} />
                      </span>
                    </div>
                    <h4>{product.Price}</h4>
                  </div>
                  <i className="fa-sharp fa-solid fa-cart-shopping cart"></i>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default NewArrival;
