import React from "react";
import "../Styles/Blog.css";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";
import Banner10 from "../Images/Banner10.jpg"
import Blogimg1 from "../Images/Blog1.jpg"
import Blogimg2 from "../Images/Blog2.jpg"
import Blogimg3 from "../Images/Blog3.jpg"
import Blogimg4 from "../Images/Blog4.jpg"
import Blogimg5 from "../Images/Blog5.jpg"
import { useLoading } from "../Context/LoadingContext";
import Loading from '../Components/Loading'
function Blog() {
  
  const {loading}=useLoading()
  return (
    <>
           <Navbar />
      {
        loading ? (<Loading/>) : (<>
        <div className="Blog-section" style={{backgroundImage:`url(${Banner10})`}}>
        <h2>#ReadMore</h2>
        <p>Read all case studies about our products!</p>
      </div>
      <div className="Blog">
        <div className="Blog-Box">
          <div className="blog-img">
            <img src={Blogimg1} alt="" />
          </div>
          <div className="Blog-details">
            <h4>New Arrivals: Summer Collection</h4>
            <p>
              Discover our latest summer collection featuring vibrant colors and trendy designs. Get ready to upgrade your wardrobe for the season!
            </p>
            <a href="#"> CONTINUE READING</a>
            <h1>13/01</h1>
          </div>
        </div>
        <div className="Blog-Box">
          <div className="blog-img">
            <img src={Blogimg2} alt="" />
          </div>
          <div className="Blog-details">
            <h4>Trend Alert: Neon Colors</h4>
            <p>
              Neon colors are making a comeback this season! Learn how to incorporate these bold hues into your wardrobe with our styling tips and tricks.
            </p>
            <a href="#"> CONTINUE READING</a>
            <h1>13/10</h1>
          </div>
        </div>
        <div className="Blog-Box">
          <div className="blog-img">
            <img src={Blogimg3} alt="" />
          </div>
          <div className="Blog-details">
            <h4>Essential Fashion Accessories</h4>
            <p>
              Complete your look with our curated selection of must-have fashion accessories. From statement jewelry to stylish hats, we've got you covered!
            </p>
            <a href="#"> CONTINUE READING</a>
            <h1>12/08</h1>
          </div>
        </div>
        <div className="Blog-Box">
          <div className="blog-img">
            <img src={Blogimg4} alt="" />
          </div>
          <div className="Blog-details">
            <h4>Chic and Comfy: Loungewear Staples</h4>
            <p>
              Stay cozy while looking chic in our latest loungewear staples. Explore comfortable yet stylish pieces perfect for relaxing at home or running errands.
            </p>
            <a href="#"> CONTINUE READING</a>
            <h1>11/08</h1>
          </div>
        </div>
        <div className="Blog-Box">
          <div className="blog-img">
            <img src={Blogimg5} alt="" />
          </div>
          <div className="Blog-details">
            <h4>Summer Fashion: Beach Day Essentials</h4>
            <p>
              Get beach-ready with our essential guide to summer fashion. Discover the must-have pieces to pack for your next seaside adventure!
            </p>
            <a href="#"> CONTINUE READING</a>
            <h1>14/09</h1>
          </div>
        </div>
       
      
       
    
      </div></>)
      }
      <Banner />
      <Footer />
     
    </>
  );
}

export default Blog;
