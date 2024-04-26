import React, { useState, useEffect } from "react";
import "../Styles/Cart.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { usecart } from "../Context/CartContext";
import { Link } from "react-router-dom";
import { useLoading } from "../Context/LoadingContext";
import Loading from '../Components/Loading'

function Cart() {
  const { loading } = useLoading()
  const { cartItems, removeFromCart, updateItemQuantity } = usecart();
  const [cartTotal, setCartTotal] = useState(1);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      const itemPrice = typeof item.price === 'string' ? parseFloat(item.price.replace("$", "")) : item.price;
      const itemQuantity = parseInt(item.quantity, 10);

      if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
        return sum + itemPrice * itemQuantity;
      }
      return sum;
    }, 0);

    setCartTotal(total);
  }, [cartItems]);

  return (
    <>
      <Navbar />
      {
        loading ? (<Loading />) : (
          <>
            <div className="Cart Padding-1">
              <table width="100%">
                <thead>
                  <tr>
                    <td>Remove</td>
                    <td>Images</td>
                    <td>Product</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>SubTotal</td>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td
                        onClick={() => removeFromCart(item.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fa fa-times circle"></i>
                      </td>
                      <td>
                        {item.img ? (
                          <img src={item.img} alt={item.name} />
                        ) : (
                            "No Image"
                          )}
                      </td>
                      <td>{item.name}</td>
                      <td>
                        ${typeof item.price === 'string' ? parseFloat(item.price.replace("$", "")) : item.price}
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value, 10) || 1;
                            updateItemQuantity(item.id, Math.max(1, newQuantity));
                          }}
                        />
                      </td>
                      <td>${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="Cart-Add Padding-1">
              <div className="Coupon">
                <h1>Apply Coupon </h1>
                <div>
                  <input type="text" placeholder="Enter Your Coupon" />
                  <button>Apply</button>
                </div>
              </div>

              <div className="Subtotal">
                <h3>Cart Totals</h3>
                <table>
                  <tr>
                    <td>Cart Subtotal</td>
                    <td>${cartTotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <td>{cartTotal > 40 ? "Free" : "$10"}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td>
                      <strong>
                        ${cartTotal > 40 ? cartTotal.toFixed(2) : cartTotal + 10}
                      </strong>
                    </td>
                  </tr>
                </table>
                {cartItems.length > 0 && (
                  <Link to="/proceed">
                    <button>Proceed to checkout</button>
                  </Link>
                )}
              </div>
            </div>
          </>
        )
      }
      <Footer />
    </>
  );
}

export default Cart;
