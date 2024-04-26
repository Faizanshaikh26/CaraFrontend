import React from 'react'
import "../Styles/ProductNotFound.css";
import Navbar from '../Components/Navbar';

function ProductNotFound() {
  return (
 <>
   <Navbar/>
   <div className="product-not-found">
      <div className="product-not-found-content">
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist.</p>
      </div>
    </div>
 
 </>
  )
}

export default ProductNotFound