import React from "react";
import Footer from "../Components/Footer";
import "../Styles/About.css";
import Features from "../Components/Features";
import Banner7 from "../Images/Banner7.png";
import Navbar from "../Components/Navbar";
import Aboutimg from "../Images/About1.jpg";
import Aboutvideo from '../Images/Aboutvideo.mp4';
import { useLoading } from "../Context/LoadingContext";
import Loading from '../Components/Loading'


function About() {
  const {loading}=useLoading()
  return (
    <>
      <Navbar />
     {
      loading ? (<Loading/>):(<>
       <div className="About-section" style={{ backgroundImage: `url(${Banner7})` }}>
        <h2>#Know us</h2>
        <p>Mil lo Phir..!</p>
      </div>
      <div className="About Padding-1">
        <img src={Aboutimg} alt="" />
        <div>
          <h2>Who We Are?</h2>
          <p>
            Welcome to our online clothing store! We are passionate about providing you with the latest fashion trends and styles at affordable prices. Our mission is to make shopping for clothes a seamless and enjoyable experience for everyone. Our team of dedicated professionals works tirelessly to curate a collection that meets your fashion needs, whether you're looking for casual wear, formal attire, or something in between. With a focus on quality, comfort, and style, we strive to exceed your expectations with every purchase. At our store, customer satisfaction is our top priority.
          </p>
          <abbr title="">
          Experience the convenience of shopping for the latest fashion trends from the comfort of your home. With our user-friendly interface, you can browse through a diverse range of clothing options, explore different styles, and find the perfect outfit for any occasion. 
</abbr>

          <br />
          <br />
          <marquee bgcolor="#ccc" loop="-1" scrollamount="5" width="100%">
            Shop Hustle Free. Easy Refund. 40 to 50% offers on all Brand..!
          </marquee>
        </div>
      </div>
      <div className="About-app Padding-1">
        <h1>
          Download Our <a href="#">App</a>
        </h1>
        <div className="Video">
          <video autoPlay muted loop src={Aboutvideo}></video>
        </div>
      </div></>)
     }
      <Features />
      <Footer />
    </>
  );
}

export default About;
