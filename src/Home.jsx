import React from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Features from './Components/Features'
import Featuresproduct from './Components/Featuresproduct'
import Arrivalproduct from './Components/Arrivalproduct'
import Banner from './Components/Banner'
import MainBanner from './Components/MainBanner'
import Footer from './Components/Footer'



function Home() {
  return (
   <>
   <Navbar/>
   <Hero/>
   <Features/>
   <Featuresproduct/>
   <Arrivalproduct/>
   <Banner/>
   <MainBanner/>
   <Footer/>

   
   </>
  )
}

export default Home