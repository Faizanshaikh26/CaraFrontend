import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./Components/ScrollToTop";

import { useLoading } from "./Context/LoadingContext";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from './Pages/ResetPassword'
import Home from "./Home";
import About from "./Pages/About";
import Shop from "./Pages/Shop";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Blog from "./Pages/Blog";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Proced from "./Pages/Proced";
import Orderconfirm from "./Pages/Orderconfirm";
import Loading from "./Components/Loading";

const LazySingleProduct = lazy(() => import("./Components/Singleproduct"));
const LazyArrivalSingleProduct = lazy(() => import("./Components/ArrivalSingleProduct"));

function App() {
  const { loading } = useLoading();

  return (
    <>
      <ScrollToTop />
      {loading ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/singleproduct/:productId" element={<LazySingleProduct />} />
            <Route path="/:ArrivalId" element={<LazyArrivalSingleProduct />} />
            <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/proceed" element={<Proced/>}/>
        <Route path="/order" element={<Orderconfirm/>}/>
            <Route path="/forgotpass" element={<ForgotPassword/>}/>
            <Route path="/reset-password/:token" element={<ResetPassword/>}/>
          </Routes>
        </Suspense>
      )}
    </>
  );
}

export default App;
<div className="cart-details">
          <h4>Your Cart</h4>

          {cartItems.map((item) => (
            <div className="cart-item-info" key={item.id}>
              <div className="cart-img">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="cart-item">
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>QTY.{item.quantity}</p>
              </div>
              <i
                className="fa fa-times circle remove"
                onClick={() => removeFromCart(item.id)}
              ></i>
            </div>
          ))}

          <div className="discount-coupon">
            <input type="text" placeholder="Discount code" />
            <button>Apply</button>
          </div>
          <div className="cart-total">
            <p>
              Item subtotal <span>${cartTotal}</span>
            </p>
            <p>
              Shipping <span>{cartTotal > 20 ? "Free" : "$10"}</span>
            </p>
            <hr />
            <p>
              Total{" "}
              <span>
                ${cartTotal > 20 ? cartTotal.toFixed(2) : cartTotal + 10}
              </span>
            </p>
          </div>
        </div>