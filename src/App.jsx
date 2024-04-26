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
            {/* <Route path="/reset-password/:token" element={<ResetPassword/>}/> */}

            <Route path="/resetpass/:token" element={<ResetPassword/>}/>
          </Routes>
        </Suspense>
      )}
    </>
  );
}

export default App;
