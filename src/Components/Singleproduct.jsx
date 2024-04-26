import React, { useState, useEffect } from "react";
import "../Styles/Singleproduct.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";
import FeatureProduct from "../Hardcoredata/FeaturedProduct";
import StarRating from "../Components/StarRating";
import { usecart } from "../Context/CartContext";
import ProductNotFound from "../Pages/ProductNotFound";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SingleProduct() {
  const [value, setValue] = useState(1);
  const [mainImg, setMainImg] = useState("");
  const { productId } = useParams();
  const product = FeatureProduct.find((p) => p.Id === parseInt(productId, 10));
  const { addToCart } = usecart();
  const isAuthenticated = localStorage.getItem("auth-token");

  useEffect(() => {
    if (product) {
      setMainImg(product.Main_Img);
    }
  }, [product]);

  const handleValueChange = (e) => {
    const newValue = Math.max(1, parseInt(e.target.value, 10) || 1);
    setValue(newValue);
    
  };

  
  const changeMainImage = (imageSrc) => {
    setMainImg(imageSrc);
    
  };

  if (!product) {
    return <ProductNotFound/>;
  }

  const handleAddToCart = () => {
    if (isAuthenticated) {
      addToCart({
        id: product.Id,
        name: product.Name,
        price: product.Price,
        quantity: parseInt(value, 10),
        img: product.Main_Img, 
      });
      toast.success("Added to cart",{
        autoClose: 1000,
        className:"singletoast",
        position:"top-center"

      })

    } else {
      toast.error("Please log in to add items to the cart",{
        autoClose:1000,position:'top-center',
        className:"singletoast"
      });
      
    }
    
  };

  const handledecrement=()=>{
    value > 1  ? setValue(value-1) :setValue(1)

  }

  const handleincrement=()=>{
    value < product.Stock ?setValue(value+1) :setValue(product.Stock)
  }

  return (
    <>

      <ToastContainer/>
      <Navbar />

      <div className="Single-Cointainer Padding-1">
        <div className="Single-pro-img">
          <img src={mainImg} width="100%" className="Maini-mg" alt="" />
          <div className="Small-img-grp">
            {/* Setup onClick handlers for each small image */}
            <div
              className="small-img-col"
              onClick={() => changeMainImage(product.Small_img1)}
            >
              <img
                src={product.Small_img1}
                width="100%"
                className="smll-img"
                alt=""
              />
            </div>
            <div
              className="small-img-col"
              onClick={() => changeMainImage(product.Small_img2)}
            >
              <img
                src={product.Small_img2}
                width="100%"
                className="smll-img"
                alt=""
              />
            </div>
            <div
              className="small-img-col"
              onClick={() => changeMainImage(product.Small_img3)}
            >
              <img
                src={product.Small_img3}
                width="100%"
                className="smll-img"
                alt=""
              />
            </div>
            <div
              className="small-img-col"
              onClick={() => changeMainImage(product.Small_img4)}
            >
              <img
                src={product.Small_img4}
                width="100%"
                className="smll-img"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="Single-Pro-Details">
          <h6>Home/T-Shirt</h6>
          <h4>{product.Name}</h4>
          <h2>{product.Price}</h2>

          <select>
            <option>Select Size</option>
            <option value="SIZE">Xl</option>
            <option value="SIZE">XXl</option>
            <option value="SIZE">Small</option>
            <option value="SIZE">Large</option>
          </select>

          <input type="Number" value={value} onChange={handleValueChange} />
          <button onClick={handleAddToCart}>Add To Cart</button>
          <div className="Buttonsincredecre">
            <span className="Decrement" onClick={handledecrement}>
            <i className="fa-solid fa-minus"></i>
            </span>
            <span
              className="Increment"
              onClick={handleincrement}
            >
               <i className="fa-solid fa-plus"></i>
            </span>
          </div>
          <div className="Stars">
            <p>{<StarRating rating={product.StarRating} />}</p>
            <span>{product.StarRating}</span>
            <h5>In-Stock : {product.Stock}</h5>
          </div>

          <h4>Product Details</h4>
          <span>{product.Product_Des}</span>
        </div>
      </div>

   
      <Footer />
    </>
  );
}

export default SingleProduct;
