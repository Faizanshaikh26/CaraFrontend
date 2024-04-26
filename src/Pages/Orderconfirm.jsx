import React from 'react'
import Navbar from '../Components/Navbar'
import '../Styles/Orderconfirm.css'
import Footer from '../Components/Footer'

import { usecart } from '../Context/CartContext';


function Orderconfirm() {
    const { cartItems, } = usecart();
    // console.log(cartItems)
    const userData = JSON.parse(localStorage.getItem("userData"));
    // console.log("USerdarda",userData)

  return (
    <>
       <Navbar />

       <div className="order-confirmation">
        <h2>Order Confirmation</h2>
        <div className="payment-success-message">
  <h2>Thank You for Your Order!</h2>
  <p>Dear {userData.firstName} {userData.lastName},</p>
  <p>Your order has been successfully placed. It will be delivered to:</p>
  <p>
    <strong>Address:</strong> {userData.address}, {userData.aptSuite}, {userData.city}
  </p>
  <p>We'll make sure your items arrive promptly. If you have any questions or concerns, feel free to contact our support team.</p>
  <p>Thank you for choosing us!</p>
</div>


    

<div className="product-details">
  <h3>Product Details</h3>
  <table className="product-table">
    <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th className='quantity-th'>Quantity</th>
      </tr>
    </thead>
    <tbody>
      {cartItems.map((item) => (
        <tr key={item.id}>
          <td>
            <img src={item.img} alt="Product" />
          </td>
          <td>{item.name}</td>
        
          <td>{item.price}</td>
          <td>{item.quantity}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


        <p>Your order has been confirmed. Thank you for shopping with us!</p>
        <p>You will get notified on <strong>{userData.email}</strong> and <strong>{userData.telephone}</strong> once the order is shipped.</p>

      </div>


<Footer />

    
    
    </>
  )
}

export default Orderconfirm