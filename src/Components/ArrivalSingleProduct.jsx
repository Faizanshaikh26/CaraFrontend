import React, { useState } from "react";
import { useParams } from "react-router-dom";
import NewArrivalproduct from "../Hardcoredata/NewArrivalProduct";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Styles/Singleproduct.css";
import StarRating from "../Components/StarRating";
import { usecart } from "../Context/CartContext";
import ProductNotFound from "../Pages/ProductNotFound";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ArrivalSingleProduct() {
  const { addToCart } = usecart();
  const isAuthenticated = localStorage.getItem("auth-token");

  const { ArrivalId } = useParams();
  const ArrivalPro = NewArrivalproduct.find(
    (p) => p.Id === parseInt(ArrivalId, 10)
  );

  if (!ArrivalPro) {
    return <ProductNotFound/>;
  }

  const [value, setValue] = useState(1);
  const [selectedImage, setSelectedImage] = useState(ArrivalPro.Main_Img);

  const handleValueChange = (e) => {
    const newValue = Math.max(1, parseInt(e.target.value, 10) || 1);
    setValue(newValue);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleAddToCart = () => {
    if (isAuthenticated) {
      addToCart({
        id: ArrivalPro.Id,
        name: ArrivalPro.Name,
        price: ArrivalPro.Price,
        quantity: parseInt(value, 10),
        img: ArrivalPro.IMG,
      });
      toast.success("Added to cart",{
        autoClose: 1000,
        className:"singletoast",
        position:"top-center"
          
      })
      
    } else {
      alert("Please log in to add items to the cart.");
      window.location.replace("/login"); 
    }};

  const handledecrement=()=>{
    value > 1  ? setValue(value-1) :setValue(1)
  }

  const handleincrement=()=>{
    value < ArrivalPro.Stock ?setValue(value+1) :setValue(ArrivalPro.Stock)
  }
  return (
    <>

    <ToastContainer/>
      <Navbar />
      <div className="Single-Cointainer Padding-1">
        <div className="Single-pro-img">
          <img src={selectedImage} width="100%" className="Maini-mg"  />
          <div className="Small-img-grp">
            <div className="small-img-col">
              <img
                src={ArrivalPro.Small_img1}
                width="100%"
                className="smll-img"
                
                onClick={() => handleImageClick(ArrivalPro.Small_img1)}
              />
            </div>
            <div className="small-img-col">
              <img
                src={ArrivalPro.Small_img2}
                width="100%"
                className="smll-img"
                
                onClick={() => handleImageClick(ArrivalPro.Small_img2)}
              />
            </div>
            <div className="small-img-col">
              <img
                src={ArrivalPro.Small_img3}
                width="100%"
                className="smll-img"
                
                onClick={() => handleImageClick(ArrivalPro.Small_img3)}
              />
            </div>
            <div className="small-img-col">
              <img
                src={ArrivalPro.Small_img4}
                width="100%"
                className="smll-img"
                
                onClick={() => handleImageClick(ArrivalPro.Small_img4)}
              />
            </div>
          </div>
        </div>

        <div className="Single-Pro-Details">
          <h6>Home/T-Shirt</h6>
          <h4>{ArrivalPro.Name}</h4>
          <h2>{ArrivalPro.Price}</h2>
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
            <i class="fa-solid fa-minus"></i>
            </span>
            <span
              className="Increment"
              onClick={handleincrement}
            >
              <i class="fa-solid fa-plus"></i>
            </span>
          </div>
          <div className="Stars">
            <p>{<StarRating rating={ArrivalPro.StarRating} />}</p>
            <span>{ArrivalPro.StarRating}</span>
            <h5>In-Stock : {ArrivalPro.Stock}</h5>
          </div>
          <h4>Product Details</h4>
          <span>{ArrivalPro.Product_Des}</span>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ArrivalSingleProduct;
