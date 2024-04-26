import React from 'react'
import '../Styles/Hero.css'
import Featureslist from '../Hardcoredata/Features'

function Features() {
  return (
    <>
      <div className="Feautures Padding-1">
      {
        Featureslist.map((data)=>{
          return (
          <div className="Features-box" key={data.ID}>
          <img src={data.Img} alt="sorry" />
       <h6>{data.description}</h6>
        </div>
          )
        })
      }

   </div>
    </>
  )
}

export default Features